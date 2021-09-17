
const firstName = $('#first-name');
const lastName = $('#last-name');

const loadButton = $('#load-data');

$(loadButton).click(async function (e) {
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
    const firstNameValue = firstName[0].value;
    const lastNameValue = lastName[0].value;

    if (firstNameValue == "" || lastNameValue == "") {
        console.log('Both firstName and lastName are required');

        return resolve({ success: false, message: 'Both firstName and lastName are required' });
    } else {
        try {
            const response = await fetch(`/api/queries-homepage/person-details?firstName=${firstNameValue}&lastName=${lastNameValue}`);
            const json = await response.json();
            resolve(json);
        } catch (error) {
            resolve({ success: false, message: error.message });
        }
    }

});

const renderTable = data => {

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


        const tdPhoneType = $('<td>').addClass("u-bold");
        tdPhoneType.textContent = data[i].phoneType;
        const tdPhoneTypeText = tdPhoneType.textContent;
        tdPhoneType.html(tdPhoneTypeText);
        tdPhoneType.appendTo(tr);


        const tdPhoneNumber = $('<td>').addClass("u-bold");
        tdPhoneNumber.textContent = data[i].phoneNumber;
        const tdPhoneNumberText = tdPhoneNumber.textContent;
        tdPhoneNumber.html(tdPhoneNumberText);
        tdPhoneNumber.appendTo(tr);

        tr.appendTo(tableBody);
    }

}

const errorHandle = () => new Promise(async (resolve, reject, error) => {

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


