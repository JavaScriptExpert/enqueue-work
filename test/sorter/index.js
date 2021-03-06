'use strict';

const fs = require('fs');

const onError = err => {
    throw err;
};

const onFileRead = (buffer, requestId) => {
    const numbers = JSON.parse(buffer);
    const result = sort(numbers);
    process.send({ result, requestId });
};

const sort = numbers => [].concat(numbers).sort();

process.on('message', ({ filename, requestId }) => {
    fs.readFile(filename, (err, buffer) => err ? onError(err) : onFileRead(buffer, requestId));
});
