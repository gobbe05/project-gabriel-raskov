const express = require('express');
const path = require('path');
var nodemailer = require('nodemailer')
const cors = require("cors");
const { text } = require('express');

const mongoose = require("mongoose");
const { callbackify } = require('util');

const route = express.Router();
const PORT = process.env.PORT || 3001;
const app = express();

//app.use(express.static(path.resolve(__dirname)));

app.use(express.json());
app.use(cors())

const connectionString = "mongodb+srv://dbgobbe:dbgbb05bbe@cluster0.fo1f1.mongodb.net/project-database?retryWrites=true&w=majority"
mongoose.connect(connectionString)

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
     auth: {
          user: 'gabbe05gr@gmail.com',
          pass: 'gbb05bbe',
       },
  secure: true,
  });

app.post("/send", (req, res) => {
  let mailData = {
    from: `${req.body.mailerState.email}`,
    to: "gabbe05gr@gmail.com",
    name: `${req.body.mailerState.name}`,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `${req.body.mailerState.message}`,
  };

  mailData.html = `<b>Message Recieved </b>`+ `<br>` + mailData.from + `<br>` + `<br>`+ mailData.name + `<br>` + mailData.text + `<br/>`

  console.log(mailData)

    transporter.sendMail(mailData, (error, info) => {
      if(error) {
        res.json({
          status: "fail",
        })
      console.log(error)
      }
      else {
        console.log('==MESAGE SENT==')
        console.log(mailData.from)
        console.log(mailData.text)
        console.log(mailData.html)
        res.json({
          status: "success",
        });
      }
      
    })
})

const dataBody = {
    username: String,
    password: String,
    list: Array
}

const Data = mongoose.model("Data", dataBody)

app.post('/InsertUsername', async (req, res) => {
    let newData = new Data({
        username: req.body.username,
        password: req.body.password,
        list: req.body.list
    })
    let findOne = await Data.findOne({username: req.body.username})
    if(findOne == null) {
      console.log("posted" + newData)
      newData.save()
    }
    else {
      console.log("Username is alredy in use")
    }
    
  });

  app.post('/FetchUser', async (req, res) => {
        let data = await Data.findOne({username: req.body.tryUsername})
        res.json({data: data})
        console.log(data)
  });

  app.post("/FetchUsers", async (req, res) => {
      let data = await Data.find({})
      res.json({data:data})
  })

  app.post("/SaveTodoList", async (req,res) => {
      Data.updateOne({username: req.body.tryUsername}, {list:req.body.list}, (err, docs) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(docs)
        }
      })
  })

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });