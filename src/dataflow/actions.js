/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */


// Quick-and-dirty action that calls Firebase directly.  Can always be 
// abstracted away with Redux.

import firebase from 'firebase';

import {
  default as firebaseApp,
  pwasPath,
} from './firebase';

export function registerPWA({ manifestURL }) {
  // To avoid duplication, hash the manifest URL and store this entity as that
  // location.
  //
  // TODO(amedina):
  // - Check if there is already a entity at that key and respond accordingly

  const key = btoa(manifestURL);

  firebaseApp.database().ref(pwasPath + key).set(
    {
      manifestURL
    }
  );
}

export function login() {
  firebase.auth().signInWithRedirect(
    new firebase.auth.GoogleAuthProvider()
  );
}

export function logout() {
  firebase.auth().signOut().then(
    // This should dispatch a Redux action that destroys store.user
  );
}