const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Song Schema
const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('Song', songSchema);

// Routes

// 1. Insert initial songs
app.post('/api/songs/init', async (req, res) => {
    const initialSongs = [
        {
            songname: "Tum Hi Ho",
            film: "Aashiqui 2",
            music_director: "Mithoon",
            singer: "Arijit Singh"
        },
        {
            songname: "Channa Mereya",
            film: "Ae Dil Hai Mushkil",
            music_director: "Pritam",
            singer: "Arijit Singh"
        },
        {
            songname: "Gerua",
            film: "Dilwale",
            music_director: "Pritam",
            singer: "Arijit Singh"
        },
        {
            songname: "Kesariya",
            film: "Brahmastra",
            music_director: "Pritam",
            singer: "Arijit Singh"
        },
        {
            songname: "Pasoori",
            film: "Coke Studio",
            music_director: "Ali Sethi",
            singer: "Ali Sethi"
        }
    ];

    try {
        await Song.insertMany(initialSongs);
        res.json({ message: "Initial songs added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get all songs and count
app.get('/api/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        const count = await Song.countDocuments();
        res.json({ count, songs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get songs by music director
app.get('/api/songs/director/:director', async (req, res) => {
    try {
        const songs = await Song.find({ music_director: req.params.director });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get songs by music director and singer
app.get('/api/songs/director/:director/singer/:singer', async (req, res) => {
    try {
        const songs = await Song.find({
            music_director: req.params.director,
            singer: req.params.singer
        });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a song
app.delete('/api/songs/:id', async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Add a new song
app.post('/api/songs', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        await newSong.save();
        res.json(newSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Get songs by singer and film
app.get('/api/songs/singer/:singer/film/:film', async (req, res) => {
    try {
        const songs = await Song.find({
            singer: req.params.singer,
            film: req.params.film
        });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. Update song with actor and actress
app.put('/api/songs/:id', async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});