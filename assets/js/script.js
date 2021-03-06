// Mars Photo API
let nasaAPI = 'ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h';
let todayDate = moment().format('YYYY-MM-DD');
let photoRequestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/latest_photos?api_key='+nasaAPI+'&camera=MCZ_RIGHT';
let imageSwapper = $('#image-swapper');
let hrefVals = ['#one!','#two!','#three!','#four!'];
let navListEl = $('#history-list');


// Enable carousel using Materialize
$(document).ready(function(){
  
});

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
