import "firebase/firestore";
import { collection, query, orderBy, getCountFromServer, limit, getDocs, startAfter, endBefore, limitToLast } from "firebase/firestore";  

export const getCarCount = async (db) => {
  const coll = collection(db, "cars");
  return getCountFromServer(coll);
}

export const getFirstCars = (db, max=10) => {
  const first = query(collection(db, "cars"), orderBy("brand"), limit(max));
  return getDocs(first);
}

export const getPaginatedCars = (db, max=10, lastVisible, after) => {
  return after ? getNextCars(db, lastVisible, max) : getPreviousCars(db, lastVisible, max);
}

const getNextCars = (db, lastCar, max=10) => {
  const next = query(collection(db, "cars"), orderBy("brand"),startAfter(lastCar),limit(max));
  return getDocs(next);
}

const getPreviousCars = (db, lastCar, max=10) => {
  const previous = query(collection(db, "cars"), orderBy("brand"),endBefore(lastCar),limitToLast(max));
  return getDocs(previous);
}

export const getCarDetails = (db, carID) => {
  return db?.collection('car-details')?.doc(carID)?.get()
}