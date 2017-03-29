import React, { Component } from 'react';
import '../scss/base.scss';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    toggleItem = (index) => {
        return index === this.state.currentIndex ? 'active' : '';
    }

    render(){
        return (
            <div className="navContainer">
                <ul className="navBar clearfix">
                    {
                        React.Children.map(this.props.children,(element,index) => {
                            return (<li onClick={ () => { this.setState({ currentIndex: index }) } } className={ this.toggleItem(index) }>{ element }</li>)
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Nav;
