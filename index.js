const musics = [
    {
        name: "Khairayat",
        artist : "Arijit Singh, Pritam",
        song: "./Songs/Khairiyat Happy - Chhichhore.mp3",
        image:"./Images/khairiyat.jpg"
    },
    {
        name: "Chale aana",
        artist : "Armaan Malik, Amaal Malik",
        song: "./Songs/Chale Aana - De De Pyaar De.mp3",
        image : "./Images/chale.jpg"
    },
    {
        name: "Shiddat",
        artist : "Manan Bhardwaj, Manan Bhardwaj",
        song: "./Songs/Shiddat - Title Song.mp3",
        image:"./Images/shiddat.jpg"
    },
    {
        name: "Barbaadiyan",
        artist : "Sachet Tandon,Nikhita Gandhi, Sachin Jigar",
        song: "./Songs/Barbaadiyan - Shiddat.mp3",
        image:"./Images/barbadian.jpg"
    },
    {
        name: "Memories",
        artist : "Bilal Saeed, Bonafide, Bilal Saeed",
        song : "./Songs/Memories - Bonafide Ft Bilal Saeed 320kbps.mp3",
        image:"./Images/music-img.jpg"
    },
]

const musicImg = document.querySelector('#m-image')
const musicName = document.querySelector('.music-name')
const artistName= document.querySelector('.artist-name')
const backbtn = document.querySelector('.back-btn')
const playPausebtn = document.querySelector('.play-btn')
const nextbtn = document.querySelector('.next-btn')
const progressArea = document.querySelector(".player-progress")
const progressBar = document.querySelector(".player-bar")
const mainMusic = document.querySelector("#main-music")
 
let musicIndex = Math.floor((Math.random() * musics.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
      
});

function loadMusic(index){
    musicImg.src = musics[index-1].image;
    musicName.innerText = musics[index-1].name;
    artistName.innerText = musics[index-1].artist;
    mainMusic.src = musics[index-1].song;
}
  

function playMusic(){
    const pause = document.getElementById("play-btn");     
    pause.classList.remove("fa-play")
    pause.classList.add("fa-pause")
    mainMusic.play();
}

function pauseMusic(){
    const pause = document.getElementById("play-btn");     
    pause.classList.remove("fa-pause")
    pause.classList.add("fa-play")
    mainMusic.pause();
}

function prevMusic(){
    musicIndex--;
    if(musicIndex<1){
        musicIndex=musics.length;
    }else{
        musicIndex=musicIndex;
    }
    loadMusic(musicIndex);
     
    playMusic();
      
}


function nextMusic(){
     
    musicIndex++;
    if(musicIndex>musics.length){
        musicIndex=1;
    }else{
        musicIndex=musicIndex;
    }
    loadMusic(musicIndex);
     
    playMusic();      
      
}

playPausebtn.addEventListener('click',()=>{
    const isMusicPlay = document.getElementById('play-btn')
    
    if(isMusicPlay.classList.contains('fa-pause')){
        pauseMusic();
    }else{
        playMusic();
    }
})

backbtn.addEventListener("click", ()=>{
    prevMusic();
});
   
nextbtn.addEventListener("click", ()=>{
    nextMusic();
});

mainMusic.addEventListener('timeupdate',(e)=>{
     
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = document.querySelector(".current-time"),
    musicDuartion = document.querySelector(".max-duration");

    mainMusic.addEventListener('loadeddata',()=>{
        let mainAdDuration = mainMusic.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec < 10){  
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    
    let currMin = Math.floor(currentTime/60);
    let currSec = Math.floor(currentTime%60);
    if(currSec<10){
        currSec = `0${currSec}`;
    }
    musicCurrentTime.innerText = `${currMin}:${currSec}`
});

progressArea.addEventListener('click',(e)=>{
   let progressWidth = progressArea.clientWidth;
   let clickedOffsetX = e.offsetX;
   let songDuration = mainMusic.duration;  
  
  mainMusic.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();      
});
  