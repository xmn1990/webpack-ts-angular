"use strict";
var angular = require('angular');
require('angular-route');
require('angular-cookies');
exports.app = angular.module('app', [
    'ngRoute', 'ngCookies',
]);
