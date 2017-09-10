import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';
import API_URL from '../App.Config';
import SocietyPage from './pages/SocietyPage';
import StatsPage from './pages/StatsPage';
import HomePage from './pages/HomePage';
import ActivityLogsPage from './pages/ActivityLogsPage';
import ContributionsPage from './pages/ContributionsPage';
import ActivityForm from './forms/ActivityForm';
import Sidebar from './Sidebar';
import '../static/css/font-awesome.min.css';
import '../static/css/page.css'; 
import whiteLogo from '../static/images/andela-logo-white.png';
import blueLogo from '../static/images/andela-logo-blue.png'; 

class App extends Component {

    constructor(props){
        super(props);
        this.bindEvents();
        this.xhr = axios.create({
            timeout: 20000,
            baseURL: API_URL,
            
        });
        this.login();
    }

    getDefaultState(){
        return {
            isLoggedIn: false,
            iconClicked: false,
            showSidebar: false,
            showActivityForm: false,
            societies: [],
            activities: [],
            newActivity: {
                name: '',
                comment: '',
                quantity: 1,
                isWorking: false
            },
            userData: {}
        };
    }

    bindEvents(){
        this.toggleLogout = this.toggleLogout.bind(this);
        this.resetUI = this.resetUI.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.onActivityChange = this.onActivityChange.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.showActivityForm = this.showActivityForm.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){
        this.state = this.getDefaultState();
        this.loadSocieties();
        this.loadActivities();
        this.loadUserData();
    }

    loadUserData(){
        let {state} = this,
        self = this;
        return this.xhr.get('/user/profile')
        .then(response => {
            state.userData = response.data.data;
            self.setState(state);
        });
    }

    loadActivities(){
        let self = this,
        {state} = self;
        
        return this.xhr.get('/activities')
        .then(response => {
            state.isLoggedIn = true;
            state.activities = response.data.data
            self.setState(state);
        });
    }

    loadSocieties(){
        let self = this,
        {state} = self;
        
        // return this.xhr.get('/societies')
        // .then(response => {
        //     state.isLoggedIn = true;
        //     state.societies = response.data.data
        //     self.setState(state);
        // });
        state.societies = [
            {
                "colorScheme": "#333333",
                "createdAt": "Sun, 10 Sep 2017 15:33:07 GMT",
                "logo": "https://logo.png",
                "name": "Invictus",
                "photo": null,
                "uuid": "5819fbf8-963d-11e7-8616-c4b301d36f51"
            }
        ];

        self.setState(state);
    }

    closeLightbox(){
        this.setState(prevState => {
            return {
                showActivityForm: false
            }
        });
    }

    addActivity(event){
        const formData = {
            name: this.state.newActivity.name,
            quantity: this.state.newActivity.quantity,
            comment: this.state.newActivity.comment
        }

        console.log(formData)
    }

    toggleLogout(event){
        event.preventDefault();
        event.stopPropagation();

        this.setState(prevState => {
            return {
                showLogout: !prevState.showLogout
            }
        });
    }

    resetUI(event){
        this.setState(prevState => {
            return {
                showLogout: false
            }
        })
    }

    renderInLightbox(title, component = null){
        if (!component){
            return <div />
        }
        return (
            <div id="lightbox">
                <a id="lightbox-close" onClick={this.closeLightbox}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512">
                        <polygon className="st0" points="340.2,160 255.8,244.3 171.8,160.4 160,172.2 244,256 160,339.9 171.8,351.6 255.8,267.8 340.2,352   352,340.3 267.6,256 352,171.8 "/>
                    </svg>
                </a>
                <div id="lightbox-content">
                    <div id="lightbox-header">
                        <span className="title">{title}</span>
                    </div>
                    <div id="lightbox-body">
                        {component}
                    </div>
                </div>
            </div>
        );
    }

    getSidebarClass(){
        if (!this.state.showSidebar){
            return "sidebar-collapsed";
        }

        return "";
    }

    showActivityForm(){
        const {state} = this;
        state.showActivityForm = true;
        this.setState(state);
    }

