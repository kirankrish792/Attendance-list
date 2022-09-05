if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const path = require('path')
const engine = require('ejs-mate')
const app = express()
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const { student } = require("./firebase-data")
const axios = require('axios').default
const strongPaswordGenerator = require("strong-password-generator");

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/students', async (req, res) => {
    const fireData = await student.get();
    let data = []
    fireData.forEach((doc) => {
        let value = doc.data();
        data.push(value)
    });
    res.render('index', { data })
})

app.get("/newstudent", (req, res) => {
    res.render("newstudent")
})

app.get('/students/:id', async (req, res) => {
    const id = req.params.id
    const fireData = await student.get();
    let data = []
    fireData.forEach((doc) => {
        let value = doc.data();
        if (value.id === id) {
            data.push(value)
        }
    });
    const studentData = data[0]
    res.render('student', { studentData })
})


app.post("/newstudent", async (req, res) => {
    let data = req.body
    data.id = uuidv4()
    // res.send(data)
    const push = await student.doc(data.id).set(req.body)
    res.redirect('/students')
})

app.delete('/students/:id', async (req, res) => {
    const id = req.params.id
    const fireData = await student.get();
    let data = []
    let Finger_id = ""
    fireData.forEach((doc) => {
        let value = doc.data();
        if (value.id === id) {
            data.push(doc.id)
            Finger_id = value.Finger_id
        }
    });
    console.log(Finger_id)

    const deleteData = await student.doc(data[0]).delete();
    await axios.post("http://192.168.225.59/delete", Finger_id);   
    res.redirect('/students')
})

app.get("/pass",(req,res)=>{
    let password = strongPaswordGenerator.generatePassword();
    res.send(password)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})