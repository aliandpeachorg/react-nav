import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from '../container/Home.js';
import List from '../container/List.js';
import About from '../container/About.js';
import Main from '../container/Main.js';

export default class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ Main }>
                    <IndexRoute component={ Home } />
                    <Route path="home" component={ Home }/>
                    <Route path="list" component={ List }/>
                    <Route path="about" component={ About }/>
                </Route>
            </Router>
        )
    }
}
