'use strict';

function GPWebPayValidationError(message, fields){
    //Set the name for the ERROR
    this.name = this.constructor.name;

    this.message = message;
    this.fields = fields;
}

GPWebPayValidationError.prototype = Object.create(Error.prototype);

module.exports = GPWebPayValidationError;
