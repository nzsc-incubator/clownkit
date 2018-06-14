const getUid = (firebase) => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      }
    });
  })
};

export default getUid;
