import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';



const UsageModal = ({showUsageModal}) => {
 
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);

/*
    useEffect(() => {
        if(climbsArray.length>0){
        setShow(true)
        }
    }, [climbsArray,showClimbModal]);

*/

useEffect(() => {
    if(showUsageModal>0){
    setShow(true)
    }
   
}, [showUsageModal]);

    const labelStyle = {

        color: '#cc5500',
      
      };

      const titleStyle = {

        color: '#048c7f',
      
      };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal onHide={handleClose} style = {{fontFamily: 'Comic Sans MS, cursive'}}show = {show}>
        <Modal.Header>
          <Modal.Title style = {titleStyle} >Usage</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <ul>
    
      
                 
            <li>The use of color for the created shapes helps visualize how much of the group wants to climb in a specific area. This is calculated using the following formula: <br/> <i style ={labelStyle}>unique climber names on feature/total climber names added to map</i></li>
                        <ul>
                            <li> 0% to 34% is <span style = {{color: 'purple'}}>purple</span> </li>
                            <li> > 34% to 67% <span style = {{color: 'blue'}}>blue</span> </li>
                            <li> > 67% to 100% is <span style = {{color: 'orange'}}>orange</span> </li>
                        </ul>
            

                  <br/>
                  <li>All shapes on the map are interactive. If you click on a shape it will do the following:</li>
                <ul>
                    <li>Display all climbs(grade,name) contained within the region that the shape defines.</li> <br/>
                    <li>Show all climbers that want to do each climb.</li> <br/>
                

                </ul>
     
            <li>This app does not use a database, so in order to 'save' a map you can do the following:</li>
                <ol>
                    <li>Press the 'Download' button. This will download all of the climbs as a json file from your current map.</li> <br/>
                    <li>When you want to use that map again, you can visualize the data using the 'file' option when you click the 'Add Climbs' button.</li> <br/>
                    <li>You can then add more climbers to this map, or just keep it as is.</li>

                </ol><br/>

                <li>To add climbs to the map:</li>
                    <ol>
                        <li>Click the 'Add Climbs' button</li>
                        <li>Stay on 'url', or switch to 'file' if you want to upload a json file.</li>
                        <ul>
                            <li> <span style = {labelStyle}>Url</span> </li> 
                                <ol>
                               <li>Navigate to the Mountain Project To-Do List that you want to add and copy and paste it in the text box.</li>  
                               <li>Add the name of the climber that you want to be assigned to these climbs.</li>
                               <li>Press Submit.</li> 
                                </ol>
              
                        </ul>
                        <br/>
                        <span style = {titleStyle}>OR</span>
                        <br/>
                        <br/>
                        <ul>
                            <li><span style = {labelStyle}>File</span></li> 
                                <ol>
                               <li>Press 'choose file' under the upload json file header.</li>  
                               <li>Navigate to the .json file that you want to visualize. This file should have been downloaded at some point from the map.</li>
                               <li>Press Submit.</li> 
                                </ol>
                        </ul>

                    </ol><br/>
            
                <li>You have the following search options to help you navigate the map:</li>
                <ul>
                    <li> <span style = {labelStyle }> Climbs</span> - allows the search of any added climb and will place a marker on its exact MP location</li> <br/>
                    <li><span style = {labelStyle }> City/street/postalcode </span> - allows for search using the chosen parameter. Uses nominatim.openstreetmap api and will place a marker based on the returned location  </li> <br/>
                

                </ul>

            
         </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick = {handleClose} size= 'sm' variant="outline-secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UsageModal;