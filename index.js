const controllers = require('./controllers');
const express = require('express');
const StdHook = require('./utils/std-hook');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;
const server = require('http').createServer(app);

const cssPath = path.join(__dirname, 'static', 'css');
const jsPath = path.join(__dirname, 'static', 'js');
const htmlPath = path.join(__dirname, 'static', 'html');
const nodeModulesPath = path.join(__dirname, 'node_modules');

app.use('/css', express.static(cssPath));
app.use('/html', express.static(htmlPath));
app.use('/js', express.static(jsPath));
app.use('/lib', express.static(nodeModulesPath));

// Set EJS as templating engine 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', `${htmlPath}`);


// Logger for general info
const stdout = new StdHook(path.join(__dirname, 'files', 'logs', 'general.log'), process.stdout);
stdout.register();

// Logger for errors in the program
const stderr = new StdHook(path.join(__dirname, 'files', 'logs', 'error.log'), process.stderr);
stderr.register();

// Custom error log for special things we need to log seperately.
let errorData;
const errorLog = path.join(__dirname, 'files', 'logs', 'customErrorLog.log');

process.on('uncaughtException', async function (err) {
    console.log(err);
    console.log(err.stack);

    errorData = 'An error occured: ' + err +
        '\n' + 'Error stack trace: ' + err.stack + '\n\n';
    await fs.promises.writeFile(errorLog, errorData, { flag: 'a' });

    setTimeout(() => process.exit(1), 500);
});

process.on('unhandledRejection', async function (err) {
    console.log(err);
    console.log(err.stack);

    errorData = 'An error occured: ' + err +
        '\n' + 'Error stack trace: ' + err.stack + '\n\n';
    await fs.promises.writeFile(errorLog, errorData, { flag: 'a' });

    setTimeout(() => process.exit(1), 500);
});


// DB manipulations getters and views
app.get('/api/database-manipulation-homepage/person-details-update', controllers.databaseManipulation.getPersonDetailsUpdate);

app.get('/api/database-manipulation-homepage/person-details-insert', controllers.databaseManipulation.getPersonDetailsInsert);

app.get('/api/database-manipulation-homepage/person-details-delete', controllers.databaseManipulation.getPersonDetailsDelete);

app.get('/api/database-manipulation-homepage/person-details-delete-get-people', controllers.databaseManipulation.getPeopleDetailsDelete);

app.get('/api/database-manipulation-homepage/company-phone-numbers-list-update', controllers.databaseManipulation.getCompanyPhoneNumbersListUpdate);

app.get('/api/database-manipulation-homepage/company-phone-numbers-list-insert', controllers.databaseManipulation.getCompanyPhoneNumbersListInsert);

app.get('/api/database-manipulation-homepage/company-phone-numbers-list-delete', controllers.databaseManipulation.getCompanyPhoneNumbersListDelete);

app.get('/api/database-manipulation-homepage/item-type-and-model-information-update', controllers.databaseManipulation.getItemTypeAndModelInformationUpdate);

app.get('/api/database-manipulation-homepage/item-type-and-model-information-insert', controllers.databaseManipulation.getItemTypeAndModelInformationInsert);

app.get('/api/database-manipulation-homepage/item-type-and-model-information-delete', controllers.databaseManipulation.getItemTypeAndModelInformationDelete);

app.get('/api/database-manipulation-homepage/user-card-update', controllers.databaseManipulation.getUserCardUpdate);

app.get('/api/database-manipulation-homepage/user-card-insert', controllers.databaseManipulation.getUserCardInsert);

app.get('/api/database-manipulation-homepage/user-card-delete', controllers.databaseManipulation.getUserCardDelete);

app.get('/database-manipulation-homepage', controllers.databaseManipulation.viewHomepage);

app.get('/database-manipulation-homepage/person-details-update', controllers.databaseManipulation.viewPersonDetailsUpdate);

app.get('/database-manipulation-homepage/person-details-insert', controllers.databaseManipulation.viewPersonDetailsInsert);

app.get('/database-manipulation-homepage/person-details-delete', controllers.databaseManipulation.viewPersonDetailsDelete);

app.get('/database-manipulation-homepage/company-phone-numbers-list-update', controllers.databaseManipulation.viewCompanyPhoneNumbersListUpdate);

app.get('/database-manipulation-homepage/company-phone-numbers-list-insert', controllers.databaseManipulation.viewCompanyPhoneNumbersListInsert);

app.get('/database-manipulation-homepage/company-phone-numbers-list-delete', controllers.databaseManipulation.viewCompanyPhoneNumbersListDelete);

app.get('/database-manipulation-homepage/item-type-and-model-information-update', controllers.databaseManipulation.viewItemTypeAndModelInformationUpdate);

app.get('/database-manipulation-homepage/item-type-and-model-information-insert', controllers.databaseManipulation.viewItemTypeAndModelInformationInsert);

app.get('/database-manipulation-homepage/item-type-and-model-information-delete', controllers.databaseManipulation.viewItemTypeAndModelInformationDelete);

app.get('/database-manipulation-homepage/user-card-update', controllers.databaseManipulation.viewUserCardUpdate);

app.get('/database-manipulation-homepage/user-card-insert', controllers.databaseManipulation.viewUserCardInsert);

app.get('/database-manipulation-homepage/user-card-delete', controllers.databaseManipulation.viewUserCardDelete);

// Queries getters and views
app.get('/api/queries-homepage/person-details', controllers.queries.getPersonDetails);

app.get('/api/queries-homepage/phone-numbers-list', controllers.queries.getPhoneNumbersList);

app.get('/api/queries-homepage/item-type-and-model', controllers.queries.getItemTypeAndModel);

app.get('/api/queries-homepage/available-items-per-type-and-model', controllers.queries.getAvailableItemsPerTypeAndModel);

app.get('/api/queries-homepage/available-items', controllers.queries.getAvailableItems);

app.get('/api/queries-homepage/scrapped-items', controllers.queries.getScrappedItems);

app.get('/api/queries-homepage/user-card', controllers.queries.getUserCard);

app.get('/api/queries-homepage/search-by-inventory-number', controllers.queries.getSearchByInventoryNumber);

app.get('/queries-homepage', controllers.queries.viewHomepage);

app.get('/queries-homepage/person-details', controllers.queries.viewPersonDetails);

app.get('/queries-homepage/phone-numbers-list', controllers.queries.viewPhoneNumbersList);

app.get('/queries-homepage/item-type-and-model-information', controllers.queries.viewItemTypeAndModel);

app.get('/queries-homepage/available-items-per-type-and-model', controllers.queries.viewAvailableItemsPerTypeAndModel);

app.get('/queries-homepage/available-items', controllers.queries.viewAvailableItems);

app.get('/queries-homepage/scrapped-items', controllers.queries.viewScrappedItems);

app.get('/queries-homepage/user-card', controllers.queries.viewUserCard);

app.get('/queries-homepage/search-by-inventory-number', controllers.queries.viewSearchByInventoryNumber);

app.get('/', controllers.general.viewGeneralHomepage);

app.get('*', controllers.general.viewEverythingElse);

app.get('/', controllers.general.viewGeneralHomepage);

app.get('*', controllers.general.viewEverythingElse);

server.listen(PORT, () => {
    console.log(`App is running on localhost:${PORT}`);
});