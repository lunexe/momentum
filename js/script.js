const time = document.querySelector ('.time');
const date = document.querySelector ('.date');
const greeting = document.querySelector ('.greeting');
const user = document.querySelector ('.name');
const body = document.querySelector('.bode');

const sliderNext = document.querySelector ('.slide-next');
const sliderPrev = document.querySelector ('.slide-prev');


const weatherIcon = document.querySelector ('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherHumidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const errorOutput = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');







let randomNum;



// TIME_function 
function showTime () {
    let dateN = new Date();
  
   
    const currentTime = dateN.toLocaleTimeString('en-US', {
        hour12:false,
    });
    time.textContent = String(currentTime);
    
    
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    const currentDate = dateN.toLocaleDateString('en-US', options);

    
    date.textContent = String(currentDate);
    console.log(currentDate);

    setTimeout(showTime, 1000);
}
showTime();

// Greeting_function
function getTimeOfDay() {
    let date = new Date(),
    hour = date.getHours();

    if (hour > 5 && hour < 12) {
        return 'morning';      
    } else if (hour > 11 && hour < 18) {
        return 'afternoon';
    } else if (hour > 17 && hour < 24) {
        return 'evening';
    } else {
        return 'night';
    }
setTimeout(getTimeOfDay, 2000);
}
function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const text = `Good ${timeOfDay}`;
    greeting.innerHTML = text;
}
showGreeting();

//Local_storage
function setLocalStorage () {
    localStorage.setItem ('name', user.value);
}
window.addEventListener ('beforeunload', setLocalStorage);

function getLocalStorage () {
    if(localStorage.getItem('name')) {
        user.value = localStorage.getItem ('name');
    }
}
window.addEventListener('load', getLocalStorage);

//Rundom_number_function

 function getRandomNum(q = 20) { 
    randomNum = Math.floor(Math.random() * q);
    return String(randomNum).padStart(2, 0);     
}
getRandomNum();

console.log(randomNum);
//Set_Background_function
let data;
let randomNumApi;

const imageSourceGit = document.querySelector('.github');
function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = getRandomNum();

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
 
}
setBg();


//set images source 
const imageSource = document.querySelector('.unsplash__api');
imageSource.value = getTimeOfDay();
async function getLinkToImage() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query${imageSource.value}=&client_id=Sl75EIZWddYqFlCJ5OUzHX_xHtT5-3niYjbMB7OcRuo`;
    const res = await fetch(url);
    const data = await res.json();

    document.body.style.backgroundImage = `url('${data.urls.full}')`;
}
function getPrevImage () {
    const img = new Image ();
    img.src = data[randomNumApi].urls.full;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${data[randomNumApi].urls.full}')`;
    };
}
sliderPrev.addEventListener('click', getPrevImage);

imageSource.addEventListener ('click', getLinkToImage);
imageSourceGit.addEventListener('click', setBg);
//Flicker 
const imageSourceFli = document.querySelector('.flick__api');
imageSourceFli.value = getTimeOfDay();
async function getLinkToImageFli() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d60a685d68cc1a893bc956af8001aaa&tags=${imageSourceFli.value}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    document.body.style.backgroundImage = `url('${data.photos.photo[randomNum].url_l}')`;
}
imageSourceFli.addEventListener('click', getLinkToImageFli);

//Slider__function
function getSliderNext () {
     if (randomNum === '20') {
        randomNum = '01';
    } else {
        randomNum = randomNum++;
    }

setBg();
}
function getSliderPrev () {
    if (randomNum === '01') {
        randomNum = 20;
    } else {
        randomNum = randomNum - 1;
    }
    
setBg();
}

sliderNext.addEventListener('click', getSliderNext);
sliderPrev.addEventListener('click', getSliderPrev); 

sliderNext.addEventListener('click', () => {
    if (flickr.classList.contains ('btn-active')) {
        getLinkToImageFli();
      } else if (unsplash.classList.contains ('btn-active')) {
        getLinkToImage();   
      } else {
        getSliderNext();
      }
  });
  
  sliderPrev.addEventListener('click', () => {
    if (flickr.classList.contains ('btn-active')) {
        getLinkToImageFli();
      } else if (unsplash.classList.contains ('btn-active')) {
        getLinkToImage();   
      } else {
        getSliderPrev();
      }
  });
  



