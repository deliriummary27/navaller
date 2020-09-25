import React from 'react'
import {Link} from 'react-router-dom'

export default function About() {
    return (
        <div className='about-container'>
            <p className='lead'>Due to the lack of knowledge and appreciation regarding Navy and the great role naval forces play in defence and attack, we decided to create a platform in order to share our slight information and admiration of the history of naval forces around the world. We're willing to cover all the great nations with remarkable navies.</p>
            <Link to='/signup' className='btn btn-primary about-button'>Join us in our journey!</Link>
        </div>
    )
}
 