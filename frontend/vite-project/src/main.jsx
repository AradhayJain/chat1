import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import App from "./App";
import { Provider } from "./components/ui/provider";
import UserContextProvider from "./provider/ChatProvider";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} /> {/* Use `index` for default nested route */}
      <Route path="chats" element={<ChatPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <React.StrictMode>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </UserContextProvider>
  
);
