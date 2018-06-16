const listAll = async (firebase) => {
  const db = firebase.firestore();
  const guardiansRef = db.collection('guardians');

  try {
    const { docs } = await guardiansRef.get();
    const roomNames = docs.map(doc => doc.id);
    return roomNames;
  } catch {
    throw {
      isExpected: false,
    };
  }
};

export default listAll;
