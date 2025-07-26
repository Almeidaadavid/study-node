// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//     res.write('Oi');

//     return res.end();
// })

// server.listen(3333);

//TODO: Parou na instalação do postgresqlt

import {fastify} from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const db = new DatabaseMemory();
const db = new DatabasePostgres();

// GET, POST, PUT, DELETE, PATCH

server.get('/videos', async (req) => {
    const search = req.query.search;

    const videos = await db.list(search);

    return videos;
});

server.post('/videos', async (req, res) => {
    const body = req.body;
    const {title, description, duration} = body;


    await db.create({
        title,
        description,
        duration,
    })

    console.log(db.list());

    return res.status(201).send();
})

server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id;
    const {title, description, duration} = req.body;
    await db.update(videoId, {
            title,
            description,
            duration
        });
    return res.status(204).send();
});

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id;
    await db.delete(videoId);

    return res.status(204).send();
});

server.listen({
    host: "0.0.0.0",
    port: process.env.PORT ?? 3333,
});

