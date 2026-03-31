let authPromise;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const loadFirebaseAuth = async () => {
  if (!authPromise) {
    authPromise = Promise.all([import("firebase/app"), import("firebase/auth")]).then(
      ([appModule, authModule]) => {
        const app = appModule.initializeApp(firebaseConfig);
        const auth = authModule.getAuth(app);

        return {
          auth,
          ...authModule,
        };
      }
    );
  }

  return authPromise;
};

export const getFirebaseAuthClient = async () => loadFirebaseAuth();
