import React, {Component} from 'react';
import { MenuItems } from './MenuItems';
import {Link} from 'react-router-dom';
import './Navbar.css';
import mob_logo from '../../images/mob_logo.png';
class Navbar extends Component {
    state = {clicked: false}

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
        <nav className="NavbarItems">
            <Link to='/' style={{ textDecoration: 'none' }}>
                <h1 className='navbar-logo'>
                    <img src={mob_logo} alt="mob mentality logo" width={92.7} height={50}/>
                </h1>
            </Link>
            <div className='menu-icon' onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                            {item.title}
                            </a>
                        </li>
                    )
                })}
                
            </ul>
        </nav>
        )
    }
}

export default Navbar