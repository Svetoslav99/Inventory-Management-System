module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesSearchByInventoryNumberData(inventoryNumber) {
        const connection = await connect();

        const output = [];

        const queryReturnData = `
            SELECT ppp.inventory_number AS 'Inventory Number', pd.brand_model AS 'Model Name', p.first_name AS 'First Name', p.last_name AS 'Last Name'
            FROM product_person pp 
            JOIN person p
            ON(pp.person_id = p.id)
            JOIN product ppp
            ON(pp.product_id = ppp.id)
            JOIN product_details pd
            ON(ppp.product_details_id = pd.id)
            WHERE 
            ppp.inventory_number = ?`;

        const data = await query(connection, queryReturnData, [inventoryNumber]); // To protect from SQL injection.

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({
                inventoryNumber: `${data[i]["Inventory Number"]}`,
                modelName: `${data[i]["Model Name"]}`,
                firstName: `${data[i]["First Name"]}`,
                lastName: `${data[i]["Last Name"]}`,
            });
        }

        // console.log(output);

        return output;
    }
}