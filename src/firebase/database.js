import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  doc,
} from "firebase/firestore/lite";

// Adds a room to the database - private use only
async function addRoom() {
  const docRef = await addDoc(collection(db, "rooms"), {
    code: "blah",
    player_ids: [],
    question_ids: [],
  });
 
  return docRef;
}

// Adds a player to the database - private use only
async function addPlayer(player_name) {
  const docRef = await addDoc(collection(db, "players"), {
    name: player_name,
    points: 0,
    room_code: "",
    vote: -1,
  });
 
  return docRef;
}

// Adds a player to an existing room - private use only
async function addPlayerToRoom(docRefRoom, docRefPlayer) {
 
// Adds the player to the room
  await updateDoc(docRefRoom, {
    player_ids: arrayUnion(docRefPlayer.id),
  });

  // Attaches the room onto the player
  await updateDoc(docRefPlayer, {
    room_code: docRefRoom.code
  });
}

// Called when "Join Game" button is pressed - PLEASE USE
async function joinGame(player_name, room_code) {

// Gets a reference for the input room code
  const docRefRoom = doc(db, "rooms", room_code);
  const docSnapRoom = await getDoc(docRefRoom);
 
// Checks to see if the room exists
  if (docSnapRoom.exists()) {
    // If the room exists, create a new player with the input name
    const docRefPlayer = await addPlayer(player_name);
    // Add the newly created player to the room
    addPlayerToRoom(docSnapRoom, docRefPlayer);
  }else{
    console.log("Room Not Found");
  }
}

// Called when "Host New Game" button is pressed - PLEASE USE
async function hostNewGame(player_name){
    const docRefRoom = await addRoom();
    const docRefPlayer = await addPlayer(player_name);
    // Add the player to the room:
    await addPlayerToRoom(docRefRoom, docRefPlayer)
    
}

 
export {hostNewGame, joinGame};