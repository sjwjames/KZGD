/**
 * Created by sjwjames on 16/3/16.
 */
var MySchedule=cc.Class.extend({
    mySchedule:function(callback,interval,target){
        var then=Date.now();
        interval = interval*1000;
        target.schedule(function () {
            var now=Date.now();
            var delta=now - then;
            if (delta > interval){
                then = now - (delta%interval);
                callback.call(this);
            }
        }.bind(target),0);
    }

});
