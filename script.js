const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
    {
        name: "song-1",
        displayName: "Reggae Fusion",
        artist: "Unknown",
    },
    {
        name: "song-2",
        displayName: "Seven Nation Army",
        artist: "Unknown",
    },
    {
        name: "song-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Unknown",
    },
    {
        name: "metric-1",
        displayName: "Front Row",
        artist: "Unknown",
    },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load - select first song
loadSong(songs[songIndex]);

// Update progress bar & time
function updateProgressBar(event) {
    if (isPlaying) {
        const {duration, currentTime} = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// Event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);