    login(){
        let token = localStorage.getItem("token");
    
        if (token === null){
            const query = window.location.search.split("?token=");
            if (query.length === 2){
                token = query[1];
                
                localStorage.setItem("token", token);
                
            }
        }
        
        this.xhr.defaults.headers['Authorization'] = token;
    }

    logout(event){
        event.preventDefault();
        localStorage.removeItem("token");
        let {state} = this;
        state.state = this.getDefaultState();
        this.setState(state);
    }

    toggleSidebar(event){
        event.preventDefault();
        event.stopPropagation();

        this.setState(prevState => {
            return {
                showSidebar: !prevState.showSidebar
            }
        });
    }

    onActivityChange(event){
        let {state} = this;

        state.newActivity[event.target.name] = event.target.value;
        this.setState(state);
    }

    renderActivityForm(){
        if (!this.state.showActivityForm){
            return <span />;
        }
        
        return this.renderInLightbox("Log an activity", 
            <ActivityForm name={this.state.newActivity.name}
                comment={this.state.newActivity.description}
                quantity={this.state.newActivity.quantity}
                onChange={this.onActivityChange}
                close={this.closeLightbox}
                addActivity={this.addActivity}
                activities={this.state.activities}
                isWorking={this.state.newActivity.isWorking} />);
    }

    renderAccountAction(){
        if (this.state.isLoggedIn){
            return (
                <div>
                    <div id="account-icon" onClick={this.toggleLogout}>
                        <img alt="Profile" src={this.state.userData.photo} />
                    </div>
                    {this.state.showLogout? 
                        <div id="account-actions">
                            <span className="account-name">{this.state.userData.name}</span>
                            <a href="" className="account-action" onClick={this.logout}>Logout</a>
                        </div>:
                        <span />
                        }
                </div>
            );
        }

        return (
            <a id="login-btn" href={"https://api.andela.com/login?redirect_url="+window.location}>Login</a>
        );
    }

    render() {
        return (
                <BrowserRouter>
                    <div>
                        <div id="content" 
                            className={this.getSidebarClass()}>
                        <aside id="sidebar">
                            <Route path="*" component={() => {
                                return <Sidebar societies={this.state.societies} />
                            }} />
                        </aside>
                        <div id="app-content" onClick={this.resetUI}>
                            <a href="" id="menu-icon" onClick={this.toggleSidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 139 139"><line className="st0" id="XMLID_6_" x1="26.5" x2="112.5" y1="46.3" y2="46.3"/><line className="st0" id="XMLID_9_" x1="26.5" x2="112.5" y1="92.7" y2="92.7"/><line className="st0" id="XMLID_8_" x1="26.5" x2="112.5" y1="69.5" y2="69.5"/></svg>
                            </a>
                                <div>
                                    <Route exact path="/" component={() => {
                                        return <HomePage logo={whiteLogo}
                                            accountAction={this.renderAccountAction()} />
                                    }} />
                                    <Route exact path="/contributions" component={() => {
                                        return <ContributionsPage logo={blueLogo}
                                            accountAction={this.renderAccountAction()} />
                                    }} />
                                    <Route exact path="/logged-activities" component={() => {
                                        return <ActivityLogsPage logo={blueLogo}
                                            accountAction={this.renderAccountAction()} />
                                    }} />
                                    <Route path="/society/:id" component={({match}) => {

                                        let societyIndex = this.state.societies.findIndex(society => {
                                            return society.uuid === match.params.id;
                                        })

                                        return <SocietyPage logo={whiteLogo}
                                            accountAction={this.renderAccountAction()}
                                            logout={this.logout}
                                            login={this.login}
                                            society={this.state.societies[societyIndex]}
                                            showActivityForm={this.showActivityForm} /> 
                                    }} />
                                    <Route exact path="/stats" component={() => {
                                        return <StatsPage logo={blueLogo}
                                                    accountAction={this.renderAccountAction()} />
                                    }} />
                                </div>
                        </div>
                        
                    </div>
                    
                    {this.renderActivityForm()}
                </div>
            </BrowserRouter>
    );
  }
}

export default App;
