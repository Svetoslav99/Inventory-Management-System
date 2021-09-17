module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getPersonDetailsInsertData(firstName, lastName, streetName, streetDetails, cityName, cityRegion, countryName, role) {
        const connection = await connect();

        const output = [];

        // Check for country
        const queryReturnDataCountry = `
                        SELECT id
                        FROM country
                        WHERE name = ?`;

        const returnedDataCountry = await query(connection, queryReturnDataCountry, [countryName]);

        let countryId;
        if (returnedDataCountry.length === 0) {

            // Get all IDs
            const countryIDs = `
                        SELECT id FROM country
                        ORDER BY id DESC`;

            const returnedCountryIDs = await query(connection, countryIDs);

            // Get latest ID
            countryId = returnedCountryIDs[0].id;

            const queryInsertDataCountry = `
                        INSERT INTO country
                        VALUES(?,?)`;
            countryId += 1;

            const returnedInsertDataCountry =  await query(connection, queryInsertDataCountry, [countryId, countryName]);
        } else {
            countryId = returnedDataCountry[0].id;
        }

        // Check for city
        const queryReturnDataCity = `
            SELECT id
            FROM city
            WHERE name = ?`;

        const returnedDataCity = await query(connection, queryReturnDataCity, [cityName]);
        let cityId;
        if (returnedDataCity.length === 0) {

            // Get all IDs
            const cityIDs = `
                        SELECT id FROM city
                        ORDER BY id DESC`;

            const returnedCityIDs = await query(connection, cityIDs);

            // Get latest ID
            cityId = returnedCityIDs[0].id;

            cityId += 1;

            const queryInsertDataCity = `
                        INSERT INTO city
                        VALUES(?,?,?,?)`;

            const returnedInsertDataCity = await query(connection, queryInsertDataCity, [cityId, cityName, cityRegion, countryId]);
        } else {
            cityId = returnedDataCity[0].id;
        }


        // Check for address
        const queryReturnDataAddress = `
                        SELECT id FROM address
                        WHERE street = ?
                        AND details = ?`;

        const returnedDataAddress = await query(connection, queryReturnDataAddress, [streetName, streetDetails]);

        let addressId;
        if (returnedDataAddress.length === 0) {

            // Get all IDs
            const addressIDs = `
                        SELECT id FROM address
                        ORDER BY id DESC`;

            const returnedAddressIDs = await query(connection, addressIDs);

            // Get latest ID
            addressId = returnedAddressIDs[0].id;

            addressId += 1;

            const queryInsertDataAddress = `
                        INSERT INTO address
                        VALUES(?,?,?,?)`;

            const returnedInsertDataAddress = await query(connection, queryInsertDataAddress, [addressId, streetName, streetDetails, cityId]);
        } else {
            addressId = returnedDataAddress[0].id;
        }

        // Check for the biggest one in person
        const queryReturnDataPerson = `
                        SELECT id FROM person
                        WHERE first_name = ?
                        AND last_name = ?
                        AND address_id = ?
                        AND role = ?`;

        const returnedDataPerson = await query(connection, queryReturnDataPerson, [firstName, lastName, addressId, role]);

        let personId;
        if (returnedDataPerson.length === 0) {

            // Get all IDs
            const personIDs = `
                        SELECT id FROM person
                        ORDER BY id DESC`;

            const returnedPersonIDss = await query(connection, personIDs);

            // Get latest ID
            personId = returnedPersonIDss[0].id;

            personId += 1;

            const queryInsertDataPerson = `
                        INSERT INTO person
                        VALUES(?,?,?,?,?)`;

            const returnedInsertDataPerson = await query(connection, queryInsertDataPerson, [personId, firstName, lastName, addressId, role]);
        } else {
            personId = returnedDataPerson[0].id;
        }

        const queryReturnData = `
        SELECT p.id AS 'ID', p.first_name AS 'First Name', p.last_name AS 'Last Name',  p.role AS 'Role',  co.name AS 'Country', c.region AS 'Region', c.name AS 'City', a.street AS 'Street', a.details AS 'Details'
         FROM person p
         JOIN address a
         ON(p.address_id = a.id)
         JOIN city c
         ON(a.city_id = c.id)
         JOIN country co
         ON(c.country_id = co.id)`;

        const data = await query(connection, queryReturnData);

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({
                id: `${data[i]["ID"]}`,
                firstName: `${data[i]["First Name"]}`,
                lastName: `${data[i]["Last Name"]}`,
                role: `${data[i]["Role"]}`,
                country: `${data[i]["Country"]}`,
                region: `${data[i]["Region"]}`,
                city: `${data[i]["City"]}`,
                street: `${data[i]["Street"]}`,
                details: `${data[i]["Details"]}`
            });
        }

        // console.log(output);

        return output;
    }
}
