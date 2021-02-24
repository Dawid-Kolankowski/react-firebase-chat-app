export const getIdsAndDocs = (doc: any) => {
  return { id: doc.id, ...doc.data() }
}
