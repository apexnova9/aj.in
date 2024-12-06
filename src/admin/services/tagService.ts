import axios from 'axios';
import { Tag } from '../types/blog';
import { API_ENDPOINTS } from '../config/api';

export const tagService = {
  async getTags(): Promise<Tag[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.TAGS.LIST}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getTags:', error);
      throw error;
    }
  },

  async getTag(id: number): Promise<Tag> {
    try {
      const response = await fetch(`${API_ENDPOINTS.TAGS.GET(id)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tag');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getTag:', error);
      throw error;
    }
  },

  async createTag(data: Omit<Tag, 'id'>): Promise<Tag> {
    try {
      const response = await fetch(`${API_ENDPOINTS.TAGS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create tag');
      }

      return response.json();
    } catch (error) {
      console.error('Error in createTag:', error);
      throw error;
    }
  },

  async updateTag(id: number, data: Partial<Tag>): Promise<Tag> {
    try {
      const response = await fetch(`${API_ENDPOINTS.TAGS.UPDATE(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update tag');
      }

      return response.json();
    } catch (error) {
      console.error('Error in updateTag:', error);
      throw error;
    }
  },

  async deleteTag(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_ENDPOINTS.TAGS.DELETE(id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tag');
      }
    } catch (error) {
      console.error('Error in deleteTag:', error);
      throw error;
    }
  }
};
