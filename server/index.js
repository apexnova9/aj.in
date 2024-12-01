const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3002; // Fixed port for SQLite server

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.all('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get post by slug - this must come before the :id route
app.get('/api/posts/slug/:slug', async (req, res) => {
  try {
    console.log('Received request for slug:', req.params.slug);
    const { slug } = req.params;
    const post = await db.get('SELECT * FROM posts WHERE slug = ?', [slug]);
    console.log('Found post:', post);
    
    if (!post) {
      console.log('Post not found for slug:', slug);
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts', upload.single('featured_image'), async (req, res) => {
  try {
    const { title, content, excerpt, status = 'draft' } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const result = await db.run(
      `INSERT INTO posts (title, slug, content, excerpt, featured_image, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [title, slug, content, excerpt, req.file?.filename, status]
    );
    
    const post = await db.get('SELECT * FROM posts WHERE id = ?', [result.lastID]);
    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/posts/:id', upload.single('featured_image'), async (req, res) => {
  try {
    const { title, content, excerpt, status } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const result = await db.run(
      `UPDATE posts 
       SET title = ?, slug = ?, content = ?, excerpt = ?, status = ?, 
           featured_image = COALESCE(?, featured_image), updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title, slug, content, excerpt, status, req.file?.filename, req.params.id]
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = await db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM posts WHERE id = ?', [req.params.id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Error handling for server startup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Error starting server:', error);
    process.exit(1);
  }
});
