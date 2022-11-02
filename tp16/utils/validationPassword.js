const bCrypt = require('bcrypt')

const createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
};

const validationPassword = (password, user) => {
    const passwordHash = user.password
    return bCrypt.compareSync(password, passwordHash);


    
}

module.exports = {
    createHash,
    validationPassword
};