import React from 'react'
import {Link} from 'react-router-dom'

export default function TimelinePointPage(props) {


    function length(len) {
        let digit = parseInt(len.toString().substr(-2))
        /* if (len < -100) {
            return (len / 10 + 450)
        }
        else if (len < 1600) {
            return (len / 10 + 200)
        }
        else if (len > 1700 && len < 1939) {
            return (len * 1.4 - 2000 - digit * 10)
        }
        else if (len >= 1939 && len < 1950) {
            return (len  * 2 - 3120 - digit * 10)
        } 
        else if (len > 1950) {
            return (len * 2 - 3060)
        }
        else {
            return (len * 5 + 400)
        } */
        if (len > 1000 && len < 2000) {
            if (props.distanceNeeded) {
                return(len / 3 + (digit * 4) - 100 + ((props.year - props.previous) * 4))

            }
            return(len / 3 + (digit * 4) - 100)
        }
        if (len > 100 && len < 1000) {
            return(len / 4 + (digit * 4) - 100)
        }
        if (len < 100 && len > 0) {
            return(len * 10 + (digit * 4) - 100)
        }
        if (len >= 2000) {
            return(len / 2) 
        }

        
    }
    return (
        <>
        <div onMouseOver={props.handleHover} onMouseLeave={props.handleHoverOut} onMouseMoveCapture className='timeline-point-vertical' style={{marginTop: `${length(props.year)}px`}}>
            <div className='timeline-date-line-vertical'></div>
            {props.year < 0 ? <p id={props.id} style={props.distanceNeeded ? {fontSize: '14px'} : {fontSize: '17px'}} className='lead timeline-date-vertical'>{-props.year}.BC</p> : <p id={props.id} style={props.distanceNeeded &&  props.year - props.previous < 5 ? {fontSize: '14px', marginTop: '1px'} : {fontSize: '17px'}} className='lead timeline-date-vertical'>{props.year}</p>}
            {props.box === props.data.filter(item => item.title === props.id)[0] ? <div onMouseLeave={props.handleHoverOut} onMouseOverCapture className='timeline-container-vertical'>
            <img alt='s' src={props.box.image}></img>
            <h5 className='display-5'>{props.box.title}</h5>
            <p><Link to={`/timeline/${props.box.id}`}>read more</Link></p>
            </div> : <div className='timeline-container' style={{display: 'none'}}></div>}
        </div>
        </>
)
}
