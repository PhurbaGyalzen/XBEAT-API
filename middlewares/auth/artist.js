import Song from "../../models/Song.js";


// middleware to identify if the song is that of the artist

export const isSongOfArtist = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.song_id);
    if (song.artist.toString() !== req.user._id.toString()) {
      res.status(403).json({ error: "You are not allowed to perform this operation" });
      return;
    }
    console.log(" is song next");
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

