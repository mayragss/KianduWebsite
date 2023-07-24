'use strict'

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
require('dotenv').config();
const bareAddress = process.env.KUDI_API;


exports.CreateRestaurant = async (req, res, next) => {
    try {
        const body = {
            dscName: req.body.rest_dscName,
            dscNameExibicion: req.body.rest_dscNameExibicion,
            dtOpen: req.body.rest_dtOpen,
            codUserInc: "maya9251"
        };

        //  console.log('body \n'+ request)

        const response = await fetch(bareAddress+'/Restaurant/create', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        })
            .then(response => response.json())
            .then(data => res.send(data))
            .catch(error => console.error('Unable to get items.', error));
        await response;
    }
    catch (ex) {
        console.log(ex)
        return next(ex);
    }
};

exports.GetRestaurant = async (req, res, next) => {
    var code = req.params.code;
    console.log('starting GetRestaurant with ' + code)
    try {
        const response = await fetch(`${bareAddress}Restaurant?Code=${code}`);
        const data = await response.json();

        var restaurant = data.data.restaurant;
        var menu = data.data.menu;
        var items = data.data.menu.items;

        // address 

        menu.forEach(menuItem => {
            var category = menuItem.category;
            console.log('category \n' + JSON.stringify(category))

            menuItem.items.forEach(item => {
            });
        });

        console.log('\n restaurant.categoryDescription \n ' + JSON.stringify(data.data))

        if (data.valid) {
            //console.log('GetRestaurant data json' + JSON.stringify(data))
            return res.render('restaurant/details/index', { data: data.data, restaurant: restaurant, menu: menu, orderList: [] })
        } else {
            res.send("Send to error page")
        }
    }
    catch (ex) {
        console.log('ex ' + ex)
        return next(ex);
    }
};

exports.GetRestaurants = async (req, res, next) => {
    const code = req.params.code;
    var result;
    try {
        var filter = null;
        const response = await fetch(`${bareAddress}Restaurant/list`);
        const data = await response.json();

        const restaurants = data.data;

        restaurants.forEach(data => {
            const restaurant = data.restaurant;
            const restaurantAddress = data.restaurantAddress;
        });
        res.render('restaurant/list', { restaurants: restaurants });
    }
    catch (ex) {
        console.log(ex)
        return next(ex);
    }
};

exports.GetCreateRestaurant = async (req, res, next) => {
    res.render('restaurant/CreateRestaurant')
};

exports.GetRestaurantList = async (req, res, next) => {
    res.render('restaurant/template/list')
};

exports.GetRestaurantOne = async (req, res, next) => {
    res.render('template/one')
};