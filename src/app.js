const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup Handlebar enginge and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Rohan"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Rohan"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Help Message",
        title: "Help",
        name: "Rohan"
    })
})


app.get("/weather", (req,res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     location: "Princeton",
    //     forecast: "Sunny, feels like 55 degrees",
    //     address: req.query.address
    // })
})

app.get("/products", (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req,res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Rohan"
    })
})

app.get("*", (req,res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Rohan"
    })
})

app.listen(port, () => {
    console.log("Server is running on port "+ port)
})