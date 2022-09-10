const {join} = require('path');

const privatePage = (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'private', 'loggedin.html'))
}

module.exports = privatePage;