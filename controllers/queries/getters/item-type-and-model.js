

module.exports = function ({ getItemTypeAndModelData } = {}) {

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

        // CP19 = Q2 2020-Q1 2021 for example
        // Preprocess parameters
        const itemModel = req.query.itemModelNameValue;
        // Get the data from the database
        const dbData = await getItemTypeAndModelData(itemModel);

        // Calculate data in the output format
        const output = buildOutput(dbData);
        const { success, data, message, status } = output;
        res.status(status).json({ success, data, message });
    }
}

