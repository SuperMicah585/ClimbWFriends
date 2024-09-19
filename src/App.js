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
import NavBarDropDown from './components/nav_bar_dropdown'
import AboutModal from './components/about_modal'
import ContactModal from './components/contact_modal'
import UsageModal from './components/usage_modal'
/*
TODO

Allow the ability to download .json file of the current features
Allow the ability to upload .json file 
    -error handling
    -be able to add people to this file
Create the Docs for the navbar
Change view when screen gets smaller
//When width  of viewport is <1000 change to different style
//Docs will be modals in order to preserve current data
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
    const [showAboutModal,setShowAboutModal] = useState(0)
    const [showContactModal,setShowContactModal] = useState(0)
    const [showUsageModal,setShowUsageModal] = useState(0)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    
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

  const navBarCallback = (item) => {
    switch(item){
        case 'About':
            setShowAboutModal(showAboutModal+1)
          break
        case 'Usage':
            setShowUsageModal(showUsageModal+1)
          break
        case 'Contact':
            setShowContactModal(showContactModal+1)
          break
      }


  }

 

  
    useEffect(() => {
      // Handler to call on window resize
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      // Add event listener to track window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount



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

{windowSize.width>1000?
                (<>
                <div style = {{display:'flex'}}>
                <img src={sprout} style = {{marginLeft: '10px',marginTop:'5px',zIndex:1004,width:'60px', height:'60px', borderRadius: '50%' }} />
                <div style = {{marginLeft: '20px'}}> </div>
                <Navbar navBarCallback = {navBarCallback} style = {{zIndex:1004}}/>
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
                            //position: 'absolute',
                            marginLeft: '-43px',
                            marginTop: '23px',
                            height: '25px',
                            width: '25px',
                            
                        }}
                    >
                        <Searchdropdown windowSize = {windowSize} handlesearchType={handlesearchType} />
                    </div>
                </div>
                </>): 
                
                <div>
                <div
                    style={{
                        zIndex: 3000,
                        position: 'absolute',
                        left: '10px',
                        marginTop: '5px',
                        fontFamily: 'Comic Sans MS, cursive'
                    }}
                > 
                <NavBarDropDown navBarCallback = {navBarCallback} climbsArrayforSearch = {climbsArrayforSearch} addCimbModalShow = {addCimbModalShow}/>
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
                            width: '200px',
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
                            //position: 'absolute',
                            marginLeft: '-43px',
                            marginTop: '23px',
                            height: '25px',
                            width: '25px',
                        }}
                    >
                        <Searchdropdown windowSize = {windowSize} handlesearchType={handlesearchType} />
                    </div>
                </div>
                
                </div>}
            </div>

            <MapContainer
                center = {[0, 0]}
                minZoom={3}
                zoom={3}
                scrollWheelZoom={true}
                loadingControl={true}
                style={{ height: '100vh', width: '100%' }}
                zoomControl={false}

            >
            {windowSize.width>1000?(
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
                </div>):null}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=197c870678314254ae332bcd6f5661d0"
                />
                <GeoShapes climbgeoData = {climbgeoData} modalTrigger = {CimbModalShow} climbsArray = {setclimbsArray}/>
                <ClimbsModal nameButtonColorArray = {nameButtonColorArray} showClimbModal = {showClimbModal} climbsArray = {climbsArray}/>
                <AddClimbModal buttonColorCallback = {buttonColorCallback} climbsArrayCallback = {climbsArrayCallback} setGeoClimbData = {setGeoClimbData} modalTrigger = {showModal}/>
                <AboutModal showAboutModal = {showAboutModal}/>
                <ContactModal showContactModal = {showContactModal} />
                <UsageModal showUsageModal = {showUsageModal} />
                <CreateMarker
                    queryType={queryType}
                    coordinates={searchmarkerCoordinates}
                />
            </MapContainer>
        </div>
    );
}


export default App;
