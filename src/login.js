const login = async (firebase) => {
  await firebase.auth().signInAnonymously();
};

export default login;
