import fs from "fs";
import { parse } from "csv-parse/sync";


let dataFile = "./data/contacts.csv";

const homeController = {
    index: async (req, res) => {
        try {
            let contacts = [];
    
            const data = await fs.promises.readFile(dataFile, 'utf8'); // wait until whole file is read
            const parsedData = parse(data, { delimiter: ',' }) // retrieve parsed data from synchronous module
    
            for (let contactData of parsedData) {
                contacts.push({
                    id: contactData[0],
                    civility: contactData[1],
                    lastName: contactData[2],
                    firstName: contactData[3],
                    phone: contactData[4],
                    email: contactData[5],
                })
            }
            res.render('index', { contacts })
        }

        catch (err) {
            console.log(err);
        }
    }
}

export default homeController;