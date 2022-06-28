const express = require('express')
const path = require('path')
const engine = require('ejs-mate')
const app = express()
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');

const data = require('./data')

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/students', (req, res) => {
    res.render('index', { data })
})

app.get("/newstudent", (req, res) => {
    res.render("newstudent")
})

app.get('/students/:id', (req, res) => {
    const id = req.params.id
    const student = data.find(student => student.id === id)
    res.render('student', { student })
})


app.post("/newstudent", (req, res) => {
    req.body.id = uuidv4()
    data.push(req.body)
    res.redirect("/students")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})