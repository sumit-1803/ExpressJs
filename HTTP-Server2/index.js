const express = require('express');
const app = express();

app.use(express.json());

const users = [{
  name: "John Doe",
  kidneys:[{
    healthy:false
  }]
}];

app.get('/', (req, res) => { 
  let johnKidneys = users[0].kidneys;
  let numberOfKidneys = johnKidneys.length;
  let noOfHealthyKidneys = 0;
  for(let i=0; i<johnKidneys.length; i++){
    if(johnKidneys[i].healthy){
      noOfHealthyKidneys++;
    }
  }
  const noOfUnhealthyKidneys = numberOfKidneys - noOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    noOfHealthyKidneys,
    noOfUnhealthyKidneys
  });
});


app.put('/', (req, res) => { 
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    message: 'All kidneys are healthy'
  });
});




app.post('/', (req, res) => { 
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({healthy: isHealthy});

  res.json({
    message: 'Kidney added successfully'
  
  });
});





app.delete('/', (req, res) => { 
// return status code 411 if there are no unhealthy kidneys to remove
if(users[0].kidneys.length === 0){
  res.status(411).json({
    message: 'No unhealthy kidneys to remove'
  });
  return;}

  // remove all the unhealthy kidneys
  const newKidneys= [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys = users[0].kidneys.filter(kidney => kidney.healthy);
    }
    res.json({
      message: 'Unhealthy kidneys removed successfully'
    });
  }
);

app.listen(3000);