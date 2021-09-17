module.exports = function ({ getFile, page404Path } = {}) {

    return async (req, res) => {

        const filePath = await getFile('item-type-and-model-information.html');

        filePath
            ? res.sendFile(filePath)
            : res.sendFile(page404Path);
    }
}