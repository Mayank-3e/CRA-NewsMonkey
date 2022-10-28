import React from 'react';

const Iferror=(props)=> {
  return (
    <div>
        <p>Error:</p>
        <p>{props.code}</p>
        <p>{props.message}</p>
    </div>
  )
}
export default Iferror
