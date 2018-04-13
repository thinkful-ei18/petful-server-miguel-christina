'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Queue = require('./queue');



const catApiData = [{
  imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
},
{
  imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_1cvH240d8UYYYJgY8d-Eh9BJZkr_EyqDAlkfjU05eikqXxdWg',
  imageDescription: 'White and Brown cat frowning',
  name: 'Smiles',
  sex: 'Male',
  age: 4,
  breed: 'Common Shorthair',
  story: 'Too awesome for last owner'
},
{
  imageURL: 'https://www.bluecross.org.uk/sites/default/files/assets/images/124044lpr.jpg',
  imageDescription: 'An inquisitive cat, with salt and pepper hair',
  name: 'Jake',
  sex: 'Female',
  age: 10,
  breed: 'Cat',
  story: 'Ran Away'
},
{
  imageURL: 'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
  imageDescription: 'A cat with its toung out',
  name: 'Barney',
  sex: 'Female',
  age: 11,
  breed: 'Tabby',
  story: 'Kicked out of the house for eating all the fish.'
}
];

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
  },
  {
    imageURL: 'https://www.rover.com/blog/wp-content/uploads/2015/07/greta-dressed-in-her-weiner-dog-costume.jpg',
    imageDescription: 'A dog wearing a costume',
    name: 'Vern',
    sex: 'Male',
    age: 8,
    breed: 'Weiner dog',
    story: 'Ran Away'
  },
  {
    imageURL: 'http://animals.sandiegozoo.org/sites/default/files/2016-12/Wolf_ZN.jpg',
    imageDescription: 'A wolf, with it\'s toung out',
    name: 'Rick',
    sex: 'Male',
    age: 9,
    breed: 'Wolf',
    story: 'Wandered into the shelter'
  }
];

let catQueue = new Queue();
let dogQueue = new Queue();

catApiData.forEach((cat) => catQueue.enqueue(cat));
dogApiData.forEach((dog) => dogQueue.enqueue(dog));




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

function peek(stack) {
  if (stack.first === null) {
    console.log('Theres nothing here!');
  }
  else return stack.first.value;
}



app.get('/cat', (req, res) => {
  res.json(peek(catQueue));
});

app.delete('/cat', (req, res) => {
  catApiData.dequeue();
});


app.get('/dogs', (req, res) => {
  res.json(peek(dogQueue));
});

app.delete('/dogs', (req, res) => {
  dogApiData.dequeue();
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
