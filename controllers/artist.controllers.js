import Artist from "../models/Artist.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Get all artists
export const getArtists = async (req, res) => {
  const artists = await Artist.find({}, { password: 0 });
  res.json(artists);
};

// login artist
export const loginArtist = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const artist = await Artist.findOne({ username });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, artist.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }
    const token = jwt.sign({ id: artist._id }, TOKEN_SECRET);
    res.status(200).json({
      message: "Artist logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Individual artist
export const getIndividualArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id, { password: 0 });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    res.status(200).json({
      message: "Artist info",
      artist: artist,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Create new artist
export const registerArtist = async (req, res) => {
  try {
    const username = req.body.username;
    const artistData = await Artist.findOne({ username: username });
    if (artistData != null) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }
    const password = req.body.password;
    const hashed_pw = await bcrypt.hash(password, 10);
    const artist = await ArtistModel.create({
      username: req.body.username,
      name: req.body.name,
      password: hashed_pw,
      profile: req.body.profile,
      gener: req.body.gener,
    });
    res.status(201).json({
      message: "Artist registered successfully",
      artist: artist._id,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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
  const { id } = req.params;
  await Artist.findByIdAndRemove(id);
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
