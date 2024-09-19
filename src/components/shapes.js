import React,{useRef,useEffect,useState} from 'react';
import {GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import data from './test.json'
import L from 'leaflet';
import * as turf from '@turf/turf';
import {convertToGeoJSON} from './data_parser';

  const GeoJSONMap = ({climbsArray,modalTrigger,climbgeoData}) => {

    const layerRef = useRef([]);
    const geoJSONRef = useRef(null);

    const [data,setData] = useState([])
    const [climberCount,setClimberCount] = useState(0)
    //console.log(geoJSONRef.current)
    const pointToLayer = (feature, latlng) => {
      
      return L.circle(latlng, {radius: 100});
    };



  useEffect(() => {

    const GeotoJsonData = convertToGeoJSON(climbgeoData)
    setData(GeotoJsonData)
   
}, [climbgeoData]);

useEffect(() => {
  //doing this way as its the only real way to update states correctly(that my little brain can think of)

  
  const total_climber_set = new Set()
  //console.log(data,"asdaijskdna")
  if (data?.features){

  for(let item of data.features){
    
    for(let climbs of item.properties.climbs){
      for(let climber_name of climbs.climber_names){
      
      total_climber_set.add(climber_name)
    
      }
    }
  }

  const climber_size = total_climber_set.size

  for(let item of data.features){

      
      item.properties.total_climbers = climber_size
    
    
  }
}

setClimberCount(total_climber_set.size)
  if(data?.features){

    geoJSONRef.current.clearLayers();
    geoJSONRef.current.addData(data)
    
  }



 
}, [data]);



  const shapeColor = (climberPercentage) => {
    if (climberPercentage <= 0.34) {
      return '#800080'; // Purple
    } else if (climberPercentage <= 0.67) {
      return '#008CFF'; // Blue
    } else if (climberPercentage <= 1) {
      return '#FFA500'; // Orange
    }
  };




    
const onEachFeature = (feature, layer) => {

  const tmpsetForNameCount = new Set()
  

  for(let item of feature.properties.climbs){
    for(let name_array of item.climber_names){
      tmpsetForNameCount.add(name_array)
    }
  }


  layerRef.current.push(layer);
  
  const climberPercentage = tmpsetForNameCount.size/feature.properties.total_climbers

  if(layer.feature.geometry.type == 'LineString'){


    layer.setStyle({
      fillColor: shapeColor(climberPercentage),
      color: shapeColor(climberPercentage),
      weight: 8,    // Increase line width
      opacity: 0.6,
  });

  }
 else {
    layer.setStyle({
        fillColor: shapeColor(climberPercentage),
        color: shapeColor(climberPercentage),
        weight: .5,
        fillOpacity: 0.6,
    });
}


  // Add event listeners to the layer
  layer.on('mouseover', function () {
     if(feature.geometry.type === 'LineString'){
      layer.setStyle({
        weight: 10,    // Increase line width
        opacity: 0.8,

    });
     }
      else{layer.setStyle({
          weight: 2,
          fillOpacity: 0.8,

      });
    }
  });

  layer.on('mouseout', function () {
    if(feature.geometry.type === 'LineString'){
      layer.setStyle({
        weight: 8,    // Increase line width
        opacity: 0.6,

    });
    }
      // Reset to the original style after hover
     else{ layer.setStyle({
          weight: .5,
          fillOpacity: 0.6,
 
      });
    }
  });

  layer.on('click', async (e) => {
      //console.log(feature.properties);
      modalTrigger()
      climbsArray(feature.properties.climbs)
  });
};

    return (

        <GeoJSON ref={geoJSONRef} data={data} onEachFeature={onEachFeature} pointToLayer={pointToLayer}/>
     
    );
  };
  
  export default GeoJSONMap;