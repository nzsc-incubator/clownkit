import { NONE_CREATED, A_CREATED } from './helpers/consts';
import getUid from './helpers/getUid';

const create = async (firebase, roomName) => {
  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);
  const vaultRef = db.collection('aVaults').doc(roomName);

  try {
    await guardianRef.set({
      state: NONE_CREATED,
      timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    throw {
      isExpected: true,
      raw: e,
    }
  }

  try {
    await vaultRef.set({
      owner: await getUid(firebase),
      payload: ''
    });
    await guardianRef.update({
      state: A_CREATED
    })
  } catch (e) {
    throw {
      isExpected: false,
      raw: e,
    }
  }
};

export default create;
