import React, { useState, useRef, useEffect } from "react";
import { db } from "../../firebase/config.js";
import "./Lobby.css";
import { View } from "react-native";
import { useLocation } from "react-router-dom";
import { getDocumentData, getAllPlayersInRoom, setPlayerToReady } from "../../firebase/database";
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
  const [listOfPlayersIds, setListOfPlayersIds] = useState([]);
  const [lobbyRoomCode, setLobbyRoomCode] = useState();
  const [lobbyRoomID, setLobbyRoomID] = useState();
  const [playersReadyStatus, setPlayersReadyStatus] = useState(new Map());
  

  useEffect(() => {
    async function processData() {
      const player_id = state.player_data;
      const room_id = (await getDocumentData("players", player_id)).room_id
      setLobbyRoomID(room_id);
      setLobbyRoomCode((await getDocumentData("rooms", room_id)).code);
        
      /* return onSnapshot(doc(db, "rooms", room_id), (doc) => {
        // returns a promise
        if (!doc.empty) {
          // DataFromSnapshot is what ever code you use to get an array of data from
          // a querySnapshot
          let dataArray = doc.data().player_ids;
          setListOfPlayersIds([...dataArray]);
          


        }
      } */
        const q = query(collection(db, "players"), where("room_id", "==", room_id));
        return onSnapshot(q, (querySnapshot) => {
          const dataArray=[]
          querySnapshot.forEach((doc) => {
            dataArray.push(doc.data().name)
        })
          setListOfPlayersIds([...dataArray]);
        }
      );
    }

    processData();
  }, []);

  // this is the listener for the ready status, 
  useEffect(() => {
    // im so tired, something to think about --> where("room_id", "==", "f69Bm")
    async function updateReadyStatus(){
      const q = query(collection(db, "players"), where("isReady", "==", true));
      return onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // adjusted this line to have doc.data().name instead of doc.id
            setPlayersReadyStatus(new Map(playersReadyStatus.set(doc.data().name, true)));
        });
        }
    )}
    updateReadyStatus();
  },[]);

  



  const getListSize = () => {
    const newHeight = listRef.current.clientHeight;
    setHeight(newHeight);
  };

  const updateReadyStatusButton = () => {
    setPlayerToReady(state.player_data, lobbyRoomID);
    console.log("Ready Updated");
  }

  useEffect(() => {
    getListSize();
  }, [listOfPlayersIds]);

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
            {listOfPlayersIds.map((item) => (
                <li className="item" key={item.id}>
                <View style={{ display: 'flex', flexDirection: "row", justifyConten: 'center', alignItems: 'center' }}>
                    <div className="playerName">{item}</div>
                    <div className="status" key={item.id}>{playersReadyStatus.get(item) ? "Ready" : "Not Ready"} </div>
                </View>
                </li>
            ))}
            </ul>
        </div>
      
        <div className="chooseStatus">
        <View style={{ flexDirection: "row"}}>
            <button className="statusButton" onClick={updateReadyStatusButton}>Ready</button>
            <div className="space" />
            <button className="statusButton">Start</button>
        </View>
        </div>
    </View>
    </div>
  );
}

export default Lobby;