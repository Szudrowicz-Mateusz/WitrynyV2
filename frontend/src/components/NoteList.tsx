import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Note } from '../types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNotes = async (query?: string) => {
    try {
      const url = query
        ? `http://localhost:5000/api/notes/search?query=${encodeURIComponent(query)}`
        : 'http://localhost:5000/api/notes';
      const response = await axios.get(url);
      setNotes(response.data);
    } catch (error) {
      console.error('Błąd przy pobieraniu notatek:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNotes(searchQuery);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę notatkę?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`);
        fetchNotes(searchQuery);
      } catch (error) {
        console.error('Błąd przy usuwaniu notatki:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Wyszukaj notatki..."
            className="flex-1 p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Szukaj
          </button>
        </form>
      </div>
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Brak notatek. Stwórz nową!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-yellow-50 p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-yellow-200 flex flex-col note-card"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">{note.title}</h3>
              <div className="text-gray-600 mb-4 flex-1 overflow-hidden note-content">
                <ReactMarkdown
                  components={{
                    div: ({ node, ...props }) => (
                      <div className="prose prose-sm max-w-none text-gray-600" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-600" {...props} />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 className="text-gray-800 font-bold" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-gray-800 font-bold" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-gray-800 font-bold" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5" {...props} />
                    ),
                  }}
                >
                  {note.content}
                </ReactMarkdown>
              </div>
              <div className="flex gap-3 mt-auto">
                <Link
                  to={`/edit/${note._id}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 text-center font-medium"
                >
                  Edytuj
                </Link>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;