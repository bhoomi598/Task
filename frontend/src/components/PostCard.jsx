import API from "../api";
import { useState } from "react";

function PostCard({ post, loadPosts }) {
  const [comment, setComment] = useState("");

  const likePost = async () => {
    await API.put(
      `/posts/like/${post._id}`,
      {},
      {
        headers: {
          Authorization:
            localStorage.getItem("token"),
        },
      }
    );

    loadPosts();
  };

  const addComment = async () => {
    if (!comment) return;

    await API.post(
      `/posts/comment/${post._id}`,
      { text: comment },
      {
        headers: {
          Authorization:
            localStorage.getItem("token"),
        },
      }
    );

    setComment("");

    loadPosts();
  };

  return (
    <div className="post-card">
      <h4>{post.username}</h4>

      <p>{post.text}</p>

      {post.image && (
        <img
          src={`https://backend-eekt.onrender.com/uploads/${post.image}`}
          alt=""
        />
      )}

      <div className="actions">
        <button onClick={likePost}>
          ❤️ {post.likes.length}
        </button>
      </div>

      <input
        placeholder="Comment..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button onClick={addComment}>
        Add Comment
      </button>

      <h5>
        Comments ({post.comments.length})
      </h5>

      {post.comments.map((c, index) => (
        <p key={index}>
          <strong>{c.username}:</strong>{" "}
          {c.text}
        </p>
      ))}
    </div>
  );
}

export default PostCard;