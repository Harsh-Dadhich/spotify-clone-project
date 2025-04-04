
const songs = [
    {
      name: "Song 1",
      artist: "Artist 1",
      albumArt: "https://via.placeholder.com/200?text=Song1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      name: "Song 2",
      artist: "Artist 2",
      albumArt: "https://via.placeholder.com/200?text=Song2",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
  ];
  
  let currentSongIndex = 0;
  let audio = new Audio(songs[currentSongIndex].url);
  let isPlaying = false;
  
  const playButton = document.getElementById('play');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const seekbar = document.getElementById('seekbar');
  
  
  function updateSongDetails() {
    const song = songs[currentSongIndex];
    document.getElementById('song-name').innerText = song.name;
    document.getElementById('artist-name').innerText = song.artist;
    document.querySelector('.album-cover').src = song.albumArt;
  }
  
  
  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
      playButton.innerText = "Play";
    } else {
      audio.play();
      playButton.innerText = "Pause";
    }
    isPlaying = !isPlaying;
  }
  
  
  function changeSong(increment) {
    currentSongIndex = (currentSongIndex + increment + songs.length) % songs.length;
    audio.src = songs[currentSongIndex].url;
    audio.play();
    updateSongDetails();
    playButton.innerText = "Pause";
    isPlaying = true;
  }
  
  
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekbar.value = progress;
  });
  
  
  seekbar.addEventListener('input', () => {
    audio.currentTime = (seekbar.value / 100) * audio.duration;
  });
  
  
  playButton.addEventListener('click', togglePlayPause);
  prevButton.addEventListener('click', () => changeSong(-1));
  nextButton.addEventListener('click', () => changeSong(1));
  
  
  updateSongDetails();
  