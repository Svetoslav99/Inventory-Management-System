


module.exports = function ({ getPersonDetailsUpdateData } = {}) {

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

        // Preprocess parameters : everything from the form is here
        const personId =  Object.values(req.query)[0].trim(); // temporary workaround because of something making the first property weird.
        const firstName = req.query.firstName.trim();
        const lastName = req.query.lastName.trim();
        const streetName = req.query.streetName.trim();
        const streetDetails = req.query.streetDetails.trim();
        const cityName = req.query.cityName.trim();
        const cityRegion = req.query.cityRegion.trim();
        const countryName = req.query.countryName.trim();
        const role = req.query.role.trim();

        // Get the data from the database
        const dbData = await getPersonDetailsUpdateData(personId, firstName, lastName, streetName, streetDetails, cityName, cityRegion, countryName, role);

        // Calculate data in the output format
        const output = buildOutput(dbData);
        const { success, data, message, status } = output;
        res.status(status).json({ success, data, message });

    }
}

