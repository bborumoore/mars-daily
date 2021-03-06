// InSight Weather API Call
var requestUrl = 'https://api.nasa.gov/insight_weather/?api_key=ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h&feedtype=json&ver=1.0';
let $day = $("#today");
let $mainHeader = $("#main-header");
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
      $day.text(desiredSol);
      $mainHeader.text("Mars Weather Dashboard - Today is Mars Date: Sol " + desiredSol);
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
