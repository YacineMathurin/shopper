import { useEffect, useContext } from 'react';
import { AuthContext } from '../account';

export function useUserStatus() {
   const context = useContext(AuthContext);

  useEffect(() => {
    console.log("Hook called !");
  }, [context?.isOnline]);

  return context?.isOnline;
}