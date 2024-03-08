import retrieveContacts from "../utils/retrieveContacts.js";

let dataFile = "./data/contacts.csv";

const homeController = {
    index: async (req, res) => {
        try {
            let contacts = [];
    
            // Retrieve contacts parsed data
            const parsedData = await retrieveContacts(dataFile);
    
            for (let contactData of parsedData) {
                contacts.push({
                    id: contactData[0],
                    civility: contactData[1],
                    lastName: contactData[2],
                    firstName: contactData[3],
                    phone: contactData[4],
                    email: contactData[5],
                    birthdate: contactData[6],
                    image: contactData[7],
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