import { A_CREATED } from './helpers/consts';

const list = async (firebase) => {
  const db = firebase.firestore();
  const guardiansRef = db.collection('guardians');
  
  try {
    const { docs } = await guardiansRef.where('state', '==', A_CREATED).get();
    const roomNames = docs.map(doc => doc.id);
    return roomNames;
  } catch {
    throw {
      isExpected: false,
    };
  }
};

export default list;
