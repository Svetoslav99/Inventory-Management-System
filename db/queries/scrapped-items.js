module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesScrappedItemsData() {
        const connection = await connect();

        const output = [];

        const queryReturnData = `
            SELECT pd.brand_model AS 'Item model', p.inventory_number AS 'Inventory Number'
            FROM product p 
            JOIN product_details pd
            ON(pd.id = p.product_details_id)
            WHERE p.is_scrapped = "1"`;

        const data = await query(connection, queryReturnData); // To protect from SQL injection.

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({ inventoryNumber: `${data[i]["Inventory Number"]}`});
        }

        // console.log(output);

        return output;
    }
}