
const inventoryNumber = $('#inventory-number');


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
    const inventoryNumberValue = inventoryNumber[0].value;


    if (inventoryNumberValue == "") {
        console.log('Inventory number field is required!');

        return resolve({ success: false, message: 'Inventory number field is required!' });
    } else {
        try {
            const response = await fetch(`/api/queries-homepage/search-by-inventory-number?inventoryNumber=${inventoryNumberValue}`);
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

        const tdInventoryNumber = $('<td>').addClass("u-bold");
        tdInventoryNumber.textContent = data[i].inventoryNumber;
        const tdInventoryNumberText = tdInventoryNumber.textContent;
        tdInventoryNumber.html(tdInventoryNumberText);
        tdInventoryNumber.appendTo(tr);

        const tdModelName = $('<td>').addClass("u-bold");
        tdModelName.textContent = data[i].modelName;
        const tdModelNameText = tdModelName.textContent;
        tdModelName.html(tdModelNameText);
        tdModelName.appendTo(tr);

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


