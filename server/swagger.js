const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio Website API',
      version: '1.0.0',
      description: 'API documentation for the Portfolio Website',
      contact: {
        name: 'Amit Jha',
        email: 'amit@amitjha.in'
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server',
      },
    ],
    paths: {
      '/api/posts': {
        get: {
          summary: 'Get all blog posts',
          tags: ['Posts'],
          parameters: [
            {
              in: 'query',
              name: 'page',
              schema: { type: 'integer' },
              description: 'Page number'
            },
            {
              in: 'query',
              name: 'limit',
              schema: { type: 'integer' },
              description: 'Items per page'
            },
            {
              in: 'query',
              name: 'status',
              schema: { 
                type: 'string',
                enum: ['draft', 'published']
              },
              description: 'Filter by status'
            },
            {
              in: 'query',
              name: 'category',
              schema: { type: 'integer' },
              description: 'Filter by category ID'
            },
            {
              in: 'query',
              name: 'tag',
              schema: { type: 'string' },
              description: 'Filter by tag name'
            }
          ],
          responses: {
            '200': {
              description: 'List of blog posts',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { '$ref': '#/components/schemas/BlogPost' }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create a new blog post',
          tags: ['Posts'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    excerpt: { type: 'string' },
                    featured_image: { 
                      type: 'string',
                      format: 'binary'
                    },
                    status: { 
                      type: 'string',
                      enum: ['draft', 'published']
                    },
                    tags: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    category_ids: {
                      type: 'array',
                      items: { type: 'integer' }
                    }
                  },
                  required: ['title', 'content', 'excerpt']
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Blog post created',
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/BlogPost' }
                }
              }
            }
          }
        }
      },
      '/api/posts/slug/{slug}': {
        get: {
          summary: 'Get a blog post by slug',
          tags: ['Posts'],
          parameters: [
            {
              in: 'path',
              name: 'slug',
              required: true,
              schema: { type: 'string' },
              description: 'Post slug'
            }
          ],
          responses: {
            '200': {
              description: 'Blog post details',
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/BlogPost' }
                }
              }
            },
            '404': {
              description: 'Post not found',
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/Error' }
                }
              }
            }
          }
        }
      },
      '/api/posts/{id}': {
        get: {
          summary: 'Get a blog post by ID',
          tags: ['Posts'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'Post ID'
            }
          ],
          responses: {
            '200': {
              description: 'Blog post details',
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/BlogPost' }
                }
              }
            },
            '404': {
              description: 'Post not found',
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/Error' }
                }
              }
            }
          }
        },
        put: {
          summary: 'Update a blog post',
          tags: ['Posts'],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'Post ID'
            }
          ],
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    excerpt: { type: 'string' },
                    featured_image: { 
                      type: 'string',
                      format: 'binary'
                    },
                    status: { 
                      type: 'string',
                      enum: ['draft', 'published']
                    },
                    tags: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    category_ids: {
                      type: 'array',
                      items: { type: 'integer' }
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Blog post updated',
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/BlogPost' }
                }
              }
            }
          }
        },
        delete: {
          summary: 'Delete a blog post',
          tags: ['Posts'],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'Post ID'
            }
          ],
          responses: {
            '204': {
              description: 'Blog post deleted'
            }
          }
        }
      }
    },
    components: {
      schemas: {
        BlogPost: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            slug: { type: 'string' },
            content: { type: 'string' },
            excerpt: { type: 'string' },
            featured_image: { type: 'string', nullable: true },
            status: { type: 'string', enum: ['draft', 'published'] },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
            tags: { 
              type: 'array',
              items: { type: 'string' }
            },
            categories: {
              type: 'array',
              items: { 
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' }
                }
              }
            }
          },
          required: ['title', 'content', 'excerpt']
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string', nullable: true },
            parent_id: { type: 'integer', nullable: true },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          },
          required: ['name']
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./server/index.js'], // Path to the API routes
};

module.exports = swaggerJSDoc(options);
