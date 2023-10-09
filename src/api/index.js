import { collection, doc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'

import { upsert } from '../helpers'
import { useUnsubscribesStore } from '../stores/UnsubscribesStore'

export const fetchItem = async (collection, id, resources) => {
  const db = getFirestore()
  const unsubscribesStore = useUnsubscribesStore()
  return new Promise((resolve) => {
    const docRef = doc(db, collection, id)

    let item
    const unsubscribe = onSnapshot(docRef, (doc) => {
      item = { ...doc.data(), id: doc.id }
      upsert(resources, item)
      unsubscribesStore.addUnsubscribe(unsubscribe)
      resolve(item)
    })
  })
}

export const fetchItems = async (collection, ids, resources) => {
  const promises = ids.map((id) => fetchItem(collection, id, resources))
  return await Promise.all(promises)
}

export const fetchAllItems = async (col, resources) => {
  const db = getFirestore()
  const querySnapshot = await getDocs(collection(db, col))
  const items = []
  querySnapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }))
  items.forEach((item) => upsert(resources, item))
  return items
}
