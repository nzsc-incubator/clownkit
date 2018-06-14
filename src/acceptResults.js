import { A, B, NONE_SEALED, A_VIEWED, B_VIEWED } from './helpers/consts';

const acceptResults = async (firebase, roomName, aOrB) => {
  if (![A, B].includes(aOrB)) {
    throw new TypeError('aOrB must be "A" or "B"');
  }

  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);

  try {
    await guardianRef.update({
      state: aOrB === A ? A_VIEWED : B_VIEWED,
    });
  } catch {
    try {
      await guardianRef.update({
        state: NONE_SEALED,
      });
    } catch (e) {
      throw {
        isExpected: false,
        raw: e,
      };
    }
  }
};

export default acceptResults;
