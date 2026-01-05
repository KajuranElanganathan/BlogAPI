import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './index.css'  
import RequireAuth from "./components/RequireAuth";


import App from "./App";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage.jsx";
import ClubSectionPage from "./pages/ClubSectionPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";


import DashBoard from "./pages/Dashboard/DashBoard.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";

import CreatePostPage from "./pages/Dashboard/CreatePostPage.jsx";
import EditPostPage from "./pages/Dashboard/EditPostPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },     
      { path: "posts/:id", element: <PostPage /> },
      { path: "clubs/:category", element: <ClubSectionPage /> },
      { path: "*", element: <NotFoundPage /> }, 
      { path: "user/login", element: <LoginPage /> },  
      { path: "user/register", element: <RegisterPage /> },  


      {
        path: "dashboard",
        element: <RequireAuth adminOnly={true} />, 
        children: [
    { index: true, element: <DashboardHome /> },
    { path: "posts/create", element: <CreatePostPage /> },
    { path: "posts/edit/:id", element: <EditPostPage /> },
    { path: "posts", element: <DashBoard /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
