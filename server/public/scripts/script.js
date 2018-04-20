console.log('javascript connected');
$(document).ready(onReady);

let operation = {
    x: 0,
    y: 0,
    type: ''
}

function onReady() {
    $('#add').on('click', function() {
        operation.type = 'Add';
    });
    $('#subtract').on('click', function() {
        operation.type = 'Subtract';
    });
    $('#multiply').on('click', function() {
        operation.type = 'Multiply';
    });
    $('#divide').on('click', function() {
        operation.type = 'Divide';
    });
    $('#equals').on('click', updateOperations);
    $('#clear').on('click', clearHistory);
}

function updateOperations() {
    sendOperation();
    //updateOperationHistory is inside the sendOperation call
    operation.type = ''; //reset operation
}

function sendOperation() {
    operation.x = $('#firstNumber').val();
    operation.y = $('#secondNumber').val();
    $.ajax({
        method: 'POST',
        url: '/operation',
        data: operation
    }).then(function(response) {
        updateOperationHistory();
    });
    $('input').val('');
}

function updateOperationHistory() {
    $.ajax({
        method: 'GET',
        url: '/operation-history'
    }).then(function(response) {
        $('#operationsList').empty();
        response.forEach(appendToDOM)
    });
}
function appendToDOM(item) {
    $('#operationsList').append(`<p>${item}</p>`);
}

function clearHistory() {
    operation.type = 'Delete';
    sendOperation();
}