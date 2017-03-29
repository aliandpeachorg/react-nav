import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav.js';
import '../scss/pub.scss';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <div>
                <Nav>
                    <Link to="home">主页</Link>
                    <Link to="list">列表</Link>
                    <Link to="about">关于</Link>
                </Nav>
                <div>
                    { this.props.children }
                </div>
            </div>
        );
    }
}
