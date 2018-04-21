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
app.delete('/delete-history', (req, res) => {
    operationHistory = [];
    res.sendStatus(200);
});
app.post('/redo-operation', (req, res) => {
    findAndRedoOperation(req.body.st);
    res.sendStatus(200);
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
    operationHistory.unshift({calc: calculation, result: result});
};
subtract = (operation) => {
    let result = operation.x - operation.y;
    let calculation = `${operation.x} - ${operation.y} = ${result}`;
    operationHistory.unshift({calc: calculation, result: result});
};
multiply = (operation) => {
    let result = operation.x * operation.y;
    let calculation = `${operation.x} * ${operation.y} = ${result}`;
    operationHistory.unshift({calc: calculation, result: result});
};
divide = (operation) => {
    let result = operation.x / operation.y;
    let calculation = `${operation.x} / ${operation.y} = ${result}`;
    operationHistory.unshift({calc: calculation, result: result});
};
error = () => {
    operationHistory.unshift('ERROR: Please specify operation type');
};

//REDOING OPERATION
findAndRedoOperation = (calc) => {
    for (operation of operationHistory) {
        if (operation.calc == calc) {
            operationHistory.unshift(operation);
            calc = '';
        }
    }
};

//SERVER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});