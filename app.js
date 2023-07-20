const express = require('express');
const _ = require('underscore');

var port = process.env.PORT || 8080;
var animals = {
    "cat": "meow",
    "dog": "bark",
    "eel": "hiss",
    "bear": "growl",
    "frog": "croak",
    "lion": "roar",
    "cow": "moo"
}

function getAnimal() {
  return animal = _.sample(Object.entries(animals));
}

const app = express();

app.get('/', function(req, res){
  const [animal_name, sound] = getAnimal();
  const htmlResponse = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        background-color: black;
        color: white;
        font-family: 'Patrick Hand SC', cursive;
        text-align: center;
        padding-top: 40px;
      }
  
      p {
        font-size: 30px;
        margin: 5px;
      }
  
      p:nth-child(odd) {
        color: #00ff00; /* Green color for odd paragraphs */
      }
  
      p:nth-child(even) {
        color: #ff0000; /* Red color for even paragraphs */
      }
  
      .title {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 20px;
      }
  
      @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap');
    </style>
  </head>
  <body>
    <div class="title">Old MacDonald had a farm.</div>
    <p>E-I-E-I-O</p>
    <div class="animal-sound">And on his farm he had a ${ animal_name }.</div>
    <p>E-I-E-I-O</p>
    <div class="animal-sound">With a ${ sound }-${ sound } here.</div>
    <div class="animal-sound">And a ${ sound }-${ sound } there.</div>
    <p>Here a ${ sound }, there a ${ sound }.</p>
    <div class="animal-sound">Everywhere a ${ sound }-${ sound }.</div>
  </body>
  </html>  
  `;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(htmlResponse);
  res.end();
});

app.get('/api', function(req, res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(animals));
  res.end();
})

module.exports =  app.listen(port, () => {
  console.log(`Launching server on http://localhost:${ port }`)
});
