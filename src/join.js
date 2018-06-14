import { NONE_SEALED } from './helpers/consts';
import getUid from './helpers/getUid';

const join = async (firebase, roomName) => {
  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);
  const vaultRef = db.collection('bVaults').doc(roomName);

  try {
    await vaultRef.set({
      owner: await getUid(firebase),
      payload: ''
    });
  } catch {
    throw {
      isExpected: true,
    }
  }

  try {
    await guardianRef.update({
      state: NONE_SEALED,
    });
  } catch {
    throw {
      isExpected: false,
    }
  }
};

export default join;
