const cleanUp = async (firebase) => {
  const db = firebase.firestore();
  const staleGuardiansRef = db.collection('guardians').where('timeCreated', '<', new Date(Date.now() - 60e3));

  try {
    const { docs } = await staleGuardiansRef.get();
    const roomNames = docs.map(doc => doc.id);

    roomNames.forEach((roomName) => {
      const avRef = db.collection('aVaults').doc(roomName);
      const bvRef = db.collection('bVaults').doc(roomName);
      const gRef = db.collection('guardians').doc(roomName);
      avRef.delete();
      bvRef.delete();
      gRef.delete();
    });
  } catch (e) {
    throw {
      isExpected: false,
      raw: e,
    };
  }
};

export default cleanUp;
