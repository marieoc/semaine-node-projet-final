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
                    gender: contactData[0],
                    lastName: contactData[1],
                    firstName: contactData[2],
                    phone: contactData[3],
                    email: contactData[4],
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