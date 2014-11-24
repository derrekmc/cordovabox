var hash = require('../index');
var assert = require('assert');
var async = require('async');

/*
Double checked with:

 $ echo -n "8888123456781395869402" | md5sum -
 bc3f2d4a1d3b21353ac07b87330feaf6  -
 $ echo -n "bc3f2d4a1d3b21353ac07b87330feaf6" | md5sum -
 3c01ef552859a67259e8c2252789fa2e  -
 $ echo -n "3c01ef552859a67259e8c2252789fa2e" | md5sum -
 352de4a94f80b5301278b05471ee224a  -

 */

function run_tests() {

    describe('hash test suite', function(){
        describe('has test suite', function(){
            it('hash()', function(done) {
                hash.hash('8888', '1395869402', function(error, md5sum) {
                    if(error) {
                        done(error);
                    } else {
                        assert("352de4a94f80b5301278b05471ee224a" == md5sum, "making sure the checksum is valid");
                        done();
                    }
                });
            });
            /*it('hash() speed test', function(done) {

                var loops = [];
                for(var i=0; i < 1000000; i++) {
                    loops.push(i);
                }

                async.each(loops, function(loopNumber, callback) {
                    console.log('loop# ' + loopNumber);
                    hash.hash('8888', '1395869402', function(error, md5sum) {
                        if(error) {
                            this.callback(error);
                        } else {
                            assert("352de4a94f80b5301278b05471ee224a" == md5sum, "making sure the checksum is valid");
                            this.callback(null);
                        }
                    }.bind({callback: callback}));
                }, function(err) {
                    done(err);
                });
            });*/
        });
    });
};

run_tests();