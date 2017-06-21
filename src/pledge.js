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
      }
   };


   this._internalReject = function(data){
      if(this._state === 'pending'){
        this._state = 'rejected';
        if(!this.hasOwnProperty('_value'))this._value = data;
      }
   };

   this.then = function(res, rej){
    this._handlerGroups.push({
      successCb : (typeof res === "function") ? res : null,
      errorCb : (typeof rej === "function") ? rej : null
    });
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