//Weather__function
async function getWeather () {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=ef1c33de99cacf24f7acc24043bfcd89&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherHumidity.textContent = `Относительная влажность ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Скорость ветра ${data.wind.speed.toFixed(0)} м/с`;
   
}
getWeather();
city.addEventListener('change', getWeather);



//Local__weather 




//Audio__palyer
import playList from "./playlist.js";

const audio = document.querySelector('.audio'),
      trackList = document.querySelector('.play-list'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.play-prev'),
      nextBtn = document.querySelector('.play-next'),
      currentTrack = document.querySelector('.player-track-name');

let playNum = 0;


function createPlayList() {
  playList.forEach(item => {
    trackList.insertAdjacentHTML('beforeend', 
      `
        <li><div class="play player-icon list"></div>${item.title}</li>
      `);
  });
}

createPlayList();
const tracks = document.querySelectorAll('.play-list > li'),
      playListBtns = document.querySelectorAll('.player-icon.list');


function playAudio(button) {
  audio.paused ? audio.play() : audio.pause();

  audio.paused && button.classList.contains('pause') ? 
    button.classList.remove('pause') : 
      button.classList.add('pause');
  

  setGeneralTime();
}

function playPrev() {
  if(playNum === 0) {
    playNum = (playList.length-1);
    audio.src = playList[playNum].src;
    playAudio(playBtn);
  } else {
    playNum = (playNum-1);
    audio.src = playList[playNum].src;
    playAudio(playBtn);
  }
  currentTrack.textContent = playList[playNum].title;  
}

function playNext() {
  if(playNum === (playList.length-1)) {
    playNum = 0;
    audio.src = playList[playNum].src;
    
    playAudio(playBtn);
  } else {
    playNum = (playNum+1);
    audio.src = playList[playNum].src;
    playAudio(playBtn);
  }
  currentTrack.textContent = playList[playNum].title;
}


playBtn.addEventListener('click', () => {
  playAudio(playBtn);
});
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);


let src;
playListBtns.forEach((item, i) => {
  item.addEventListener('click', () => {
    if(src !== playList[i].src) {
      audio.src = playList[i].src;
      src = playList[i].src;
    }
    audio.paused ? audio.play() : audio.pause();


    if(!audio.paused && !playBtn.classList.contains('pause')) {
      item.classList.add('pause');
      playBtn.classList.add('pause');
    } else if (audio.paused && playBtn.classList.contains('pause')) {
      playBtn.classList.remove('pause');
      item.classList.remove('pause');
    }
    setGeneralTime(i);

  });
});

currentTrack.textContent = playList[playNum].title;

audio.addEventListener('ended', playNext);

// Pro__Audio

const audioDuration = document.querySelector('.player-duration'),
      audioVolume = document.querySelector('.volume-range'),
      volumeBtn = document.querySelector('.volume-icon'),
      currentTime = document.querySelector('.current-time'),
      generalTime = document.querySelector('.all-time');


function setGeneralTime(i = playNum) {
  generalTime.textContent = playList[i].duration;
}
setGeneralTime();

function outCurrentTime() {
  currentTime.textContent = new Date(audio.currentTime * 1000).toISOString().substring(14, 19);
}

// Duration time

audio.addEventListener('timeupdate', () => {
  if (isNaN(audio.duration)) {
    audioDuration.value = 0;
  } else {
    audioDuration.value = audio.currentTime / (audio.duration / 100);
    currentTime.textContent = Math.round(audio.currentTime);
    outCurrentTime();
  }
})

audioDuration.addEventListener('input', () => {
  audio.currentTime = audioDuration.value * (audio.duration / 100);
})

audio.src = playList[0].src;
audio.volume = 0.5;
audioDuration.value = 0;

// volume 
audioVolume.addEventListener('input', (e) => {
  audio.volume = audioVolume.value / 100;
  audio.volume === 0 ? volumeBtn.classList.add('muted') : volumeBtn.classList.remove('muted') 
});

