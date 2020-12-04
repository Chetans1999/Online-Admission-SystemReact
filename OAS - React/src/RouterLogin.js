import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Nav from './Components/Nav';

class RouterLogin extends React.Component {
    render() {
        return (
            <div>
                    <Nav/>
                    <Switch>
                        <Route path="login" component={Login}/>
                    </Switch>
            </div>
        )
    }
}

export default RouterLogin;