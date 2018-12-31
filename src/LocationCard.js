import React from 'react';


const LocationCard = (props) => {
    return ( 
        <div style={{borderBottom:'2px solid gray', padding:20}}>
            {props.children} 
        </div>
    );
}
 
export default LocationCard;
