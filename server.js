const express = require("express")
const path = require("path")
const {connectToDB} = require('./db')
const Health = require('./models/dataset')
const monitorDocumentUntilOutcomeUpdated = require('./monitoring')
const cors = require('cors');

let app = express();
let PORT = 8000;

connectToDB('mongodb://127.0.0.1:27017/diabection').then(()=>{
    console.log("MongoDB Connected Successfully")
})



// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(cors());  // This allows all origins; adjust as necessary for security



// Routes
app.get('/', async(req, res)=>{
    return res.render('index')
})

app.post('/', async(req, res)=>{

    let data = req.body

    data = await Health.create(data)
    data = [data]
    // console.log(` Username: ${userData.username}\n Pregnancy: ${userData.pregnancies}\n Glucose: ${userData.glucose}, Blood Pressure: ${userData.bp}\n Skin Thickness: ${userData.skinthickness}\n Insulin: ${userData.insulin}\n BMI: ${userData.bmi}\n DiabetesPedigreeFunction: ${userData.dpf}\n Age: ${userData.age}`)


    // return res.render('result', {data})
    return res.redirect('/result')
})

app.get('/result', async(req, res)=>{
    let data = await Health.find({})
    return res.render('result', {data})
})

app.get('/prediction', async(req, res)=>{
    return res.render('prediction')
})

// app.post('/prediction', async(req, res)=>{
//     let data = req.body

//     console.log(data)
//     return res.render('prediction')
// })



app.post('/prediction', async (req, res) => {
    // Handle the request here
    let username = req.body.username

    let userData = await Health.findOne({username})
    console.log(userData)

    return res.render('prediction', {username});
});



app.listen(PORT, ()=>{
    console.log("Server Plotted on Port", PORT);
})