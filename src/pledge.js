'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
 function $Promise(executor){
   if(typeof executor !== 'function') {
     throw new TypeError('executor is not a function');
   }

   function resolve(val){
     console.log(val)
   }

   function reject(val){
     console.log(val)
   }

   executor(resolve, reject);

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
