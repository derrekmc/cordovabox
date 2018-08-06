var serverAddress = '/';

var online_status = function(){
    this.OFFLINE            = 0;
    this.ONLINE             = 1;
    this.ONBREAK            = 2;
}
var ONLINE_STATUS = new online_status();

var show_type = function(){
    this.STANDARD           = 1;
    this.PRIVATE            = 2;
    this.SPY                = 3;
    this.TIP                = 4;
    this.GROUP              = 5;
}
var SHOW_TYPE = new show_type();



var client_type = function(){
    this.SERVER             = 0;
    this.SUBSCRIBER         = 1;
    this.BROADCASTER        = 2;
    this.MODEL              = 3;
    this.MONITOR            = 4;
    this.ADMIN              = 5;
    this.USER_LIST          = 6;
}
var CLIENT_TYPE = new client_type();


var customer_type = function(){

    this.FREE_USER          = 1;
    this.PREMIUM_USER       = 2;
    this.USER_WITH_BALANCE  = 3;

}

var CUSTOMER_TYPE = new customer_type();