const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const port = 3000;
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');



app.use(cors());
// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// GET API 

app.get('/gettrackdata', (req, res) => {
  try {
    const filepath = gettrackdetails()
    // console.log("these are p details",filepath)
    res.json({ trackdetails: filepath });
}
  catch (error) {
    console.log(error)
  }
})


// PUT API 

app.post('/insert', (req, res) => {
  try {
    // console.log('Received data', req.body);

    const filepath = postdata();
    const jsondata = require(filepath);

    // Generate a random ID (convert to string)
    const randomId = Math.random().toString(36).substr(2, 9);
    console.log('id', randomId)
    const newTrackData = {
      id: randomId,
      ...req.body,
    };

    // console.log('Received data', newTrackData);

    jsondata.trackdetails.push(newTrackData);

    // Write the modified data back to the file
    fs.writeFileSync(filepath, JSON.stringify(jsondata, null, 2));

    // console.log('Updated data', jsondata);

    res.send({ statusCode: 200, message: 'Data added successfully' });
  } catch (error) {
    console.log('Internal error', error);
    res.status(500).send({ statusCode: 500, message: 'Internal Server Error' });
  }
});

// update api 

app.post('/update', (req, res) => {
  try {
    const filepath = postdata();
    const jsondata = require(filepath);

    // checking id is there or not in db  returns True or false
    const isIdInArray = jsondata.trackdetails.some(value => value.id === req.body.id);
    // filtering the matched data 
    const filteredData = jsondata.trackdetails.filter(value => value.id === req.body.id);


    const updatedData = jsondata.trackdetails.map(value => {
      if (value.id === req.body.id) {
        return Object.assign({}, value, { task: req.body.task });
      }
      return value;
    });
    fs.writeFileSync(filepath, JSON.stringify({ trackdetails: updatedData }, null, 2))

    console.log('Updated Data:', updatedData);
}
  catch (error) {
    console.log('Internal error', error);
    res.status(500).send({ statusCode: 500, message: 'Internal Server Error' });
  }

})

app.post('/delete',(req,res)=>{
  try{
    console.log('deleting',req.body)
    const filepath = postdata();
    const jsondata = require(filepath);

    const filtered=jsondata.trackdetails.findIndex(value=>value.id===req.body.id)
// console.log('deleted data is',filtered)
if(filtered !==-1){
  jsondata.trackdetails.splice(filtered,1)
  // console.log('deleted is',jsondata.trackdetails)
  
}
fs.writeFileSync(filepath, JSON.stringify(jsondata,null,2))

}
  catch (error){
    console.log('internal error',error)
  }
})



function gettrackdetails() {
  const data = fs.readFileSync('./db.json');
  const trackdata = JSON.parse(data).trackdetails
  return trackdata
}

function postdata() {
  const filepath = './db.json'
  if (!fs.existsSync(filepath)) {
    const initialdata = { trackdetails: [] }
    fs.writeFileSync(filepath, JSON.stringify(initialdata, null, 2));
  }
  return filepath

}