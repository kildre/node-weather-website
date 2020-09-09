const log = console.log;
const path = require('path')
const express = require("express");
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const chalk = require("chalk")

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Date

const date = new Date()
const m = date.getUTCMonth() + 1
const d = date.getUTCDate()
const y = date.getUTCFullYear()
const full = m + '/' + d + '/' + y;

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kilian Berres',
        full
    })
}) 

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Abooot',
        name: 'Aengus Berres',
        date,
        full
    }
    )
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'H3Lp',
        name: 'Margaret Botkin',
        message: `This is the h3lp page. If you need h3lp for anything, then you will come to this page to find the h3lp you need.`,
        date,
        full
    })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
        error:'Address is required'
    })
  }
  
  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
      if (error) {
          return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecast) => {
          if (error) {
              return res.send({ error })
          }
          res.send({
              forecast: forecast,
              location,
              address: req.query.address
          })
      })

  })
 
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search is required!'
        })
    }

    log(req.query.search)
    res.send({
        products: []
    })
       
  });

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Kilian Berres',
        errorMessage: 'Sorry that help page does not exist'
    })
})

app.get('*', (req, res) => {
res.render('404',{
    title: '404',
    name: 'Kilian Berres',
    errorMessage: 'Looks like you went down the wrong rabbit hole'
})
})


// Starting server
app.listen(3000, () => {
  log("Server running on port: 3000!");
});
