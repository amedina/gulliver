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

import autoBind from 'react-autobind';
import firebase from 'firebase';
import React from 'react';

import {
  Map as ImmutableMap,
} from 'immutable';

import {
  default as firebaseApp,
  pwasPath,
} from './firebase';

// Quick-and-dirty provider using Firebase.  Can always be abstracted away with
// Redux

export default class Provider extends React.Component {
  state = {
    store: {}
  }
  firebasePWAsRef = firebaseApp.database().ref(pwasPath)

  constructor() {
    super();

    autoBind(this);
  }
  
  componentWillMount() {
    firebase.auth().getRedirectResult().then(
      result => {
        this.setState(
          {
            store: {
              ...this.state.store,
              user: result.user,
            }
          }
        );
      }
    ).catch(
      error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      }
    );  

    this.firebasePWAsRef.on(
      'value',
      snapshot => {
        let pwasDict = snapshot.val();

        this.setState(
          {
            store: {
              ...this.state.store,
              pwas: new ImmutableMap(pwasDict),
            }
          }
        );
      }
    );
  }

  render() {
    const {
      children,
    } = this.props;

    const {
      store,
    } = this.state;

    return React.cloneElement(
      children,
      store
    );
  }
}

