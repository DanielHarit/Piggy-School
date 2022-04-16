import React  from 'react'
import { useLocation } from "react-router-dom";

const ChildrenQuickView = () => {

  const {
    state: { displayName }
  } = useLocation();
  return (
      <div>
        אני מבט מהיר על  {displayName} 
      </div>
  )
}

export default ChildrenQuickView;
