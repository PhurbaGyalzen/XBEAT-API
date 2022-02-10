
import Song from "../models/Song.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// delete a song from artist's songs
export const deleteSong = async (req, res) => {
  try {
    const artist = await User.findById(req.user._id);
    const song = await Song.findById(req.params.song_id);
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    if (!song) {
      res.status(404).json({ error: "Song not found" });
      return;
    }
    if (artist.songs.indexOf(song._id) === -1) {
      res.status(400).json({ error: "Song not found in artist's songs" });
      return;
    }
    // overwrite the songs array
    const result = await User.findByIdAndUpdate(artist._id, { $pull: { songs: song._id } });
    console.log(result);
    await Song.deleteOne({ _id: song._id });
    res.status(200).json({
      message: "Song deleted successfully",
      song_id: song._id,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const uploadSong = async (req, res) => {
  try {
    const songFileName = req.file.filename;
    const songFileUrl = `${process.env.SERVER_URL}/stream/song/${songFileName}`;
    const artist_id = req.user._id;
    const title = req.body.title;
    const description = req.body.description;
    const genre = req.body.genre;
    const song = await Song.create({
      title: title,
      artist: artist_id,
      url: songFileUrl,
      description,
      genre,
    });
    console.log(song);
    // add song to artist's songs
    User.updateOne(
      { _id: artist_id },
      { $addToSet: { songs: song } },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    res.status(201).json({
      message: "Song uploaded successfully",
      song: song,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}



