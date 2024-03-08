import fs from "fs";

export default async function moveImageToFolder(contactDir, imageFile, imageFilePath) {
  // Check if contact directory exists
  if (!fs.existsSync(contactDir)) {
    fs.mkdirSync(contactDir, { recursive: true });
  } else {
    console.log("directory already exists");
  }

  if (!fs.existsSync(imageFilePath)) {
    // move image to 'public' folder
    imageFile.mv(imageFilePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
