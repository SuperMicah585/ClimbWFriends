import * as turf from '@turf/turf';

export function convertToGeoJSON(climbArray) {

  //let data = climbArray.map(climb => ({climber_names:climb.climber_names,coordinates:climb.coordinates,grade:climb.grade,name:climb.name,id:climb.id}));
  let data = JSON.parse(JSON.stringify(climbArray));

    const features = [];
    
    for (const location of data) {
        const feature = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: []
            },
            properties: {
              climbs: []       
            }
          };
        
        location.forEach((climb) => {
   
        //[[],[],[],[]]
        var inArrayTrigger = false
        var climbExists = false


        for(let item of feature.geometry.coordinates){
        //console.log(item)
        if(item[1] == climb.coordinates[1] && item[0] == climb.coordinates[0]){
          
          inArrayTrigger = true
          break
        }


        }
        //check to see if climb already exists. If so, add only the name 

        for(let item of feature.properties.climbs){

          if(item.id == climb.id){
  
            item.climber_names.push(climb.climber_names[0])
            climbExists = true
            break
          }

  
          }


        if(!inArrayTrigger){
          feature.geometry.coordinates.push(climb.coordinates)
        }
        if(!climbExists){
        feature.properties.climbs.push({'id': climb.id,"climber_names":climb.climber_names,'name':climb.name,'grade':climb.grade})
        }

    });
       
 
   
        if (feature.geometry.coordinates.length ===1){
            feature.geometry.coordinates = feature.geometry.coordinates[0]
            //console.log(JSON.stringify(feature, null, 2));
            
            features.push(feature);
        }

         else if((feature.geometry.coordinates).length===2){
            feature.geometry.type = 'LineString'
            //console.log(JSON.stringify(feature, null, 2));

            //const area = turf.area(convexHull);
           
            const coords = feature.geometry.coordinates; // Extract coordinates
            
            

            const line = turf.lineString(coords);

            const length = turf.length(line, { units: 'kilometers' });


              const avgCoord = coords.reduce(
                (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]], // Sum the coordinates
                [0, 0] // Initialize accumulator
              ).map(val => val / coords.length);
          

          if(length<.3){
            feature.geometry.type = 'Point'
            feature.geometry.coordinates = avgCoord
            //console.log(avgCoord,'avg')
          }
          //console.log(avgCoord,'coords')
          //console.log(length,'length')
          //console.log(feature,'feature')

          features.push(feature);
        }

        else{
            feature.geometry.type = 'Polygon'
            
            const pointsCollection = turf.featureCollection(feature.geometry.coordinates.map(coord => 
              
              
                
                turf.point(coord)));

            let convexHull = turf.convex(pointsCollection);
           // console.log(convexHull.geometry.coordinates)
           
            const area = turf.area(convexHull);
        
            if(area<5000){
              convexHull = turf.centroid(convexHull)
            }
            //console.log(turf.centroid(convexHull),"center")
            //console.log(convexHull,"polygon")

            convexHull.properties = feature.properties;
            

            features.push(convexHull)
            
            


        }

        

        //console.log(feature.geometry.type)
       // console.log(JSON.stringify(features, null, 2));
      
    }

    return {
      type: 'FeatureCollection',
      features
    };
  }



  export function convertData(climbingData) {
   
    const bucketArray = [];
    
    for (const climbObj of climbingData) {
      const mySet = new Set();
  
      for (let index = 0; index < bucketArray.length; index++) {
      
        for (const item of bucketArray[index]) {
          const from = turf.point(item.coordinates);
          const to = turf.point(climbObj.coordinates);
          const options = { units: "meters" };
  
          if (turf.distance(from, to, options) < 200) {
            mySet.add(index);
          }
        }
      }
      
      if (mySet.size === 0) {
    
        bucketArray.push([climbObj]);
      } else if (mySet.size === 1) {
        //if item already exists, then we need to add only the name to the array
  
     
  
        //if there is only one match(one subarray), then there is still the possibility that
        mySet.forEach((value) => {
          //console.log(value,"insidevalue")
    
          bucketArray[value].push(climbObj);

        });
  
      
      } else if (mySet.size > 1) {
        let tempinit = []
        let tmpArray = [];
        mySet.forEach((value) => {
          tempinit.push(...bucketArray[value]);
        });
      
       
        for (let index = 0; index < bucketArray.length; index++) {
          if (!mySet.has(index)) {
            tmpArray.push(bucketArray[index]);
          }
         
        }
    
        bucketArray.length = 0; // Clear existing bucketArray
        
    
        bucketArray.push(...tmpArray); // Update with new combined buckets
        bucketArray.push(tempinit)
       
      }
    }
  
    return bucketArray; // Return the processed data
  }