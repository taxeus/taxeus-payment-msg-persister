// Copyright 2021 Táxeus Checklists Platform
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Imports the Google Cloud client library.
const { Firestore } = require('@google-cloud/firestore');

/**
 * Cloud Function triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {object} pubsubMessage The Cloud Pub/Sub Message object.
 */
exports.storeMessage = async pubsubMessage => {
  const db = new Firestore({ projectId: process.env.PROJECT_ID });
  const collection = db.collection(process.env.FIRESTORE_COLLECTION_PATH);

  const message = Buffer.from(pubsubMessage.data, 'base64').toString();
  const messageRef = collection.doc(`${message.resource.id}-${message.event}`);

  await messageRef.set(message);
  console.log(`Message ${message.resource.id}-${message.event} stored.`);
};
