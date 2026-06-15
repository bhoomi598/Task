const express = require("express");
const multer = require("multer");

const auth = require("../middleware/auth");
const Post = require("../models/Post");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", auth, upload.single("image"), async (req, res) => {
  try {
    const text = req.body.text || "";

    const image = req.file ? req.file.filename : "";

    if (!text && !image) {
      return res.status(400).json({
        message: "Text or Image required",
      });
    }

    const post = await Post.create({
      user: req.user.id,

      username: req.user.username,

      text,

      image,
    });

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/feed", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });

  res.json(posts);
});

router.put("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const alreadyLiked = post.likes.includes(req.user.id);

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
  } else {
    post.likes.push(req.user.id);
  }

  await post.save();

  res.json(post);
});

router.post("/comment/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    user: req.user.id,

    username: req.user.username,

    text: req.body.text,
  });

  await post.save();

  res.json(post);
});

module.exports = router;
