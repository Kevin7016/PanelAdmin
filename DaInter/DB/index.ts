import localforage from 'localforage';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'DaInterDB',
  version: 1,
});

localforage.createInstance({
  name: 'Principal',
  storeName: 'ObjectStore1',
});

export const store1 = localforage.createInstance({
  name: 'Users',
  storeName: 'ObjectStore1',
});


localforage.createInstance({
  name: 'Principal',
  storeName: 'ObjectStore2',
});

export const store2 = localforage.createInstance({
  name: 'DaInter',
  storeName: 'ObjectStore2',
});