import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import App from "./App";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },     
      { path: "posts/:id", element: <PostPage /> }, 
      { path: "*", element: <NotFoundPage /> }, 
      {path:"/user/login", element:<LoginPage/>}  
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <authProvider>
    <RouterProvider router={router} />
  </authProvider>
);




