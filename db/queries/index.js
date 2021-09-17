const mysql = require('mysql');
const dbCredentials = require('../config');
const moment = require('moment');

const connect = () => new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbCredentials);
    connection.connect(err => err ? reject(err) : resolve(connection));
});

const disconnect = connection => new Promise((resolve, reject) => {
    connection.end(err => err ? reject(err) : resolve(true));
});

const query = (connection, sql, params = [], options = {}, settings = {}) => new Promise((resolve, reject) => {
    connection.query({ ...options, sql }, params, (error, results, fields) =>
        error ? reject(error) : resolve(settings.first ? results[0] : results))
});

const utils = {
    //TODO: If needed implement some formattors, etc.
}

const getAvailableItemsPerTypeAndModelDataFactory = require('./available-items-per-type-and-model');
const getAvailableItemsPerTypeAndModelData = getAvailableItemsPerTypeAndModelDataFactory({ connect, disconnect, query, utils });

const getAvailableItemsDataFactory = require('./available-items');
const getAvailableItemsData = getAvailableItemsDataFactory({ connect, disconnect, query, utils });

const getItemTypeAndModelDataFactory = require('./item-type-and-model');
const getItemTypeAndModelData = getItemTypeAndModelDataFactory({ connect, disconnect, query, utils, moment });

const getPersonDetailsDataFactory = require('./person-details');
const getPersonDetailsData = getPersonDetailsDataFactory({ connect, disconnect, query, utils });

const getPhoneNumbersListDataFactory = require('./phone-numbers-list');
const getPhoneNumbersListData = getPhoneNumbersListDataFactory({ connect, disconnect, query, utils });

const getScrappedItemsDataFactory = require('./scrapped-items');
const getScrappedItemsData = getScrappedItemsDataFactory({ connect, disconnect, query, utils });

const getSearchByInventoryNumberDataFactory = require('./search-by-inventory-number');
const getSearchByInventoryNumberData = getSearchByInventoryNumberDataFactory({ connect, disconnect, query, utils });

const getUserCardDataFactory = require('./user-card');
const getUserCardData = getUserCardDataFactory({ connect, disconnect, query, utils });

module.exports = {
    getAvailableItemsPerTypeAndModelData,
    getAvailableItemsData,
    getItemTypeAndModelData,
    getPersonDetailsData,
    getPhoneNumbersListData,
    getScrappedItemsData,
    getSearchByInventoryNumberData,
    getUserCardData
}