import React from "react";

export default function button({
  style,
  action,
  status,
  set,
  altSet,
  className,
}) {
  function setStatus() {
    set(!status);
    //status updates async, therefore before its true it is false
    //meaning if it is false, it is going to be true, so set the altStatus
    //to be false
    if (status == false) {
      altSet(false);
    }
  }

  return (
    <div className={`icon ${className}`}>
      <button
        className={`btn btn-sm btn-outline-${style} btn-${action}`}
        onClick={() => setStatus(status)}
      >
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </button>
    </div>
  );
}
