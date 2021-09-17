module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesUserCardData(firstName, lastName) {

        const connection = await connect();

        const output = [];

        const queryReturnData = `
            SELECT p.first_name AS 'First Name', p.last_name AS 'Last Name', pd.brand_model AS 'Item Name', ppp.inventory_number AS 'Inventory Number'
            FROM product_person pp 
            JOIN person p
            ON(pp.person_id = p.id)
            JOIN product ppp
            ON(pp.product_id = ppp.id)
            JOIN product_details pd
            ON(ppp.product_details_id = pd.id)
            WHERE 
            p.first_name = ?
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
                itemName: `${data[i]["Item Name"]}`,
                inventoryNumber: `${data[i]["Inventory Number"]}`,
            });
        }

        // console.log(output);

        return output;
    }
}