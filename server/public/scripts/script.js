console.log('javascript connected');
$(document).ready(onReady);

let operation = {
    x: 0,
    y: 0,
    type: ''
};
let justAnswered = false;

function onReady() {
    $('.num').on('click', updateInput);
    $('.op').on('click', inputOperation);
    $('#equals').on('click', updateOperations);
    $('#clear').on('click', clearHistory);
}

function updateInput() {
    let currentNum = $('#numInput').val();
        currentNum += $(this).attr('id');
    if (justAnswered) {
        let currentNum = $(this).attr('id');
    }
    $('#numInput').val(currentNum);
}

function inputOperation() {
    operation.x = $('#numInput').val();
    $('#numInput').val('');
    operation.type = $(this).attr('id');
}

function updateOperations() {
    sendOperation();
    //updateOperationHistory is inside the sendOperation call
    operation.type = ''; //reset operation
}

function sendOperation() {
    operation.y = $('#numInput').val();
    $('#numInput').val('');
    $.ajax({
        method: 'POST',
        url: '/operation',
        data: operation
    }).then(function(response) {
        updateOperationHistory();
    });
    justAnswered = true;
}

function updateOperationHistory() {
    $.ajax({
        method: 'GET',
        url: '/operation-history'
    }).then(function(response) {
        $('#operationsList').empty();
        response.forEach(appendToDOM);
        $('#numInput').val(response[0].result);
    });
}

function appendToDOM(item) {
    $('#operationsList').append(`<p id="hist">${item.calc}</p>`);
}

function clearHistory() {
    // TODO: make this a DELETE ajax call
    $.ajax({
        method: 'DELETE',
        url: '/delete-history'
    }).then(function(response) {
        updateOperationHistory();
    });
}