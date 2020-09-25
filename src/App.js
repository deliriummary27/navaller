import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import ArticlesPage from './pages/ArticlesPage'
import AdmiralPage from './pages/AdmiralPage'
import TimelinePage from './pages/TimelinePage'
import Footer from './components/Footer'
import Login from './components/Login'
import ProfilePage from './pages/ProfilePage'
import EditProfile from './pages/EditProfile'
import SignUp from './pages/SignUp'
import CreateArticle from './pages/CreateArticle'
import CreateTimeline from './pages/CreateTimeline'
import CreateAdmiral from './pages/CreateAdmiral'
import CreateProfile from './pages/CreateProfile'
import * as actions from './store/actions/auth'
import { connect } from 'react-redux'
import Nav from './components/Nav'
import ArticleList from './pages/ArticleList'
import CreatePoll from './pages/CreatePoll'
import EditArticle from './pages/EditArticle'
import EditAdmiral from './pages/EditAdmiral'
import EditTimeline from './pages/EditTimeline'
import PublicProfile from './pages/PublicProfile'
import Error from './pages/Error'
import About from './pages/About'
import Membership from './pages/Membership'
import TimelineVertical from './pages/TimelineVertical'

class App extends React.Component {

    componentDidMount() {
      this.props.autoLoginCheck()
    }
  
  render() {
  return (
    <div>
      <Nav />
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/articles/:slug' component={ArticlesPage}/>
      <Route exact path='/admirals/:slug' component={AdmiralPage}/>
      <Route exact path='/timeline/:slug' component={TimelinePage}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/profile' component={ProfilePage}/>
      <Route exact path='/articles' component={ArticleList}/>
      <Route exact path='/create/article' component={CreateArticle} />
      <Route exact path='/create/timeline' component={CreateTimeline} />
      <Route exact path='/create/admiral' component={CreateAdmiral} />
      <Route exact path='/profile/edit' component={EditProfile} />
      <Route exact path='/public/profile/:slug' component={PublicProfile} />
      <Route exact path='/create/profile' component={CreateProfile} />
      <Route exact path='/create/poll/:slug' component={CreatePoll} />
      <Route exact path='/edit/article/:slug' component={EditArticle} />
      <Route exact path='/edit/admirals/:slug' component={EditAdmiral} />
      <Route exact path='/edit/timeline/:slug' component={EditTimeline} />
      <Route exact path='/about' component={About} />
      <Route exact path='/membership' component={Membership} />
      <Route exact path='/vertical/timeline' component={TimelineVertical} />
      <Route component={Error}/>
      </Switch>
      <Footer />
    </div>
  );
} }

const mapDispatchToProps = dispatch => {
  return {
    autoLoginCheck: () => dispatch(actions.authCheck())
  }
}

export default connect(null, mapDispatchToProps)(App);
