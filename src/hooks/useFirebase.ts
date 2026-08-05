import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export function useFirebase<T>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 LEER
  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items: T[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as T);
      });
      setData(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 AGREGAR
  const addItem = async (item: Omit<T, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), item);
      setData([...data, { ...item, id: docRef.id } as T]);
      return docRef.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 🔹 ELIMINAR
  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      setData(data.filter(item => (item as any).id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 🔹 ACTUALIZAR
  const updateItem = async (id: string, updatedData: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
      setData(data.map(item => 
        (item as any).id === id ? { ...item, ...updatedData } : item
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, addItem, deleteItem, updateItem, refresh: fetchData };
}