const itemModelName = $('#item_model_name');
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
    const itemModelNameValue = itemModelName[0].value;
    // console.log(itemModelNameValue);

    if (itemModelNameValue == "") {
        console.log(' No Item model name selected');
        return resolve({ success: false, message: 'No Item model name selected' });
    } else {
        try {
            const response = await fetch('/api/queries-homepage/available-items-per-type-and-model?itemModelNameValue=' + itemModelNameValue);
            const json = await response.json();
            resolve(json);
        } catch (error) {
            resolve({ success: false, message: error.message });
        }
    }

});

const renderTable = data => {

    if (!data) {
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
        console.log(i);

        const tr = $('<tr>');
        const tdModelName = $('<td>').addClass("u-bold");
        tdModelName.textContent = data[i].modelName;

        const tdModelNameText = tdModelName.textContent;
        tdModelName.html(tdModelNameText);
        tdModelName.appendTo(tr);

        const tdInvNumber = $('<td>');
        tdInvNumber.textContent = data[i].invNumber;
        const tdInvNumberText = tdInvNumber.textContent;
        tdInvNumber.html(tdInvNumberText);
        tdInvNumber.appendTo(tr);

        tr.appendTo(tableBody);
    }

}

const errorHandle = () => new Promise(async (resolve, reject, error) => {

    const dataTable = $('data-table');
    const tableBody = $('tbody').appendTo(dataTable);
    tableBody.html('');
    const tr = $('<tr>');
    const td = $('<td>');
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


