"use client";

import { createContext, useState } from "react";
import UserPool from "../utils/cognito-pool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

type AccountContextType = {
  signup: (email: string, password: string) => Promise<unknown>;
  authenticate: (email: string, password: string) => Promise<unknown>;
  getSession: () => Promise<{ session: any; user: any }>;
  logout: () => void;
  isOnline: boolean;
};

const AuthContext = createContext<AccountContextType | null>(null);

function Account({ children }: any) {
  const [isOnline, setIsOnline] = useState(false);
  const signup: AccountContextType["signup"] = async (email, password) => {
    return await new Promise((resolve, reject) =>
      UserPool.signUp(email, password, [], [], (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    );
  };

  const authenticate: AccountContextType["authenticate"] = async (
    email,
    password
  ) => {
    var authenticationData = {
      Username: email,
      Password: password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
      Username: email,
      Pool: UserPool,
    };
    console.log("userData", userData);

    var user = new CognitoUser(userData);
    return await new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result);
          setIsOnline(result.isValid());
          resolve(result);
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        },
      })
    );
  };

  const getSession: AccountContextType["getSession"] = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (!user) {
        reject();
      }
      user?.getSession((err: any, session: any) => {
        if (err) {
          reject(err);
        }
        resolve({ session, user });
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    setIsOnline(false);
  };

  return (
    <AuthContext.Provider
      value={{ signup, authenticate, getSession, logout, isOnline }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { Account, AuthContext };
