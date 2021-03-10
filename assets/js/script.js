// Mars Photo API
let nasaAPI = 'ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h';
let todayDate = moment().format('YYYY-MM-DD');
let photoRequestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/latest_photos?api_key='+nasaAPI+'&camera=MCZ_RIGHT';
let imageSwapper = $('#image-swapper');
let hrefVals = ['#one!','#two!','#three!','#four!'];
let navListEl = $('#history-list');
let email = "Guest"; 
let greetingEl = $('#personal-greeting');


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
        // console.log(data);
        // console.log(data.latest_photos);
        // console.log(data.latest_photos[0]);
        // console.log(data.latest_photos.length);
        // console.log(data.latest_photos[0].img_src);
        // console.log(data.latest_photos[0].id);
        let imageSrc = data.latest_photos[0].img_src;
        let imageID = data.latest_photos[0].id;
        generateCarouselItem(imageSrc, imageID, 0);

        imageSrc = data.latest_photos[1].img_src;
        imageID = data.latest_photos[1].id;
        generateCarouselItem(imageSrc, imageID, 1);
        
        $('.carousel').carousel({
          indicators: true
        });

       

      });
    
  }

  function generateCarouselItem(imgSrc, imgID, num) {
    // Generate navlink element tied to this carousel item
    let li = document.createElement('li');
    let liA = document.createElement('a');
      liA.setAttribute('href', '#carousel-image-'+num);
      liA.innerText = "Today's Image!";
      li.append(liA);
      navListEl.append(li);

    // Create the Anchor element in which to nest the img element
    let a = document.createElement('a');
      a.setAttribute('class', "carousel-item");
      a.setAttribute('href', hrefVals[num]);
      a.setAttribute('id', 'carousel-image-'+num);
      imageSwapper.append(a);

    // Identify <a> element for later use 
    let imageEl = $('#carousel-image-'+num);


    // Create the img element to display the picture from Mars!
    let img = document.createElement('img');
        img.setAttribute('src', imgSrc);
        img.setAttribute('alt', 'A Recent Photo of Mars');
        img.setAttribute('id', imgID);
        imageEl.append(img);        
  }

  

  

  

init();

// InSight Weather API Call
var requestUrl = 'https://api.nasa.gov/insight_weather/?api_key=ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h&feedtype=json&ver=1.0';
let $day = $("#today");
let $mainHeader = $("#main-header");
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
      /*let mars = {
        name: "temperatures",
        details: {temperature: 117}
      };
      const marsTemp = mars?.temperature ?? "N/A";
      console.log(marsTemp);*/
      $day.text("Mars Date: Sol " +desiredSol);
      $mainHeader.text("Mars Weather Dashboard - Today is Mars Date: Sol " + desiredSol);
      for (let i = desiredSol-1; i>desiredSol-4; i--) {
        if(i == desiredSol-1){
          $("#yesterday-sol").text(i);
        } else if (i == desiredSol-2) {
          $("#two-days-ago").text(i);
        }else if (i == desiredSol-3){
          $("#three-days-ago").text(i);
        }
      }
      console.log(desiredSol);      
      console.log(JSO[desiredSol]);
      if (JSO[desiredSol].AT) {
        console.log("Temp data");  
        console.log(JSO[desiredSol].AT.av);
        let marsTemp = JSO[desiredSol].AT.av;
        $day.after('<p> Temperature: '+marsTemp+'</p>');
      } else {
        $day.after('<p> Temperature: N/A </p>');
      console.log("no temp data");
      }

      if (JSO[desiredSol].PRE) {
        console.log("pressure data");  
        console.log(JSO[desiredSol].PRE.av);
        let pressure = JSO[desiredSol].PRE.av;
        $day.after('<p> Atmospheric pressure: '+pressure+'</p>');

      } else {
      console.log("no pressure data");
      }

      if (JSO[desiredSol].HWS) {
        console.log("Wind speed data");  
        console.log(JSO[desiredSol].HWS.av);
        let windSpeed = JSO[desiredSol].HWS.av;
        $day.after('<p> Horizontal Wind Speed: '+ windSpeed +'</p>');
      } else {
      console.log("no wind speed data");
      $day.after('<p> Horizontal Wind Speed: N/A </p>')
      }

      if (JSO[desiredSol].Season) {
        console.log("mars season");  
        console.log(JSO[desiredSol].Season);
        let marsSeason = JSO[desiredSol].Season;
        $day.after('<p> Season On Mars: '+ marsSeason +'</p>');
      } else {
      console.log("no wind speed data");
      $day.after('<p> Season on Mars: N/A </p>')
      }
      });

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

    
    emailFormEl.addEventListener('submit', handleSearchFormSubmit);
