export const findById = (resources, id) => {
  if (!resources) return null
  return resources.find((r) => r.id === id)
}

export const upsert = (resources, resource) => {
  if (!resources) return console.warn(`${resources} doesnt exist`)
  const index = resources.findIndex((r) => r.id === resource.id)
  if (resource.id && index > -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}

export const docToResource = (doc) => {
  if (typeof doc?.data !== 'function') return doc
  return { ...doc.data(), id: doc.id }
}
