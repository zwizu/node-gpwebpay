'use strict';

var gpwpConfig = require('./config'),
    GPWebPayRequest = require('./request'),
    GPWebPayResponse = require('./response'),
    ValidationError = require('./error');


module.exports = {
    version: gpwpConfig.version,
    supportedPaymentMethods: gpwpConfig.supportedPaymentMethods,
    /**
     * Configure
     */
    configure: function(configObj){
        for(var key in configObj){
            if(key === key.toUpperCase()){
                gpwpConfig.defaultData[key] = configObj[key];
            }else{
                gpwpConfig.defaultOptions[key] = configObj[key];
            }
        }
    },
    /**
     * Create payment
     */
    create: function(data, options, cb){
        if(!cb){
            cb = options;
            options = {};
        }
        var request = new GPWebPayRequest(data, options);
        var validateResponse = request.validateFields();
        if(validateResponse !== null){
            return cb(
                new ValidationError(validateResponse[0], validateResponse[1]),
                null
            );
        }
        request.sign();

        cb(null, request.getRedirectUrl());
    },
    /**
     * Confirm response data
     */
    confirm: function(data, options, cb){
        if(!cb){
            cb = options;
            options = {};
        }
        var response = new GPWebPayResponse(data, options);
        var validateResponse = response.validateFields();
        if(validateResponse !== null){
            return cb(
                new ValidationError(validateResponse[0], validateResponse[1]),
                null
            );
        }
        response.validateSign(function(err, invalid){
            if(err){
                return cb(err);
            }

            if(invalid !== null){
                return cb(
                    new ValidationError('Invalid security check.', [invalid]),
                    null
                )
            }

            return cb(null, response.isSuccess());
        });
    }
};