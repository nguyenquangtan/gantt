import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Project from './Project';
import Task from './Task';

class App extends Component {
    render() {
        window.onpopstate = () => {
            window.location.reload();
        }
        return(
            <Router forceRefresh={true}>
                <Switch>
                    <Route exact path='/' component={Project} />
                    <Route path='/task' component={Task} />
                </Switch>
            </Router>
        )
    }
}

export default App;