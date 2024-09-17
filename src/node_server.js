const express = require('express');
const turf = require('@turf/turf');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(cors());

// Endpoint to serve the climbing data
app.get('/mapdata', async (req, res) => {
  console.log('data')
  const mpURL = req.query.mpURL;
  const name = req.query.name;
  
  try {
    // Make a request to the Flask server
    const response = await axios.get('http://localhost:5000/scrapeclimbs', {
      params: { mpURL, name }
    });
    
    // Process the data and send the response
    const processedData = convertData(response.data);

    res.json(processedData); // Send processed data back to client
  } catch (error) {
    console.error('Error fetching data from Flask server:', error);
    res.status(500).json({ error: 'Failed to fetch data from Flask server' });
  }
});

function convertData(climbingData) {
  const bucketArray = [];
  
  for (const climbObj of climbingData) {
    const mySet = new Set();

    for (let index = 0; index < bucketArray.length; index++) {
    
      for (const item of bucketArray[index]) {
        const from = turf.point(item.coordinates);
        const to = turf.point(climbObj.coordinates);
        const options = { units: "meters" };

        if (turf.distance(from, to, options) < 500) {
          mySet.add(index);
        }
      }
    }

    if (mySet.size === 0) {
      bucketArray.push([climbObj]);
    } else if (mySet.size === 1) {
      //if item already exists, then we need to add only the name to the array

   

      
      mySet.forEach((value) => {
        bucketArray[value].push(climbObj);
      });

    
    } else if (mySet.size > 1) {
      let tempinit = []
      let tmpArray = [];
      mySet.forEach((value) => {
        tempinit.push(...bucketArray[value]);
      });
    
      console.log(tempinit,"tempinitArray")
      for (let index = 0; index < bucketArray.length; index++) {
        if (!mySet.has(index)) {
          tmpArray.push(bucketArray[index]);
        }
       
      }
      console.log(tmpArray,"tmparray")
      bucketArray.length = 0; // Clear existing bucketArray
      
      
      bucketArray.push(...tmpArray); // Update with new combined buckets
      bucketArray.push(tempinit)
      console.log(bucketArray,"both")
    }
  }
  //console.log(bucketArray)
  return bucketArray; // Return the processed data
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
