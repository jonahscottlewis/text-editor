import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the db');

  // Create a connection to the db and correct version 
  const contactDb = await openDB('jate', 1);

  // Create new transaction and specify db and privileges
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('saved to db', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the db');

  // Create a connection to the db and correct version 
  const contactDb = await openDB('jate', 1);

  // Create new transaction and specify db and privileges
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the db
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};


initdb();