const express = require('express')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const employee = require('./utils/employee.js')
const request = require('request')

//Define paths for Express Config
const path = require('path')
// console.log(__dirname)
console.log(path.join(__dirname, "/public"))
const publicPathDirectory = path.join(__dirname, "/public")
const viewsPath = path.join(__dirname, "/templates/views")
const partialsPath = path.join(__dirname, "/templates/partials")

//Setup Handlerbars engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.use(express.static(publicPathDirectory))

//Index Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Huzefa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        aboutMessage: 'About Weather Info',
        name: 'Huzefa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helper Page',
        message: 'We are here to help you',
        name: 'Huzefa'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'Address not found'
        })
    console.log("req.query:", req.query)
    geocode.geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error)
            return res.send({
                error
            })
        forecast.foreCast(longitude, latitude, (foreCastError, foreCastResponse) => {
            if (foreCastError)
                return res.send({
                    foreCastError
                })
            return res.send({
                forecast: foreCastResponse,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Cannot find search category'
        })
    }
    // console.log(req.query.search)
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/cutie-patootie', (req, res) => {
    res.render('cutie-patootie', {
        title: 'Cutie Patootie',
        name: 'Huzefa'
    })
})

app.get('/employee-index',(req,res)=>{
    res.render('employee-index',{
        name:'Huzefa',
        title:'Employee'
    })
})

app.get('/employee', (req, res) => {
    if (!req.query.id) {
        return res.send({
            error: 'Employee not found'
        })
    }
    console.log(req.query)
    employee.employeeFinder(req.query.id, (error, { employee_name: empName, employee_salary: sal } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        return res.send({
            empName,
            sal
        })
    })

})
// app.get('/about',(req,res)=>{
//     res.send("About Me")
// })

// app.get('/help',(req,res)=>{
//     res.send({"helper":"helper"} )
// })

//Error 404
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'Help article not found',
        name: 'Huzefa'

    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'Page Not Found',
        name: 'Huzefa'
    })
})


app.listen(3000, () => {
    console.log("Server started")
})

