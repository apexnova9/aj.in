# Portfolio Website API

This is the backend API service for the Portfolio Website. It provides endpoints for managing blog posts, categories, and media files.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- SQLite3

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node index.js
   ```

The server will start on port 3002 by default.

## API Documentation

The API documentation is available through Swagger UI at: `http://localhost:3002/api-docs`

### Available Endpoints

#### Blog Posts

##### Retrieve Posts
- `GET /api/posts` - Get all blog posts
  - Query parameters:
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10)
    - `status` (optional): Filter by status ('draft' or 'published')
    - `category` (optional): Filter by category ID
    - `tag` (optional): Filter by tag name
  - Example response:
    ```json
    {
      "posts": [{
        "id": 1,
        "title": "Sample Post",
        "slug": "sample-post",
        "excerpt": "This is a sample post",
        "featured_image": "/media/sample.jpg",
        "status": "published",
        "tags": ["react", "typescript"],
        "categories": [{"id": 1, "name": "Technology", "slug": "technology"}]
      }]
    }
    ```

- `GET /api/posts/slug/:slug` - Get a specific blog post by slug
  - Example: `GET /api/posts/slug/sample-post`
  - Returns full post content and metadata

- `GET /api/posts/:id` - Get a specific blog post by ID
  - Example: `GET /api/posts/1`
  - Returns full post content and metadata

##### Manage Posts
- `POST /api/posts` - Create a new blog post
  - Content-Type: multipart/form-data
  - Fields:
    - `title` (required): Post title
    - `content` (required): Post content (markdown)
    - `excerpt` (required): Post excerpt
    - `featured_image` (optional): Image file
    - `status` (optional): Post status ('draft' or 'published')
    - `tags` (optional): Array of tag names
    - `category_ids` (optional): Array of category IDs
  - Note: Slug is auto-generated from title

- `PUT /api/posts/:id` - Update a blog post by ID
  - Example: `PUT /api/posts/1`
  - Same fields as POST, all optional

- `DELETE /api/posts/:id` - Delete a blog post by ID
  - Example: `DELETE /api/posts/1`

#### Categories

##### Retrieve Categories
- `GET /api/categories` - Get all categories
  - Returns hierarchical structure of categories
  - Example response:
    ```json
    [{
      "id": 1,
      "name": "Technology",
      "slug": "technology",
      "description": "Tech posts",
      "children": [{
        "id": 2,
        "name": "Web Development",
        "slug": "web-development",
        "parent_id": 1
      }]
    }]
    ```

- `GET /api/categories/:slug` - Get a specific category by slug
  - Example: `GET /api/categories/technology`
  - Returns category details and immediate children

##### Manage Categories
- `POST /api/categories` - Create a new category
  - Fields:
    - `name` (required): Category name
    - `description` (optional): Category description
    - `parent_id` (optional): Parent category ID
  - Note: Slug is auto-generated from name

- `PUT /api/categories/:slug` - Update a category by slug
  - Example: `PUT /api/categories/technology`
  - Same fields as POST, all optional

- `DELETE /api/categories/:slug` - Delete a category by slug
  - Example: `DELETE /api/categories/technology`
  - Note: Cannot delete categories with children

#### Media
- `POST /api/media/upload` - Upload a media file
  - Content-Type: multipart/form-data
  - Fields:
    - `file` (required): File to upload
  - Returns: URL path to uploaded file

- `GET /api/media/:filename` - Get a media file
  - Example: `GET /api/media/sample.jpg`

## Authentication

Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Protected Endpoints
- All POST, PUT, DELETE operations
- Media upload

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

Common HTTP status codes:
- 400: Bad Request (invalid input)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 409: Conflict (e.g., duplicate slug)
- 500: Internal Server Error

## Development

### CORS Configuration
The server accepts requests from:
- http://localhost:3000
- http://127.0.0.1:3000
- http://localhost:3002

### Database
SQLite3 database is used for development. The database file is located at `db/database.sqlite`.
