import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBarDropDown = ({addCimbModalShow,climbsArrayforSearch,navBarCallback}) => {

//Will have sub options appear as another bar that shoots out from dropdown as a 2nd column use triangle icon :) 
  const [isHovered, setIsHovered] = useState(false);
  const [filterToggle,setfilterToggle] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [docDropDownTrigger,setDocDropDownTrigger] = useState(false)
  const [actionsDropDownTrigger,setactionsDropDownTrigger] = useState(false)
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
const docs = ['About','Contact','Usage']
const actions = ['Download','Add Climbs']
const filterRef = useRef(null);
const actionsRef = useRef(null);
const docsRef = useRef(null);
const toggleRef = useRef(null);

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


const handleClick = (text) => {
switch(text){
 case 'Docs':
  setDocDropDownTrigger(!docDropDownTrigger)
  setactionsDropDownTrigger(false)
  break
 case 'Actions':
  setactionsDropDownTrigger(!actionsDropDownTrigger)
  setDocDropDownTrigger(false)
  break
 case 'Add Climbs':
  addCimbModalShow()
  setfilterToggle(false)
  setDocDropDownTrigger(false)
  setactionsDropDownTrigger(false)
  break
  case 'Download':
  downloadFile()
  setfilterToggle(false)
  setDocDropDownTrigger(false)
  setactionsDropDownTrigger(false)
  break
  case 'About':
    navBarCallback(text)
    setfilterToggle(false)
    setDocDropDownTrigger(false)
    setactionsDropDownTrigger(false)
    break
  case 'Usage':
    navBarCallback(text)
    setfilterToggle(false)
    setDocDropDownTrigger(false)
    setactionsDropDownTrigger(false)
    break
  case 'Contact':
    navBarCallback(text)
    setfilterToggle(false)
    setDocDropDownTrigger(false)
    setactionsDropDownTrigger(false)
    break


}



//setfilterToggle(false)
}
const toggleFilter = () =>{
  
  setfilterToggle(!filterToggle)
  setDocDropDownTrigger(false)
  setactionsDropDownTrigger(false)
}


useEffect(() => {
  // Function to handle clicks outside the div
  const handleClickOutside = (event) => {
 

    if ((!toggleRef.current?.contains(event.target)) && (!filterRef.current?.contains(event.target)) &&
    (!actionsRef.current?.contains(event.target)) &&
    (!docsRef.current?.contains(event.target))
    
    ) {
      //console.log(event)
      setfilterToggle(false);
      setDocDropDownTrigger(false)
      setactionsDropDownTrigger(false)
      
    }
  };

  // Add event listeners for both desktop and mobile
  document.addEventListener('mousedown', handleClickOutside);
  //document.addEventListener('touchstart', handleClickOutside); // for mobile devices

  // Cleanup the event listeners on component unmount
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
   // document.removeEventListener('touchstart', handleClickOutside);
  };
}, [isHovered]);


const DocsArrowSVG =() => {
  return(
    docDropDownTrigger?
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#048c7f" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
    </svg>:
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentcolor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg>
  )
}

const ActionsArrowSVG =() => {
  return(
    actionsDropDownTrigger?
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#048c7f" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
    </svg>:
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentcolor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg>
  )
}

return (

 <div>
    <div
      ref={toggleRef}
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
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill={filterToggle?"#048c7f" :"currentColor"} class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
    </div>

{filterToggle?(<div ref={filterRef} style = {{position:'absolute',left:'-7px',width:'100px',marginTop: '5px'}}>
<ListGroup >


  <ListGroup.Item 
  onMouseEnter={() => setHoveredIndex('Docs')}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    backgroundColor: hoveredIndex === 'Docs' ? 'Whitesmoke' : 'white',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS',
    fontSize:'18px'
  }}
  key={'Docs'} onClick={() => handleClick('Docs')}>
    
    {'Docs'} <div style ={{position: 'absolute',top:'0px',right:'0px',marginTop:'6.5px'}}><DocsArrowSVG/> </div>

  </ListGroup.Item>

  <ListGroup.Item 
  onMouseEnter={() => setHoveredIndex('Actions')}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    backgroundColor: hoveredIndex === 'Actions' ? 'Whitesmoke' : 'white',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS',
    fontSize:'18px'
  }}
  key={'Actions'} onClick={() => handleClick('Actions')}>
    
    {'Actions'} <div style ={{position: 'absolute',top:'0px',right:'0px',marginTop:'6.5px'}}><ActionsArrowSVG/> </div>

  </ListGroup.Item>
  

</ListGroup>
    </div>):null
}

{docDropDownTrigger?(<div ref={docsRef} style = {{position:'absolute',left:'95px',width:'110px',marginTop: '5px'}}>
<ListGroup >
{docs.map((item) => (

  <ListGroup.Item 
  onMouseEnter={() => setHoveredIndex(item)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    backgroundColor: hoveredIndex === item ? 'Whitesmoke' : 'white',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS',
    fontSize:'18px'
  }}
  key={item} onClick={() => handleClick(item)}>
    {item}
  </ListGroup.Item>
))}
</ListGroup>
    </div>):null
} 


{actionsDropDownTrigger?(<div ref={actionsRef} style = {{position:'absolute',left:'95px',width:'110px',marginTop: '48px'}}>
<ListGroup >
{actions.map((item) => (

  <ListGroup.Item 
  onMouseEnter={() => setHoveredIndex(item)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    backgroundColor: hoveredIndex === item ? 'Whitesmoke' : 'white',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS',
    fontSize:'18px'
  }}
  key={item} onClick={() => handleClick(item)}>
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