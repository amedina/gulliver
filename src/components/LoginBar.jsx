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


import React from 'react';
import firebase from 'firebase';

import {
  login,
  logout,
} from '../dataflow/actions';

import Button from './Button';

// You can prompt your users to sign in with their Google Accounts either 
// by opening a pop-up window or by redirecting to the sign-in page. The redirect 
// method is preferred on mobile devices.

var provider = new firebase.auth.GoogleAuthProvider();
var token = null;

export default function LoginBar(props) {
  const {
    user,
  } = props;

  return (
    <div
      className = 'LoginBar'
    >
      {
        user
          ? <LoggedInUserBar 
              user = { user }
            />
          : <LoginButton />
      }
    </div>
  );
}

function LoggedInUserBar(props) {
  const {
    user,
  } = props;

  return (
    <div
      style = {
        {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }
      }
    >
      <div
        style = {
          {
            flexDirection: 'row',
            alignItems: 'center',
          }
        }
      >
        <img 
          style = {
            {
              width: 40,
              height: 40,
              borderRadius: 20,
            }
          }
          src = { user.photoURL } 
        />
        <div
          style = {
            {
              marginLeft: 8,
              marginRight: 16,
            }
          }
        >
          { user.displayName }
        </div>
      </div>

      <Button
        onClick = { logout }
      >
        Logout
      </Button>
    </div>
  );
}

function LoginButton(props) {
  return (
    <Button 
      onClick = { login }
    >
      Login
    </Button>
  );
}