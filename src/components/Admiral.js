import React from 'react'
import {Link} from 'react-router-dom'

export default function Admiral({admiral}) {


    return ( 
        <div className='admiral-overview-center'>
            <img key={admiral.id} alt='g' src={admiral.image}></img>
            <h5 key={admiral.id} className='display-5'>{admiral.title}</h5>
            <p key={admiral.id} className='lead'>{admiral.subtitle}</p>
            <Link className='btn btn-outline-primary admiral-overview-center-link' to={`/admirals/${admiral.id}`}>View Profile</Link>
        </div>
    )
}
