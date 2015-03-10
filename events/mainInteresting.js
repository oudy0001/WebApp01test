var map, home, contact, mapIcon, homeIcon, phoneIcon, style, styleString = "", pages, target,
    brwoserAnimationSupport = ["-moz-", "-webkit-", "-o-", ""];

var init = function () {
    pages = document.getElementById("pages");
    style = document.getElementById("style");
    target = document.getElementById("target");
    map = document.getElementById("map");
    home = document.getElementById("home");
    contact = document.getElementById("contact");
    mapIcon = document.getElementById("mapIcon");
    homeIcon = document.getElementById("homeIcon");
    phoneIcon = document.getElementById("phoneIcon");

    
    var animationBuilder = function(animationType, direction, beginPosition, endPosition, opacityStart, opacityEnd, rotateStart, rotateEnd){
        for(var i=1; i < brwoserAnimationSupport.length + 1; i++){
            styleString += "." + AnimationType + "{\n \
    " + brwoserAnimationSupport[i-1] + "animation: \
" + animationType + "\
2s;\n \
}\
\n \
            \n 
            "@" + brwoserAnimationSupport[i-1] + "keyframes " + AnimationType + " {\n \
0%{top: 0%;\n \
" + direction + ": " + beginPosition + ";\n \
opacity:" + opacityStart + ";\n \
" + brwoserAnimationSupport[i-1] + "transform: rototateY(" + rotateStart + ");\n \
        }\n \
100%{top: 0%;\n \
" + direction + ": " + endPosition + ";\n \
opacity:" + opacityEnd + ";\n \
" + brwoserAnimationSupport[i-1] + "transform: rototateY(" + rotateEnd + ");\n \
        }\n \
\n \
\n \
\n \
";   
        }    
}//*/
  
    
    var animationType = "just work already!!!";
    
    var testfunction = function(animationType){
            for(var i=1; i < brwoserAnimationSupport.length + 1; i++){
            styleString += "." + animationType + "{\n \
    " + brwoserAnimationSupport[i-1] + "animation: \
" + animationType + " \
2s; \
}\ "}
    }
    //testfunction("he");
    
    
    var animationBuilder = function (animationType, direction, beginPosition, endPosition, opacityStart, opacityEnd, rotateStart, rotateEnd) {
        for(var i=1; i < brwoserAnimationSupport.length + 1; i++){
            styleString += "\n." + animationType + "{\n \
    " + brwoserAnimationSupport[i-1] + "animation: \
" + animationType + " \
2s; \
}\ \n @" + brwoserAnimationSupport[i-1] + "keyframes " + animationType + " {\n \
0%{top: 0%;\n \
" + direction + ": " + beginPosition + ";\n \
opacity:" + opacityStart + ";\n \
" + brwoserAnimationSupport[i-1] + "transform: rototateY(" + rotateStart + ");\n \
        }\n \
100%{top: 0%;\n \
" + direction + ": " + endPosition + ";\n \
opacity:" + opacityEnd + ";\n \
" + brwoserAnimationSupport[i-1] + "transform: rototateY(" + rotateEnd + ");\n \
        }\n \
\n \
\n \
\n \
";
            
        }
    }//*/
    
    animationBuilder("atype", "right", 10, 110, 0, 1, 0, 90);
    
    
    style.innerHTML += styleString;
    
    //animationBuilder();
    
    homeIcon.addEventListener("click", function(){
        if(home.classList.contains("active")){}else{
        var active = pages.querySelector(".active");
            if (map == active){
                //alert(map.classList);
                contact.className = "none";
                map.className = "slideOutLeft";
                home.className = "slideInRight active";
                setTimeout(function(){map.className = "none"}, 2000)
                
                //alert(map.classList);
                //alert(home.classList);
            }else{
                map.classList = "";
                contact.classList= "slideOutRight";
                home.classList = "slideInLeft active";
            }
        }
        //alert(window.screen.availWidth);
    })
    
    
    
        
};


document.addEventListener("DOMContentLoaded", init);