import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  setDoc,
} from "firebase/firestore/lite";
import { generateRoomCode } from "../resources/utilities";

// add players
// create rooms
// return data
// set host

// Adds a player to the database - private use only
async function addPlayerToRoom(room_id, player_name) {
  return addDoc(collection(db, `/rooms/${room_id}/players`), {
    name: player_name,
    points: 0,
    room_id: room_id,
    vote: -1,
    isHost: false,
    isReady: false,
  });
}

async function addQuestionToPlayer(roomID, playerID, questionText, answerOne, answerTwo){

  return addDoc(collection(db, `/rooms/${roomID}/players/${playerID}/questions`), {
    question: questionText,
    answer_one: answerOne,
    answer_two: answerTwo,
    votes_one: 0,
    votes_two: 0
  });
}


// Now returns an object with both player and room ids
async function joinGame(player_name, room_code) {
  // Gets a reference for the input room code
  const roomsRef = collection(db, "rooms");
  const q = query(roomsRef, where("code", "==", room_code));
  const docSnapRooms = await getDocs(q);

  const docRefRoom = doc(db, "rooms", docSnapRooms.docs.at(0).id);
  // const docRefRoom = await addRoom();
  console.log(docRefRoom);
  // Set the player as host
  // Add the player to the room

  // Checks to see if the room exists
  if (docRefRoom) {
    const docRefPlayer = await addPlayerToRoom(docRefRoom.id, player_name);
    return [docRefRoom.id, docRefPlayer.id];
  } else {
    console.log("Room Not Found");
  }
}

async function setPlayerAsHost(room_id, player_id) {
  const playerRef = doc(db, `/rooms/${room_id}/players`, player_id);
  await updateDoc(playerRef, {
    isHost: true,
  });
}

async function setPlayerReadyStatus(room_id, player_id, status){
  console.log("reached")
  const playerRef = doc(db, `/rooms/${room_id}/players`, player_id)
  await updateDoc(playerRef, {
    isReady: status,
  });
  console.log("Updated ready status of player: " + player_id + " as " + status)
}

// Now returns an object with both player and room ids
async function hostNewGame(player_name) {
  const docRefRoom = await addDoc(collection(db, "rooms"), {
    code: generateRoomCode(),
  });

  const docRefPlayer = await addPlayerToRoom(docRefRoom.id, player_name);

  console.log(docRefPlayer.id);

  // Set the player as host
  console.log(docRefPlayer);
  setPlayerAsHost(docRefRoom.id, docRefPlayer.id);
  // Add the player to the room:
  return { room_id: docRefRoom.id, player_id: docRefPlayer.id };
}

export { hostNewGame, joinGame, setPlayerReadyStatus, addQuestionToPlayer};
