import { randomUUID} from 'node:crypto';

export class DatabaseMemory {
    #videos = new Map();


    list(search) {
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];


            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search) {
                return video.title.includes(search);
            }

            return true;
        });
    }

    // SET E MAP
    // SET (É como se fosse um Array que não aceita repetição)
    // MAP (É como se fosse um objeto que aceita chaves e valores)

    create(video) {
        const videoId = randomUUID();
        this.#videos.set(videoId, video);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }

    // find() {
    //     this.#videos.get();
    // }

}