const path = require('path')
const express = require('express')
const hbs = require('hbs')  //we require hbs for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))     // defining the root direcctory to render static components


//Setup handlebars engine nad views location
app.set('view engine' , 'hbs')                   //setting up hbs(handlebar)
app.set('views' , viewsPath)                     //setting up the path for views
hbs.registerPartials(partialsPath)


app.get('' , (req,res)=>{
    res.render('index' , {                       //to render dynamic content
        name:'Pulkift',
        type:'Weather'
    })         
})

app.get('/home' , (req,res) => {
    res.render('home' , {
        name:'Pulkit',
        type:'Home'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        name: 'Pulkit',
        type:'Help'.
        helpText: 'Help yourself'
    })
})

app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Enter address'
        })
    }
    // console.log(req.query.address)
        geocode(req.query.address , (error, {latitude,longitude,location}={})=>{
            if(!error){
                forecast(latitude,longitude,location,(error,forecastData)=> {
                    if(!error)
                    {
                        console.log(forecastData)
                        res.send({
                            forecast: forecastData,
                            location:location,
                        })
                    }
                    else{
                        res.send({ error })
                    }
                })
            }
            else{
                res.send({error})
            }
        })
    })

app.get('/product' , (req,res) => {
    if(!req.query.search)
    return res.send({
        error:'You must provide a search item'
    })
    // console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*' , (req,res) =>{
    res.render('404' ,{
        name:'Pulkit',
        errorMessage: 'Help not found',
        type:'404'
    })
})

app.get('*' , (req,res) => {
    res.render('404', {
        name:'Pulkit',
        errorMessage: '404 Page',
        type:'404'
    }) 
})


// app.get('', (req,res) => {
//     res.send("<h2>Yee Haw</h2>")
// })


app.listen(port , ()=>{
    console.log("Running on server "+port)
})