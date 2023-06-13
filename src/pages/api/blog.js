import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

export const createPost = async (payload) => {
  if (payload) {
    await addDoc(collection(db, "blogs"), {
      ...payload,
      uuid: uuidv4(),
      createdOn: serverTimestamp(),
    }).catch((err) => console.log(err));
  }
};

export const useGetRecentPost = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const q = query(
    collection(db, "blogs"),
    orderBy("createdOn", "desc"),
    limit(4)
  );

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setRecentPosts(documents);
    });
    return () => unsub();
  }, []);

  return { recentPosts };
};

export const useGetPost = (id) => {
  const [post, setPost] = useState({});

  const docRef = doc(db, "blogs", id);
  useEffect(() => {
    const unsub = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Convert to City object
        const data = docSnap.data();
        setPost(data);
      } else {
        console.log("No such document!");
      }
    };
    return () => unsub();
  }, []);

  return { post };
};
export const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const q = query(collection(db, "blogs"));

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setPosts(documents);
    });
    return () => unsub();
  }, []);

  return { posts };
};
export const useGetPostsBySpecificUser = (id) => {
  const [posts, setPosts] = useState([]);
  const q = query(collection(db, "blogs"), where("author.uid", "==", id));

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setPosts(documents);
    });
    return () => unsub();
  }, []);

  return { posts };
};

export const updatePost = async (id, payload) => {
  await updateDoc(doc(db, "blogs", id), {
    ...payload,
    updatedOn: serverTimestamp(),
  });
};
export const deletePost = async (id) => {
  await deleteDoc(doc(db, "blogs", id));
};

export const uploadPostImage = async (image, setFilePath) => {
  if (image) {
    const imageRef = ref(storage, `images/${image.name}`);

    const metadata = {
      contentType: image.type,
    };
    await uploadBytes(imageRef, image, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const url = downloadURL;
        if (url) {
          setFilePath(url);
        }
      });
    });
  }
};
