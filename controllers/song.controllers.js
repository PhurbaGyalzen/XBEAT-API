
import Song from "../models/Song.js";
import User from "../models/User.js";

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

