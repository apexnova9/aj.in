import React, { useState } from 'react';
import { BlogPostInput } from '../../types/blog';
import { X, Bold, Italic, Underline as UnderlineIcon, List, Code, Link as LinkIcon, Heading1, Heading2, Heading3, Image as ImageIcon } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';

interface BlogPostFormProps {
  initialData?: BlogPostInput;
  onSubmit: (data: BlogPostInput) => void;
  onCancel: () => void;
}

function EditorToolbar({ editor }: { editor: any }) {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: 'Blog post image' }).run();
    }
  };

  return (
    <div className="border-b border-slate-300 dark:border-slate-600 p-2 flex flex-wrap gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('underline') ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('codeBlock') ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${
          editor.isActive('link') ? 'bg-slate-200 dark:bg-slate-700' : ''
        }`}
        title="Insert Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={addImage}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700`}
        title="Insert Image"
      >
        <ImageIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

export function BlogPostForm({ initialData, onSubmit, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostInput>(
    initialData || {
      title: '',
      content: '',
      excerpt: '',
      tags: [],
      status: 'draft',
    }
  );
  const [tagInput, setTagInput] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 dark:text-blue-400 hover:underline cursor-pointer'
        }
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-lg my-4',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your blog post content here...'
      })
    ],
    content: formData.content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none min-h-[200px] max-w-none'
      }
    },
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-[#034694] focus:outline-none focus:ring-1 focus:ring-[#034694] dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={2}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-[#034694] focus:outline-none focus:ring-1 focus:ring-[#034694] dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Content
        </label>
        <div className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white overflow-hidden">
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} className="p-4" />
        </div>
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Cover Image URL
        </label>
        <input
          type="url"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-[#034694] focus:outline-none focus:ring-1 focus:ring-[#034694] dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Tags
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagAdd}
            placeholder="Press Enter to add tags"
            className="block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-[#034694] focus:outline-none focus:ring-1 focus:ring-[#034694] dark:text-white"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#022A5E]/10 px-2.5 py-0.5 text-sm font-medium text-[#034694] dark:bg-[#034694]/20 dark:text-[#034694]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-1 inline-flex items-center rounded-full p-0.5 hover:bg-[#022A5E]/20 dark:hover:bg-[#034694]/30"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:border-[#034694] focus:outline-none focus:ring-1 focus:ring-[#034694] dark:text-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#022A5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#022A5E]/90 focus:outline-none focus:ring-2 focus:ring-[#034694] focus:ring-offset-2"
        >
          Save Post
        </button>
      </div>
    </form>
  );
}
