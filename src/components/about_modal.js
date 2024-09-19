import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';



const AboutModal = ({showAboutModal}) => {
 
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
    if(showAboutModal>0){
    setShow(true)
    }
   
}, [showAboutModal]);

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
      <Modal onHide={handleClose} style = {{fontFamily: 'Comic Sans MS'}}show = {show}>
        <Modal.Header>
          <Modal.Title style = {titleStyle} >About</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h6 style = {labelStyle}>Here is some unnecessary information about how the app works that may be interesting to some people.</h6> <br/>
          <ul>
            <li>To-do pages that get added have their climbs scraped from Mountain Project (MP). </li>
            <br/>
            <li>Climbs are put into buckets based on proximity of their location. Currently this distance is 200 meters.</li>
            <br/>
            <li>These buckets are then used to create a geojson object that creates features based on the unique latitude/longitude combinations. 
            These features can come in the following shapes based on these buckets:</li>
            <ul>
            
            <li ><span style = {labelStyle }> Point</span>: <br/>
                <ul>
                 <li>One unique lat/lng pair.</li> <br/>
                 <li>A linestring that has a distance of less than 0.3 kilometers.</li><br/>
                 <li>A polygon that has an area of less than 5000 meters.</li> <br/> 
                 </ul>  
                <i>The modifcation for the other shapes are done in order to make sure they are easily visible, as points have a default radius of 100 meters.</i>
                <br/>
                <br/>
            <li><span style = {labelStyle }> LineString</span>:</li>
                 <ul>
                    <li>Two unique lat/lng pairs.</li> <br/>
                    <li>Distance between the two points are greater than 0.3 kilometers.</li><br/>
                 </ul> 
                
            <li><span style = {labelStyle }> Polygon</span>:</li>
                 <ul>
                    <li>Three or more unique lat/lng pairs.</li> <br/>
                    <li>Has an area greater than 5000 meters.</li><br/>
                 </ul> 
            </li><br/>
            <li>
            Climbers that are added will have their name added as a label when a feature is clicked. The color of the label 
            will be based on the order the climber was added. You can see possible colors + order below. <br/>
            
            </li>
            <ol>
                <li style = {{color:'#FF8A8D'}}>Pink</li>
                <li style = {{color:'#FFC48A'}}>Peach</li>
                <li style = {{color:'#8FFFB0'}}>Green</li>
                <li style = {{color:'#89CFFF'}}>Blue</li>
                <li style = {{color:'#BB88FF'}}>Lavender</li>
                <li style = {{color:'#FF98C6'}}>Rose</li>
                <li style = {{color:'#7FE9B5'}}>Mint Green</li>
                <li style = {{color:'#FFB270'}}>Peach</li>
                <li style = {{color:'#FF70DC'}}>Magenta</li>
            </ol>
            <i>Note: Colors will start to repeat if more climbers are on the map than available colors.</i>
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

export default AboutModal;