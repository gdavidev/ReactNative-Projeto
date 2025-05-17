import { db } from './config';
import {
  collection,
  query,
  addDoc,
  where,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  limit,
  orderBy,
  doc
} from "firebase/storage";

// Collection names
export const COLLECTIONS = {
  FAVORITES: 'favorites',
};

// Add a new document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date()
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Get a document by ID
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

// Get all documents from a collection
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

// Query documents with filters
export const queryDocuments = async (collectionName, filters = [], sortBy = null, limitTo = null) => {
  try {
    let q = collection(db, collectionName);

    // Add filters
    if (filters.length > 0) {
      const queryConstraints = filters.map(filter => {
        return where(filter.field, filter.operator, filter.value);
      });
      q = query(q, ...queryConstraints);
    }

    // Add sorting
    if (sortBy) {
      q = query(q, orderBy(sortBy.field, sortBy.direction || 'asc'));
    }

    // Add limit
    if (limitTo) {
      q = query(q, limit(limitTo));
    }

    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};
