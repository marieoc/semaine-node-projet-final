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

  create: async (req, res) => {
    res.render("contact-form");
  },

  store: async (req, res) => {
    // Retrieve form input values
    const { civility, firstName, lastName, phone, email } = req.body;

    // Retrieve number of contacts
    const data = await fs.promises.readFile(dataFile, "utf8");
    const contacts = parse(data, { delimiter: "," });
    const id = contacts.length + 1;

    // Formatted new contact array
    const newContact = [id, civility, lastName, firstName, phone, email];

    const stringifiedData = newContact.join(","); // stringify by exploding and concatenate array by adding "," to each el of array

    // Update csv file
    fs.appendFileSync(dataFile, `\n${stringifiedData}`, (err) => {
      if (err) throw err;
      console.log("file updated");
    });

    res.redirect("/");
  },
};

export default contactController;
