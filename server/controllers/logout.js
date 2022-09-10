
const logout = (req, res) => {
    res.clearCookie('token');
    res.json('Logged Out');
}

module.exports = logout;