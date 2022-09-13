import React, { useState, useRef, useEffect } from "react";
import { db } from "../../firebase/config.js";
import "./Lobby.css";
import { View } from "react-native";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getDocumentData} from "../../firebase/database";
import { setPlayerReadyStatus } from "../../firebase/database2.js";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore/lite";

function Lobby() {
  const { state } = useLocation();

  const listRef = useRef();
  const [heightvalue, setHeight] = useState();
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [lobbyRoomCode, setLobbyRoomCode] = useState();
  const [lobbyRoomID, setLobbyRoomID] = useState();
  const [currentReadyStatus, setCurrentReadyStatus] = useState(false);
  const [playerHost, checkPlayerHost] = useState();
  
  let readyStatus = false;
  const navigate = useNavigate();

  const string_playerid = localStorage.getItem("player_data");
  const player_id = JSON.parse(string_playerid);
  const string_room_id = localStorage.getItem("room_id");
  const room_id = JSON.parse(string_room_id)

  useEffect(() => {
    async function processData() {
      //const player_id = state.player_data;
      //const string_playerid = localStorage.getItem("player_data");
      //const player_id = JSON.parse(string_playerid);
      console.log("stored player id:", player_id);

      // get room_id using localStorage and get room code
      //const string_room_id = localStorage.getItem("room_id");
      //const room_id = JSON.parse(string_room_id)
      console.log("room id: ", room_id);
      setLobbyRoomID(room_id);
      setLobbyRoomCode((await getDocumentData("rooms", room_id)).code);
      
      // check if player is host
      const player_info = room_id + "/players/" + player_id
      checkPlayerHost((await getDocumentData("rooms", player_info)).isHost);

      // Listen for changes in room's players collection
      const room_player = room_id + "/" + "players"
      onSnapshot(collection(db, "rooms", room_player), (collectionSnapshot) => {
        // returns a promise
        var temp_array = [];
        // for each document in collection, push the name 
        collectionSnapshot.forEach((doc) => {temp_array.push(doc.data());});
        /* if (!doc.empty) {
          // DataFromSnapshot is what ever code you use to get an array of data from
          // a querySnapshot
          temp_array.push(doc.id);
        } */
        setListOfPlayers([...temp_array]);
      });

    }

    processData();
  }, []);
  
  const getListSize = () => {
    const newHeight = listRef.current.clientHeight;
    setHeight(newHeight);
  };

  const updateReadyStatusButton = () => {
    const current_player_id = JSON.parse(localStorage.getItem("player_data"))
    const current_room_id = JSON.parse(localStorage.getItem("room_id"));  
    // setCurrentReadyStatus(!currentReadyStatus)
    readyStatus = !readyStatus
    console.log(readyStatus)
    setPlayerReadyStatus(current_room_id, current_player_id, readyStatus);
  }

  const startGame = () => {
    //console.log(playerHost)
    console.log(readyStatus)
    if (playerHost && readyStatus) {
      navigate("/writequestions");
    }
    else {
      console.log("This user is either not ready, or is not the host")
    }
  }

  useEffect(() => {
    getListSize();
  }, [listOfPlayers]);

  useEffect(() => {
    window.addEventListener("resize", getListSize);
  }, []);

  return (
    <div className="lobby">
    <View style={{flexDirection: "column"}}>
        <div className="invite"> Invite Code </div>
        <div className="code">
        <div className="letters"> {lobbyRoomCode} </div>
        </div>
        <div
            className="notepad"
            style={{
            height: heightvalue,
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <ul className="listItemClass" ref={listRef}>
            {listOfPlayers.map((item) => (
                <li className="item" key={item.id}>
                <View style={{ display: 'flex', flexDirection: "row", justifyConten: 'center', alignItems: 'center' }}>
                    <div className="playerName">{item.name}</div>
                    <div className="status" key={item.id}>{item.isReady ? 'Ready' : 'Not Ready'} </div>
                </View>
                </li>
            ))}
            </ul>
        </div>
      
        <div className="chooseStatus">
        <View style={{ flexDirection: "row"}}>
            <button className="statusButton" onClick={updateReadyStatusButton}>Ready</button>
            <div className="space" />
            <button className="statusButton" onClick={startGame}>Start</button>
        </View>
        </div>
    </View>
    </div>
  );
}

export default Lobby;