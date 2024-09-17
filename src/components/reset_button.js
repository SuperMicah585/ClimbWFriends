import React, { useEffect,useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';



const ResetButton = () => {
const [isHovered, setIsHovered] = useState(false);
const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);

const map = useMap();


const handleClick = () =>{
    map.flyTo([0,0],3)
}



return(

<div
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  style={{
    height: '30px',
    width: '30px',
    display: 'flex', // Use flexbox
    alignItems: 'center', // Center content vertically
    justifyContent: 'center', // Center content horizontally
    borderRadius: '50%', // Keep the circle shape
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s',
    backgroundColor: isHovered ? '#DCDCDC' : '#F5F5F5',
  }}
  onClick={handleClick}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill='black'
    class="bi bi-arrow-clockwise"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
    />
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
  </svg>
</div>

)




}

export default ResetButton;