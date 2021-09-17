const path = require('path');
const fs = require('fs');

const dirHtml = path.join(__dirname, '..', 'static', 'html');
const page404Path = path.join(__dirname, '..', 'static', 'html', 'error', '404.html');

// General Views
const viewGeneralHomepage = require('./generals/views/general-homepage');
const viewGeneralEverythingElse = require('./generals/views/everything-else');

// Database manipulation Views
const viewDatabaseManipulationHomepage = require('./database-manipulation/views/database-manipulation-homepage');

const viewDatabaseManipulationCompanyPhoneNumbersListUpdate = require('./database-manipulation/views/company-phone-numbers-list/company-phone-numbers-list-update');
const viewDatabaseManipulationCompanyPhoneNumbersListInsert = require('./database-manipulation/views/company-phone-numbers-list/company-phone-numbers-list-insert');
const viewDatabaseManipulationCompanyPhoneNumbersListDelete = require('./database-manipulation/views/company-phone-numbers-list/company-phone-numbers-list-delete');

const viewDatabaseManipulationItemTypeAndModelInformationUpdate = require('./database-manipulation/views/item-type-and-model-information/item-type-and-model-information-update');
const viewDatabaseManipulationItemTypeAndModelInformationInsert = require('./database-manipulation/views/item-type-and-model-information/item-type-and-model-information-insert');
const viewDatabaseManipulationItemTypeAndModelInformationDelete = require('./database-manipulation/views/item-type-and-model-information/item-type-and-model-information-delete');

const viewDatabaseManipulationPersonDetailsUpdate = require('./database-manipulation/views/person-details/person-details-update');
const viewDatabaseManipulationPersonDetailsInsert = require('./database-manipulation/views/person-details/person-details-insert');
const viewDatabaseManipulationPersonDetailsDelete = require('./database-manipulation/views/person-details/person-details-delete');
const viewDatabaseManipulationPeopleDetailsDelete = require('./database-manipulation/views/person-details/person-details-delete-get-people');

const viewDatabaseManipulationUserCardUpdate = require('./database-manipulation//views/user-card/user-card-update');
const viewDatabaseManipulationUserCardInsert = require('./database-manipulation//views/user-card/user-card-insert');
const viewDatabaseManipulationUserCardDelete = require('./database-manipulation//views/user-card/user-card-delete');

// Database manipulation Getters
const getDatabaseManipulationCompanyPhoneNumbersListUpdate = require('./database-manipulation/getters/company-phone-numbers-list/company-phone-numbers-list-update');
const getDatabaseManipulationCompanyPhoneNumbersListInsert = require('./database-manipulation/getters/company-phone-numbers-list/company-phone-numbers-list-insert');
const getDatabaseManipulationCompanyPhoneNumbersListDelete = require('./database-manipulation/getters/company-phone-numbers-list/company-phone-numbers-list-delete');

const getDatabaseManipulationItemTypeAndModelInformationUpdate = require('./database-manipulation/getters/item-type-and-model-information/item-type-and-model-information-update');
const getDatabaseManipulationItemTypeAndModelInformationInsert = require('./database-manipulation/getters/item-type-and-model-information/item-type-and-model-information-insert');
const getDatabaseManipulationItemTypeAndModelInformationDelete = require('./database-manipulation/getters/item-type-and-model-information/item-type-and-model-information-delete');

const getDatabaseManipulationPersonDetailsUpdate = require('./database-manipulation/getters/person-details/person-details-update');
const getDatabaseManipulationPersonDetailsInsert = require('./database-manipulation/getters/person-details/person-details-insert');
const getDatabaseManipulationPersonDetailsDelete = require('./database-manipulation/getters/person-details/person-details-delete');
const getDatabaseManipulationPeopleDetailsDelete = require('./database-manipulation/getters/person-details/person-details-delete-get-people');

const getDatabaseManipulationUserCardUpdate = require('./database-manipulation/getters/user-card/user-card-update');
const getDatabaseManipulationUserCardInsert = require('./database-manipulation/getters/user-card/user-card-insert');
const getDatabaseManipulationUserCardDelete = require('./database-manipulation/getters/user-card/user-card-delete');

