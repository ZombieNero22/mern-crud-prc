const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//READ
app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//GET USER ID
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//CREATE
app.post("/createUser", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Email already exists
      return res.status(400).json({ error: "Email already exists" });
    }

    // If email does not exist, proceed with creating the user
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, age, gender, status } = req.body;

  try {
    // Check if the email already exists (excluding the current user's email)
    const existingUser = await UserModel.findOne({ email, _id: { $ne: id } });

    if (existingUser) {
      // Email already exists for another user
      return res
        .status(400)
        .json({ error: "Email already exists for another user" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      { name, email, age, gender, status },
      { new: true } // Return the updated document
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//DELETE
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findOneAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
