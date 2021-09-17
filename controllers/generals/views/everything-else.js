module.exports = function ( page404Path ) {
    return async (req, res) => res.sendFile(page404Path)
}