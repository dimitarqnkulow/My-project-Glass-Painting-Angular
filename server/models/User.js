const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "There’s an existing account associated with this email!"],
    match: [/[^@]{6,}@(abv|gmail|yahoo)\.(bg|com)$/, "Invalid email adress!"],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password missmatch!");
  }
});
userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
