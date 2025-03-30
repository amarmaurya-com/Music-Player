console.log('Lets go!');

// starting......
let songIndex = 0;
let audioElement = new Audio('songs/m1.mp3');
let masterPlay = document.getElementById('masterPlay') ;
let mastersongName = document.getElementById('mastersongName') ;
let ProgressBar = document.getElementById('lim') ;
let songItem = Array.from(document.getElementsByClassName('songItem'));

let song = [
    {songName: "Love me lic you do", filePath: "songs/m1.mp3", coverPath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4A4xrHvU-bGk2kM7JyWFWSABbhAANWgqhA&s"},
    {songName: "Pain", filePath: "songs/m2.mp3", coverPath:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1735798846"},
    {songName: " Dancing With Your Ghost    ", filePath: "songs/m3.mp3", coverPath:"https://c.saavncdn.com/074/Dancing-With-Your-Ghost-English-2019-20190624173146-500x500.jpg"},
    {songName: "Until I Found You", filePath: "songs/m4.mp3", coverPath:"https://i.scdn.co/image/ab67616d0000b2738792c3e96f8ab97a767c5d0c"},
    {songName: "Let Her Go", filePath: "songs/m5.mp3", coverPath:"https://i.scdn.co/image/ab67616d00001e028614b96ce7be8b1371295263"},
    {songName: "Let Me Down Slowly", filePath: "songs/m6.mp3", coverPath:"https://img.youtube.com/vi/9Od17y-4iR0/sddefault.jpg"},
    {songName: "See You Again", filePath: "songs/m7.mp3", coverPath:"https://i.ytimg.com/vi/RgKAFK5djSk/maxresdefault.jpg   "},
    {songName: "Peaches", filePath: "songs/m8.mp3", coverPath:"https://i.ytimg.com/vi/tQ0yjYUFKAE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC-sHFh9eNkWQL7mAkvEo1lOVKBGA"},
    {songName: "Alone, Pt. II", filePath: "songs/m9.mp3", coverPath:"https://i1.sndcdn.com/artworks-000658994143-me2it4-t500x500.jpg"},
    {songName: "Get You The Moon", filePath: "songs/m10.mp3", coverPath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzD-DMVkfimlY8x0tE2xntofz3ZFkWXybWWZr0ychSlrGc7etRpMIPgfrFkodQ1kzhqg&usqp=CAU"},
    {songName: "Falling Like The Stars", filePath: "songs/m11.mp3", coverPath:"https://static1.squarespace.com/static/56454c01e4b0177ad4141742/56f3eeaa6e06f2df013dd6cd/56f3ef166e06f2df013de90c/1458827030375/Covers-Vol.-1-Cover.jpg?format=original"},
    {songName: "Someone you love", filePath: "songs/m12.mp3", coverPath:"https://i.ytimg.com/vi/BlAiJXRdQxE/sddefault.jpg"},
]

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].songName; 
})


// play-pause.....
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play(); 
        masterPlay.classList.remove('fa-solid', 'fa-play');
        masterPlay.classList.add('fa-solid', 'fa-pause');
        console.log('started');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-solid', 'fa-pause');
        masterPlay.classList.add('fa-solid', 'fa-play');
        console.log('paused');
    }
});


// Listren Event.....
audioElement.addEventListener('timeupdate',() => {

    //  update progress bar
    ProgressBar.value =  Number(audioElement.currentTime / audioElement.duration) *100;
    console.log(ProgressBar.value);
    if (ProgressBar.value == 100) {
        ProgressBar.value = 0;
        masterPlay.classList.remove('fa-solid', 'fa-pause');
        masterPlay.classList.add('fa-solid', 'fa-play');
    }
})

// chnage progress bar at cick
ProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ProgressBar.value * audioElement.duration / 100;
    console.log('changed');
    if (ProgressBar.value == 100) {
        ProgressBar.value = 0;
        masterPlay.classList.remove('fa-solid', 'fa-pause');
        masterPlay.classList.add('fa-solid', 'fa-play');
    }
})
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songbutton')).forEach((element) => {
        element.classList.remove('fa-solid', 'fa-pause');
        element.classList.add('fa-solid', 'fa-play');
    });
};

// Track the currently playing song
let currentSongIndex = -1;

Array.from(document.getElementsByClassName('songbutton')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let songIndex = parseInt(e.target.id);
        mastersongName.innerText = song[songIndex].songName;
        // mastersongName.innerText = song[songIndex].songName;
        // Check if the same song is clicked again
        if (currentSongIndex === songIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-solid', 'fa-pause');
            e.target.classList.add('fa-solid', 'fa-play');
            masterPlay.classList.remove('fa-solid', 'fa-pause');
            masterPlay.classList.add('fa-solid', 'fa-play');
        } else {
            makeAllPlay(); // Reset all buttons to 'play'
            audioElement.src = `songs/m${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            
            // Update clicked button to 'pause'
            e.target.classList.remove('fa-solid', 'fa-play');
            e.target.classList.add('fa-solid', 'fa-pause');
            
            // Update masterPlay to 'pause'
            masterPlay.classList.remove('fa-solid', 'fa-play');
            masterPlay.classList.add('fa-solid', 'fa-pause');
            
            // Set the current song songIndex
            currentSongIndex = songIndex;
            
        }
    });
});
document.getElementById('next').addEventListener('click', (e) => {
    if(songIndex>12){
        songIndex = 0; 
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/m${songIndex + 1}.mp3`;
    mastersongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    
    // Update clicked button to 'pause'
    e.target.classList.remove('fa-solid', 'fa-play');
    e.target.classList.add('fa-solid', 'fa-pause');
})
document.getElementById('previous').addEventListener('click', (e) => {
    if(songIndex<=0){
        songIndex = 0; 
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/m${songIndex + 2}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    mastersongName.innerText = song[songIndex].songName;
    // Update clicked button to 'pause'
    e.target.classList.remove('fa-solid', 'fa-play');
    e.target.classList.add('fa-solid', 'fa-pause');
})