module.exports = function ({ getAvailableItemsPerTypeAndModelData } = {}) {

    const buildOutput = dbCallReuslt => {
        if (dbCallReuslt instanceof Error) {
            return {
                status: 400,
                success: false,
                message: dbCallReuslt.message
            }
        }

        return {
            status: 200,
            success: true,
            data: dbCallReuslt
        }
    }

    return async (req, res) => {

        // Preprocess parameters
        const itemModelNameValue = req.query.itemModelNameValue;

        // Get the data from the database
        const dbData = await getAvailableItemsPerTypeAndModelData(itemModelNameValue);

        // Calculate data in the output format
        const output = buildOutput(dbData);
        const { success, data, message, status } = output;
        res.status(status).json({ success, data, message });
    }
}

