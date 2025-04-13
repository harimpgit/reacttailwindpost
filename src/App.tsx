import { useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { Post } from "./services/api";

function App() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handlePostCreated = (_post: Post) => {
    // Force refresh of the PostList component
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Axios - HK</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <PostForm onPostCreated={handlePostCreated} />

        <PostList key={refreshKey} />
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Demo React App with Vite, Tailwind CSS and Axios</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
