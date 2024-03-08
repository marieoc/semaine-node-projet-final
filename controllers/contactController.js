import fs from "fs";
import { parse } from "csv-parse/sync";

let dataFile = "./data/contacts.csv";

const contactController = {
  index: async (req, res) => {
    // Retrieve params
    const { id } = req.params;

    // Get all data and parse them
    let data = await fs.promises.readFile(dataFile, "utf8");
    const parsedData = await parse(data, { delimiter: "," });

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
      birthdate: contact[6],
      image: contact[7],
    };

    // Display formatted date on contact card
    const date = new Date(contact.birthdate);
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedDate = formatter.format(date);
    contact.birthdate = formattedDate;

    res.render("contact", { contact });
  },

  create: async (req, res) => {
    let contact = null; // pass contact variable to view so form can either be used for creating or updating

    res.render("contact-form", { contact });
  },

  store: async (req, res) => {
    // Retrieve form input values
    const { civility, firstName, lastName, phone, email, birthdate } = req.body;
    const imageFile = req.files?.image;

    // Retrieve number of contacts
    const data = await fs.promises.readFile(dataFile, "utf8");
    const contacts = await parse(data, { delimiter: "," });
    const id = contacts.length + 1;

    // Image
    let image;
    if (imageFile) {
      image = `${id}-${imageFile.name}`;
      const contactDir = `./public/img/${id}`;
      const imageFilePath = `${contactDir}/${image}`;

      // Check if contact directory exists
      if (!fs.existsSync(contactDir)) {
        fs.mkdirSync(contactDir, { recursive: true });
      } else {
        console.log("directory already exists");
      }

      if (!fs.existsSync(imageFilePath))
        // move image to 'public' folder
        imageFile.mv(imageFilePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      // If contact has no file uploaded, give default profile picture
    } else {
      image = "default_pfp.jpg";
    }

    // Formatted new contact array
    const newContact = [
      id,
      civility,
      lastName,
      firstName,
      phone,
      email,
      birthdate,
      image,
    ];

    let stringifiedData = newContact.join(","); // stringify by exploding and concatenate array by adding "," to each el of array
    let updatedFile;
    if (contacts.length === 0) {
      updatedFile = stringifiedData;
    } else {
      updatedFile = `\n${stringifiedData}`;
    }

    // Update csv file
    await fs.promises.appendFile(dataFile, updatedFile, (err) => {
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
    const contacts = await parse(data, { delimiter: "," });

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
      birthdate: contact[6],
      image: contact[7],
    };

    res.render("contact-form", { contact });
  },

  update: async (req, res) => {
    // Retrieve contact id
    const { id } = req.params;
    console.log(id);
    // Retrieve form input values
    const { civility, firstName, lastName, phone, email, birthdate } = req.body;

    // Retrieve image file
    const imageFile = req.files?.image;
    // console.log(imageFile)

    // Image
    let defaultProfilePicture = "default_pfp.jpg";
    let image;

    // Retrieve contacts
    const data = await fs.promises.readFile(dataFile, "utf8");
    const contacts = await parse(data, { delimiter: "," });
    // Find contact
    let contact = contacts.find((el) => id == el[0]);

    // If no image provided, then give default profil picture
    if (!imageFile && contact[7] === defaultProfilePicture) {
      image = defaultProfilePicture;

      // If no image but contact already had pfp
    } else if (!imageFile && contact[7] !== defaultProfilePicture) {
      console.log("no new image loaded");
      // Reassign previous saved pfp
      image = contact[7];

    // If image was loaded
    } else if (imageFile) {
      image = `${id}-${imageFile.name}`;
      const contactDir = `./public/img/${id}`;
      const imageFilePath = `${contactDir}/${image}`;

      if (!fs.existsSync(contactDir)) {
        fs.mkdirSync(contactDir, { recursive: true });
      } else {
        console.log("directory already exists");
      }

      // If another picture was updated before, throw it -- except for default pfp
      if (contact[7] !== defaultProfilePicture) {
        const oldImageFilePath = `${contactDir}/${contact[7]}`;
        fs.unlink(oldImageFilePath, () => {
          console.log(`${oldImageFilePath} was deleted`)
        })
      }
      // move image to 'public' folder
      imageFile.mv(imageFilePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    // create new data arr
    const updatedContact = [
      id,
      civility,
      lastName,
      firstName,
      phone,
      email,
      birthdate,
      image,
    ];

    // Find contact in csv file
    fs.readFile(dataFile, "utf8", async (err, data) => {
      if (err) throw err;

      const contacts = parse(data, { delimiter: "," });

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
