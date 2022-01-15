import Artist from "../models/artist.model";

// Get all artists
export const getArtists = async (req, res) => {
  const artists = await Artist.find();
  res.json(artists);
};

// Get one artist
export const getArtist = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  res.json(artist);
};

// Create new artist
export const createArtist = async (req, res) => {
  const artist = new Artist(req.body);
  await artist.save();
  res.json({
    status: "Artist Saved",
  });
};

// Update artist
export const updateArtist = async (req, res) => {
  const { id } = req.params;
  const artist = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    songs: req.body.songs,
  };
  await Artist.findByIdAndUpdate(id, { $set: artist }, { new: true });
  res.json({
    status: "Artist Updated",
  });
};

// Delete artist
export const deleteArtist = async (req, res) => {
  await Artist.findByIdAndRemove(req.params.id);
  res.json({
    status: "Artist Deleted",
  });
};

// Get artist songs
export const getArtistSongs = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  res.json(artist.songs);
};

// Add song to artist
export const addSongToArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  const song = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    url: req.body.url,
  };
  artist.songs.push(song);
  await artist.save();
  res.json({
    status: "Song Added",
  });
};

// Delete song from artist
export const deleteSongFromArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  artist.songs.pull(req.body.songId);
  await artist.save();
  res.json({
    status: "Song Deleted",
  });
};

// Get artist albums
export const getArtistAlbums = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  res.json(artist.albums);
};

// Add album to artist
export const addAlbumToArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  const album = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    songs: req.body.songs,
  };
  artist.albums.push(album);
  await artist.save();
  res.json({
    status: "Album Added",
  });
};

// Delete album from artist
export const deleteAlbumFromArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  artist.albums.pull(req.body.albumId);
  await artist.save();
  res.json({
    status: "Album Deleted",
  });
};

// Get artist playlists
export const getArtistPlaylists = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  res.json(artist.playlists);
};
