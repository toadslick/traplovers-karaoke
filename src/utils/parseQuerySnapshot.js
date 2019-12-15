export default snapshot =>
  snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
