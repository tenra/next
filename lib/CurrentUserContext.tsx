import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState, useEffect } from "react"
import { getCurrentUser } from "lib/auth";

export interface ChildrenProps {
        children: ReactNode
}

type CurrentUserContextType = {
  loading: boolean;
  setLoading: Dispatch <SetStateAction<boolean>>;
  currentUser: {
    name: string;
    email: string;
  };
  setCurrentUser: Dispatch <SetStateAction<string>>;
  isSignedIn: boolean;
  setIsSignedIn: Dispatch <SetStateAction<boolean>>;
}
const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined)

export function CurrentUserWrapper({ children } : ChildrenProps ) {  
  const [loading, setLoading] = useState<boolean>(false)  

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
  }, [setIsSignedIn]);

  const currentUserValue = useMemo(() => ({
    loading, setLoading,
    currentUser, setCurrentUser,
    isSignedIn, setIsSignedIn
  }), [
    loading, setLoading,
    currentUser, setCurrentUser,
    isSignedIn, setIsSignedIn
  ])

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserContext() {
    const context = useContext(CurrentUserContext)
    if (context === undefined) {
        throw new Error('Context is undefined')
    }
    return context
}
