import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/Protected";
import Homepage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import ErrorPage from "./pages/ErrorPage";
import VideoPage from "./pages/VideoPage";
import VideoDetails from "./components/video/VideoDetails";
import VideoForm from "./pages/VideoForm";
import PlaylistPage from "./pages/PlaylistPage";
import Playlist from "./components/playlist/Playlist";
import UpdatePlaylist from "./components/playlist/UpdatePlaylist";
import GetUserTweets from "./components/tweet/GetUserTweets";
import TweetsPage from "./pages/TweetsPage";
import Subscriptions from "./pages/Subscriptions";
import TweetDetails from "./components/tweet/TweetDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "videos",
        element: (
          <ProtectedRoute>
            <VideoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "videos/:videoId",
        element: (
          <ProtectedRoute>
            <VideoDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "videos/addVideo",
        element: (
          <ProtectedRoute>
            <VideoForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "playlists",
        element: (
          <ProtectedRoute>
            <PlaylistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "playlist/:playlistId",
        element: (
          <ProtectedRoute>
            <Playlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "playlist/:playlistId/update",
        element: (
          <ProtectedRoute>
            <UpdatePlaylist />
          </ProtectedRoute>
        ),
      },
      {
        path: "tweets",
        element: (
          <ProtectedRoute>
            <TweetsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "tweets/:userId",
        element: (
          <ProtectedRoute>
            <GetUserTweets />
          </ProtectedRoute>
        ),
      },
      {
        path: "tweet/:tweetId",
        element: (
          <ProtectedRoute>
            <TweetDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
