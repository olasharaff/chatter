import {  onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth} from "../firebase";

export default function useAuthStatus() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogIn(true);
      }
      setCheckingStatus(false);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when component unmounts
    };

  }, []);

  return [isLogIn, checkingStatus];
}
