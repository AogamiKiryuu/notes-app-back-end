const Hapi = require('@hapi/hapi');

const init = async () => {
  // Konfigurasi server
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan semua origin untuk mengakses server
      },
    },
  });

  // Route dan handler
  server.route({
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler, // Pastikan addNoteHandler sudah terdefinisi
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// Pastikan addNoteHandler sudah terdefinisi di tempat yang sesuai
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: { noteId: id },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

init();
