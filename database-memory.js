import { randomUUID } from "crypto"


export class DatabaseMemory{
    #jogos = new Map()

list(search){
    return Array.from(this.#jogos.entries()).map((jogoArray) => {
        const id = jogoArray[0]

        const data = jogoArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(jogo => {
        if (search){
        return jogo.titulo.includes(search)
        }
        return true
    })
}

    create(jogo){
        const jogoId = randomUUID()
        this.#jogos.set(jogoId, jogo)
    }
    
    update(id, jogo){
        this.#jogos.set(id, jogo)
    }

    delete(id, jogo){
        this.#jogos.delete(id, jogo)
    }
}