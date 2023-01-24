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
  apiKey: "AIzaSyDPCUg-hvQACCQHfZm0tdayoz90041bhUk",
  authDomain: "english-re-edu.firebaseapp.com",
  databaseURL: "https://english-re-edu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "english-re-edu",
  storageBucket: "english-re-edu.appspot.com",
  messagingSenderId: "914920752033",
  appId: "1:914920752033:web:c69653d09be6e057d401e0",
  measurementId: "G-5GZ2XXKCVM"
};

app =  firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 15;
remoteConfig.defaultConfig = {
  "promo":false,
  "urls":[]
};
// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID =
    'YOUR_OAUTH_CLIENT_ID';
