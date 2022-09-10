const moment = require('moment');

const DateFromNow = (req, res) => {
    res.json(moment(req.params.date).fromNow())
}

module.exports = DateFromNow;