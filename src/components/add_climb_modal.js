import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useEffect, useState } from 'react';
import {convertData} from './data_parser';



const types = [
    { name: 'url', value: '1' },
    { name: 'file', value: '2' }
  ];

  const bootstrapColors = [
    '#FF8A8D', // Darker Pink
    '#FFC48A', // Darker Peach
    '#8FFFB0', // Darker Green
    '#89CFFF', // Darker Blue
    '#BB88FF', // Darker Lavender
    '#FF98C6', // Darker Rose
    '#7FE9B5', // Darker Mint Green
    '#FFB270', // Darker Peach
    '#FF70DC', // Darker Magenta
  ];


  //limit uploaded file to 3mb
const AddClimbModal = ({modalTrigger,setGeoClimbData,climbsArrayCallback,buttonColorCallback})=> {
    const [mpURL,setmpURL] = useState('')
    const [name,setName] = useState('')
    const [show, setShow] = useState(false);
    const [mpData,setMpData] = useState([])
    const [bootstrapIndex,setbootstrapIndex] = useState(0)
    const [colorDic,setColorDic] = useState({})
    const [isLoading,setIsloading] = useState(false)
    const [errorAlert,seterrorAlert] = useState(false)
    const [errorAlertUpload,setErrorAlertUpload] = useState(false)
    const [inputGeoData, setInputGeoData] = useState([]);
    const [nameErrorAlert,setNameErrorAlert] = useState(false)

    const handleClose = () => {
      setInputGeoData([])
      setmpURL('')
      setName('')
      seterrorAlert(false)
      setErrorAlertUpload(false)
      setNameErrorAlert(false)
      setShow(false)}
    const [radioValue, setRadioValue] = useState('1');

    
    const handleChange = (event) => {
      setmpURL(event.target.value) 
      seterrorAlert(false)
    };

    useEffect(() => {
        if(modalTrigger>0){
        setShow(true)
        }
    }, [modalTrigger]);


    const handleSubmit = () => {
      let data = []
      setIsloading(true)
      try{
      if(inputGeoData.length>0){
        let tmp1 = [...mpData]
        let tmp2 = [...inputGeoData]
        data = tmp1.concat(tmp2);
         
        const nameSetForColors = new Set()
        const processedData = convertData(data);

        for (let item of data){
          nameSetForColors.add(item.climber_names[0])
          
        }

        let bootstrapIndextmp = bootstrapIndex;
        let updatedColorDic = { ...colorDic }; // Start with a copy of colorDic
        
        // Iterate through the set of names and assign colors
        for (let name of nameSetForColors) {
          updatedColorDic[name] = bootstrapColors[bootstrapIndextmp % 9]; // Assign a color from bootstrapColors
          bootstrapIndextmp++;
        }


        setMpData(data)
        setGeoClimbData(processedData)
        climbsArrayCallback(data)


        ///
        


        setColorDic(updatedColorDic)
        buttonColorCallback(updatedColorDic)
        setbootstrapIndex(bootstrapIndextmp)
         //need to change this at some point - biggy currently due to disabling of button
        setIsloading(false)
        handleClose()
        
      }
      else{
        setErrorAlertUpload(true)
        setIsloading(false)
      }

    }

    catch{
      setErrorAlertUpload(true)
      setIsloading(false)

    }


    };


    const handleFileInput = (event) => {
      const file = event.target.files[0]; // Get the first file
  
      if (file && file.type === 'application/json' && file.size <= 1024 * 1024) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
     
            setInputGeoData(data); // Set the JSON data to state
            setErrorAlertUpload(false); // Clear error if JSON is successfully parsed
          } catch {
            setErrorAlertUpload(true); // Set error if JSON parsing fails
          }
        };
  
        reader.onerror = () => {
          setErrorAlertUpload(true); // Set error if file reading fails
        };
  
        reader.readAsText(file); // Read file as text
      } else {
        setErrorAlertUpload(true); // Set error for invalid file type or size
      }
    };




    const addOnClick = async () => {

      const check = [
        'https:',
        '',
        'www.mountainproject.com',
        'user',
        '',
        '',
        'climb-todo-list'
      ]
      let data = []
      setIsloading(true)
      const urlCheck = mpURL.split('/')

        if (!(
            (urlCheck[0] === check[0]) && 
            (urlCheck[1] === check[1]) && 
            (urlCheck[2] === check[2]) && 
            (urlCheck[3] === check[3]) && 
            (urlCheck[6] === check[6]) &&
            (urlCheck.length === check.length) 
        )) {
   
        setIsloading(false)
        seterrorAlert(true)
      }

      else if (name.length<1){
        setNameErrorAlert(true)
        setIsloading(false)
      }
    
      else{
      try {
        // Make a request to the Flask server using fetch
        const fetchResponse = await fetch(`https://phelpsm4.pythonanywhere.com/scrapeclimbs?mpURL=${encodeURIComponent(mpURL)}&name=${encodeURIComponent(name)}`);
    
        if (!fetchResponse.ok) {
          setIsloading(false)
          seterrorAlert(true)
        }
    
        else{
        // Convert the response to JSON
        const responseData = await fetchResponse.json();

        if(mpData.length>0){  
          let tmp1 = [...mpData]
          let tmp2 = [...responseData]
          data = tmp1.concat(tmp2);
          
          const processedData = convertData(data);
          setMpData(data)
          setGeoClimbData(processedData)
          climbsArrayCallback(data)
          
        }
        else{
          data = [...responseData]
          const processedData = convertData(data);
          setMpData(data)
          setGeoClimbData(processedData)
          climbsArrayCallback(data)
        
        }
        
        const updatedColorDic = { ...colorDic, [name]: bootstrapColors[bootstrapIndex % 9] };

        
        setColorDic(updatedColorDic)
        buttonColorCallback(updatedColorDic)
        setbootstrapIndex(bootstrapIndex+1)
        setIsloading(false)
        handleClose()
      }
      } catch (error) {
        console.error('Error fetching data from Flask server:', error);
        setIsloading(false)
      }
    }
    };



    const mpInput = (
      <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style = {{ marginTop: '5px',fontFamily: 'Comic Sans MS, cursive'}}>Mountain Project URL</Form.Label>
              <Form.Control
                  isInvalid	= {errorAlert} 
                  onChange={(event) => {handleChange(event)}} 
                  type="input" 
                  placeholder="https://www.mountainproject.com/..../climb-todo-list" 
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Micah">
              <Form.Label style = {{fontFamily: 'Comic Sans MS, cursive'}}>Climber Name</Form.Label>
              <Form.Control
                  isInvalid = {nameErrorAlert}
                  onChange={(event) => {setName(event.target.value);setNameErrorAlert(false)}} 
                  type="input" 
                  rows={3} 
              />
          </Form.Group>
      </Form>
  );

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal backdrop={isLoading?"static":true} show={show} onHide={handleClose}>
        <Modal.Header>
     
          <Modal.Title style = {{fontFamily: 'Comic Sans MS, cursive',color: '#048c7f'}}>Add Climbs from Mountain Project</Modal.Title>


        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>          
        
        <ButtonGroup className="mb-2">
        {types.map((types, idx) => (
          <ToggleButton
            size = 'sm'
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="light"
            name="radio"
            value={types.value}
            checked={radioValue === types.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {types.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      

        {radioValue==1?
        <div style = {{marginBottom:'10px',marginLeft: '10px',width: '450px'}}>
   
        <div>
        {mpInput}
        </div>
     
   
        
{/*
         <Button disabled = {climberQuantity.length<5?false:true} size = 'sm' onClick = {handlebuttonClick} variant="outline-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</Button>

        */}
         </div>:

            <div style = {{marginLeft: '10px',width: '450px'}}>
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label style = {{marginTop: '5px',fontFamily: 'Comic Sans MS, cursive'}}>Upload JSON file</Form.Label>
                    <Form.Control isInvalid	= {errorAlertUpload} type="file" onChange = {handleFileInput}/>
                </Form.Group>
            </Form>
            </div>

        }

</Modal.Body>
        <Modal.Footer>
          <Button size = 'sm' disabled = {isLoading?true:false} variant="outline-secondary" onClick={handleClose}>
          {isLoading?"Loading..":"Close"}
          </Button>
          <Button size = 'sm' disabled = {isLoading?true:false} variant="outline-primary" onClick={radioValue==1?addOnClick:handleSubmit}>
           {isLoading?"Loading..":"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddClimbModal;