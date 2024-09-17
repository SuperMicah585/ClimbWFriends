import React, { useEffect,useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';



const DownloadButton = ({climbsArrayforSearch}) => {
const [isHovered, setIsHovered] = useState(false);
const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);

const map = useMap();


const downloadFile = () => {

  const data = new Blob([JSON.stringify(climbsArrayforSearch, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(data);
  
  // Create a link element
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json'; // File name for download
  document.body.appendChild(a);
  a.click();

  // Remove the link element after triggering the download
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};


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
  onClick={downloadFile}
>
<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"/>
  <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
</svg>
</div>

)




}

export default DownloadButton;