import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/services/api/authApi.js";
import { userApi } from "@/services/api/userApi.js";
import { getFirebaseAuthClient } from "@/lib/firebase/firebaseClient.js";

const serializeUser = (firebaseUser) => {
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  };
};

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const syncAuthSession = createAsyncThunk(
  "auth/syncAuthSession",
  async (firebaseUser, { rejectWithValue }) => {
    try {
      if (!firebaseUser) {
        localStorage.removeItem("userToken");
        return {
          user: null,
          token: null,
          profile: null,
          role: null,
        };
      }

      const jwtResponse = await authApi.createJwt({ email: firebaseUser.email });
      const token = jwtResponse?.token || null;

      if (token) {
        localStorage.setItem("userToken", token);
      }

      const profile = await userApi.getUserByEmail(firebaseUser.email).catch(() => null);

      return {
        user: serializeUser(firebaseUser),
        token,
        profile,
        role: profile?.role || "user",
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to sync auth session."));
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ name, email, password, photoURL }, { rejectWithValue }) => {
    try {
      const { auth, createUserWithEmailAndPassword, updateProfile } =
        await getFirebaseAuthClient();
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL,
      });

      await userApi.createUser({
        name,
        email,
        photoURL,
        uid: result.user.uid,
      });

      return serializeUser({
        ...result.user,
        displayName: name,
        photoURL,
      });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Registration failed."));
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { auth, signInWithEmailAndPassword } = await getFirebaseAuthClient();
      const result = await signInWithEmailAndPassword(auth, email, password);
      return serializeUser(result.user);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Login failed."));
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const { auth, GoogleAuthProvider, signInWithPopup } = await getFirebaseAuthClient();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      await userApi.createUser({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      });

      return serializeUser(firebaseUser);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Google login failed."));
    }
  }
);

export const logoutCurrentUser = createAsyncThunk(
  "auth/logoutCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { auth, signOut } = await getFirebaseAuthClient();
      await signOut(auth);
      localStorage.removeItem("userToken");
      return true;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Logout failed."));
    }
  }
);

export const refreshCurrentUserProfile = createAsyncThunk(
  "auth/refreshCurrentUserProfile",
  async (email, { rejectWithValue }) => {
    try {
      const profile = await userApi.getUserByEmail(email);
      return profile;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load user profile."));
    }
  }
);

export const subscribeToMembership = createAsyncThunk(
  "auth/subscribeToMembership",
  async ({ email, isSubscribed, subscriptionDate }, { rejectWithValue }) => {
    try {
      await userApi.updateSubscription({
        email,
        isSubscribed,
        subscriptionDate,
      });

      const profile = await userApi.getUserByEmail(email);
      return profile;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update subscription."));
    }
  }
);
