import React from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {inject, observer} from "mobx-react";
import Cookies from "js-cookie";

import withUtils from "./components/navstuff/addComponents";
import FrontPage from './components/frontpage/frontPage';
import AuthPage from './components/login/authPage';
import Dashboard from './components/trips/bigview/dashboard';
import Editor from './components/trips/edit/editTrips';

export default function(props) {
    return(
        <Router>
            <PublicRoute exact path = "/" component={withUtils(FrontPage)} />
            <PublicRoute exact path = "/register" component={withUtils(AuthPage)} compargs={{type:"register"}} />
            <PublicRoute exact path = "/login" component={withUtils(AuthPage)} compargs={{type:"login"}} />
            <PrivateRoute exact path = "/dashboard" component={withUtils(Dashboard)} />
            <PrivateRoute exact path = "/trips/:trip_id/edit/:aspect" component={withUtils(Editor)} />
        </Router>
    );
}

//for pages that are only accessible by logged in users
//will redirect to login page if not logged in
var PrivateRoute = inject("userStore")(observer(({ component: Component, ...rest }) => {
    if (typeof rest.userStore.user_info.id === 'undefined') {
        let user_info = Cookies.get('user_info');
        if (typeof user_info === 'undefined') {
            return <Route {...rest} render={props => <Redirect to="/login" />} />;
        }
        user_info = decodeURIComponent(user_info); //cookie will be automatically encoded
        rest.userStore.supply_user(JSON.parse(user_info)); //send the object to user store
        return <Route {...rest} render={props => <Component {...props} {...rest.compargs}/>} />;    
    }
    else {
        return <Route {...rest} render={props => <Component {...props} {...rest.compargs}/>} />;
    }
  }));

//for pages before log in
//will redirect to dashboard if logged in
var PublicRoute = inject("userStore")(observer(({ component: Component, ...rest }) => {
    if (typeof rest.userStore.user_info.id === 'undefined') {
        let user_info = Cookies.get('user_info');
        if (typeof user_info === 'undefined') {
            return <Route {...rest} render={props => <Component {...props} {...rest.compargs}/>} />; 
        }
        user_info = decodeURIComponent(user_info); //cookie will be automatically encoded
        rest.userStore.supply_user(JSON.parse(user_info)); //send the object to user store
        return <Route {...rest} render={props => <Redirect to="/dashboard" />} />;
    }
    else {
        return <Route {...rest} render={props => <Redirect to="/dashboard" />} />;
    }
  }));

/*
@inject("userStore")
@observer
class PrivateRoute extends React.Component {

    constructor(props) {
       // let props = {component, ...rest}
        super(props);
        this.getUserInfo = this.getUserInfo.bind(this);
        alert(JSON.stringify(this.props, null, 3));
    }

    getUserInfo() {
        fetch("/api/getuserinfo", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            let status = res.status;
            if (status === 403) {
                return Promise.reject(res);
            } else {
                return Promise.resolve(res);
            }
        }).then(res => res.json())
        .then((res) => {
            this.props.userStore.supply_user(res.user_info);
            const MyComponent = this.props.component;
            const compargs = this.props.compargs;
            var restProps = this.props;
            //delete restProps.component;
            return (<Route {...restProps} render={props => <MyComponent {...props} {...compargs}/>} />);
        }).catch((err) => {
            var restProps = this.props;
            //delete restProps.component;
        return (<Route {...restProps} render={props => <Redirect to="/login" />} />);
        })
    }

    render() {
        if (typeof this.props.userStore.user_info.id === 'undefined') {
            return <div>{this.getUserInfo()}</div>;
            //return <div></div>
        }
        else {
            const MyComponent = this.props.component;
            const compargs = this.props.compargs;
            var restProps = this.props;
           // delete restProps.component;
            return (<Route {...restProps} render={props => <MyComponent {...props} {...compargs}/>} />);
        }
    }
}*/