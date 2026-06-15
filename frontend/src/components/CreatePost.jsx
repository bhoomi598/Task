import { useState } from "react";
import API from "../api";

function CreatePost({ loadPosts }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("text", text);

    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post(
        "/posts/create",
        formData,
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      setText("");
      setImage(null);

      loadPosts();
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <form
      className="create-post"
      onSubmit={submitHandler}
    >
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      <button>Post</button>
    </form>
  );
}

export default CreatePost;