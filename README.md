# clownkit
A microlibrary for interacting with an nzsc2p Cloud Firestore database.

## Usage
```bash
npm install --save @nzsc/clownkit

# If you haven't already installed firebase, install it now:
npm install --save firebase
```

```javascript
import { Clownkit } from '@nzsc/clownkit';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(yourConfig);

const clownkit = new Clownkit(firebase);

// Do stuff with `clownkit`.
// See Docs for more.
```

## Docs
### Classes:
#### `Clownkit`
##### Instance methods (non-static):

###### `listOpen()`
Returns an array of open room names.
```javascript
const namesOfRoomsICanJoin = await clownkit.listOpen();
```

###### `listClosed()`
Returns an array of closed room names.
```javascript
const namesOfRoomsICannotJoin = await clownkit.listClosed();
```

###### `cleanUp()`
Completely destroys every game room that is older than an hour.
```javascript
try {
  await clownkit.cleanUp();
} catch (e) {
  console.log('Something went wrong.');
}
```

###### `join(roomName)`
Attempts to join the given room.

If the room is full or nonexistent, it will throw an error with `isExpected: true`.

Example:
```javascript
try {
  await clownkit.join('my_awesome_room');
  console.log('Joined!');
} catch (e) {
  if (e.isExpected) {
    console.log('Cannot join. The room is probably full or nonexistent.');
  } else {
    console.log('Something went wrong.');
  }
}
```

###### `create(roomName)`
Attempts to create the given room.

If the room already exists, it will throw an error with `isExpected: true`.

Example:
```javascript
try {
  await clownkit.create('my_awesome_room');
  console.log('Created!');
} catch (e) {
  if (e.isExpected) {
    console.log('Cannot join. The room is probably full or nonexistent.');
  } else {
    console.log('Something went wrong.');
  }
}
```

###### `waitForRoomToBeFull(roomName)`
Returns a Promise that will resolve when the given room is full.

If you call this method when the room is already full, it will immediately resolve.

If the room does not exist, this method will have undefined behavior. Because of this, we strongly encourage only calling this method on rooms that you created (which are therefore certainly existent).

Example:
```javascript
clownkit.waitForRoomToBeFull('my_awesome_room').then(() => {
  console.log('Your room is full! You\'re ready to start playing.');
});
```

###### `onTurnEnd(roomName, callback: function(aPayload, bPayload))`
Calls the given callback at the end of every turn.

If the room does not exist, this method will have undefined behavior. Because of this, we strongly encourage only calling this method on rooms that you created or joined (which are therefore certainly existent).

Example:
```javascript
clownkit.onTurnEnd('my_awesome_room', (aPayload, bPayload) => {
  if (iAmPlayerA) {
    console.log('You chose ' + aPayload);
    console.log('Your opponent chose '+ bPayload);
  } else {
    console.log('You chose ' + bPayload);
    console.log('Your opponent chose '+ aPayload);
  }
});
```

###### `acceptResults(roomName, aOrB)`
Notifies the server you have successfully read the results.

The server will not accept deposits for the next turn until both players have called this method.
Consequently, you must always call this method in the callback you provide to `onTurnEnd` so the server will permit the next turn to begin.

Example:
```javascript
try {
  await clownkit.acceptResults('my_awesome_room', 'A');
} catch {
  console.log('Something went wrong.');
}
```

###### `deposit(roomName, aOrB, payload)`
Deposits the payload in the appropriate vault, and then seals the vault.

If you try to make a second deposit on the same turn, it will throw an error with `isExpected: true`.

Example:
```javascript
try {
  await clownkit.deposit('my_awesome_room', 'B', 'ShadowFireball');
  console.log('Deposited!');
} catch (e) {
  if (e.isExpected) {
    console.log('You already deposited something this turn.');
  } else {
    console.log('Something went wrong.');
  }
}
```

###### `destroy(roomName, aOrB)`
Destroys the room to the best of its ability.

That is, if you are the last person in the game room, this will destroy both the guardian and your vault. If somebody else is still in the game room it will only destroy your vault, and then proceed to throw an error with `isExpected: true`.

Example:
```javascript
try {
  await clownkit.destroy('my_awesome_room', 'A');
  console.log('Completely destroyed the game room.');
} catch (e) {
  if (e.isExpected) {
    console.log('Destroyed your vault, but not the guardian.');
  } else {
    console.log('Something went wrong.');
  }
}
```

###### `login()`
Logs in anonymously to Firebase (`firebase.auth().signInAnonymously()` under the hood).

Most backends will require authentication, so you will usually need to call this method before being able to call any of the other methods.

Example:
```javascript
try {
  await clownkit.login();
  isLoggedIn = true;
} catch {
  console.log('Something went wrong.');
}

if (isLoggedIn) {
  await clownkit.create('im_logged_in_now_so_i_can_do_stuff_like_this');
  //...
}
```
