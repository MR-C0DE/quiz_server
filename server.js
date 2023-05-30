import 'dotenv/config'
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";



// Création du serveur
const app = express();
const PORT = process.env.PORT;
let interval;



// Ajout de middlewares
// source : https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466298-creez-une-route-get
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const websocketserver = createServer(app);
const io = new Server(websocketserver);

io.on('connection', function(socket){
  io.emit('message', 
  
  [
    {
        id:0,
        text: 'Au Moyen Âge, tout le monde était sale et mourait jeune',
        img: 'moyen_age',
        answers : false
    },
    {
        id:1,
        text: 'Napoléon était petit.',
        img: 'napoleon',
        answers : false
    },
    {
        id:2,
        text: 'La peste a décimé l’Europe.',
        img: 'peste',
        answers : true
    },
    {
        id:3,
        text: 'L’homme de Néandertal était une brute épaisse',
        img: 'homme',
        answers : false
    },
    {
        id:4,
        text: 'Les coureurs des bois étaient mal vus au temps de la Nouvelle-France',
        img: 'coureurs',
        answers : true
    }
  ]
  
  );
  console.log("connection user");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('disconnect', function(){
      console.log('a user us disconnected : ' + interval);
      clearInterval(interval);
  });

  socket.on('message', function(msg){
      console.log('message recu : ' + msg);
      io.emit('message', msg);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  
  socket.emit("FromAPI", response);
};

websocketserver.listen(PORT);
