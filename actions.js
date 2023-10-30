import HttpError from '@wasp/core/HttpError.js'

export const createResource = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { title, content } = args;

  return context.entities.Resource.create({
    data: {
      title,
      content,
      user: {
        connect: { id: context.user.id }
      }
    }
  });
}

export const deleteResource = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const resource = await context.entities.Resource.findUnique({
    where: { id: args.id }
  });
  if (resource.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Resource.delete({
    where: { id: args.id }
  });
}

export const createNote = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Note.create({
    data: {
      title: args.title,
      content: args.content,
      userId: context.user.id
    }
  });
}

export const deleteNote = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const note = await context.entities.Note.findUnique({
    where: { id: args.id }
  });
  if (note.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Note.delete({
    where: { id: args.id }
  });
}
Frequently asked questions
