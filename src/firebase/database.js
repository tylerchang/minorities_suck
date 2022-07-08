import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  doc,
} from "firebase/firestore/lite";
import {generateRoomCode} from "../resources/utilities";

// Adds a room to the database - private use only
async function addRoom() {
  return addDoc(collection(db, "rooms"), {
    code: generateRoomCode(),
    player_ids: [],
    question_ids: [],
  });
 }

// Adds a player to the database - private use only
async function addPlayer(player_name) {
  return addDoc(collection(db, "players"), {
    name: player_name,
    points: 0,
    room_id: "",
    vote: -1,
    isHost: false 

  });
}

// Set player to host
async function setPlayerAsHost(player_id){

  const player_ref = doc(db, "players", player_id);

  await updateDoc(player_ref, {
    isHost: true
  });

}


async function getAllPlayersInRoom(room_id){
  const room = (await getDocumentData("rooms", room_id))
  const player_ids_list = room.player_ids
  console.log("PLAYER IDS LIST: ", player_ids_list)
  return player_ids_list.map(async (player_id) => (await getDocumentData("players", player_id)).name);
}

async function getDocumentData(collection_name, id){
  const doc_a = (await getDoc(doc(db, collection_name, id)));
  return doc_a.data();
}


// Adds a player to an existing room - private use only
async function addPlayerToRoom(docRefRoom, docRefPlayer) {
 
// Adds the player to the room
  await updateDoc(docRefRoom, {
    player_ids: arrayUnion(docRefPlayer.id),
  });

  // Attaches the room onto the player
  await updateDoc(docRefPlayer, {
    room_id: docRefRoom.id
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

    // Set the player as host
    setPlayerAsHost(docRefPlayer.id);
    // Add the player to the room:
    await addPlayerToRoom(docRefRoom, docRefPlayer)
    return docRefPlayer.id
}

 
export {hostNewGame, joinGame, setPlayerAsHost, getDocumentData, getAllPlayersInRoom};