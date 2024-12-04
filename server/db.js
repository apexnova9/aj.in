const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'blog.db');
console.log('Database path:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1); // Exit if we can't connect to the database
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Create tables if they don't exist
db.serialize(() => {
  console.log('Initializing database tables...');
  
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      featured_image TEXT,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, [], (err) => {
    if (err) {
      console.error('Error creating posts table:', err);
    } else {
      console.log('Posts table ready');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `, [], (err) => {
    if (err) {
      console.error('Error creating tags table:', err);
    } else {
      console.log('Tags table ready');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS post_tags (
      post_id INTEGER,
      tag_id INTEGER,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    )
  `, [], (err) => {
    if (err) {
      console.error('Error creating post_tags table:', err);
    } else {
      console.log('Post_tags table ready');
    }
  });

  // Create categories table with hierarchical structure
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      parent_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `, [], (err) => {
    if (err) {
      console.error('Error creating categories table:', err);
    } else {
      console.log('Categories table ready');
    }
  });

  // Create post_categories relationship table
  db.run(`
    CREATE TABLE IF NOT EXISTS post_categories (
      post_id INTEGER,
      category_id INTEGER,
      PRIMARY KEY (post_id, category_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    )
  `, [], (err) => {
    if (err) {
      console.error('Error creating post_categories table:', err);
    } else {
      console.log('Post_categories table ready');
    }
  });
});

// Wrap database methods in promises for easier use
const dbAsync = {
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      console.log('Executing query:', sql, 'with params:', params);
      db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Database error in all():', err);
          reject(err);
        } else {
          console.log(`Query returned ${rows?.length || 0} rows`);
          resolve(rows);
        }
      });
    });
  },

  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      console.log('Executing query:', sql, 'with params:', params);
      db.get(sql, params, (err, row) => {
        if (err) {
          console.error('Database error in get():', err);
          reject(err);
        } else {
          console.log('Query returned row:', row ? 'yes' : 'no');
          resolve(row);
        }
      });
    });
  },

  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      console.log('Executing query:', sql, 'with params:', params);
      db.run(sql, params, function(err) {
        if (err) {
          console.error('Database error in run():', err);
          reject(err);
        } else {
          console.log('Query affected rows:', this.changes);
          resolve(this);
        }
      });
    });
  }
};

// Handle database errors
db.on('error', (err) => {
  console.error('Database error event:', err);
});

process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
  });
});

module.exports = dbAsync;
