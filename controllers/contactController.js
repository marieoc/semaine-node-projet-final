import fs from "fs";
import { parse } from "csv-parse/sync";

let dataFile = "./data/contacts.csv";

const contactController = {
  index: async (req, res) => {
    // Retrieve params
    const { id } = req.params;

    // Get all data and parse them
    let data = await fs.promises.readFile(dataFile, "utf8");
    const parsedData = parse(data, { delimiter: "," });

    // Find contact by id
    let contact = parsedData.find((el) => el[0] == id);

    // Format found contact
    contact = {
      id: contact[0],
      civility: contact[1],
      lastName: contact[2],
      firstName: contact[3],
      phone: contact[4],
      email: contact[5],
    };

    res.render("contact", { contact });
  },
};

export default contactController;
