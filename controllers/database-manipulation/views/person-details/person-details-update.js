module.exports = function ({ getFile, page404Path } = {}) {

    return async (req, res) => {

        const filePath = await getFile('person-details-update.html');

        filePath
            ? res.sendFile(filePath)
            : res.sendFile(page404Path);
    }
}