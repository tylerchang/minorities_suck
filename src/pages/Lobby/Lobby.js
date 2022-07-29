import React, { useState, useRef, useEffect } from "react";
import { db } from "../../firebase/config.js";
import "./Lobby.css";
import { View } from "react-native";
import { useLocation } from "react-router-dom";
import { getDocumentData, getAllPlayersInRoom } from "../../firebase/database";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore/lite";
function Lobby() {
  const { state } = useLocation();

  const listRef = useRef();
  const [heightvalue, setHeight] = useState();
  const [listOfPlayers, setListOfPlayers] = useState([]);

  let list_of_players = null;

  /* async function processData(){
        // Data processing
        const player_id = state.player_data
        const room_id = (await getDocumentData("players", player_id)).room_id;
        console.log("room id: ", room_id)
        const list_of_players = await getAllPlayersInRoom(room_id);
        console.log(list_of_players);
        return list_of_players
    } */

  useEffect(() => {
    async function processData() {
      const player_id = state.player_data;

      // TODO: Get room_id using localStorage
      const room_id = (await getDocumentData("players", player_id)).room_id;
      console.log("room id: ", room_id);
      var temp_array = [];
      // TODO: Verify if this new code works
      onSnapshot(collection(db, `/rooms/${room_id}/players`), (doc) => {
        // returns a promise
        if (!doc.empty) {
          // DataFromSnapshot is what ever code you use to get an array of data from
          // a querySnapshot
          temp_array.push(doc.id);
        }
      });
      setListOfPlayers([...temp_array]);
    }

    processData();
  }, []);

  /*const processData = async () => {
        const player_id = state.player_data
        const room_id = (await getDocumentData("players", player_id)).room_id;
        console.log("room id: ", room_id)
        const list_of_players = await getAllPlayersInRoom(room_id);
        //console.log(list_of_players);
        setListOfPlayers(list_of_players); 
    }; */

  /* (async () => {
        list_of_players = await processData();
        console.log(list_of_players);
      })()
    
    console.log("async is done"); */

  const getListSize = () => {
    const newHeight = listRef.current.clientHeight;
    setHeight(newHeight);
  };

  useEffect(() => {
    getListSize();
  }, [listOfPlayers]);

  useEffect(() => {
    window.addEventListener("resize", getListSize);
  }, []);

  /*useEffect(() => {
        processData();
    }, [listOfPlayers]); */

  return (
    <div className="lobby">
      <div className="invite"> Invite Code </div>
      <div className="code">
        <div className="letters"> CODE </div>
      </div>
      <div className="players">
        <div
          className="notepad"
          style={{
            height: heightvalue,
          }}
        />
        <ul className="listItemClass" ref={listRef}>
          {listOfPlayers.map((item) => (
            <li className="item" key={item.id}>
              <View style={{ flexDirection: "row" }}>
                <div className="playerName">{item}</div>
                <div className="status">Ready</div>
              </View>
            </li>
          ))}
        </ul>
      </div>
      <div className="chooseStatus">
        <View style={{ flexDirection: "row" }}>
          <button className="statusButton">Ready</button>
          <div className="space" />
          <button className="statusButton">Start</button>
        </View>
      </div>
    </div>
  );
}

export default Lobby;
