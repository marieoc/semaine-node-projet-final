import retrieveContacts from "./retrieveContacts.js";

export default async function retrieveContact(file, id) {
    const contacts = await retrieveContacts(file);

    let contact = contacts.find((el) => id == el[0]);
    return contact;
}