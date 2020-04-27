var __suid_module = 
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports, "__esModule", {value: true});// Copyright 2017-2020 the Short Unique ID authors. All rights reserved. Apache license.
// @deno-types="./mod.d.ts"
var _versionjson = require('./version.json');

const DEFAULT_RANDOM_ID_LEN = 6;

const DIGIT_FIRST_ASCII = 48;
const DIGIT_LAST_ASCII = 58;
const ALPHA_LOWER_FIRST_ASCII = 97;
const ALPHA_LOWER_LAST_ASCII = 123;
const ALPHA_UPPER_FIRST_ASCII = 65;
const ALPHA_UPPER_LAST_ASCII = 91;

const DICT_RANGES = {
  digits: [DIGIT_FIRST_ASCII, DIGIT_LAST_ASCII],
  lowerCase: [ALPHA_LOWER_FIRST_ASCII, ALPHA_LOWER_LAST_ASCII],
  upperCase: [ALPHA_UPPER_FIRST_ASCII, ALPHA_UPPER_LAST_ASCII],
};

class ShortUniqueId {
  

  

  

  

  __init() {this.dictIndex = 0}

  __init2() {this.dictRange =[]}

  __init3() {this.lowerBound = 0}

  __init4() {this.upperBound = 0}

  

  /* tslint:disable consistent-return */
  log(...args) {
    const finalArgs = [...args];
    finalArgs[0] = `[short-unique-id] ${args[0]}`;
    /* tslint:disable no-console */
    if (this.debug === true) {
      if (typeof console !== 'undefined' && console !== null) {
        return console.log(...finalArgs);
      }
    }
    /* tslint:enable no-console */
  }
  /* tslint:enable consistent-return */

  constructor(options = {}) {;ShortUniqueId.prototype.__init.call(this);ShortUniqueId.prototype.__init2.call(this);ShortUniqueId.prototype.__init3.call(this);ShortUniqueId.prototype.__init4.call(this);
    this.counter = 0;
    this.debug = false;
    this.dict = [];
    this.version = _versionjson.version;

    const {
      dictionary: userDict,
      skipShuffle,
    } = options;

    if (userDict) {
      this.dict = userDict;
    } else {
      let i;
      /* tslint:disable no-multi-assign */
      this.dictIndex = i = 0;
      Object.keys(DICT_RANGES).forEach((rangeType) => {
        /* tslint:disable no-undef */
        const rangeTypeKey  = rangeType ;
        /* tslint:enable no-undef */
        this.dictRange = DICT_RANGES[rangeTypeKey];
        /* tslint:disable prefer-destructuring */
        this.lowerBound = this.dictRange[0];
        this.upperBound = this.dictRange[1];
        /* tslint:enable prefer-destructuring */
        for (
          this.dictIndex = i = this.lowerBound;
          this.lowerBound <= this.upperBound ? i < this.upperBound : i > this.upperBound;
          this.dictIndex = this.lowerBound <= this.upperBound ? i += 1 : i -= 1
        ) {
          this.dict.push(String.fromCharCode(this.dictIndex));
        }
      });
      /* tslint:enable no-multi-assign */
    }

    if (!skipShuffle) {
      // Shuffle Dictionary for removing selection bias.
      const PROBABILITY = 0.5;
      this.dict = this.dict.sort(() => Math.random() - PROBABILITY);
    }

    // Cache Dictionary Length for future usage.
    this.dictLength = this.dict.length;// Resets internal counter.
    this.counter = 0;
    this.debug = options.debug || this.debug;
    this.log(this.dict);
    this.log((`Generator instantiated with Dictionary Size ${this.dictLength}`));
  }

  getDict() {
    return this.dict;
  }

  /* Generates UUID based on internal counter that's incremented after each ID generation. */
  sequentialUUID() {
    let counterDiv;
    let counterRem;
    let id;
    id = '';
    counterDiv = this.counter;
    /* tslint:disable no-constant-condition */
    while (true) {
      counterRem = counterDiv % this.dictLength;
      counterDiv = Math.trunc(counterDiv / this.dictLength);
      id += this.dict[counterRem];
      if (counterDiv === 0) {
        break;
      }
    }
    /* tslint:enable no-constant-condition */
    this.counter += 1;
    return id;
  }

  /*  Generates UUID by creating each part randomly. */
  randomUUID(uuidLength = DEFAULT_RANDOM_ID_LEN) {
    let id;
    let randomPartIdx;
    let j;

    /* tslint:disable no-unused-vars */
    let idIndex;
    /* tslint:enable no-unused-vars */

    if ((uuidLength === null || typeof uuidLength === 'undefined') || uuidLength < 1) {
      throw new Error('Invalid UUID Length Provided');
    }

    // Generate random ID parts from Dictionary.
    id = '';
    /* tslint:disable */
    for (
      idIndex = j = 0;
      0 <= uuidLength ? j < uuidLength : j > uuidLength;
      idIndex = 0 <= uuidLength ? j += 1: j -= 1
    ) {
      randomPartIdx = Math.trunc(Math.random() * this.dictLength) % this.dictLength;
      id += this.dict[randomPartIdx];
    }
    /* tslint:enable */

    // Return random generated ID.
    return id;
  }

  getVersion() {
    return this.version;
  }
}

exports. default = ShortUniqueId;
module.exports = ShortUniqueId;

},{"./version.json":2}],2:[function(require,module,exports){
module.exports={"version": "2.0.7"}

},{}]},{},[1]);
var ShortUUID = __suid_module(1);