const mysql = require('mysql');
const dbCredentials = require('../config');

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

const getCompanyPhoneNumbersListUpdateFactory = require('./company-phone-numbers-list/company-phone-numbers-list-update');
const getCompanyPhoneNumbersListUpdateData = getCompanyPhoneNumbersListUpdateFactory({ connect, disconnect, query, utils });

const getCompanyPhoneNumbersListInsertFactory = require('./company-phone-numbers-list/company-phone-numbers-list-insert');
const getCompanyPhoneNumbersListInsertData = getCompanyPhoneNumbersListInsertFactory({ connect, disconnect, query, utils });

const getCompanyPhoneNumbersListDeleteFactory = require('./company-phone-numbers-list/company-phone-numbers-list-delete');
const getCompanyPhoneNumbersListDeleteData = getCompanyPhoneNumbersListDeleteFactory({ connect, disconnect, query, utils });

const getItemTypeAndModelInformationUpdateFactory = require('./item-type-and-model-information/item-type-and-model-information-update');
const getItemTypeAndModelInformationUpdateData = getItemTypeAndModelInformationUpdateFactory({ connect, disconnect, query, utils });

const getItemTypeAndModelInformationInsertFactory = require('./item-type-and-model-information/item-type-and-model-information-insert');
const getItemTypeAndModelInformationInsertData = getItemTypeAndModelInformationInsertFactory({ connect, disconnect, query, utils });

const getItemTypeAndModelInformationDeleteFactory = require('./item-type-and-model-information/item-type-and-model-information-delete');
const getItemTypeAndModelInformationDeleteData = getItemTypeAndModelInformationDeleteFactory({ connect, disconnect, query, utils });

const getPersonDetailsUpdateFactory = require('./person-details/person-details-update');
const getPersonDetailsUpdateData = getPersonDetailsUpdateFactory({ connect, disconnect, query, utils });

const getPersonDetailsInsertFactory = require('./person-details/person-details-insert');
const getPersonDetailsInsertData = getPersonDetailsInsertFactory({ connect, disconnect, query, utils });

const getPersonDetailsDeleteFactory = require('./person-details/person-details-delete');
const getPersonDetailsDeleteData = getPersonDetailsDeleteFactory({ connect, disconnect, query, utils });

const getPeopleDetailsDeleteFactory = require('./person-details/person-details-delete-get-people');
const getPeopleDetailsDeleteData = getPeopleDetailsDeleteFactory({ connect, disconnect, query, utils });

const getUserCardUpdateFactory = require('./user-card/user-card-update');
const getUserCardUpdateData = getUserCardUpdateFactory({ connect, disconnect, query, utils });

const getUserCardInsertFactory = require('./user-card/user-card-insert');
const getUserCardInsertData = getUserCardInsertFactory({ connect, disconnect, query, utils });

const getUserCardDeleteFactory = require('./user-card/user-card-delete');
const getUserCardDeleteData = getUserCardDeleteFactory({ connect, disconnect, query, utils });


module.exports = {
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
}