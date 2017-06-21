'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
 function $Promise(executor){
   if(typeof executor !== 'function') {
     throw new TypeError('executor is not a function');
   }

   var thisPromise = this;
   this._handlerGroups = [];
   this._state = 'pending';


   this._internalResolve = function(data){
     if(this._state === 'pending'){
        this._state = 'fulfilled';
        if(!this.hasOwnProperty('_value'))this._value = data;
        this._callHandlers();
      }
   };


   this._internalReject = function(data){
      if(this._state === 'pending'){
        this._state = 'rejected';
        if(!this.hasOwnProperty('_value'))this._value = data;
        this._callHandlers();
      }
   };

   this.then = function(fulfill, rej){
     if (this._state === 'pending') {
      var newPromise = new $Promise(executor);
        this._handlerGroups.push({
          successCb : (typeof fulfill === "function") ? fulfill : null,
          errorCb : (typeof rej === "function") ? rej : null,
          downstreamPromise : newPromise
        });
        return newPromise;
      } else if (this._state === "fulfilled") {
          fulfill(this._value);
      } else {
        if(rej) rej(this._value);
      }
   }

   this._callHandlers = function(){
    while(this._handlerGroups.length){
      var funcObj = this._handlerGroups.shift();
      if (this._state === "fulfilled") {
        if (funcObj.successCb){
           try {
            var returnVal = funcObj.successCb(this._value);
          } catch(err){
              funcObj.downstreamPromise._internalReject(err);
          }
           funcObj.downstreamPromise._internalResolve(returnVal);
        }
        else funcObj.downstreamPromise._internalResolve(this._value);
      } else {
        if (funcObj.errorCb){
          try {
            var returnVal = funcObj.errorCb(this._value);
          }catch(err){
              funcObj.downstreamPromise._internalReject(err);
          }
          funcObj.downstreamPromise._internalResolve(returnVal);
        }
        else funcObj.downstreamPromise._internalReject(this._value);
      }

    }

   }

   this.catch = function(myFunc){
    return this.then(null, myFunc);
   }
   var resolve = this._internalResolve.bind(this);
   var reject = this._internalReject.bind(this); //try with call later?
   executor(resolve, reject);
   return this;
 }





/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
