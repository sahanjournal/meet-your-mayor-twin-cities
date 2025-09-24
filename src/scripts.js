require("dotenv").config();
const fs = require("fs");
const fetch = require("node-fetch");

function kebabToCamelCase(kebabString) {
  return kebabString.replace(/-([a-z])/g, (match, letter) =>
    letter.toUpperCase()
  );
}

const downloadGoogleDocContent = () => {
  const fileName = process.env.FILENAME || "page";
  fetch(`http://127.0.0.1:6006/${process.env.DOCID}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => {
      if (json.code === 404) {
        console.log(
          `❌ Oops! Download returned a 404 error code: ${json.message} Did you forget to inclue a document id?`
        );
      } else {
        fs.writeFile(
          `src/${fileName}-content.js`,
          `export const ${kebabToCamelCase(fileName)}Content = ${JSON.stringify(
            Object.fromEntries(
              // Remove first element (which is always example)
              Object.entries(json).filter((element, i) => i > 0)
            )
          )}`,
          (err) => {
            // In case of a error throw err.
            if (err) throw err;
          }
        );
        console.log(
          `✅ Downloaded ${fileName} content from Google Docs and saved it in ${fileName}-content.js`
        );
        if (fileName.startsWith("candidate")) {
          fs.writeFile(
            `src/${fileName}-list.json`,
            `${JSON.stringify(
              Object.entries(json)
                .filter((candidate) => candidate[0] !== "candidateX")
                .map((candidate) => ({ name: candidate[1].name }))
            )}`,
            (err) => {
              // In case of a error throw err.
              if (err) throw err;
            }
          );
          console.log(
            `✅ Downloaded candidate list from Google Docs and saved it in ${fileName}-list.json`
          );
        }
      }
    })
    .catch((err) =>
      console.error(`Could not download page content from Google Docs`, err)
    );
};

module.exports = {
  downloadGoogleDocContent,
};
