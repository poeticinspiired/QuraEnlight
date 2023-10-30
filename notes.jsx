import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getNotes from '@wasp/queries/getNotes';
import createNote from '@wasp/actions/createNote';
import deleteNote from '@wasp/actions/deleteNote';

export function Notes() {
  const { data: notes, isLoading, error } = useQuery(getNotes);
  const createNoteFn = useAction(createNote);
  const deleteNoteFn = useAction(deleteNote);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateNote = () => {
    createNoteFn({
      title: '',
      content: ''
    });
  };

  const handleDeleteNote = (noteId) => {
    deleteNoteFn({ id: noteId });
  };

  return (
    <div className='p-4'>
      <button
        onClick={handleCreateNote}
        className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
      >
        Create Note
      </button>

      {notes.map((note) => (
        <div
          key={note.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{note.title}</div>
          <div>{note.content}</div>
          <div>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
Frequently asked questions
