import { firestore } from "../../../../../firebase/config";

const getDocs = (searchTerm, userId, collectionName, setResult, setLoading) =>
  firestore
    .collection(collectionName)
    .where("ownerId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot(
      (snap) => {
        const documents = [];
        snap.docs.forEach((doc) => {
          if (doc.data().name.trim().toLowerCase().includes(searchTerm)) {
            return documents.push({ id: doc.id, ...doc.data() });
          }
        });

        setResult(documents);
        setTimeout(() => setLoading?.(false), 800);
      },
      (err) => console.log(err)
    );

export default getDocs;
