import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCP-aZ_kH8ozNywCRt3IwZGw7aFfSZOqZE",
  authDomain: "blender-653ba.firebaseapp.com",
  projectId: "blender-653ba",
  storageBucket: "blender-653ba.appspot.com",
  messagingSenderId: "446312909042",
  appId: "1:446312909042:web:5f86aff27eab60b5a5a86b",
  measurementId: "G-Y60G8EN8YB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();


export const createAccountWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error creating user account:", error);
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  };

export const addUserDoc = async (formData: Record<string, any>): Promise<void> => {
    if (!formData) {
        return;
    }
    
    try {
       await addDoc(collection(db, "users"), formData);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const uploadImage = (file: File, setUploadProgress: (progress: number) => void): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch(reject);
        }
      );
    });
  };