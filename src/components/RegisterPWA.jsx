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
import React from 'react';

import {
  registerPWA,
} from '../dataflow/actions';

export default class RegisterPWA extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    manifestURL: '',
  }

  constructor() {
    super();

    autoBind(this);
  }

  render() {
    const {
      manifestURL,
    } = this.state;

    return (
      <form
        ref = {
          ref => {
            this.form = ref
          }
        }

        onSubmit = { this.submit }
      >
        <table>
          <tbody>
            <tr>
              <td>
                Manifest URL
              </td>
              <td>
                <input 
                  required
                  type = 'url'
                  onChange = { this.onManifestURLChange }
                  value = { manifestURL }
                />
              </td>
            </tr>
          </tbody>
        </table>
        
        <button
          onClick = { this.submit }
        >
          SUBMIT
        </button>
      </form>
    );
  }

  onManifestURLChange(event) {
    const newURL = event.target.value;

    this.setState(
      {
        manifestURL: newURL,
      }
    );
  }

  submit(event) {
    event.preventDefault();

    const {
      manifestURL,
    } = this.state;

    if (this.form.checkValidity()) {
      registerPWA(
        {
          manifestURL,
        }
      );

      this.context.router.push('/');
    
    } else {
      // TODO(amedina): do this for real
      throw new Error(`I'm so mad I'm going to write CSS to validate a form`);
    }
  }
}