import fs from "fs";
import { parse } from "csv-parse/sync";


export default async function retrieveContacts(file) {
    const data = await fs.promises.readFile(file, 'utf8'); // wait until whole file is read
    const parsedData = parse(data, { delimiter: ',' }) // retrieve parsed data from synchronous module

    return parsedData;
}


