import React from 'react';
import { useNavigate } from "react-router-dom";

const TopInfo = (props) => {

  return (
    <div className='top-info' >
        <div className='left'>
            <img src={ props.icon }  />
        </div>
        <div className='right'>
            <div className='top'>{ props.title }</div>
            <div className='bottom'>{ props.value }</div>
        </div>
    </div>
  );
}

export default TopInfo;


