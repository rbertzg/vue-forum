import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'

import { upsert } from '../helpers'

export const fetchItem = async (collection, id, resources) => {
  const db = getFirestore()
  try {
    console.log('fetching 1', collection, id)
    const docRef = doc(db, collection, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    const item = { ...docSnap.data(), id: docSnap.id }
    upsert(resources, item)
    return item
  } catch (error) {
    console.error('Failed to fetch item', error)
    throw error
  }
}

export const fetchItems = async (collection, ids, resources) => {
  try {
    console.log('fetching', collection, ids)
    const promises = ids.map((id) => fetchItem(collection, id, resources))
    return await Promise.all(promises)
  } catch (error) {
    console.error('Failed to fetch items', error)
    throw error
  }
}

export const fetchAllItems = async (col, resources) => {
  const db = getFirestore()
  console.log('fetching all', col)
  const querySnapshot = await getDocs(collection(db, col))
  const items = []
  querySnapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }))
  items.forEach((item) => upsert(resources, item))
  return items
}
