var GPWebPayRequest = require('../lib/request');

describe('GPWebPayRequest', function(){

    it('should sign', function(done){

        var request = new GPWebPayRequest({
            MERCHANTNUMBER: '9999999999',
            ORDERNUMBER: 3001,
            AMOUNT: 1000, // 10 EUR
            CURRENCY: 978,
            URL: 'https://zwizu.com/api/gateway/gpwebpay/'
        }, {
            privateKeyPath: 'test/test_key.pem',
            privateKeyPass: 'changeit',
            publicKeyPath: 'test/test_cert.pem'
        });

        request.sign(function(err){
            request.data.DIGEST.should.equal('q9uiEBuJ67xV0SfObDBbNQRAVRMjF4yUOHf5dm6JXrQ93o7xAp3I3NFWEtaOu7t8RsjxGayu+FsWm2F1qehWiTASTt2iZSnxaxiu4QtegILx+4RBL62GtUm+Gpcm/ee96zzDG3vW2Lc3vvvoN+gHkdW2Xz1XcQFopCUJzmfA8W5yXEH3tJhOAif4gl9oY7PIkOtopgtASwjMOaujkk2Nt7OMljjxHIaQIVCH4AekrQpXhuDRBYQ5Pq9GsTtTN0ccnLiOiNW34yVfTyElDVwgrdpZTilKe8wOaTWHqA91iCxDADVw44otjUsrq8OjNYMPqmD3CzJGhPf513z1vd2k/A==');

            console.log(request.getRedirectUrl());
            done();
        });
    });

});

