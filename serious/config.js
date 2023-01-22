/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

const firebaseConfig = {
  apiKey: "AIzaSyBmfqwCQUXEPYFTBiEiYUwqjTjtF03jz2k",
  authDomain: "aduruthuma.firebaseapp.com",
  databaseURL: "https://aduruthuma-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aduruthuma",
  storageBucket: "aduruthuma.appspot.com",
  messagingSenderId: "986959099612",
  appId: "1:986959099612:web:6974f183d46ecd1e582619",
  measurementId: "G-W8JKX9LRXG"
};

firebase.initializeApp(firebaseConfig);


// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID =
    'YOUR_OAUTH_CLIENT_ID';
