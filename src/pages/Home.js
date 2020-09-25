import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Overview from '../components/Overview'
import AdmiralOverview from '../components/AdmiralOverview'
import About from '../components/About'
import Timeline from '../components/Timeline'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Home(props) {
    return (
        <div>
            <Navbar {...props}/>
            <Carousel />
            <h4 className='display-4' style={{textAlign: 'center', marginTop: '35px'}}>Main Articles</h4>
            <div className='show-line'></div>
            <Overview />
            <h4 className='display-4' style={{textAlign: 'center', marginTop: '35px'}}>Historical Timeline</h4>
            <div className='show-line'></div>
            <Timeline />
            <div className='timeline-button'>
                <Link to='vertical/timeline' className='btn btn-primary'>View Timeline</Link>
            </div>
            <h4 className='display-4' style={{textAlign: 'center', marginTop: '35px'}}>Notable Admirals</h4>
            <div className='show-line'></div>
            <AdmiralOverview />
            <h4 className='display-4' style={{textAlign: 'center', marginTop: '35px'}}>About Us</h4>
            <div className='show-line'></div>
            <About />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        id: state.id,
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps, null)(Home)