// Queries Views
const viewQueriesHomepage = require('./queries/views/queries-homepage');
const viewQueriesAvailableItemsPerTypeAndModel = require('./queries/views/available-items-per-type-and-model');
const viewQueriesAvailableItems = require('./queries/views/available-items');
const viewQueriesItemTypeAndModel = require('./queries/views/item-type-and-model');
const viewQueriesPersonDetails = require('./queries/views/person-details');
const viewQueriesPhoneNumbersList = require('./queries/views/phone-numbers-list');
const viewQueriesScrappedItems = require('./queries/views/scrapped-items');
const viewQueriesSearchByInventoryNumber = require('./queries/views/search-by-inventory-number');
const viewQueriesUserCard = require('./queries/views/user-card');

// Queries Getters
const getQueriesAvailableItemsPerTypeAndModel = require('./queries/getters/available-items-per-type-and-model');
const getQueriesAvailableItems = require('./queries/getters/available-items');
const getQueriesItemTypeAndModel = require('./queries/getters/item-type-and-model');
const getQueriesPersonDetails = require('./queries/getters/person-details');
const getQueriesPhoneNumbersList = require('./queries/getters/phone-numbers-list');
const getQueriesScrappedItems = require('./queries/getters/scrapped-items');
const getQueriesSearchByInventoryNumber = require('./queries/getters/search-by-inventory-number');
const getQueriesUserCard = require('./queries/getters/user-card');


async function getFile(fileName, dir = null) {
    if (!dir) {
        dir = dirHtml;
    }

    return new Promise(async (res, rej) => {
        const children = await fs.promises.readdir(dir, { withFileTypes: true });
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const childPath = path.resolve(dir, child.name);
            if (child.name === fileName) {
                return res(childPath);
            } else if (child.isDirectory()) {
                const nestedPath = await getFile(fileName, childPath);
                if (nestedPath) {
                    return res(nestedPath);
                }
            }
        }
        res(false);
    });
}

// Database layer dependencies
const {
    getCompanyPhoneNumbersListUpdateData,
    getCompanyPhoneNumbersListInsertData,
    getCompanyPhoneNumbersListDeleteData,
    getItemTypeAndModelInformationUpdateData,
    getItemTypeAndModelInformationInsertData,
    getItemTypeAndModelInformationDeleteData,
    getPersonDetailsUpdateData,
    getPersonDetailsInsertData,
    getPersonDetailsDeleteData,
    getPeopleDetailsDeleteData,
    getUserCardUpdateData,
    getUserCardInsertData,
    getUserCardDeleteData

} = require('../db/database-manipulation');

// Database layer depedencies for queries
const {
    getAvailableItemsPerTypeAndModelData,
    getAvailableItemsData,
    getItemTypeAndModelData,
    getPersonDetailsData,
    getPhoneNumbersListData,
    getScrappedItemsData,
    getSearchByInventoryNumberData,
    getUserCardData
} = require('../db/queries');


