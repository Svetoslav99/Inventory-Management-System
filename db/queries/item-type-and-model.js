module.exports = function ({ connect, disconnect, query, utils, moment } = {}) {
    return async function getQueriesItemTypeAndModelData(brandModel) {

        const connection = await connect();

        const output = [];

        const queryReturnData = `
            SELECT pd.brand_model AS 'Item Model', p.inventory_number AS 'Inventory Number', p.created_on AS 'Added On', p.available AS 'Available for use', p.is_scrapped AS 'Scrapped'
            FROM product p 
            JOIN product_details pd
            ON(pd.id = p.product_details_id)
            WHERE pd.brand_model = ?
            ORDER BY p.available DESC`;

        const data = await query(connection, queryReturnData, [brandModel]); // To protect from SQL injection.

        await disconnect(connection);

        const dataLength = data.length;
        let i;
        for (i = 0; i < dataLength; i++) {

            let isAvailable = data[i]["Available for use"][0];
            isAvailable == 1 ? "Available" : "Not Available";

            let isScrapped = data[i]["Scrapped"][0];
            isScrapped == 1 ? "Scrapped" : "Not Scrapped";

            const addedOn = moment(data[i]["Added On"]).format("MM/DD/YYYY");

            output.push({
                itemModel: `${data[i]["Item Model"]}`,
                inventoryNumber: `${data[i]["Inventory Number"]}`,
                addedOn: `${addedOn}`,
                available: `${isAvailable}`,
                scrapped: `${isScrapped}`
            });
        }
 
        // console.log(output);

        return output;
    }
}