const express = require("express");
const app = express();

app.use(express.json());

let albums = [
  {
    id: 1,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    release_year: "1973"
  }
];

//CREATE
app.post("/api/albums", (req, res) => {
  const { title, artist, release_date } = req.body;

  // error handling
  if (!title || !artist || !release_date) {
    return res
      .status(400)
      .json({ message: "Title, artist, dan release_date wajib diisi!" });
  }

  const newAlbum = {
    id: albums.length > 0 ? albums[albums.length - 1].id + 1 : 1,
    title: title,
    artist: artist,
    release_date: release_date
  };

  albums.push(newAlbum);
  res
    .status(201)
    .json({ message: "Album berhasil ditambahkan", data: newAlbum });
});

// READ
// read all
app.get("/api/albums", (req, res) => {
  res.status(200).json(albums);
});

// read by id
app.get("/api/albums/:id", (req, res) => {
  const album = albums.find((a) => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).json({ message: "Album tidak ditemukan" });
  res.status(200).json(album);
});

//UPDATE
app.put("/api/albums/:id", (req, res) => {
  const album = albums.find((a) => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).json({ message: "Album tidak ditemukan" });

  album.title = req.body.title || album.title;
  album.artist = req.body.artist || album.artist;
  album.release_date = req.body.release_date || album.release_date;

  res.status(200).json({ message: "Album berhasil diupdate", data: album });
});

//DELETE
app.delete("/api/albums/:id", (req, res) => {
  const initialLength = albums.length;
  albums = albums.filter((a) => a.id !== parseInt(req.params.id));

  if (albums.length === initialLength) {
    return res.status(404).json({ message: "Album tidak ditemukan" });
  }

  res.status(200).json({ message: "Album berhasil dihapus" });
});

module.exports = app;
