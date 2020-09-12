const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//directory paths to be used
const publicDirPath = path.join(__dirname,'../public')
const viewDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

//set values for app variables
app.set('view engine','hbs')
app.set('views',viewDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ajeya Hegde' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ajeya Hegde'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is the help! Let us know what help you need',
        title:'Help page',
        name:'Ajeya Hegde'
    })
})

app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'No address provided'
            })
        }

        geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            forecast( latitude, longitude, (error, forecastData)=>{
                if(error){
                       return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address:req.query.address
                })
            })

        })
})

app.get('/products',(req,res) => {
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        error:'Help article not found',
        title:'Help page',
        name:'Ajeya Hegde'
    })
})
app.get('*',(req,res) => {
    res.render('error',{
        error:'404, Page not found',
        title:'Weather',
        name:'Ajeya Hegde'
    })
})

app.listen(port,()=>{
    console.log('Server listening at port: '+port)
})