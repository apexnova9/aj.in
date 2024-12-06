import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { BlogPostInput, Category } from '../../types/blog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { categoryService } from '../../services/categoryService';
import { getImageUrl } from '../../utils/imageUtils';

// Quill syntax module - only register if not already registered
const Quill = ReactQuill.Quill;
if (!Quill.imports['modules/syntax']) {
  const Syntax = Quill.import('modules/syntax');
  Quill.register('modules/syntax', Syntax);
}

// Configure highlight.js
hljs.configure({
  languages: ['javascript', 'typescript', 'python', 'bash', 'json', 'html', 'css']
});

interface BlogPostFormProps {
  initialData?: BlogPostInput;
  onSubmit: (data: BlogPostInput) => void;
  onCancel: () => void;
}

function CustomEditor({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  const quillRef = useRef<ReactQuill>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = useMemo(() => ({
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script', 'super', 'sub',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image',
    'blockquote', 'code-block'
  ];

  if (!mounted) {
    return <div className="min-h-[300px] bg-white dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-600" />;
  }

  return (
    <div className="editor-container">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="bg-white dark:bg-slate-800 rounded-md border border-slate-300 
          dark:border-slate-600 [&_.ql-toolbar]:border-slate-300 dark:[&_.ql-toolbar]:border-slate-600 
          [&_.ql-toolbar]:bg-slate-50 dark:[&_.ql-toolbar]:bg-slate-700
          [&_.ql-container]:border-slate-300 dark:[&_.ql-container]:border-slate-600
          [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-slate-900 dark:[&_.ql-editor]:text-white
          [&_.ql-picker]:text-slate-900 dark:[&_.ql-picker]:text-white
          [&_.ql-stroke]:stroke-slate-700 dark:[&_.ql-stroke]:stroke-slate-300
          [&_.ql-fill]:fill-slate-700 dark:[&_.ql-fill]:fill-slate-300"
      />
    </div>
  );
}

export function BlogPostForm({ initialData, onSubmit, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostInput>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    tags: initialData?.tags || [],
    featured_image: initialData?.featured_image || null,
    status: initialData?.status || 'draft',
    category_ids: initialData?.category_ids || []
  });
  const [tagInput, setTagInput] = useState('');
  const [showHtml, setShowHtml] = useState(false);
  const [htmlContent, setHtmlContent] = useState(initialData?.content || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch categories and build tree
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        const treeCategories = categoryService.buildCategoryTree(fetchedCategories);
        setCategories(treeCategories);

        // If we have initialData with category_ids, ensure they are numbers
        if (initialData?.category_ids) {
          const numericCategoryIds = initialData.category_ids.map(id => 
            typeof id === 'string' ? parseInt(id, 10) : id
          );
          setFormData(prev => ({
            ...prev,
            category_ids: numericCategoryIds
          }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [initialData]);

  // Effect to handle initial category_ids
  useEffect(() => {
    if (initialData?.category_ids) {
      const numericCategoryIds = initialData.category_ids.map(id => 
        typeof id === 'string' ? parseInt(id, 10) : id
      );
      setFormData(prev => ({
        ...prev,
        category_ids: numericCategoryIds
      }));
    }
  }, [initialData?.category_ids]);

  // Render category options recursively
  const renderCategoryOptions = (categories: Category[], level = 0) => {
    return categories.map(category => {
      const prefix = '\u00A0'.repeat(level * 4) + (level > 0 ? '└─ ' : '');
      return (
        <React.Fragment key={category.id}>
          <option value={category.id}>{prefix + category.name}</option>
          {category.children?.length > 0 && 
            renderCategoryOptions(category.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
    if (!showHtml) {
      setHtmlContent(content);
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
      const newTags = tags.filter(tag => !formData.tags.includes(tag));
      
      if (newTags.length > 0) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, ...newTags]
        }));
      }
      setTagInput('');
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    
    // If the input ends with a comma, process the tags
    if (value.endsWith(',')) {
      const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      const newTags = tags.filter(tag => !formData.tags.includes(tag));
      
      if (newTags.length > 0) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, ...newTags]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure category_ids are properly formatted as numbers
    const formattedData = {
      ...formData,
      category_ids: formData.category_ids.map(id => 
        typeof id === 'string' ? parseInt(id, 10) : id
      )
    };
    onSubmit(formattedData);
  };

  const toggleHtmlView = () => {
    if (showHtml) {
      handleEditorChange(htmlContent);
    }
    setShowHtml(!showHtml);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        featured_image: file
      }));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFormData(prev => ({
      ...prev,
      featured_image: null
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <style>{`
        .ql-editor {
          font-size: 1.125rem;
          line-height: 1.75;
          padding: 1.5rem;
        }
        .ql-editor h1 {
          font-size: 2.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .ql-editor h2 {
          font-size: 2rem;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
        }
        .ql-editor h3 {
          font-size: 1.75rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ql-editor p {
          margin-bottom: 1.25rem;
        }
        .ql-editor pre.ql-syntax {
          background-color: #1a1a1a;
          color: #e6e6e6;
          overflow: visible;
          padding: 1rem;
          border-radius: 0.375rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #4b5563;
        }
        .ql-editor ul, .ql-editor ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .ql-editor li {
          margin-bottom: 0.5rem;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
        }
        .dark .ql-editor {
          color: #e5e7eb;
        }
        .dark .ql-editor blockquote {
          border-left-color: #4b5563;
          color: #9ca3af;
        }
        .dark .ql-editor pre.ql-syntax {
          background-color: #111827;
        }
      `}</style>

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
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
          required
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
          rows={3}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Content
          </label>
          <button
            type="button"
            onClick={toggleHtmlView}
            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded
              bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {showHtml ? 'Rich Text' : 'HTML'}
          </button>
        </div>
        
        {showHtml ? (
          <textarea
            value={htmlContent}
            onChange={(e) => {
              setHtmlContent(e.target.value);
              handleEditorChange(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 
              bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 
              font-mono text-sm h-[400px]"
          />
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <CustomEditor
              value={formData.content}
              onChange={handleEditorChange}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          placeholder="Add tags (press Enter or comma to add)"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            dark:bg-slate-800 dark:border-slate-600 dark:text-white 
            dark:placeholder-slate-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category_ids" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Categories
        </label>
        <select
          multiple
          id="category_ids"
          name="category_ids"
          value={formData.category_ids.map(id => id.toString())}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
            console.log('Selected categories:', selectedOptions);
            setFormData(prev => ({
              ...prev,
              category_ids: selectedOptions
            }));
          }}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 
            bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 
            focus:border-blue-500 focus:ring-blue-500 focus:outline-none min-h-[240px]"
          size={10}
        >
          {isLoadingCategories ? (
            <option disabled>Loading categories...</option>
          ) : categories.length === 0 ? (
            <option disabled>No categories available</option>
          ) : (
            renderCategoryOptions(categories)
          )}
        </select>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple categories
        </p>
        {formData.category_ids.length > 0 && (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Selected categories: {formData.category_ids.length}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Featured Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full text-sm text-slate-700 dark:text-slate-300"
        />
        {previewUrl && (
          <div className="mt-2 relative w-48 h-32 rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Featured image preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
        {!previewUrl && initialData?.featured_image && (
          <div className="mt-2 relative w-48 h-32 rounded-lg overflow-hidden">
            <img
              src={getImageUrl(initialData.featured_image)}
              alt="Current featured image"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
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
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium rounded-md
            bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300
            border border-slate-300 dark:border-slate-600
            hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-md
            bg-blue-600 text-white
            hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
