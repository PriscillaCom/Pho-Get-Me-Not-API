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
      cartItems: '',
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      cartItems: '',
      number: '636-566-3242',
      joined: new Date(),
    }
  ]
}

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
  res.send(database.users);
});


app.post("/checkout",(req,res) => {
  console.log('check me out');
  const {name,email,number,cartItems} = req.body;
  database.users.push({
      id: '127',
      name: name,
      email: email,
      number: number,
      cartItems: cartItems,
      joined: new Date()
  });
  res.send(database.users[database.length - 1]);
});

app.post("/order",(req,res) => {
  database.users.forEach(user => {
    if(user.number === req.body.number)
      res.json('success');
  });
    res.status(400).json('no such number')
})

app.listen(3000,
  () => console.log('Port 3000 is working')
);

//order --> POST