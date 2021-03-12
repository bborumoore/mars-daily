// Mars Photo API
let nasaAPI = 'ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h';
let todayDate = moment().format('YYYY-MM-DD');
let photoRequestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/latest_photos?api_key='+nasaAPI; //+'&camera=MCZ_RIGHT';
let imageSwapper = $('#image-swapper');
let hrefVals = ['#one!','#two!','#three!','#four!','#five!'];
let navListEl = $('#history-list');
let email = "Guest"; 
let greetingEl = $('#personal-greeting');

// Enables carousel funcitonality through Materialize
$('.carousel').carousel({
  indicators: true
});

// Setting keyup event listner
document.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "Left":
    case "ArrowLeft":
      $('.carousel').carousel('prev');
      break;
    case "Right":
    case "ArrowRight":
      $('.carousel').carousel('next');
      break;
  }
});

// Enable carousel using Materialize
// console.log(todayDate);
// fetch(photoRequestUrl, {
//   method:'GET',
//   credentials: 'same-origin',
//   redirect: "follow",
//   })
//   .then(function (response) {
//      return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.latest_photos);
//     console.log(data.latest_photos[0]);
//     console.log(data.latest_photos.length);
//     console.log(data.latest_photos[0].img_src);
//     console.log(data.latest_photos[0].id);   
//   });

// Initialize funciton to load in newest Mars photo and weather
function init() {
  let storedEmail = JSON.parse(localStorage.getItem("email"));
  if(storedEmail !== null) {
      email = storedEmail;
      greetingEl[0].innerText = "Welcome, " + email;
  }

  fetchMarsPhoto();
}

function fetchMarsPhoto() {

  fetch(photoRequestUrl, {
    method:'GET',
    credentials: 'same-origin',
    redirect: "follow",
  })
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    console.log('PHOTO API', data);
    // console.log(data.latest_photos);
    // console.log(data.latest_photos[0]);
    // console.log(data.latest_photos.length);
    // console.log(data.latest_photos[0].img_src);
    // console.log(data.latest_photos[0].id);
    
    
    for(i=0; i < hrefVals.length; i++) {
      let imageSrc = data.latest_photos[i].img_src;
      let imageID = data.latest_photos[i].id;
      let earthDate = data.latest_photos[i].earth_date;
      generateCarouselItem(imageSrc, imageID, earthDate, i);
    }
  });
}

function generateCarouselItem(imgSrc, imgID, earthDate, num) {
  
  // We decided not to generate links at this time - we couldn't get them to propely link with the correct slide
  // Generate navlink element tied to this carousel item
  // let li = document.createElement('li');
  // let liA = document.createElement('a');
  //   liA.setAttribute('href', '#carousel-image-'+num);
  //   liA.innerText = "Today's Image!";
  //   li.append(liA);
  //   navListEl.append(li);

  // We will now be nesting the img into already existing/static Div container
  // Create the Anchor element in which to nest the img element
  // let a = document.createElement('a');
  //   a.setAttribute('class', "carousel-item");
  //   a.setAttribute('href', hrefVals[num]);
  //   a.setAttribute('id', 'carousel-image-'+num);
  //   imageSwapper.append(a);

  // Identify <a> element for later use 
  let imageEl = document.getElementById(hrefVals[i]);


  // Create the img element to display the picture from Mars!
  let img = document.createElement('img');
  img.setAttribute('src', imgSrc);
  img.setAttribute('alt', 'A Recent Photo of Mars');
  img.setAttribute('id', imgID);
  imageEl.append(img);        
}  

init();

// InSight Weather API Call
let requestUrl = 'https://api.nasa.gov/insight_weather/?api_key=ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h&feedtype=json&ver=1.0';
let $dateHeader = $("#mars-date");
let $marsDates = $("#history-list");
fetch(requestUrl, {
    method:'GET',
    credentials: 'same-origin',
    redirect: "follow",
})
.then(function (response) {
      return response.json();
})
.then(function (data) {
  console.log(data);
  let JSO = data;
  let desiredSolNum = JSO.sol_keys.length-1;
  let desiredSol = JSO.sol_keys[desiredSolNum];

  $dateHeader.text("Today is Mars Date: Sol " + desiredSol); 

  console.log(desiredSol);      
  console.log(JSO[desiredSol]);
  
  for(i=0; i < hrefVals.length; i++) {
    let dailyTemp = JSO[desiredSol-i]?.AT?.av ?? "No Temperature Available for this day";
    let dailyPressure = JSO[desiredSol-i]?.PRE?.av ?? "No Pressure Available for this day";
    let dailyWindSpeed = JSO[desiredSol-i]?.HWS?.av ?? "No Wind Speed Available for this day";
    let currentSeason = JSO[desiredSol-i]?.Season ?? "Current Season Unavailable";

    if (dailyTemp != "No Temperature Available for this day")
      dailyTemp+= " &#176;C";
      
    if (dailyPressure != "No Pressure Available for this day")
      dailyPressure+= " Pa";

    if (dailyWindSpeed != "No Wind Speed Available for this day")
      dailyWindSpeed+= " mph";

    appendInsightData(desiredSol-i, dailyTemp, dailyPressure, dailyWindSpeed, currentSeason, i);
  }
});

function appendInsightData(sol, dailyTemp, dailyPressure, dailyWindSpeed, currentSeason, i) {
  let headerContainer = document.getElementById('header'+hrefVals[i]);
  headerContainer.innerText = "Sol: " + sol;
  
  let pContainer = document.getElementById('p'+hrefVals[i]);
  pContainer.innerText = 'Temperature: ' + dailyTemp
  + '\n\n Pressure: ' + dailyPressure
  + '\n\n Wind Speed: ' + dailyWindSpeed
  + '\n\n Current Season: ' + currentSeason;
  pContainer.setAttribute('class', '');
}

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);
});

let emailFormEl = document.querySelector('#email-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  let emailInputVal = document.querySelector('#email').value;
  //let formatInputVal = document.querySelector('#format-input');
  greetingEl[0].innerText = "Welcome, " + emailInputVal;
  localStorage.setItem("email", JSON.stringify(emailInputVal));

  console.log(greetingEl);
  console.log(greetingEl.innerText);
  console.log(emailInputVal);
  //console.log(formatInputVal);
  $('.modal').modal('close');
}

//Random Photos jQuery

$(document).ready(function(){
  $('.materialboxed').materialbox();
});

emailFormEl.addEventListener('submit', handleSearchFormSubmit);
