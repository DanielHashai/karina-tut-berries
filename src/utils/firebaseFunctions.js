import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
export const updateItem = async (itemId, data) => {
  try {
    console.log(data);
    console.log(itemId);
    await updateDoc(doc(firestore, "foodItems", itemId), data);
  } catch (err) {
    throw new Error("Item not found");
  }

  // Item with the provided ID doesn't exist
};
