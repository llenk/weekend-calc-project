//APP SETUP
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT  = process.env.PORT || 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//OPERATION HISTORY
let operationHistory = [];

//REQUESTS
app.post('/operation', (req, res) => {
    doMath(req.body);
    res.sendStatus(200);
});
app.get('/operation-history', (req, res) => {
    res.send(operationHistory);
});



//MATH FUNCTIONS
doMath = (operation) => {
    //conversion to numbers
    operation.x = Number(operation.x);
    operation.y = Number(operation.y);
    //
    if (operation.type == 'Add') {
        add(operation);
    }
    else if (operation.type == 'Subtract') {
        subtract(operation);
    }
    else if (operation.type == 'Multiply') {
        multiply(operation);
    }
    else if (operation.type == 'Divide') {
        divide(operation);
    }
    else if (operation.type == 'Delete') {
        deleteHistory();
    }
    else {
        error();
    }
}
add = (operation) => {
    let result = operation.x + operation.y;
    let calculation = `${operation.x} + ${operation.y} = ${result}`;
    operationHistory.unshift(calculation);
} 
subtract = (operation) => {
    let result = operation.x - operation.y;
    let calculation = `${operation.x} - ${operation.y} = ${result}`;
    operationHistory.unshift(calculation);
} 
multiply = (operation) => {
    let result = operation.x * operation.y;
    let calculation = `${operation.x} * ${operation.y} = ${result}`;
    operationHistory.unshift(calculation);
} 
divide = (operation) => {
    let result = operation.x / operation.y;
    let calculation = `${operation.x} / ${operation.y} = ${result}`;
    operationHistory.unshift(calculation);
} 
deleteHistory = () => {
    operationHistory = [];
}
error = () => {
    operationHistory.unshift('ERROR: Please specify operation type');
}

//SERVER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});