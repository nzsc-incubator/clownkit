import list from './list';
import join from './join';
import create from './create';
import waitForRoomToBeFull from './waitForRoomToBeFull';
import onTurnEnd from './onTurnEnd';
import acceptResults from './acceptResults';
import deposit from './deposit';
import destroy from './destroy';
import login from './login';

class Clownkit {
  constructor(firebase) {
    this.firebase = firebase;
  }

  list() {
    return list(this.firebase);
  }

  join(roomName) {
    return join(this.firebase, roomName);
  }

  create(roomName) {
    return create(this.firebase, roomName);
  }

  waitForRoomToBeFull(roomName) {
    return waitForRoomToBeFull(this.firebase, roomName);
  }

  onTurnEnd(roomName, callback) {
    return onTurnEnd(this.firebase, roomName, callback);
  }

  acceptResults(roomName, aOrB) {
    return acceptResults(this.firebase, roomName, aOrB);
  }

  deposit(roomName, aOrB, payload) {
    return deposit(this.firebase, roomName, aOrB, payload);
  }

  destroy(roomName, aOrB) {
    return destroy(this.firebase, roomName, aOrB);
  }

  login() {
    login(this.firebase);
  }
}

export default Clownkit;
