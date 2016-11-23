/**
 * Created by limeiting on 16/11/15.
 */
var local_storage=(function($,ls){
    if(typeof localStorage!=="undefined"){
        var ls=localstorage;
    }else{
        var ls=new Object();
        ls.setItem=function(state,data){
            this[state]=data;
        }
    }

    var local_storage=ls;

    local_storage.setData=function(state,data){
        ls.setItem(state,JSON.stringify(data));
    };
    local_storage.getData=function(state){
        return JSON.parse(ls[state]);
    };

    return local_storage;
})(jQuery,local_storage||{});