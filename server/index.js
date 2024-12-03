const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/';
    // Ensure uploads directory exists
    require('fs').mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    console.log('Fetching all posts...');
    const posts = await db.all(`
      SELECT p.*, GROUP_CONCAT(t.name) as tags
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);
    console.log(`Found ${posts.length} posts`);
    
    // Parse tags string into array
    posts.forEach(post => {
      post.tags = post.tags ? post.tags.split(',') : [];
    });
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
  }
});

// Get post by slug
app.get('/api/posts/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log('Fetching post by slug:', slug);
    
    const post = await db.get(`
      SELECT p.*, GROUP_CONCAT(t.name) as tags
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.slug = ?
      GROUP BY p.id
    `, [slug]);
    
    if (!post) {
      console.log('Post not found:', slug);
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Parse tags string into array
    post.tags = post.tags ? post.tags.split(',') : [];
    
    console.log('Found post:', post.title);
    res.json(post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    res.status(500).json({ error: 'Failed to fetch post', details: error.message });
  }
});

// Create new post
app.post('/api/posts', upload.single('featured_image'), async (req, res) => {
  try {
    const { title, content, excerpt, status = 'draft', tags = [] } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    console.log('Creating new post:', { title, slug, status });
    
    const featured_image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const result = await db.run(
      'INSERT INTO posts (title, slug, content, excerpt, featured_image, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, content, excerpt, featured_image, status]
    );
    
    if (tags.length > 0) {
      for (const tagName of tags) {
        // Insert or get tag
        let tag = await db.get('SELECT id FROM tags WHERE name = ?', [tagName]);
        if (!tag) {
          const tagResult = await db.run('INSERT INTO tags (name) VALUES (?)', [tagName]);
          tag = { id: tagResult.lastID };
        }
        
        // Create post-tag relationship
        await db.run(
          'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
          [result.lastID, tag.id]
        );
      }
    }
    
    console.log('Post created successfully:', result.lastID);
    res.status(201).json({ id: result.lastID, slug });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

// Update post
app.put('/api/posts/:id', upload.single('featured_image'), async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received request body:', req.body);
    
    // Extract fields from form data
    const title = req.body.title;
    const content = req.body.content;
    const excerpt = req.body.excerpt;
    const status = req.body.status || 'draft';
    let tags = [];
    
    // Parse tags if they exist
    if (req.body.tags) {
      try {
        if (typeof req.body.tags === 'string') {
          tags = JSON.parse(req.body.tags);
          console.log('Parsed tags from JSON:', tags);
        } else if (Array.isArray(req.body.tags)) {
          tags = req.body.tags;
          console.log('Using array tags:', tags);
        }
      } catch (e) {
        console.error('Error parsing tags:', e);
        if (typeof req.body.tags === 'string') {
          tags = req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
          console.log('Parsed tags from comma-separated string:', tags);
        }
      }
    }
    
    console.log('Processing update with:', { title, content, excerpt, status, tags });
    
    // Validate required fields
    if (!title) {
      console.error('Title is missing');
      return res.status(400).json({ error: 'Title is required' });
    }
    
    let updateFields = ['title = ?', 'content = ?', 'excerpt = ?', 'status = ?'];
    let params = [title, content, excerpt, status];
    
    if (req.file) {
      updateFields.push('featured_image = ?');
      params.push(`/uploads/${req.file.filename}`);
    }
    
    params.push(id);
    
    console.log('Executing update query with params:', params);
    
    const result = await db.run(
      `UPDATE posts SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      params
    );
    
    // Update tags
    console.log('Deleting existing tags for post:', id);
    await db.run('DELETE FROM post_tags WHERE post_id = ?', [id]);
    
    for (const tagName of tags) {
      // Skip empty tags
      if (!tagName.trim()) {
        console.log('Skipping empty tag');
        continue;
      }
      
      console.log('Processing tag:', tagName);
      let tag = await db.get('SELECT id FROM tags WHERE name = ?', [tagName]);
      if (!tag) {
        console.log('Creating new tag:', tagName);
        const tagResult = await db.run('INSERT INTO tags (name) VALUES (?)', [tagName]);
        tag = { id: tagResult.lastID };
      }
      
      console.log('Adding tag to post:', tagName, tag.id);
      await db.run(
        'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
        [id, tag.id]
      );
    }
    
    // Get the updated post with tags
    const updatedPost = await db.get(`
      SELECT p.*, GROUP_CONCAT(t.name) as tags
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [id]);
    
    console.log('Post updated successfully:', updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post', details: error.message });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting post:', id);
    
    // Delete post tags first
    await db.run('DELETE FROM post_tags WHERE post_id = ?', [id]);
    
    // Then delete the post
    const result = await db.run('DELETE FROM posts WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    console.log('Post deleted successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: 'File upload error', details: err.message });
  }
  
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('CORS is enabled for http://localhost:3000');
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Error starting server:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
