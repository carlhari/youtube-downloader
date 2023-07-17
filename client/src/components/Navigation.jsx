import React from 'react'

function Navigation(props) {
  return (
   <>
    <div className="nav">
        <div className="title" onClick={props.clearItems}>Youtube Downloader</div>
    </div>
    </>
  )
}

export default Navigation