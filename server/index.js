const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

// Category Management Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.all(`
      SELECT c.*,
             p.name as parent_name,
             (SELECT COUNT(*) FROM post_categories WHERE category_id = c.id) as post_count
      FROM categories c
      LEFT JOIN categories p ON c.parent_id = p.id
      ORDER BY c.parent_id NULLS FIRST, c.name
    `);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, description, parent_id } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if slug already exists
    const existing = await db.get('SELECT id FROM categories WHERE slug = ?', [slug]);
    if (existing) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    // If parent_id is provided, verify it exists
    if (parent_id) {
      const parentExists = await db.get('SELECT id FROM categories WHERE id = ?', [parent_id]);
      if (!parentExists) {
        return res.status(400).json({ error: 'Parent category not found' });
      }
    }

    const result = await db.run(`
      INSERT INTO categories (name, slug, description, parent_id)
      VALUES (?, ?, ?, ?)
    `, [name, slug, description, parent_id]);

    const newCategory = await db.get('SELECT * FROM categories WHERE id = ?', [result.lastID]);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parent_id } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if new slug would conflict with existing categories (excluding current category)
    const existing = await db.get('SELECT id FROM categories WHERE slug = ? AND id != ?', [slug, id]);
    if (existing) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    // Prevent setting parent to self or to own child
    if (parent_id) {
      if (parseInt(parent_id) === parseInt(id)) {
        return res.status(400).json({ error: 'Category cannot be its own parent' });
      }
      
      // Check if proposed parent is actually a child of this category
      const children = await db.all(`
        WITH RECURSIVE child_categories AS (
          SELECT id FROM categories WHERE parent_id = ?
          UNION ALL
          SELECT c.id FROM categories c
          INNER JOIN child_categories cc ON c.parent_id = cc.id
        )
        SELECT id FROM child_categories
      `, [id]);
      
      if (children.some(child => child.id === parseInt(parent_id))) {
        return res.status(400).json({ error: 'Cannot set a child category as parent' });
      }
    }

    await db.run(`
      UPDATE categories 
      SET name = ?, slug = ?, description = ?, parent_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name, slug, description, parent_id, id]);

    const updatedCategory = await db.get('SELECT * FROM categories WHERE id = ?', [id]);
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has children
    const hasChildren = await db.get('SELECT 1 FROM categories WHERE parent_id = ?', [id]);
    if (hasChildren) {
      return res.status(400).json({ error: 'Cannot delete category with subcategories' });
    }

    await db.run('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// API Routes
app.get('/api/posts', async (req, res) => {
  try {
    console.log('Fetching all posts...');
    const posts = await db.all(`
      SELECT 
        p.*,
        GROUP_CONCAT(DISTINCT t.name) as tags,
        COALESCE(
          '[' || GROUP_CONCAT(
            DISTINCT json_object(
              'id', c.id,
              'name', c.name,
              'slug', c.slug,
              'description', c.description,
              'parent_id', c.parent_id,
              'parent_name', pc.name
            )
          ) || ']',
          '[]'
        ) as categories
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN post_categories pc_link ON p.id = pc_link.post_id
      LEFT JOIN categories c ON pc_link.category_id = c.id
      LEFT JOIN categories pc ON c.parent_id = pc.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);
    
    // Process each post's tags and categories
    const processedPosts = posts.map(post => {
      try {
        // Handle tags
        post.tags = post.tags ? post.tags.split(',').filter(Boolean) : [];
        
        // Handle categories
        try {
          post.categories = JSON.parse(post.categories);
        } catch (e) {
          console.error('Error parsing categories for post:', post.id, e);
          post.categories = [];
        }
        
        return post;
      } catch (e) {
        console.error('Error processing post:', post.id, e);
        return {
          ...post,
          tags: [],
          categories: []
        };
      }
    });

    res.json(processedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch posts', 
      details: error.message 
    });
  }
});

// Get post by slug
app.get('/api/posts/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log('Fetching post by slug:', slug);
    
    const post = await db.get(`
      SELECT 
        p.*,
        GROUP_CONCAT(DISTINCT t.name) as tags,
        '[' || GROUP_CONCAT(
          json_object(
            'id', c.id,
            'name', c.name,
            'slug', c.slug,
            'description', c.description,
            'parent_id', c.parent_id,
            'parent_name', pc.name
          )
        ) || ']' as categories
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN post_categories pc_rel ON p.id = pc_rel.post_id
      LEFT JOIN categories c ON pc_rel.category_id = c.id
      LEFT JOIN categories pc ON c.parent_id = pc.id
      WHERE p.slug = ?
      GROUP BY p.id
    `, [slug]);
    
    if (!post) {
      console.log('Post not found:', slug);
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Parse tags and categories
    post.tags = post.tags ? post.tags.split(',') : [];
    try {
      post.categories = post.categories 
        ? JSON.parse(post.categories)
        : [];
    } catch (e) {
      console.error('Error processing categories for post:', post.id, e);
      post.categories = [];
    }
    
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
    const { title, content, excerpt, status = 'draft' } = req.body;
    let tags = [], category_ids = [];
    
    // Parse tags and categories from the form data
    try {
      tags = req.body.tags ? JSON.parse(req.body.tags) : [];
      category_ids = req.body.category_ids ? JSON.parse(req.body.category_ids) : [];
      console.log('Parsed tags:', tags, 'categories:', category_ids);
    } catch (e) {
      console.error('Error parsing tags or categories:', e);
      tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim()).filter(t => t) : [];
      category_ids = [];
    }
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const featured_image = req.file ? `/uploads/${req.file.filename}` : null;
    
    const result = await db.run(
      'INSERT INTO posts (title, slug, content, excerpt, featured_image, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, content, excerpt, featured_image, status]
    );
    
    // Handle tags
    if (tags.length > 0) {
      for (const tagName of tags) {
        let tag = await db.get('SELECT id FROM tags WHERE name = ?', [tagName]);
        if (!tag) {
          const tagResult = await db.run('INSERT INTO tags (name) VALUES (?)', [tagName]);
          tag = { id: tagResult.lastID };
        }
        await db.run(
          'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
          [result.lastID, tag.id]
        );
      }
    }
    
    // Handle categories
    if (category_ids.length > 0) {
      for (const categoryId of category_ids) {
        await db.run(
          'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
          [result.lastID, categoryId]
        );
      }
    }
    
    // Fetch the created post with tags and categories
    const createdPost = await db.get(`
      SELECT 
        p.*,
        GROUP_CONCAT(DISTINCT t.name) as tags,
        GROUP_CONCAT(DISTINCT json_object(
          'id', c.id,
          'name', c.name,
          'slug', c.slug,
          'description', c.description,
          'parent_id', c.parent_id,
          'parent_name', pc.name
        )) as categories
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN post_categories pc_rel ON p.id = pc_rel.post_id
      LEFT JOIN categories c ON pc_rel.category_id = c.id
      LEFT JOIN categories pc ON c.parent_id = pc.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [result.lastID]);
    
    createdPost.tags = createdPost.tags ? createdPost.tags.split(',') : [];
    createdPost.categories = createdPost.categories 
      ? createdPost.categories.split(',').map(c => JSON.parse(c)).filter(c => c.id)
      : [];
    
    console.log('Post created successfully:', createdPost);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

// Update post
app.put('/api/posts/:id', upload.single('featured_image'), async (req, res) => {
  try {
    await db.run('BEGIN TRANSACTION');
    
    const { id } = req.params;
    let { title, content, excerpt, status = 'draft', tags = '[]', category_ids = '[]' } = req.body;
    let featured_image = null;

    // Parse tags and category_ids from JSON strings
    try {
      tags = JSON.parse(tags);
      category_ids = JSON.parse(category_ids);
    } catch (e) {
      console.error('Error parsing tags or category_ids:', e);
      tags = [];
      category_ids = [];
    }

    if (req.file) {
      featured_image = req.file.filename;
    }

    // Update post
    await db.run(`
      UPDATE posts 
      SET title = ?, content = ?, excerpt = ?, status = ?, 
          featured_image = COALESCE(?, featured_image),
          updated_at = DATETIME('now')
      WHERE id = ?
    `, [title, content, excerpt, status, featured_image, id]);

    // Delete existing tags and categories
    await db.run('DELETE FROM post_tags WHERE post_id = ?', [id]);
    await db.run('DELETE FROM post_categories WHERE post_id = ?', [id]);

    // Insert new tags
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tag of tags) {
        if (!tag || typeof tag !== 'string') continue;
        const trimmedTag = tag.trim();
        if (!trimmedTag) continue;

        // Get or create tag
        let tagResult = await db.get('SELECT id FROM tags WHERE name = ?', [trimmedTag]);
        let tagId;
        
        if (!tagResult) {
          const result = await db.run('INSERT INTO tags (name) VALUES (?)', [trimmedTag]);
          tagId = result.lastID;
        } else {
          tagId = tagResult.id;
        }

        // Insert tag-post relation
        await db.run(
          'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
          [id, tagId]
        );
      }
    }

    // Insert new categories
    if (Array.isArray(category_ids) && category_ids.length > 0) {
      for (const categoryId of category_ids) {
        if (!categoryId) continue;
        
        // Check if category exists
        const category = await db.get('SELECT 1 FROM categories WHERE id = ?', [categoryId]);
        if (category) {
          await db.run(
            'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
            [id, categoryId]
          );
        }
      }
    }

    await db.run('COMMIT');

    // Fetch updated post
    const post = await db.get(`
      SELECT 
        p.*,
        GROUP_CONCAT(DISTINCT t.name) as tags,
        COALESCE(
          '[' || GROUP_CONCAT(
            DISTINCT json_object(
              'id', c.id,
              'name', c.name,
              'slug', c.slug,
              'description', c.description,
              'parent_id', c.parent_id,
              'parent_name', pc.name
            )
          ) || ']',
          '[]'
        ) as categories
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN post_categories pc_link ON p.id = pc_link.post_id
      LEFT JOIN categories c ON pc_link.category_id = c.id
      LEFT JOIN categories pc ON c.parent_id = pc.id
      WHERE p.id = ?
      GROUP BY p.id
    `, [id]);

    if (!post) {
      throw new Error('Post not found after update');
    }

    // Parse tags and categories
    post.tags = post.tags ? post.tags.split(',').filter(Boolean) : [];
    try {
      post.categories = JSON.parse(post.categories);
    } catch (e) {
      console.error('Error parsing categories for post:', post.id, e);
      post.categories = [];
    }

    res.json(post);
  } catch (error) {
    await db.run('ROLLBACK');
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

// Serve static frontend files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle frontend routes (should be after all API routes)
app.get('*', (req, res) => {
  // Don't handle API routes here
  if (req.url.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
