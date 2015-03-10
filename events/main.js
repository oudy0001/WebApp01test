var map, home, contact, mapIcon, homeIcon, phoneIcon, style, styleString = "",
    pages, target, DisplayPage = "",
    brwoserAnimationSupport = ["-webkit-"],
    RandomContactBtn, touch, myElement;

var WAIBtn, FlagCanCreation = false,
    canvas, context, output, form, img, wrapper, waitingMessage;

var timeout = 1000; //time it takes to set to display none

document.addEventListener("DOMContentLoaded", setupApp);
//document.addEventListener("deviceready", setupApp);

function loadMap () {
    form = document.createElement("form");
    waitingMessage = document.createElement("p");
    waitingMessage.innerHTML = "Trying to get your location!";
    wrapper.appendChild(waitingMessage);
    canvasDiv = document.createElement("div");
    canvasDiv.id = "canvasDiv";
    form.appendChild(canvasDiv);

    output = document.createElement("p");
    output.id = "output";
    form.innerHTML = output;

    //position stuff

    if (navigator.geolocation) {
        //code goes here to find position
        var params = {
            enableHighAccuracy: true,
            timeout: 36000,
            maximumAge: 60000
        };
        //enableHighAccuracy means try to use GPS and drain the battery
        //for improved accuracy within a few meters.
        //maximum age is how long to cache the location info
        //timeout is how long to wait for the network to respond after the user says ok
        navigator.geolocation.getCurrentPosition(reportPosition, gpsError, params);

        //to continually check the position (in case it changes) use
        // navigator.geolocation.watchPosition( reportPosition, gpsError, params)



        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        canvas.setAttribute("height", 400);
        canvas.setAttribute("id", "canvas");
        canvas.setAttribute("width", 400);
        canvasDiv.innerHTML = img;
        // context.drawImage(img, 0, 0);
    } else {
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.");
    }
}
function setupApp() {
    touch = detectTouchSupport() ? "touchend" : "click";
    pages = document.getElementById("pages");
    style = document.getElementById("style");
    target = document.getElementById("target");
    map = document.getElementById("map");
    home = document.getElementById("home");
    contact = document.getElementById("contact");
    mapIcon = document.getElementById("mapIcon");
    homeIcon = document.getElementById("homeIcon");
    phoneIcon = document.getElementById("phoneIcon");
    contactOutput = document.getElementById("contactOutput");
    RandomContactBtn = document.getElementById("btn");
    myElement = document.getElementById('myElement');
    wrapper = document.getElementById("MapWrapper");
    
    homeIcon.addEventListener(touch, homeFunction, false);
    mapIcon.addEventListener(touch, mapFunction, false);
    phoneIcon.addEventListener(touch, phoneFunction, false);
    RandomContactBtn.addEventListener(touch, randomContactFunction, false);
    //myElement.addEventListener(touch, displayTouch, false);
    

    var hammertime = new Hammer(myElement, {});
    hammertime.on('panleft panright tap press', function(ev) {
        console.log(ev);
        myElement.innerHTML = ev.type +" gesture";
    });

}
function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}
function reportPosition (position) {
    output = document.getElementById("MapOutput");
    img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=14&size=400x400&markers=color:blue%7C" + position.coords.latitude + "," + position.coords.longitude;
    waitingMessage.style.display = "none";
    output.innerHTML = "";

    output.appendChild(img);
}
function homeFunction() {

    DisplayPage = "home";
    mapIcon.className = "";
    homeIcon.className = "active";
    phoneIcon.className = "";
    if (home.classList.contains("active")) {} else {
        var active = pages.querySelector(".active");
        if (map == active) {
            map.className = "slideOutLeft";
            home.className = "slideInRight active";
            contact.className = "hidden";
        } else {
            map.className = "hidden";
            home.className = "slideInLeft active";
            contact.className = "slideOutRight";

        }
        setTimeout(function() {
            if (DisplayPage == "home") {
                map.className = "hidden";
                contact.className = "hidden";
            } else {}
        }, timeout);
    }

}

function mapFunction() {
    loadMap();
    DisplayPage = "map";
    mapIcon.className = "active";
    homeIcon.className = "";
    phoneIcon.className = "";
    if (map.classList.contains("active")) {} else {
        var active = pages.querySelector(".active");
        if (contact == active) {
            map.className = "slideInRight active";
            home.className = "hidden";
            contact.className = "slideOutLeft";
        } else {
            map.className = "slideInLeft active";
            home.className = "slideOutRight";
            contact.className = "none";
        }
        setTimeout(function() {
            if (DisplayPage == "map") {
                home.className = "hidden";
                contact.className = "hidden";
            } else {}
        }, timeout);
    }
}

function phoneFunction() {
    DisplayPage = "phone";
    mapIcon.className = "";
    homeIcon.className = "";
    phoneIcon.className = "active";
    if (contact.classList.contains("active")) {} else {
        var active = pages.querySelector(".active");
        if (home == active) {
            map.className = "hidden";
            home.className = "slideOutLeft";
            contact.className = "slideInRight active";
        } else {
            map.className = "slideOutRight";
            home.className = "hidden";
            contact.className = "slideInLeft active";
        }
        setTimeout(function() {
            if (DisplayPage == "phone") {
                map.className = "hidden";
                home.className = "hidden";
            } else {}
        }, timeout);
    }
}

function randomContactFunction() {
    RandomContactBtn.innerHTML = "Please Wait";

    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    var randomNumber = Math.random() * (contacts.length - 1);
    RandomContactBtn.innerHTML = "Getting Ransom Number";
    var randomInt = Math.round(randomNumber);
    RandomContactBtn.innerHTML = "Rounding the Number";
    var randomContact = contacts[randomInt].displayName;
    RandomContactBtn.innerHTML = "Getting Contact Name";
    try {
        var contactNumber = contacts[randomInt].phoneNumbers[0].value;
    } catch (error) {
        RandomContactBtn.innerHTML = "Ugh Oh, Try Again";
    }
    var contactString = "";
    RandomContactBtn.innerHTML = "Tap here for random contact";

    try {
        contactString = "The Name: " + randomContact;
    } catch (error) {
        contactString = error;
    }
    try {
        contactString += "<br> Thier number is : " + contactNumber;
    } catch (error) {
        contactString = error;
    }
    contactOutput.innerHTML = contactString;

}

function onError(contactError) {
    alert('onError!');
}

//Touch check function curtesy of Steve G
function detectTouchSupport() {
    msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
    touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
    return touchSupport;
}
