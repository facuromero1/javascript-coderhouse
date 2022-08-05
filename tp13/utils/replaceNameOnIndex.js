const fs = require("fs")


const replace = async (user) => {
    const data = await fs.promises.readFile(
        __dirname + "/../public/index.html","utf-8"
    );
    const newData = data.replace("nameToReplace", user.email)
    return newData;
};

module.exports = replace;