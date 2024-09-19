import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Searchdropdown = ({handlesearchType, windowSize}) => {


  const [isHovered, setIsHovered] = useState(false);
  const [filterToggle,setfilterToggle] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
var searchArray = ['climbs','city','postalcode','street']
const [searchType, setsearchType] = useState('climbs')
const filterRef = useRef(null);

const handleClick = (text) => {
setsearchType(text)
handlesearchType(text)
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
        borderRadius: '50%', // Keep the circle shape
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        fill="black"
        className="bi bi-filter"
        viewBox="0 0 16 16"
        style={{
          display: 'block',
        }}
      >
        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
      </svg>
    </div>

{filterToggle?(<div ref={filterRef} style = {{position:'absolute',left:windowSize.width>1000?'104px':'154px',width: windowSize.width>1000?'300px':'200px',marginTop: '7.5px'}}>
<ListGroup >
{searchArray.map((item, index) => (
  item !== searchType?(
  <ListGroup.Item 
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    backgroundColor: hoveredIndex === index ? 'Whitesmoke' : 'white',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS' 
  }}
  key={index} onClick={() => handleClick(item)}>
    {item}
  </ListGroup.Item>):null
))}
</ListGroup>
    </div>):null
}    
</div>
  
);


}

export default Searchdropdown