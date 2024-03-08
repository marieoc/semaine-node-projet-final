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
    let contact = null; // pass contact variable to view so form can either be used for creating or updating

    res.render("contact-form", { contact });
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

  edit: async (req, res) => {
    // Retrieve params
    const { id } = req.params;

    // Retrieve contacts
    const data = await fs.promises.readFile(dataFile, "utf8");
    const contacts = parse(data, { delimiter: "," });

    // Find contact
    let contact = contacts.find((el) => id == el[0]);

    // Format data to give it properties
    contact = {
      id: contact[0],
      civility: contact[1],
      lastName: contact[2],
      firstName: contact[3],
      phone: contact[4],
      email: contact[5],
    };

    res.render("contact-form", { contact });
  },

  update: async (req, res) => {
    // Retrieve contact id
    const { id } = req.params;
    // Retrieve form input values
    const { civility, firstName, lastName, phone, email } = req.body;

    // create new data arr
    const updatedContact = [id, civility, lastName, firstName, phone, email];

    // Find contact in csv file
    fs.readFile(dataFile, "utf8", async (err, data) => {
      if (err) throw err;

      const contacts = parse(data, { delimiter: "," });
      console.log(contacts);

      const foundContactIndex = contacts.findIndex(
        (contact) => contact[0] == id
      );

      if (foundContactIndex !== -1) {
        // update existingContact with data from updatedContact
        contacts[foundContactIndex] = updatedContact;

        // add "," between each to contact array el, then add line space between each contact of array
        let updatedData = contacts
          .map((contact) => contact.join(","))
          .join("\n");

        // Update file
        await fs.promises.writeFile(dataFile, updatedData, "utf8");
      }
      console.log("file updated");

      res.redirect("/");
    });
  },

  destroy: async (req, res) => {
    let contactId = req.params.id;

    // Read file
    fs.readFile(dataFile, "utf8", async (err, data) => {
      const contacts = parse(data, { delimiter: "," });

      // Find index
      const contactIndex = contacts.findIndex(
        (contact) => contact[0] == contactId
      );
      console.log(contactIndex);

      // Remove contact from array
      let contactArr = contacts.filter((contact) => contact[0] != contactId);
      console.log(contactArr);

      // Stringify updated data
      let updatedData = contactArr
        .map((contact) => contact.join(","))
        .join("\n");

      // Wait until file is completely written with updated data
      await fs.promises.writeFile(dataFile, updatedData, "utf8");

      // Redirect inside
      res.redirect("/");
    });
  },
};

export default contactController;
