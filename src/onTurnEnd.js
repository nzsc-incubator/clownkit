import { NONE_VIEWED, A_VIEWED, B_VIEWED } from './helpers/consts';

const onTurnEnd = (firebase, roomName, callback) => {
  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);
  const avRef = db.collection('aVaults').doc(roomName);
  const bvRef = db.collection('bVaults').doc(roomName);

  let cachedState = null;

  const unsubscribe = guardianRef.onSnapshot(
    {
      includeMetadataChanges: true,
    },

    async (guardianDoc) => {
      const { state } = guardianDoc.data();
      if (guardianDoc.metadata.hasPendingWrites
        || state === cachedState
        || ![NONE_VIEWED, A_VIEWED, B_VIEWED].includes(state)
      ) {
        return;
      }
      const [aDoc, bDoc] = await Promise.all([avRef.get(), bvRef.get()]);


      callback(aDoc.data().payload, bDoc.data().payload);
    }
  );

  return unsubscribe;
};

export default onTurnEnd;
