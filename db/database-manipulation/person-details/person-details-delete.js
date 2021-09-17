module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getPersonDetailsDeleteData(personId) {

        const connection = await connect();

        const output = [];

        // Check from other places where the person with this ID is also located and update them 
        //( set the default Unknown person to these places as a placeholder )

        // Update phone_number table
        const getPhoneNumbersQuery = `
                        SELECT *
                        FROM phone_number
                        WHERE person_id = ?`;
        const returnedPhoneNumbers = query(connection, getPhoneNumbersQuery, [personId]);
        if (returnedPhoneNumbers.length !== 0) {
            // 9-th person is the placeholder 'Unknown' person
            const updatePhoneNumbersQuery = `
                    UPDATE phone_number
                    SET person_id = 9
                    WHERE person_id = ?`;
            const returnedUpdatePhoneNumbersQuery = query(connection, updatePhoneNumbersQuery, [personId]);
        }

        // Update product_person table
        const getProductPersonsQuery = `
                        SELECT *
                        FROM product_person
                        WHERE person_id = ?`;
        const returnedProductPersons = query(connection, getProductPersonsQuery, [personId]);

        if (returnedProductPersons.length !== 0) {
            // 9-th person is the placeholder 'Unknown' person
            const updateProductPersonsQuery = `
                        UPDATE product_person
                        SET person_id = 9
                        WHERE person_id = ?`;
            const returnedUpdateProductPersons = query(connection, updateProductPersonsQuery, [personId]);
        }

        // Finally, once we have freed our person from everywhere where its id was used, we now can safely delete it from its table
        const queryReturnData = `
                        DELETE FROM person
                        WHERE id = ?`;

        const returnData = await query(connection, queryReturnData, [personId]);

        // Rework to show everyone else after successfully deleting him.
        const queryReturn = `
        SELECT p.id AS 'ID', p.first_name AS 'First Name', p.last_name AS 'Last Name',  p.role AS 'Role',  co.name AS 'Country', c.region AS 'Region', c.name AS 'City', a.street AS 'Street', a.details AS 'Details'
        FROM person p
        JOIN address a
        ON(p.address_id = a.id)
        JOIN city c
        ON(a.city_id = c.id)
        JOIN country co
        ON(c.country_id = co.id) 
        ORDER BY id`;

        const data = await query(connection, queryReturn);

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({
                id: `${data[i]['ID']}`,
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

        return output;
    }
}