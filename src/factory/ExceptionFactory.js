/**
 * Created by sjwjames on 16/3/15.
 */
var ExceptionFactory = cc.Class.extend({
    exception:null,
    ctor: function () {
        this._super();
    },

});

ExceptionFactory.getNullArgumentExcption=function(){
    return new MyException("Argument is not Enough");
};
