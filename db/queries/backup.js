module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesAvailableItemsPerTypeAndModelData(itemModelName) {
        //TODO
        console.log('I am in db: ' + itemModelName);

        const connection = await connect();

        const output = [];

        const queryReturnData = `
                        SELECT pd.brand_model AS 'Model name', p.inventory_number AS 'Inventory number' 
                        FROM product p
                        JOIN product_details pd
                        ON(p.product_details_id = pd.id)
                        WHERE pd.brand_model = ?
                        AND p.available = 1;
        `;

        output.push(query(connection, queryReturnData, [itemModelName])); // To protect from SQL injection.

        const returnedData = await Promise.resolve(queryReturnData);

        await disconnect(connection);

        console.log(output[0]);
        console.log(returnedData);





    }
}