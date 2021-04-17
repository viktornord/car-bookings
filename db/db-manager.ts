import storage from './storage.json';

export class DbManager {
    constructor() {
        this.storage = JSON.parse(JSON.stringify(storage) )
    }
}