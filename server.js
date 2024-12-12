const express = require("express")
const path = require("path")
const {connectToDB} = require('./db')
const Health = require('./models/dataset')
const monitorDocumentUntilOutcomeUpdated = require('./monitoring')

let app = express();
let PORT = 8000;

connectToDB('mongodb://127.0.0.1:27017/diabection').then(()=>{
    console.log("MongoDB Connected Successfully")
})



// Middlewares
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


// Routes
app.get('/', async(req, res)=>{
    return res.render('index')
})

app.post('/', async(req, res)=>{

    let data = req.body

    data = await Health.create(data)
    data = [data]
    // console.log(` Username: ${userData.username}\n Pregnancy: ${userData.pregnancies}\n Glucose: ${userData.glucose}, Blood Pressure: ${userData.bp}\n Skin Thickness: ${userData.skinthickness}\n Insulin: ${userData.insulin}\n BMI: ${userData.bmi}\n DiabetesPedigreeFunction: ${userData.dpf}\n Age: ${userData.age}`)


    return res.render('result', {data})
})

app.get('/result', async(req, res)=>{
    let data = await Health.find({})
    console.log(data)
    return res.render('result', {data})
})

app.get('/prediction', async(req, res)=>{
    res.render('prediction')
})



app.listen(PORT, ()=>{
    console.log("Server Plotted on Port", PORT);
})