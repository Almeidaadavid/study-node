import { randomUUID} from 'node:crypto';
import { sql } from './db.js'

export class DatabasePostgres {
    #videos = new Map();

    async list(search = '') {
        if (search) {
            const pattern = `%${search}%`;
            const videos = await sql`select * from videos where title ilike ${pattern};`
            // const videos = await sql`select * from videos where title ilike ${'%' + search + '%'};`
            return videos;
        }

        return await sql`select * from videos;`
    }

    // SET E MAP
    // SET (É como se fosse um Array que não aceita repetição)
    // MAP (É como se fosse um objeto que aceita chaves e valores)

    async create(video) {
        const videoId = randomUUID();

        const {title, duration, description} = video;

        await sql`insert into videos (id, title, description, duration) values (${videoId}, ${title}, ${description}, ${duration});`


    }

    async update(id, video) {
        const {title, description, duration} = video;

        await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id};`
    }

    async delete(id) {
        await sql`DELETE from videos WHERE id = ${id};`
    }
}