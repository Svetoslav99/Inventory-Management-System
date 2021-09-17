module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getPeopleDetailsDeleteData() {
        
        const connection = await connect();

        const output = [];

        const queryReturnData = `
        SELECT p.id AS 'ID', p.first_name AS 'First Name', p.last_name AS 'Last Name',  p.role AS 'Role',  co.name AS 'Country', c.region AS 'Region', c.name AS 'City', a.street AS 'Street', a.details AS 'Details'
        FROM person p
        JOIN address a
        ON(p.address_id = a.id)
        JOIN city c
        ON(a.city_id = c.id)
        JOIN country co
        ON(c.country_id = co.id) 
        ORDER BY id`;

        const data = await query(connection, queryReturnData);

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