if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const path = require('path')
const engine = require('ejs-mate')
const app = express()
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const { student,attendance } = require("./firebase-data")
const axios = require('axios').default
const strongPaswordGenerator = require("strong-password-generator");

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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
    const attendanceData = await attendance.doc(id).get();
    let date =[]
    let time = []
    if(attendanceData.exists){
        const attendanceDataValue = attendanceData.data().attendance
        for(let i of attendanceDataValue){
            slt = i.split(",")
            date.push(slt[0])
            time.push(slt[1])
        }
    }
    const studentData = data[0]
    console.log(date,time)
    res.render('student', { studentData,date,time })
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
    const deleteAttendance = await attendance.doc(id).delete()
    const deleteData = await student.doc(data[0]).delete();
    await axios.post("http://192.168.225.59/delete", Finger_id);   
    res.redirect('/students')
})


app.get("/Attendance", async (req, res) => {
    res.render("Attendance_mark")
})


app.post("/Attendance", async (req, res) => {
    const {id} = req.body
    const attendanceData = await attendance.doc(id).get();
    const time = new Date().toLocaleString()
    if (!attendanceData.exists) {
        const data = attendanceData.data()
        const push = await attendance.doc(id).set({attendance:[time]})
    }
    else{   
    const attendanceUpdate = attendanceData.data().attendance
    attendanceUpdate.push(time)
    const push = await attendance.doc(id).update({attendance:attendanceUpdate})
}
    
    res.redirect(`/students/${id}`)
})

app.post("/studentDetails",async(req,res)=>{
    const {id,hash}= req.body;
    console.log(req.body)
    // console.log(id,hash)
    // const j = JSON.parse(req.body)
    const fireData = await student.get();
    let data = []
    fireData.forEach((doc) => {
        let value = doc.data();
        if(value.Finger_id === id){
            data.push(value);
        }
    });
    if(data.length){
        return res.send(data[0])
    }
    else{
        res.send(`not found`)
    }
})

app.get("/pass",(req,res)=>{
    let password = strongPaswordGenerator.generatePassword();
    res.send(password)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})