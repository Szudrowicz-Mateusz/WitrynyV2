import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface NoteFormProps {
  onNoteCreated: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/notes', { title, content });
      setTitle('');
      setContent('');
      onNoteCreated();
    } catch (error) {
      console.error('Błąd przy tworzeniu notatki:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
      <h2 className="text-2xl font-bold mb-4">Nowa notatka</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tytuł</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Treść (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-40"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Zapisz notatkę
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Anuluj
          </a>
        </div>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Podgląd</h3>
        <div className="p-4 border border-gray-200 rounded-md">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;