let cacheVol;
volumeBtn.addEventListener('click', () => {
  if(audio.volume >= 0.01) {
    cacheVol = audioVolume.value / 100;
    audio.volume = 0;
    audioVolume.value = 0;
    
  } else {
    
    audio.volume = cacheVol;
    audioVolume.value = cacheVol * 100;
  }
});

  
//не работает 
 //function addPlayList() {
   // playList.forEach((song, number) => {
     //   const li = document.createElement ('li');
       // li.classList.add('play-item');
        //li.textContent = song.title;
        //li.addEventListener('click', function () {
          //  playOnClick(number, this);
        //});
        //playListLi.append(li);
    //});
//}

//===================================================
//API Quotes 
const quoteText = document.querySelector('.quote'),
      quoteAuthor = document.querySelector('.author'),
      changeQuote = document.querySelector('.change-quote');
    
async function getQuotes() {
    const quotes = 'https://favqs.com/api/qotd/';
    const res = await fetch(quotes);
          
    const data = await res.json(); 

    const { body, author } = data.quote;
        quoteText.textContent = body;
        quoteAuthor.textContent = author;   
          
}
getQuotes();
changeQuote.addEventListener('click', getQuotes)
//=====================================================

//Quotes 




//Settings 
const settingsBtn = document.querySelector ('.settings__button');
const settingsBlock = document.querySelector ('.settings');
const settingsCloseBtn = document.querySelector ('.settings__block__close');


//open settings menu 
settingsBtn.addEventListener('click', () => {
    settingsBlock.classList.toggle('open');
});
settingsCloseBtn.addEventListener('click', () => {
    settingsBlock.classList.remove('open');
});

const hideBlocksCheklist = document.querySelectorAll('.settings__hide input[type="checkbox"]');

hideBlocksCheklist.forEach(item => {
    item.addEventListener('change', () => {
        hideBlock(item.name);
    });
});

function hideBlock(target) {
    let targetBlock = document.querySelector(`.${target}`);

    targetBlock.classList.contains('hidden') ?
        targetBlock.classList.remove('hidden') : targetBlock.classList.add('hidden');
}



//btn 
const git = document.querySelector('.github');
const unsplash = document.querySelector('.unsplash');
const flickr = document.querySelector('.flick');

git.addEventListener('click', () => {
  git.classList.add ('btn-active');
  unsplash.classList.remove ('btn-active');
  flickr.classList.remove ('btn-active');
  setBg();
});

unsplash.addEventListener('click', () => {
  git.classList.remove ('btn-active');
  unsplash.classList.add ('btn-active');
  flickr.classList.remove ('btn-active');
  getLinkToImage();
  
});

flickr.addEventListener('click', () => {
  git.classList.remove ('btn-active');
  unsplash.classList.remove ('btn-active');
  flickr.classList.add ('btn-active');
  getLinkToImageFli();

});

// to do
const todoUL = document.querySelector('.todo-list');
const addTodoInput = document.querySelector('.add-todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoWrap = document.querySelector('.todo-wrap');

function toggleCheckedForLI(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }
}
function deleteTodo() {
  const todoLI = this.parentElement;
  todoLI.removeChild(this);
  todoLI.parentNode.removeChild(todoLI);
}
function createCloseBtn(parrentEl) {
  const button = document.createElement('button');
  button.classList.add('icon');
  button.classList.add('close-li');
  button.addEventListener('click', deleteTodo);
  parrentEl.appendChild(button);
}
function createLI(value, isChecked = false) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  if (isChecked) li.classList.add('checked');
  li.textContent = value;
  createCloseBtn(li);
  todoUL.appendChild(li);
}

function createNewTodo() {
  const newTodo = addTodoInput.value;
  addTodoInput.value = '';
  createLI(newTodo);
}

function toggleShowTodoList() {
  todoWrap.classList.toggle('open-todo');
}

todoUL.addEventListener('click', toggleCheckedForLI);
addTodoInput.addEventListener('change', createNewTodo);
todoBtn.addEventListener('click', toggleShowTodoList);








// Name_function 

