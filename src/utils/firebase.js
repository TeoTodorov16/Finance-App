/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';

  import {
    ref,
    onValue,
    set,
    push,
    remove,
  } from "firebase/database";
import { getDatabase } from 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(config);
export const firebase = getAuth(app);
export const database = getDatabase();

/**
 * @param {string} email 
 * @param {string} password
 * Envokes createUserWithEmailAndPassword from firebase/auth to create a new user wit the email and password choice in current environments firebase configuration.
 * @returns {Promise} Up to you, the caller, to get resolution via .then and .catch
 */
 export const signup = (email, password) => {
    return createUserWithEmailAndPassword(firebase, email, password);
}

/**
 * @param {string} email 
 * @param {string} password
 * Envokes signInWithEmailAndPassword from firebase/auth to authenticate the user in current environments firebase configuration.
 * @returns {Promise} Up to you, the caller, to get resolution via .then and .catch
 */
export const login = (email, password) => {
    return signInWithEmailAndPassword(firebase, email, password);
}

/**
 * @param {string} email 
 * @param {string} password
 * Envokes signOut from firebase/auth using current environments firebase configuration.
 * @returns {Promise} Up to you, the caller, to get resolution via .then and .catch
 */
export const logout = (email, password) => {
    return signOut(firebase, email, password);
}

/**
 * @param {string} bucket the 'path' or sub for the database where the item to remove is stored.
 * @param {string} key the key of the item to remove from the database
 * Envokes remove(ref()) from firebase/database to remove the record from the current database configuration pulled from environment at the bucket (path) with passed key.
 * @returns {Promise} Up to you, the caller, to get resolution via .then and .catch
 */
export const deleteRecord = (bucket, key) => {
    return remove(ref(database, `${bucket}/${key}`));
}

/**
 * @param {string} bucket the 'path' or sub for the database where the item to remove is stored.
 * @param {string} key the key of the item to remove from the database
 * @param {any} newRecord the object (or string, or int) to replace the current record in the current configured database at bucket/key
 * Envokes set(ref()) from firebase/database to update the record at the bucket (path) with passed key, to the new object provided. 
 * @returns {Promise} Up to you, the caller, to get resolution via .then and .catch
 
 */
export const updateRecord = (bucket, key, newRecord) => {
    return set(ref(database, `${bucket}/${key}`),newRecord);
}

/**
 * @param {string} bucket the 'path' or sub for the database where the item to create should be stored
 * @param {any} newRecord the object (or string, or int) to replace the current record in the current configured database at bucket/key
 * Envokes set(ref()) from firebase/database to create the newRecord at the bucket (path).
 * @returns {Promise} Up to you, the caller, to get resolution via .then and .catch
 */
 export const createRecord = (bucket, newRecord) => {
    return push(ref(database, `${bucket}/`),newRecord);
}

export const getRef = (path) => {
    return ref(database, path)
}

export const getOnValue = () => {
    return onValue;
}