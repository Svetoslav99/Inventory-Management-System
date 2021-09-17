module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesPersonDetailsData(firstName, lastName) {
        

        const connection = await connect();

        const output = [];

        const queryReturnData = `
        SELECT p.first_name AS 'First Name', p.last_name AS 'Last Name',  p.role AS 'Role',  co.name AS 'Country', c.region AS 'Region', c.name AS 'City', a.street AS 'Street', a.details AS 'Details', pn.phone_type AS 'Phone Type', pn.number AS 'Phone Number'
        FROM phone_number pn
        JOIN person p
        ON(pn.person_id = p.id)
        JOIN address a
        ON(p.address_id = a.id)
        JOIN city c
        ON(a.city_id = c.id)
        JOIN country co
        ON(c.country_id = co.id)
        WHERE
        p.first_name= ?
        AND
        p.last_name = ?`;

        const data = await query(connection, queryReturnData, [firstName, lastName]); // To protect from SQL injection.

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({
                firstName: `${data[i]["First Name"]}`,
                lastName: `${data[i]["Last Name"]}`,
                role: `${data[i]["Role"]}`,
                country: `${data[i]["Country"]}`,
                region: `${data[i]["Region"]}`,
                city: `${data[i]["City"]}`,
                street: `${data[i]["Street"]}`,
                details: `${data[i]["Details"]}`,
                phoneType: `${data[i]["Phone Type"]}`,
                phoneNumber: `${data[i]["Phone Number"]}`
            });
        }

        // console.log(output);

        return output;
    }
}