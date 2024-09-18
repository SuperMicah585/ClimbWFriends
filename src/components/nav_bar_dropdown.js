import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBarDropDown = ({handlesearchType}) => {


  const [isHovered, setIsHovered] = useState(false);
  const [filterToggle,setfilterToggle] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
var searchArray = ['Docs','Actions']
const filterRef = useRef(null);

const handleClick = (text) => {
///setsearchType(text)
//handlesearchType(text)
//d
setfilterToggle(false)
}
const toggleFilter = () =>{
  setfilterToggle(!filterToggle)
}


useEffect(() => {
  // Function to handle clicks outside the div
  const handleClickOutside = (event) => {
    if (!isHovered && filterRef.current && !filterRef.current.contains(event.target)) {
      setfilterToggle(false);
    }
  };

  // Add event listener
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup the event listener on component unmount
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isHovered]);


return (

 <div>
    <div
      style={{
        display: 'inline-block',
        padding: '5px', // Add padding to the circle
        borderRadius: '10%', // Keep the circle shape
        cursor: 'pointer',
        position: 'relative',
        zIndex: isHovered ? 10 : 1, // Raise the element when hovered
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.04)' : 'transparent', // Change background on hover
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFilter}
    >
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
    </div>

{filterToggle?(<div ref={filterRef} style = {{position:'absolute',left:'-7px',width:'100px',marginTop: '5px'}}>
<ListGroup >
{searchArray.map((item, index) => (

  <ListGroup.Item 
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    backgroundColor: hoveredIndex === index ? 'Whitesmoke' : 'white',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS, cursive',
    fontSize:'18px'
  }}
  key={index} onClick={() => handleClick(item)}>
    {item}
  </ListGroup.Item>
))}
</ListGroup>
    </div>):null
}    
</div>
  
);


}

export default NavBarDropDown