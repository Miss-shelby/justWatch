// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isSignedIn: boolean | null; // null = checking, true = signed in, false = not signed in
  isReady: boolean;
   setIsSignedIn: (value: boolean) => void; 
}
let globalSetIsSignedIn: ((value: boolean) => void) | null = null;

export const signOutGlobal = () => {
  if (globalSetIsSignedIn) {
    globalSetIsSignedIn(false);
  }
};
const AuthContext = createContext<AuthContextType>({ isSignedIn: null, isReady: false,setIsSignedIn: () => {}  });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
 
  useEffect(() => {
    globalSetIsSignedIn = setIsSignedIn; // Expose it globally
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setIsSignedIn(!!token);
      setIsReady(true);
    };
    checkAuth();
  }, []);

  console.log(isSignedIn,'auth value in context');
  
  return (
    <AuthContext.Provider value={{ isSignedIn, isReady,setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);