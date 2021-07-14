const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      number: '636-342-3242',
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      number: '636-566-3242',
      joined: new Date(),
    }
  ]
}

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
  console.log('database');
  res.send(database.users);
});


app.post("/checkout",(req,res) => {
  console.log('check me out');
  const {name,email,number} = req.body;
  database.users.push({
      id: '126',
      name: name,
      email: email,
      number: number,
      joined: new Date()
  });
  res.json(database.users[database.users.length-1]);
});

app.post("/order",(req,res) => {
  if(req.body.number === database.users[0].number){
    res.json('success');
  }
  else {
    res.status(400).json('no such number');
  }
})

app.listen(3000,
  () => console.log('Port 3000 is working')
);

//order --> POST