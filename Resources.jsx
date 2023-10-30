import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getResources from '@wasp/queries/getResources';
import createResource from '@wasp/actions/createResource';
import deleteResource from '@wasp/actions/deleteResource';

export function Resources() {
  const { data: resources, isLoading, error } = useQuery(getResources);
  const createResourceFn = useAction(createResource);
  const deleteResourceFn = useAction(deleteResource);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateResource = () => {
    createResourceFn({
      title: '',
      content: ''
    });
  };

  const handleDeleteResource = (resourceId) => {
    deleteResourceFn({
      id: resourceId
    });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <button
          onClick={handleCreateResource}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Create Resource
        </button>
      </div>
      <div>
        {resources.map((resource) => (
          <div
            key={resource.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <p>{resource.title}</p>
            <button
              onClick={() => handleDeleteResource(resource.id)}
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
