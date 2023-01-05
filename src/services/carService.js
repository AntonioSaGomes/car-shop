import "firebase/firestore";
import { collection, query, orderBy, getCountFromServer, limit, getDocs, startAt,where } from "firebase/firestore";  

export const getCarCount = async (db) => {
  const coll = collection(db, "cars");
  return getCountFromServer(coll);
}

export const getPaginatedCars = (db, page, max=10) => {
  const first = query(collection(db, "cars"), orderBy("brand"),startAt(page * limit), limit(max));
  return getDocs(first);
  
}

export const getCarDetails = (db, carID) => {
  return db?.collection('car-details')?.doc(carID)?.get()
  
}