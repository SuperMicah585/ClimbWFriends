import React, { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '@mui/material/styles';

//I want the options to appear on buttom click on the search bar. Will toggle menue under the search
// bar that will display filter options.. maybe a modal popup?

// Define the icon


const PrefixSearch = ({
    searchType,
    coordinatesCallback,
    climbsArrayforSearch,
}) => {
    const [searchData, setsearchData] = useState([]);
    const [loading, setIsLoading] = useState(false);

    // Handle item selection
    const handleSelect = async (event, newValue) => {

            coordinatesCallback(newValue);
        
    };

    const fetchData = async (data) => {
        setIsLoading(true);


if (searchType ==='climbs'){
    var tmpArray = []
    var idSet = new Set([])
    for(let item of climbsArrayforSearch){

        
        if(item.name.toLowerCase().includes(data.toLowerCase()) && !(idSet.has(item.id))){
    
            idSet.add(item.id)

            tmpArray.push(
            {id: item.id, // Ensure unique id
            label: item.name,
            center: [item.coordinates[1],item.coordinates[0]]})
        }
        if(tmpArray.length ==5 ){
            break
        }
    }
    setsearchData(tmpArray)
    setIsLoading(false);
    
//countrycodes=US,CA
}
else{
try {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${searchType}=${data}&limit=5&format=json`
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const cityData = await response.json(); // Parse the response as JSON
    const formattedResponse = cityData.map((item, index) => ({
        id: index, // Ensure unique id
        label: item.display_name,
        center: [item.lat, item.lon],
    }));

    setsearchData(formattedResponse); // Send the parsed data back as JSON
} catch (error) {
    setsearchData([])
}
finally {
    setIsLoading(false);
}
}
    }

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Debounced fetchData function
    const debouncedFetchData = useCallback(debounce(fetchData, 300), [
        [searchType],
    ]);

    return (
        <div>
            <Autocomplete
                disablePortal
                options={searchData}
                loading={loading}
                filterOptions={(x) => x}
                onInputChange={(event, newInputValue) => {
                    if (newInputValue) {
                        debouncedFetchData(newInputValue);
                    }
                }}
                onChange={handleSelect}
                isOptionEqualToValue={(option, value) =>
                    option.id === value?.id
                }
                sx={{
                    width: 300,
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={`search by ${searchType}`}
                        InputLabelProps={{
                            sx: {
                                '&.Mui-focused': {
                                    marginTop: '5px',
                                },
                                '&.MuiFormLabel-filled': {
                                    marginTop: '6px',
                                },
                            },
                        }}
                        sx={{
                            backgroundColor: '#fff', // White background to stand out
                            borderRadius: '1px', // Rounded corners
                            '& .MuiOutlinedInput-root': {
                                borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
                                '&:hover fieldset': {
                                    borderColor: '#000', // Darker border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000', // Darker border when focused
                                    borderWidth: '1.5px', // Change the border size when focused
                                },
                            },
                        }}
                    />
                )}
                PaperProps={{
                    sx: {
                        border: '1px solid rgba(0, 0, 0, 0.12)', // Border around the dropdown
                        backgroundColor: '#fff', // Dropdown background
                    },
                }}
            />
        </div>
    );
};

export default PrefixSearch;