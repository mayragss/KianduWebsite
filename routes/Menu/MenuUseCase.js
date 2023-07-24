'use strict'

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
require('dotenv').config();
const bareAddress = process.env.KUDI_API;


exports.GetByRestauranteId = async (req, res, next) => {
    try {
        fetch(bareAddress+'/Restaurant?ExhibitionName=KUDI%20COFFEE', {
            method: 'GET',
            headers: ({ 'user': 'may' })
        })
            .then(response => response.json())
            .then(data => res.send(data))
            .catch(error => console.error('Unable to get items.', error));
    }
    catch (ex) {
        console.log(ex)
        return next(ex);
    }
};