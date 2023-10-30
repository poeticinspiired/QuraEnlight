import HttpError from '@wasp/core/HttpError.js';

export const getResources = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Resource.findMany({
    where: {
      user: { id: context.user.id }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getNotes = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Note.findMany({
    where: {
      user: { id: context.user.id }
    },
    orderBy: { createdAt: 'desc' }
  });
};
Frequently asked questions
