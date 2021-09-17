
const id= $('#person-id');
const deleteButton = $('#delete-person');

$(window).on('load', function () {
    requestDataCall();
});

async function requestDataCall() {
    const response = await requestDataGetPeople();
    if (response.success) {
        fillTable(response.data);
        console.log(response.data);
    } else {
        errorHandle(response);
    }
}

$(deleteButton).click(async function (e) {
    e.preventDefault();
    e.stopPropagation();

    toggleLoader(true);
    const response = await requestData();
    if (response.success) {
        renderTable(response.data);
    } else {
        errorHandle(response);
    }
    
    toggleLoader(false);
});


const requestData = () => new Promise(async (resolve, reject) => {

    const idValue = id[0].value;
    console.log(idValue);
    if (idValue === "" || idValue === undefined) {
        console.log('ID field is required!');

        return resolve({ success: false, message: 'ID is required!' });
    } else {
        try {
            const response = await fetch(`/api/database-manipulation-homepage/person-details-delete?id=${idValue}`);
            const json = await response.json();
            resolve(json);
        } catch (error) {
            resolve({ success: false, message: error.message });
        }
    }

});

const requestDataGetPeople = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(`/api/database-manipulation-homepage/person-details-delete-get-people`);
        const json = await response.json();
        resolve(json);
    } catch (error) {
        resolve({ success: false, message: error.message });
    }

});

const renderTable = data => {
console.log(data);
    if (!data || data.length == 0) {

        const dataTable = $('#data-table');
        const tableBody = $('tbody').appendTo(dataTable);
        tableBody.html('');
        const tr = $('<tr>');
        const td = $('<td>').addClass("u-bold");
        td.html('There is no data in the database for the provided person!');
        tr.append(td);
        tableBody.append(tr);

        return;
    }

    // Remove old data
    const dataTable = $('#data-table');

    const tableBody = $('tbody').appendTo(dataTable);
    tableBody.html('');
    const tableFooter = $('tfoot').appendTo(dataTable);
    tableFooter.html('');
    const tr = $('<tr>');

    const dataLength = data.length;
    let i;
    for (i = 0; i < dataLength; i++) {

        const tr = $('<tr>');
        
        const tdId = $('<td>').addClass("u-bold");
        tdId.textContent = data[i].id;
        const tdIdText = tdId.textContent;
        tdId.html(tdIdText);
        tdId.appendTo(tr);

        const tdFirstName = $('<td>').addClass("u-bold");
        tdFirstName.textContent = data[i].firstName;
        const tdFirstNameText = tdFirstName.textContent;
        tdFirstName.html(tdFirstNameText);
        tdFirstName.appendTo(tr);


        const tdLastName = $('<td>').addClass("u-bold");
        tdLastName.textContent = data[i].lastName;
        const tdLastNameText = tdLastName.textContent;
        tdLastName.html(tdLastNameText);
        tdLastName.appendTo(tr);

        const tdRole = $('<td>').addClass("u-bold");
        tdRole.textContent = data[i].role;
        const tdRoleText = tdRole.textContent;
        tdRole.html(tdRoleText);
        tdRole.appendTo(tr);


        const tdCountry = $('<td>').addClass("u-bold");
        tdCountry.textContent = data[i].country;
        const tdCountryText = tdCountry.textContent;
        tdCountry.html(tdCountryText);
        tdCountry.appendTo(tr);


        const tdRegion = $('<td>').addClass("u-bold");
        tdRegion.textContent = data[i].region;
        const tdRegionText = tdRegion.textContent;
        tdRegion.html(tdRegionText);
        tdRegion.appendTo(tr);


        const tdCity = $('<td>').addClass("u-bold");
        tdCity.textContent = data[i].city;
        const tdCityText = tdCity.textContent;
        tdCity.html(tdCityText);
        tdCity.appendTo(tr);


        const tdStreet = $('<td>').addClass("u-bold");
        tdStreet.textContent = data[i].street;
        const tdStreetText = tdStreet.textContent;
        tdStreet.html(tdStreetText);
        tdStreet.appendTo(tr);


        const tdDetails = $('<td>').addClass("u-bold");
        tdDetails.textContent = data[i].details;
        const tdDetailsText = tdDetails.textContent;
        tdDetails.html(tdDetailsText);
        tdDetails.appendTo(tr);


        tr.appendTo(tableBody);
    }

}

