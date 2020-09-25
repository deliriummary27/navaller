import React from 'react'
import {Link} from 'react-router-dom'

export default function ProfileArticle(props) {
    function shorten(str, maxLen, separator = ' ') {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen));
    }
    return (
        <div className='profile-article'>
            <div className='profile-article-img'>
                <img alt='p' src={props.item.image}></img>
            </div>
            <div className='profile-article-prof'>
            <img alt='o' src={props.prof}></img>
            <h3 className='display-3'>{props.item.authorName}</h3>
            <p>{String(props.item.date).slice(0, 10)}</p>
            </div>
            <div className='profile-article-content'>
                <h3 className='display-3'>{props.item.title}</h3>
                <p>{shorten(props.item.content, 150)}...</p>
                <Link to={`/articles/${props.item.id}`} className='btn btn-outline-primary'>read more</Link>
            </div>
        </div>
    )
}
