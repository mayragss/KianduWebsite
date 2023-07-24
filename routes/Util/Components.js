'use strict'

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
require('dotenv').config();
const bareAddress = process.env.KUDI_API;

exports.GetDefaultComponents = async (req, res, next) => {
    res.render('util/components');
}