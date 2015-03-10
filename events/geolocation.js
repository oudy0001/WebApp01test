
//Gobal Variables
var WAIBtn, FlagCanCreation = false, canvas, context, output, form, img, wrapper, waitingMessage;




        var reportPosition = function( position ){ 
  output = document.getElementById("MapOutput"); 
    img = new Image;
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=14&size=400x400&markers=color:blue%7C" + position.coords.latitude + "," + position.coords.longitude;
            waitingMessage.style.display = "none";
    

    output.appendChild(img);
    
}

document.addEventListener("deviceready", function(){

    wrapper = document.getElementById("MapWrapper");
    form = document.createElement("form");
    waitingMessage = document.createElement("p");
    waitingMessage.innerHTML = "Trying to get your location!";
    wrapper.appendChild(waitingMessage);
    

    
    
    
canvasDiv = document.createElement("div");
    canvasDiv.id = "canvasDiv";
    form.appendChild(canvasDiv);
    
    output = document.createElement("p");
    output.id = "output";
    form.appendChild(output);
    
    //position stuff

        if( navigator.geolocation ){ 
    //code goes here to find position
    var params = {enableHighAccuracy: true, timeout:36000, maximumAge:60000};
    //enableHighAccuracy means try to use GPS and drain the battery
    //for improved accuracy within a few meters.
    //maximum age is how long to cache the location info
    //timeout is how long to wait for the network to respond after the user says ok
    navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params ); 
    
    //to continually check the position (in case it changes) use
    // navigator.geolocation.watchPosition( reportPosition, gpsError, params)
            
            
            
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.setAttribute("height", 400);
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", 400);
    canvasDiv.innerHTML = img;
   // context.drawImage(img, 0, 0);
  }else{
    //browser does not support geolocation api
    alert("Sorry, but your browser does not support location based awesomeness.")
  }
    
    

    
    });


function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}