module.exports = {
    general: {
        viewGeneralHomepage: viewGeneralHomepage({ getFile, page404Path }),
        viewEverythingElse: viewGeneralEverythingElse(page404Path),

    },
    databaseManipulation: {
        viewHomepage: viewDatabaseManipulationHomepage({ getFile, page404Path }),

        viewCompanyPhoneNumbersListUpdate: viewDatabaseManipulationCompanyPhoneNumbersListUpdate({ getFile, page404Path }),
        viewCompanyPhoneNumbersListInsert: viewDatabaseManipulationCompanyPhoneNumbersListInsert({ getFile, page404Path }),
        viewCompanyPhoneNumbersListDelete: viewDatabaseManipulationCompanyPhoneNumbersListDelete({ getFile, page404Path }),

        viewItemTypeAndModelInformationUpdate: viewDatabaseManipulationItemTypeAndModelInformationUpdate({ getFile, page404Path }),
        viewItemTypeAndModelInformationInsert: viewDatabaseManipulationItemTypeAndModelInformationInsert({ getFile, page404Path }),
        viewItemTypeAndModelInformationDelete: viewDatabaseManipulationItemTypeAndModelInformationDelete({ getFile, page404Path }),

        viewPersonDetailsUpdate: viewDatabaseManipulationPersonDetailsUpdate({ getFile, page404Path }),
        viewPersonDetailsInsert: viewDatabaseManipulationPersonDetailsInsert({ getFile, page404Path }),
        viewPersonDetailsDelete: viewDatabaseManipulationPersonDetailsDelete({ getFile, page404Path }),
        viewPeopleDetailsDelete: viewDatabaseManipulationPeopleDetailsDelete({ getFile, page404Path }),

        viewUserCardUpdate: viewDatabaseManipulationUserCardUpdate({ getFile, page404Path }),
        viewUserCardInsert: viewDatabaseManipulationUserCardInsert({ getFile, page404Path }),
        viewUserCardDelete: viewDatabaseManipulationUserCardDelete({ getFile, page404Path }),

        getCompanyPhoneNumbersListUpdate: getDatabaseManipulationCompanyPhoneNumbersListUpdate({ getCompanyPhoneNumbersListUpdateData }),
        getCompanyPhoneNumbersListInsert: getDatabaseManipulationCompanyPhoneNumbersListInsert({ getCompanyPhoneNumbersListInsertData }),
        getCompanyPhoneNumbersListDelete: getDatabaseManipulationCompanyPhoneNumbersListDelete({ getCompanyPhoneNumbersListDeleteData }),

        getItemTypeAndModelInformationUpdate: getDatabaseManipulationItemTypeAndModelInformationUpdate({ getItemTypeAndModelInformationUpdateData }),
        getItemTypeAndModelInformationInsert: getDatabaseManipulationItemTypeAndModelInformationInsert({ getItemTypeAndModelInformationInsertData }),
        getItemTypeAndModelInformationDelete: getDatabaseManipulationItemTypeAndModelInformationDelete({ getItemTypeAndModelInformationDeleteData }),

        getPersonDetailsUpdate: getDatabaseManipulationPersonDetailsUpdate({ getPersonDetailsUpdateData }),
        getPersonDetailsInsert: getDatabaseManipulationPersonDetailsInsert({ getPersonDetailsInsertData }),
        getPersonDetailsDelete: getDatabaseManipulationPersonDetailsDelete({ getPersonDetailsDeleteData }),
        getPeopleDetailsDelete: getDatabaseManipulationPeopleDetailsDelete({ getPeopleDetailsDeleteData }),

        getUserCardUpdate: getDatabaseManipulationUserCardUpdate({ getUserCardUpdateData }),
        getUserCardInsert: getDatabaseManipulationUserCardInsert({ getUserCardInsertData }),
        getUserCardDelete: getDatabaseManipulationUserCardDelete({ getUserCardDeleteData })
    },
    queries: {
        viewHomepage: viewQueriesHomepage({ getFile, page404Path }),
        viewAvailableItemsPerTypeAndModel: viewQueriesAvailableItemsPerTypeAndModel({ getFile, page404Path }),
        viewAvailableItems: viewQueriesAvailableItems({ getFile, page404Path }),
        viewItemTypeAndModel: viewQueriesItemTypeAndModel({ getFile, page404Path }),
        viewPersonDetails: viewQueriesPersonDetails({ getFile, page404Path }),
        viewPhoneNumbersList: viewQueriesPhoneNumbersList({ getFile, page404Path }),
        viewScrappedItems: viewQueriesScrappedItems({ getFile, page404Path }),
        viewSearchByInventoryNumber: viewQueriesSearchByInventoryNumber({ getFile, page404Path }),
        viewUserCard: viewQueriesUserCard({ getFile, page404Path }),

        getAvailableItemsPerTypeAndModel: getQueriesAvailableItemsPerTypeAndModel({ getAvailableItemsPerTypeAndModelData }),
        getAvailableItems: getQueriesAvailableItems({ getAvailableItemsData }),
        getItemTypeAndModel: getQueriesItemTypeAndModel({ getItemTypeAndModelData }),
        getPersonDetails: getQueriesPersonDetails({ getPersonDetailsData }),
        getPhoneNumbersList: getQueriesPhoneNumbersList({ getPhoneNumbersListData }),
        getScrappedItems: getQueriesScrappedItems({ getScrappedItemsData }),
        getSearchByInventoryNumber: getQueriesSearchByInventoryNumber({ getSearchByInventoryNumberData }),
        getUserCard: getQueriesUserCard({ getUserCardData })
    }
}
