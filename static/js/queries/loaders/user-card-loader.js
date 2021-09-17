
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
            const response = await fetch(`/api/queries-homepage/user-card?firstName=${firstNameValue}&lastName=${lastNameValue}`);
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


        const tdItemName = $('<td>').addClass("u-bold");
        tdItemName.textContent = data[i].itemName;
        const tdtdItemNameText = tdItemName.textContent;
        tdItemName.html(tdtdItemNameText);
        tdItemName.appendTo(tr);

        const tdinventoryNumber = $('<td>').addClass("u-bold");
        tdinventoryNumber.textContent = data[i].inventoryNumber;
        const tdinventoryNumbereText = tdinventoryNumber.textContent;
        tdinventoryNumber.html(tdinventoryNumbereText);
        tdinventoryNumber.appendTo(tr);

        tr.appendTo(tableBody);
    }

}

const errorHandle = (data) => new Promise(async (resolve, reject, error) => {
    console.log(data);
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


