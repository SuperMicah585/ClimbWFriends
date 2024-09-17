import React, { useState,useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const CreateMarker = ({ coordinates,queryType }) => {

  const map = useMap();
  const [marker,setMarker] = useState(0)

  const orangeIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
 
   
  //let marker;
  useEffect(() => {
    //console.log(queryType,"hellsfsdf")
    if (map && coordinates && (coordinates?.center || coordinates[0]?.center)) {

      if(marker !== 0){
        marker.remove()
      }

        setMarker(
          L.marker(coordinates.center, { icon: orangeIcon })
            .addTo(map)
            .bindPopup(coordinates.label)
        );

          


    if(!coordinates[0] ){
      if(map.getZoom()<6)
    map.flyTo(coordinates.center,6);
      else{
   
        map.flyTo(coordinates.center);
      }
    }
      //L.marker(coordinates.center, { icon: greenIcon }).addTo(map);
      
      // Optionally, you can center the map on the new marker
     
    } 
    
    
    else {
      console.error('Map or coordinates.center is not available');
    }
  }, [coordinates,map]);

  return null; // No UI rendering needed
};

export default CreateMarker;