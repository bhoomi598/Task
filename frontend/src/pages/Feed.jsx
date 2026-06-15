// import { useEffect, useState } from "react";
// import API from "../api";

// import CreatePost from "../components/CreatePost";
// import PostCard from "../components/PostCard";

// function Feed() {
//   const [posts, setPosts] = useState([]);

//   const loadPosts = async () => {
//     const res = await API.get("/posts/feed");

//     setPosts(res.data);
//   };

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   return (
//     <div className="feed">
//       <h1>Social Feed</h1>

//       <CreatePost loadPosts={loadPosts} />

//       {posts.map((post) => (
//         <PostCard
//           key={post._id}
//           post={post}
//           loadPosts={loadPosts}
//         />
//       ))}
//     </div>
//   );
// }

// export default Feed;


import { useEffect, useState } from "react";
import API from "../api";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await API.get("/posts/feed");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="feed">

      {/* Navbar */}
      <div className="navbar">
        <h2>TaskPlanet Social</h2>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <CreatePost loadPosts={loadPosts} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          loadPosts={loadPosts}
        />
      ))}
    </div>
  );
}

export default Feed;