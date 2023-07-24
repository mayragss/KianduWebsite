const express = require('./Shared/Extensions/express');
const      app =  express();
const port = process.env.PORT || 8080;
const  bodyParser  = require( 'body-parser');
const path = require( 'path');
const methodOverride = require( 'method-override'); 
const menu = require('./routes/Menu/MenuUseCase.js');
const components = require('./routes/Util/Components.js') ;
const restaurant = require('./routes/restaurant/RestaurantUseCase_.js');


//const defaultEmail = "witelekomwebsite@outlook.com";
/*
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
  auth: {
    user: 'witelekomwebsite@outlook.com',
    pass: 'Witelekom123'
  },
  tls: {
      ciphers:'SSLv3'
  }
xxx
  
});*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.locals.success = req.success;
    res.locals.error = req.error;
    res.locals.msg = req.msg;
    next();
});

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// Template
app.use("/Restaurante/Template/One", restaurant.GetRestaurantOne);
app.use("/Restaurante/:code", restaurant.GetRestaurant);
app.use("/Restaurantes", restaurant.GetRestaurants);
app.use("/components", components.GetDefaultComponents);
app.use("/", restaurant.GetRestaurants);

app.get('*', (req,res)=>{
    res.redirect('/')
})

app.use((error, req, res, next) => {
    // render error page
    console.log(error)
    res.redirect('/');
})

app.listen(port,()=>{
    console.log('KIANDUFOOD USER SERVER ON '+port);
})