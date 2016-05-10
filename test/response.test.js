var GPWebPayResponse = require('../lib/response'),
    should = require('should');

describe('GPWebPayResponse', function(){

    it('should be valid', function(done){

        var response = new GPWebPayResponse({
            MERCHANTNUMBER: '9999999999',
            ORDERNUMBER: 3001,
            PRCODE: 0,
            SRCODE: 0,
            DIGEST: 'k0asFWWYAyaOH7tXBy93DJ5wd5xG5ICqiL9/oiGL77UEqg0Qyw3qShWvrMcRe0wIr2jpzpQYw4DGTTtU3t9JdwX42XW/nufKiHCFSaShGMUXYahmVFC70xX0XQCxgSBVWfar8HyqhAvKhZPbno86z4qH0SibXUZA/dESJDaHGWWDSvwZEbW3fqvD3Jgp/9q7qVHTtoDWKIZ28hJs+Y+SsT9vafdBHsAR8kxBwxxljuKzwZ1y1EODWvXvQRaOoj2JdHgBLIaiTX1kaQBC5fwx/ZPsq/FYgnTRWABNwckj/o/pkHbc75uz1X1iIMUCLmI3NwZMKT/bvYp3BEpd/L721A==',
            DIGEST1: 'rm49QqQ7g0vLhAV9L/me5W/dqfkueMbOBSxAcdQupLvMcmGXp7xhUBgwhsVINetFgKmoTm+NLbkrFwI3Al8wIdNLGCSY1OQXk9YniDJVfpDWnbfaxOBj0LqLUtbFcVhhaV2oEkNggI58DeBNzW3S4JcmX+oGu4cTgBhgYLArvhvEw1utpl7G6EoewOz62+6VCZIgPkDRkR3nH5iR5mF9LRfQtuKFWyceUoWkIfFYvPqlVPZAOkRf3HpBev5NPjBWzBXaVFtuYRstGCUxTwBzO+Dr88R2phQiWng+o+qH440plYMTH1Qwbr7jOgzDl0BuVvOuz6Gs4Xi2Hwk0iz4pxQ=='
        }, {
            privateKeyPath: 'test/test_key.pem',
            privateKeyPass: 'changeit',
            publicKeyPath: 'test/test_cert.pem'
        });

        response.validateSign(function(err, invalid){
            should.not.exist(err);
            should(invalid).be.exactly(null);
            done();
        });
    });

});

