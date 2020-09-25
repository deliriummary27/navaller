import React from 'react'
import {Link} from 'react-router-dom'

export default function ProfileArticle(props) {

    function shorten(str, maxLen, separator = ' ') {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen));
    }
    
    const returnLink = () => {
        if (props.item.subtitle !== undefined) {
            return `/admirals/${props.item.id}`
        } else if (props.item.date !== undefined && props.item.subtitle === undefined) {
            return `/articles/${props.item.id}`
        } else if (props.item.date === undefined) {
            return `/timeline/${props.item.id}`
        }
        }
    
    return (
        <div className='profile-article'>
            <div className='profile-article-img'>
                {props.item.subtitle === undefined ? <img alt='p' src={props.item.image}></img> : <img style={{width: '240px', height: '300px'}} alt='p' src={props.item.image}></img>}
            </div>
            <div className='profile-article-img-small'>
                {props.item.subtitle === undefined ? <img alt='p' src={props.item.image}></img> : <img style={{width: '40%'}} alt='p' src={props.item.image}></img>}
            </div>
            <div className='profile-article-prof'>
            <img alt='o' src={props.prof}></img>
            {props.item.date !== undefined ? <h3 className='display-3'>{props.item.authorName}</h3> : <h3 style={{marginTop: '30px'}} className='display-3'>{props.item.authorName}</h3>}
            {props.item.date !== undefined ? <p>{String(props.item.date).slice(0, 10)}</p> : <></>}
            </div>
            <div className='profile-article-content'>
                <h3 className='display-3'>{props.item.title}</h3>
                {props.item.content !== undefined ? <p>{shorten(props.item.content, 150)}...</p> : <p>{shorten(props.item.des, 150)}...</p>}
                <Link to={returnLink()} className='btn btn-outline-primary'>read more</Link>
            </div>
        </div>
    )
}
