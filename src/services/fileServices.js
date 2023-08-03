import { promises as fs } from "fs"

export default class fileService {

    readFiles = async (path) => {
        try {
            const data = await fs.readFile(path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    };

    writeFiles = async (path, data) => {
        try {
            await fs.writeFile(path, JSON.stringify(data, null, 2));
        } catch (error) {

        }
    };


}
