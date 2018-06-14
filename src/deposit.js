import { A, B, A_SEALED, B_SEALED, NONE_VIEWED } from './helpers/consts';

const deposit = async (firebase, roomName, aOrB, payload) => {
  if (![A, B].includes(aOrB)) {
    throw new TypeError('aOrB must be "A" or "B"');
  }

  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);
  const vaultRef = aOrB === A
    ? db.collection('aVaults').doc(roomName)
    : db.collection('bVaults').doc(roomName);

  try {
    await vaultRef.update({
      payload,
    });
  } catch {
    throw {
      isExpected: true,
    };
  }

  try {
    try {
      await guardianRef.update({
        state: aOrB === A ? A_SEALED : B_SEALED,
      });
    } catch {
      await guardianRef.update({
        state: NONE_VIEWED,
      });
    }
  } catch {
    throw {
      isExpected: false,
    };
  }
};

export default deposit;
