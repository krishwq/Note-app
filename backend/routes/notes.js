const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");

//1. get all the notes using get /api/notes/fetchallnotes by userid
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json( notes );
  } catch (errors) {
    console.error(errors.massage);
    res.status(500).send("Internal server error");
  }
});

//2. add new notes using post /api/notes/addnote
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description should have atleast 5 charecter").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    const { title, description, tag } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenotes = await note.save();
      res.json( savenotes );
    } catch (errors) {
      console.error(errors.massage);
      res.status(500).send("Internal server error");
    }
  }
);

//3. update notes using put /api/notes/updatenote/:id
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (errors) {
    console.error(errors.massage);
    res.status(500).send("Internal server error");
  }
});

//4. delete notes using delete /api/notes/deletenote/:id

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Notes deleted successfully");
  } catch (errors) {
    console.error(errors.massage);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