const fillTable = data => {

    if (!data || data.length == 0) {

        const dataTable = $('#data-table');
        const tableBody = $('tbody').appendTo(dataTable);
        tableBody.html('');
        const tr = $('<tr>');
        const td = $('<td>').addClass("u-bold");
        td.html('The people table in the database is empty!');
        tr.append(td);
        tableBody.append(tr);

        return;
    }

    // Remove old data
    const dataTable = $('#data-table');

    const tableBody = $('tbody').appendTo(dataTable);
    tableBody.html('');
    const tableFooter = $('tfoot').appendTo(dataTable);
    tableFooter.html('');
    const tr = $('<tr>');

    const dataLength = data.length;
    let i;
    for (i = 0; i < dataLength; i++) {

        const tr = $('<tr>');

        const tdId = $('<td>').addClass("u-bold");
        tdId.textContent = data[i].id;
        const tdIdText = tdId.textContent;
        tdId.html(tdIdText);
        tdId.appendTo(tr);

        const tdFirstName = $('<td>').addClass("u-bold");
        tdFirstName.textContent = data[i].firstName;
        const tdFirstNameText = tdFirstName.textContent;
        tdFirstName.html(tdFirstNameText);
        tdFirstName.appendTo(tr);


        const tdLastName = $('<td>').addClass("u-bold");
        tdLastName.textContent = data[i].lastName;
        const tdLastNameText = tdLastName.textContent;
        tdLastName.html(tdLastNameText);
        tdLastName.appendTo(tr);

        const tdRole = $('<td>').addClass("u-bold");
        tdRole.textContent = data[i].role;
        const tdRoleText = tdRole.textContent;
        tdRole.html(tdRoleText);
        tdRole.appendTo(tr);


        const tdCountry = $('<td>').addClass("u-bold");
        tdCountry.textContent = data[i].country;
        const tdCountryText = tdCountry.textContent;
        tdCountry.html(tdCountryText);
        tdCountry.appendTo(tr);


        const tdRegion = $('<td>').addClass("u-bold");
        tdRegion.textContent = data[i].region;
        const tdRegionText = tdRegion.textContent;
        tdRegion.html(tdRegionText);
        tdRegion.appendTo(tr);


        const tdCity = $('<td>').addClass("u-bold");
        tdCity.textContent = data[i].city;
        const tdCityText = tdCity.textContent;
        tdCity.html(tdCityText);
        tdCity.appendTo(tr);


        const tdStreet = $('<td>').addClass("u-bold");
        tdStreet.textContent = data[i].street;
        const tdStreetText = tdStreet.textContent;
        tdStreet.html(tdStreetText);
        tdStreet.appendTo(tr);


        const tdDetails = $('<td>').addClass("u-bold");
        tdDetails.textContent = data[i].details;
        const tdDetailsText = tdDetails.textContent;
        tdDetails.html(tdDetailsText);
        tdDetails.appendTo(tr);


        tr.appendTo(tableBody);
    }


}

const errorHandle = (data) => new Promise(async (resolve, reject, error) => {

    const dataTable = $('#data-table');
    const tableBody = $('tbody').appendTo(dataTable);
    tableBody.html('');
    const tr = $('<tr>');
    const td = $('<td>').addClass("u-bold");
    td.html('An error occured!');
    tr.append(td);
    tableBody.append(tr);

    const tdErrorMessage = $('<td>').addClass("u-bold");
    tdErrorMessage.textContent = data.message;
    const tdErrorMessageText = tdErrorMessage.textContent;
    tdErrorMessage.html(tdErrorMessageText);
    tdErrorMessage.appendTo(tr);

    resolve({ success: false, message: error });
});


