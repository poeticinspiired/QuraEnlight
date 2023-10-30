import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getResources from '@wasp/queries/getResources';
import getNotes from '@wasp/queries/getNotes';
import deleteResource from '@wasp/actions/deleteResource';
import deleteNote from '@wasp/actions/deleteNote';

export function HomePage() {
  const { data: resources, isLoading: resourcesLoading, error: resourcesError } = useQuery(getResources);
  const { data: notes, isLoading: notesLoading, error: notesError } = useQuery(getNotes);
  const deleteResourceFn = useAction(deleteResource);
  const deleteNoteFn = useAction(deleteNote);

  if (resourcesLoading || notesLoading) return 'Loading...';
  if (resourcesError || notesError) return 'Error: ' + (resourcesError || notesError);

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Welcome to QuraEnlight</h1>
      <p className='mb-4'>Discover the beauty of the Quran and enhance your spiritual journey with QuraEnlight.</p>
      <div className='flex flex-col gap-4'>
        <Link to='/resources' className='p-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md'>Explore Quran Resources</Link>
        <Link to='/notes' className='p-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md'>Take Quran Notes</Link>
      </div>
      <div>
        {resources.map((resource) => (
          <div
            key={resource.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{resource.title}</div>
            <button
              onClick={() => deleteResourceFn({ resourceId: resource.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        {notes.map((note) => (
          <div
            key={note.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{note.title}</div>
            <button
              onClick={() => deleteNoteFn({ noteId: note.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
Frequently asked questions
