'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Queue = require('./queue');

function peak(stack) {
  if (stack.top === null) {
    console.log('Theres nothing here!');
  } else return stack.top.data;
}



// const cats = [{
//   imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
//   imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
//   name: 'Fluffy',
//   sex: 'Female',
//   age: 2,
//   breed: 'Bengal',
//   story: 'Thrown on the street'
// },
// {
//   imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_1cvH240d8UYYYJgY8d-Eh9BJZkr_EyqDAlkfjU05eikqXxdWg',
//   imageDescription: 'White and Brown cat frowning',
//   name: 'Smiles',
//   sex: 'Male',
//   age: 4,
//   breed: 'Common Shorthair',
//   story: 'Too awesome for last owner'
// }
// ];
const cats = new Queue();

const dogApiData = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoihttps://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi',
    imageDescription: 'A dog tilting it\'s head out of curiosity',
    name: 'Jack',
    sex: 'Female',
    age: 5,
    breed: 'Australian Shepard',
    story: 'Rescued from an earthquake.'
  }
];

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);



app.get('/cat', (req, res) => {
  res.json(cats.peak());
});

app.delete('/cat', (req, res) => {
  cats.dequeue();
});


app.get('/dogs', (req, res) => {
  res.json(dogs.peak());
});

app.delete('/dogs', (req, res) => {
  dogs.dequeue();
});



function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
