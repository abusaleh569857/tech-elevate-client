
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/app/App.jsx";
import { store } from "./app/store.js";
import AuthProvider from "@/app/providers/AuthProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
);


