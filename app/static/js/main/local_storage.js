/**
 * Created by limeiting on 16/11/15.
 */
var local_storage=(function($,ls){
    var local_storage=ls;
    if(typeof localStorage!=="undefined"){
        var ls=localstorage;
    }else{
        var ls=new Object();
        ls.setItem=function(state,data){
            this[state]=data;
        }
    }

    local_storage.setData=function(state,data){
        ls.setItem(state,data);
    };
    local_storage.getData=function(state){
        return ls[state];
    };

    return local_storage;
})(jQuery,local_storage||{});