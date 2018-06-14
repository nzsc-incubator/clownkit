import { A, B } from './helpers/consts';

const destroy = async (firebase, roomName, aOrB) => {
  if (![A, B].includes(aOrB)) {
    throw new TypeError('aOrB must be "A" or "B"');
  }

  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);
  const vaultRef = aOrB === A
    ? db.collection('aVaults').doc(roomName)
    : db.collection('bVaults').doc(roomName);

  try {
    await vaultRef.delete();
  } catch {
    throw {
      isExpected: false,
    };
  }

  try {
    await guardianRef.delete();
  } catch {
    throw {
      isExpected: true,
    };
  }
};

export default destroy;
