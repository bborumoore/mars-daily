// InSight Weather API Call
var requestUrl = 'https://api.nasa.gov/insight_weather/?api_key=ItYxdjJELvpdQnE7UpY2vTQ0TJYVVVBG7LMfq51h&feedtype=json&ver=1.0';

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
      console.log(desiredSol);      
      console.log(JSO[desiredSol].PRE.av);
      console.log(JSO[desiredSol]);
      console.log(JSO[desiredSol].includes("PRE"));
      /*if (JSO[desiredSol].includes("")) {
        console.log(JSO[desiredSol].AT.av);  
      }
      console.log(JSO[desiredSol].HWS.av); */ 
      });