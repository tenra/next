import Image from 'next/image'
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "lib/auth";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true); 
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current_user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <>
      <h1>home</h1>
      {currentUser?.name}
    </>
  )
}
