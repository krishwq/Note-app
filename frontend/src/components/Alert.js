import React from "react";

export default function Alart(props) {
  const font = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{height:'40px',position:"fixed",top:"55px",width:"99vw",zIndex:"2000"}} className={`${!props.alart?"invisible":""}`} >
      {props.alart && (
        <>
        <div
          className={`alert alert-${props.alart.types} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{font(props.alart.types)}</strong>: {props.alart.msg}
        </div>
        </>
      )}
    </div>
  );
}