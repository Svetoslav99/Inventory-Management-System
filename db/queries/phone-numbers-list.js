module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesPhoneNumbersListData() {

        const connection = await connect();

        const output = [];

        const queryReturnData = `
            SELECT p.first_name AS 'First Name', p.last_name AS 'Last Name', pn.phone_type AS 'Phone Type', pn.number AS 'Phone Number'
            FROM phone_number pn
            JOIN person p
            ON(pn.person_id = p.id)
            ORDER BY p.first_name ASC`;

        const data = await query(connection, queryReturnData); // To protect from SQL injection.

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({
                firstName: `${data[i]["First Name"]}`,
                lastName: `${data[i]["Last Name"]}`,
                phoneType: `${data[i]["Phone Type"]}`,
                phoneNumber: `${data[i]["Phone Number"]}`
            });
        }

        // console.log(output);

        return output;
    }
}