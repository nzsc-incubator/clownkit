import { NONE_CREATED, A_CREATED, B_CREATED } from './helpers/consts';

const waitForRoomToBeFull = (firebase, roomName) => {
  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);

  return new Promise((resolve) => {
    guardianRef.onSnapshot(
      (guardianDoc) => {
        const { state } = guardianDoc.data();
        if (![NONE_CREATED, A_CREATED, B_CREATED].includes(state)) {
          resolve();
        }
      }
    );
  });
};

export default waitForRoomToBeFull;
