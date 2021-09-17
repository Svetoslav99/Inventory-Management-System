module.exports = function ({ connect, disconnect, query, utils } = {}) {
    return async function getQueriesAvailableItemsPerTypeAndModelData(itemModelName) {

        const connection = await connect();

        const output = [];

        const queryReturnData = `
                        SELECT pd.brand_model AS 'Model name', p.inventory_number AS 'Inventory number' 
                        FROM product p
                        JOIN product_details pd
                        ON(p.product_details_id = pd.id)
                        WHERE pd.brand_model = ?
                        AND p.available = 1`;

        const data = await query(connection, queryReturnData, [itemModelName]); // To protect from SQL injection.

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {
            output.push({
                modelName: `${data[i]["Model name"]}`,
                invNumber: `${data[i]["Inventory number"]}`
            });
        }

        return output;

    }
}
