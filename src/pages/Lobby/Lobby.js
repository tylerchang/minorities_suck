import React, {useState, useRef, useEffect} from 'react';
import './Lobby.css';
import {View} from 'react-native';

function Lobby() {
    const listRef = useRef();
    const [heightvalue, setHeight] = useState();

    const [listItems, setListItems] = useState([
        {
            id: 1,
            title: "David",
          },
        {
            id: 2,
            title: "Chris",
        },
        {
            id: 3,
            title: "Tyler",
        },
        {
            id: 4,
            title: "Lavid",
        },
        {
            id: 5,
            title: "Jenn",
        },
    ]);

    const addItem = () => {
        const items = [...listItems];
        const newItem = {
          id: items.length + 1,
          title: `Item ${items.length + 1}`,
        };
    
        items.push(newItem);
        setListItems(items);
    };

    const getListSize = () => {
        const newHeight = listRef.current.clientHeight;
        setHeight(newHeight);
    }

    useEffect(() => {
        getListSize();
      }, [listItems]);

      useEffect(() => {
        window.addEventListener("resize", getListSize);
      }, []);

    return (
        <div className="lobby">
            <div className="invite"> Invite Code </div>
            <div className="code">
                <div className="letters"> CODE </div>
            </div>
            <div className="players">
                <div className="notepad"
                    style={{
                        height: heightvalue
                    }}
                />
                <ul className="listItemClass" ref={listRef}>
                    {listItems.map((item) => (
                        <li className="item" key={item.id}>
                            <View style={{flexDirection:'row'}}>
                            <div className="playerName">{item.id}. {item.title}</div> 
                            <div className="status">Ready</div>
                            </View>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chooseStatus">
                <View style={{flexDirection: 'row'}}>
                    <button className="statusButton">Ready</button>
                    <div className="space"/>
                    <button className="statusButton">Start</button>
                </View>
            </div>
        </div>
    );
}

export default Lobby;