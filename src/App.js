import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PrefixSearch from './components/prefix_search';
import Searchdropdown from './components/search_drop_down';
import CreateMarker from './components/createMarker';
import ResetButton from './components/reset_button';
import ClimbingDataButton from './components/add_climbing_data_button'
import GeoShapes from './components/shapes'
import AddClimbModal from './components/add_climb_modal'
import ClimbsModal from './components/climbs_Modal';
import sprout from './sprout.png'
import Navbar from './components/nav_bar'
import DownloadButton from './components/download_button'
/*
TODO

Allow the ability to download .json file of the current features
Allow the ability to upload .json file 
    -error handling
    -be able to add people to this file
Create the Docs for the navbar
Change view when screen gets smaller
*/
function App() {

    const [searchmarkerCoordinates, setsearchmarkerCoordinates] = useState([]);
    const [queryType, setqueryType] = useState('climbs');
    const [showModal,setShowModal] = useState(0)
    const [climbsArray,setClimbsArray] = useState([])
    const [showClimbModal,setShowClimbModal] = useState(0)
    const [climbgeoData,setClimbGeoData] = useState([])
    const [climbsArrayforSearch,setClimbsArrayforSearch] = useState([])
    const [nameButtonColorArray,setNameButtonColorArray] = useState({})
  

    
    const coordinatesCallback = (coordinates) => {
        setsearchmarkerCoordinates(coordinates);
    };

    const handlesearchType = (searchType) => {
    
        setqueryType(searchType);
    };

    const addCimbModalShow = () => {
      setShowModal((prevShowModal) => prevShowModal + 1);
  
  };

  const setclimbsArray = (climbArray) => {
    setClimbsArray(climbArray)
  }


  const CimbModalShow = () => {
    setShowClimbModal((prevshowClimbModal) => prevshowClimbModal + 1);

};

const setGeoClimbData = (climbArray) => {
    setClimbGeoData(climbArray)
  }

  const climbsArrayCallback = (array) => {

    setClimbsArrayforSearch(array)


  }

 

  const buttonColorCallback = (dic) => {
   // console.log(Object.keys(dic).length,"asdaklsdmalksdmakls")
    setNameButtonColorArray(dic)


  }



    return (
        <div style={{ height: '100vh' }}>
            <div
                style={{
                    height: '70px',
                    position: 'absolute',
                    zIndex: 999,
                    top: '0px',
                    left: '0px',
                    width: '100%', // Adjust width as needed
                    backgroundColor: '#F5F5F5',
                    border: '1px solid #c4c4c4',
                    alignItems: 'center',
                }}
            >
                <div style = {{display:'flex'}}>
                <img src={sprout} style = {{marginLeft: '10px',marginTop:'5px',zIndex:1004,width:'60px', height:'60px', borderRadius: '50%' }} />
                <div style = {{marginLeft: '20px'}}> </div>
                <Navbar style = {{zIndex:1004}}/>
                </div>
                <div
                    style={{
                        left: '0px',
                        marginTop: '0px',
                        width: '150px',
                        position: 'relative',
                        zIndex: 1004,
                    }}
                >
                </div>
                
                <div
                    style={{
                        zIndex: 1004,

                        position: 'absolute',
                        top: '0px',
                        left: '50%',
                        width: '500px', // Adjust width as needed
                        height: '100px', // Adjust height as needed
                        transform: 'translateX(-50%)', // Center the element horizontally
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            marginTop: '7px',
                            width: '300px',
                            maxHeight: '50px',
                        }}
                    >
                        <PrefixSearch
                            searchType={queryType}
                            coordinatesCallback={coordinatesCallback}
                            climbsArrayforSearch = {climbsArrayforSearch}
                        />
                    </div>
                    <div style={{ marginRight: '10px' }}></div>
                    <div
                        style={{
                            backgroundColor: 'white',
                            zIndex: 3000,
                            postition: 'absolute',
                            marginLeft: '-43px',
                            marginTop: '23px',
                            height: '25px',
                            width: '25px',
                        }}
                    >
                        <Searchdropdown handlesearchType={handlesearchType} />
                    </div>
                </div>
            </div>

            <MapContainer
                center = {[0, 0]}
                zoom={3}
                scrollWheelZoom={true}
                loadingControl={true}
                style={{ height: '100vh', width: '100%' }}
                zoomControl={false}
            >
                <div
                    style={{
                        zIndex: 1000,
                        position: 'absolute',
                        right: '25px',
                        marginTop: '15px',
                        display:'flex',
                        alignItems: 'flex-end',
                        fontFamily: 'Comic Sans MS, cursive'
                    }}
                > 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <DownloadButton climbsArrayforSearch = {climbsArrayforSearch} />
                Download
                </div>
                <div style ={{marginRight: '30px'}}></div>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <ClimbingDataButton modalTrigger={addCimbModalShow} />
                    Add Climbs
                    </div>
                    <div style ={{marginRight: '30px'}}></div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>  
                <ResetButton/>
                Reset View
                </div>
                <div style ={{marginRight: '30px'}}></div>
                </div>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=197c870678314254ae332bcd6f5661d0"
                />
                <GeoShapes climbgeoData = {climbgeoData} modalTrigger = {CimbModalShow} climbsArray = {setclimbsArray}/>
                <ClimbsModal nameButtonColorArray = {nameButtonColorArray} showClimbModal = {showClimbModal} climbsArray = {climbsArray}/>
                <AddClimbModal buttonColorCallback = {buttonColorCallback} climbsArrayCallback = {climbsArrayCallback} setGeoClimbData = {setGeoClimbData} modalTrigger = {showModal}/>
                <CreateMarker
                    queryType={queryType}
                    coordinates={searchmarkerCoordinates}
                />
            </MapContainer>
        </div>
    );
}


export default App;
