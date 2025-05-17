import Firebase from './config';

const db = Firebase.firestore();
const favoritesRepository = db.collection('favorites');

export const upsertFavorite = async (data) => {
  data.id = String(data.id)

  if (favoriteExists(data.id)) {
    await favoritesRepository.doc(data.id).set(data, { merge: true });    
  } else {
    await favoritesRepository.add({
      ...data,
      createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  
  return data.id;
};

export const favoriteExists = async (id) => {
  const externalId = String(id)

  const doc = await favoritesRepository.doc(externalId).get();
  return doc.exists;
};

export const getFavoriteById = async (id) => {
  const externalId = String(id)

  const doc = await favoritesRepository.doc(externalId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const getFavoriteByName = async (name) => {
  const snapshot = await favoritesRepository.where('name', '==', name).get();
  if (snapshot.empty) {
    return null
  } else {
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() };
  }
};

export const getAllFavorites = async () => {
  const snapshot = await favoritesRepository.where('favorite', '==', true).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
