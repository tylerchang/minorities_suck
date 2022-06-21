import React, {useState} from 'react';
import './pages.css';
import { View} from 'react-native';
import {Link} from 'react-router-dom';
import Popup from '../components/Popup';

function Home() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const togglePopup1 = () => {
        setIsOpen1(!isOpen1);
    }
    const togglePopup2 = () => {
        setIsOpen2(!isOpen2);
    }

    return (
        <div className='home'>
        <View 
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1 className='title'> Majority-Minority </h1>
            <div className='homebuttons'>
                <button className='hostbutton' onClick={togglePopup1}> Host New Game </button>
            </div>
            <div className='homebuttons'>
                <button className='joinbutton'onClick={togglePopup2}> Join Game </button>
            </div>
            <Link to='/howtoplay' style={{ textDecoration: 'none' }}>
                <h2>How to play</h2>
            </Link>
        </View>

        {isOpen1 && <Popup
            content={<>
            <div className='hostPopup'>
            <form>
                <label> Enter Name <br />
                    <input type="text" name="name" placeholder="Nickname"/>
                </label>
                <br />
                <button className='submitButton' type="submit" value="submit">Let's Go</button>
            </form>
            </div>
            </>}
            handleClose={togglePopup1}
        />}

        {isOpen2 && <Popup
            content={<>
            <div className='hostPopup'>
            <form>
                <label> Enter Name <br />
                    <input type="text" name="name" placeholder="Nickname"/>
                </label>
                <br />
                <label> Enter Invite Code <br />
                    <input type="text" name="invitecode" placeholder="Code"/>
                </label>
                <br />
                <button className='submitButton' type="submit" value="submit">Let's Go</button>
            </form>
            </div>
            </>}
            handleClose={togglePopup2}
        />}
        </div>
    );
}

export default Home;