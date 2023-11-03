const mongoose = require("mongoose");
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: {
    type: String,
    required: true,
    match: [urlRegex, "Please enter a valid URL."],
  },
  link: {
    text: { type: String, required: true },
    path: { type: String, required: true },
  },
  allowedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("NewsItem", newsSchema, "newsItems");
