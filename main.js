document.getElementById("box1").style.transform = "rotate(30deg)";
document.getElementById("box2").style.transform = "rotate(-30deg)";  
document.getElementById("demo2").style.transformOrigin=  "50% 100% ";

$(document).ready(function(){




  // Add smooth scrolling to all links

/*
 * CircleType 0.36
 * Peter Hrynkow
 * Copyright 2014, Licensed GPL & MIT
 * Modified by http://stackoverflow.com/users/1913729/blex
*/

$.fn.circleType = function(options) {

    var self = this,
        settings = {
        dir: 1,
        position: 'relative',
    };
    if (typeof($.fn.lettering) !== 'function') {
        console.log('Lettering.js is required');
        return;
    }
    return this.each(function () {
    
        if (options) { 
            $.extend(settings, options);
        }
        var elem = this, 
            delta = (180 / Math.PI),
            fs = parseInt($(elem).css('font-size'), 10),
            ch = parseInt($(elem).css('line-height'), 10) || fs,
            letters, 
            center;

        // trim spaces at the beginning and at the end
        elem.innerHTML = elem.innerHTML.replace(/^\s+|\s+$/g, '');

        // grab the HTML string
        var temp = elem.innerHTML;
        
        // replace any space that is not part of a tag with a non-breakable space (&nbsp;)
        elem.innerHTML = elem.innerHTML.replace(/<[^<>]+>|\s/g, function(s) { return s[0] == '<' ? s : '&nbsp;'; })

        // wrap each character in a span
        $(elem).lettering();

        
        var inTag = false, // are we between tags? (<i>here</i>)
            isTag = false, // are we inside a tag? (<here></here>)
            tagNum = -1,   // how many opening tags have we met so far?
            pos = 0,       // character position (excluding tags)
            dom = document.createElement('div'); // temporary dom

        dom.innerHTML = temp; // clone our element in the temporary dom

        var tags = dom.children; // children of the element
        // for each of them, empty it
        for(var i=0, l=tags.length; i<l; i++){
            tags[i].innerHTML = '';
        }

        // for each character in our HTML string
        for(var i=0, l= temp.length; i<l; i++){
            var c = temp[i];
            // if it's a '<'
            if(c == '<'){
                // and if it's an opening tag
                if(!inTag){
                    // increment the number of tags met
                    tagNum++;
                    // we're in a tag!
                    inTag = true;
                }
                else{
                    // otherwise we're in a closing tag
                    inTag = false;
                }
                // we're on a tag (<here>)
                isTag = true;
            }
            // if it's a '>'
            else if(c == '>'){
                // we're not <here> anymore
                isTag = false;
            }
            // if we're not <here>
            else if(!isTag){
                // if we're <b>here</b>
                if(inTag){
                    // replace the span's content with our tag
                    elem.children[pos].innerHTML = tags[tagNum].outerHTML;
                    // put the letter back in
                    elem.children[pos].children[0].innerHTML = c;
                }
                // move forward in the spans
                pos++;
            }
        }


        elem.style.position =  settings.position;

        letters = elem.getElementsByTagName('span');
        center = Math.floor(letters.length / 2)
                
        var layout = function () {
            var tw = 0, 
                i,
                offset = 0,
                minRadius, 
                origin, 
                innerRadius,
                l, style, r, transform;
                                                
            for (i = 0; i < letters.length; i++) {
                tw += letters[i].offsetWidth;
            }
            minRadius = (tw / Math.PI) / 2 + ch;
            
            if (settings.fluid && !settings.fitText) {
                settings.radius = Math.max(elem.offsetWidth / 2, minRadius);
            }    
            else if (!settings.radius) {
                settings.radius = minRadius;
            }   
            
            if (settings.dir === -1) {
                origin = 'center ' + (-settings.radius + ch) / fs + 'em';
            } else {
                origin = 'center ' + settings.radius / fs + 'em';
            }

            innerRadius = settings.radius - ch;
                
            for (i = 0; i < letters.length; i++) {
                l = letters[i];
                offset += l.offsetWidth / 2 / innerRadius * delta;
                l.rot = offset;                      
                offset += l.offsetWidth / 2 / innerRadius * delta;
            }   
            for (i = 0; i < letters.length; i++) {
                l = letters[i]
                style = l.style
                r = (-offset * settings.dir / 2) + l.rot * settings.dir            
                transform = 'rotate(' + r + 'deg)';
                    
                style.position = 'absolute';
                style.left = '50%';
                style.marginLeft = -(l.offsetWidth / 2) / fs + 'em';

                style.webkitTransform = transform;
                style.MozTransform = transform;
                style.OTransform = transform;
                style.msTransform = transform;
                style.transform = transform;

                style.webkitTransformOrigin = origin;
                style.MozTransformOrigin = origin;
                style.OTransformOrigin = origin;
                style.msTransformOrigin = origin;
                style.transformOrigin = origin;
                if(settings.dir === -1) {
                    style.bottom = 0;
                }
            }
            
            if (settings.fitText) {
                if (typeof($.fn.fitText) !== 'function') {
                    console.log('FitText.js is required when using the fitText option');
                } else {
                    $(elem).fitText();
                    $(window).resize(function () {
                        updateHeight();
                    });
                }
            }    
            updateHeight();
            
            if (typeof settings.callback === 'function') {
                // Execute our callback with the element we transformed as `this`
                settings.callback.apply(elem);
            }
        };
        
        var getBounds = function (elem) {
            var docElem = document.documentElement,
                box = elem.getBoundingClientRect();
            return {
                top: box.top + window.pageYOffset - docElem.clientTop,
                left: box.left + window.pageXOffset - docElem.clientLeft,
                height: box.height
            };
        };       
        
        var updateHeight = function () {
            var mid = getBounds(letters[center]),
                first = getBounds(letters[0]),
                h;
            if (mid.top < first.top) {
                h = first.top - mid.top + first.height;
            } else {
                h = mid.top - first.top + first.height;
            }
            elem.style.height = h + 'px';  
        }

        if (settings.fluid && !settings.fitText) {
            $(window).resize(function () {
                layout();
            });
        }    

        if (document.readyState !== "complete") {
            elem.style.visibility = 'hidden';
            $(window).load(function () {
                elem.style.visibility = 'visible';
                layout();
            });
        } else {
            layout();
        }
    });
};




  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {

  animate = true;
  executeFrame();

}
var ii = 0;
var txt = 'hello world!';
var speed = 100;

function typeWriter() {
  if (ii < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(ii)
    ii++;
    setTimeout(typeWriter, speed);
  }
}
var iii = 0;
var txxt = ' im aparimeya ';
var speeed = 100;

function typeWriterr() {
  if (iii < txxt.length) {
    document.getElementById("demoo").innerHTML += txxt.charAt(iii)
    iii++;
    setTimeout(typeWriterr, speeed);
  }
}
var iiii = 0;
var txxxt;
var speeeed = 10;

function typeWriterrr() {
  if (iiii < txxxt.length) {
    document.getElementById("demooo").innerHTML += txxxt.charAt(iiii);
    iiii++;
    setTimeout(typeWriterrr, speeeed);
  }
}

window.onload=function() {
setTimeout(typeWriter, 500) ;
  setTimeout(typeWriterr, 2100) ;


}
TweenMax.staggerFrom(".message",2.8,{opacity:0,delay:.02},.8);
var one = document.getElementById("canvas");
TweenMax.from(one,3,{opacity:0,delay:0,ease: Power2.easeIn});
TweenMax.from(".menu",3,{y:"130%",ease:Power3.easeOut,opacity:0,delay:3});

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var numStars = 1000;
var radius = 1;
var focalLength = 100;

var centerX, centerY;

var stars = [], star;
var i;

var animate = false;

initializeStars();

function executeFrame(){
  if(animate)
    requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars(){
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  
  stars = [];
  for(i = 0; i < numStars; i++){
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width
    };
    stars.push(star);
  }
}

function moveStars(){
  for(i = 0; i < numStars; i++){
    star = stars[i];
    star.z--;
    
    if(star.z <= 0){
      star.z = canvas.width;
    }
  }
}

function drawStars(){
  var pixelX, pixelY, pixelRadius;
  
  // Resize to the screen
  if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  
  c.fillStyle = "black";
  c.fillRect(0,0, canvas.width, canvas.height);
  c.fillStyle = "white";
  for(i = 0; i < numStars; i++){
    star = stars[i];
    
    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = radius * (focalLength / star.z);
    
    c.beginPath();
    c.arc(pixelX, pixelY, pixelRadius, 0, 2 * Math.PI);
    c.fill();
  }
}

canvas.addEventListener("mousemove",function(e){
  focalLength = e.x;
});

// Kick off the animation when the mouse enters the canvas


// Pause animation when the mouse exits the canvas


// Draw the first frame to start animation
executeFrame();
// shim layer with setTimeout fallback
// from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
  var cunter = 1;  
function speeder () {   
       
        console.log(focalLength);         //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
            //  your code here
      cunter++;           
        focalLength-=1;   
        console.log(focalLength);      //  increment the counter
      if (cunter < 101) {            //  if the counter < 10, call the loop function
         speeder();    
                     
                            console.log(cunter);    //  ..  again which will trigger another 
      }   
                          //  ..  setTimeout()
   }, 10)
}

var iddqd ;
var wohyall;
var eqo;
var soon = 0;
var pine;
$(document).ready(function(){


$("#shadowburn").slideUp(0);
$("#shadowburn").delay(1000).slideDown(0);





pine = ($(window).width()*.71) - 80;
$(".nevix-inner").css('width',pine); 
  $(".nevix").animate({
      width: "toggle"
    });
  $("#skyvault").mouseover(function(){
    $("#skyvault_linkzr").animate({
      width: "toggle"
    });
  });
  $("#magazine").mouseleave(function(){
    $("#magazine_linkzr").animate({
      width: "toggle"
    });
  });
   $("#humblefools").mouseover(function(){
    $("#humblefools_linkzr").animate({
      width: "toggle"
    });
  });
  $("#mun").mouseleave(function(){
    $("#mun_linkzr").animate({
      width: "toggle"
    });
  });
   $("#cfest").mouseover(function(){
    $("#cfest_linkzr").animate({
      width: "toggle"
    });
  });
  $("#gradfilm").mouseleave(function(){
    $("#gradfilm_linkzr").animate({
      width: "toggle"
    });
  });
   $("#zenith").mouseover(function(){
    $("#zenith_linkzr").animate({
      width: "toggle"
    });
  });
    $("#skyvault").mouseleave(function(){
    $("#skyvault_linkzr").animate({
      width: "toggle"
    });
  });
  $("#magazine").mouseover(function(){
    $("#magazine_linkzr").animate({
      width: "toggle"
    });
  });
   $("#humblefools").mouseleave(function(){
    $("#humblefools_linkzr").animate({
      width: "toggle"
    });
  });
  $("#mun").mouseover(function(){
    $("#mun_linkzr").animate({
      width: "toggle"
    });
  });
   $("#cfest").mouseleave(function(){
    $("#cfest_linkzr").animate({
      width: "toggle"
    });
  });
  $("#gradfilm").mouseover(function(){
    $("#gradfilm_linkzr").animate({
      width: "toggle"
    });
  });
   $("#zenith").mouseleave(function(){
    $("#zenith_linkzr").animate({
      width: "toggle"
    });
  });
  


function surefour()
{
    $("#canvas").delay(2000).hide(0);
    console.log("i eat pears");

}
function hydration()
{
    $("#canvas").show(0);
    console.log("i hate when nobody shares");

}

 var agilities = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        agilities.x = event.pageX;
        agilities.y = event.pageY;
    });
var $effect = $("<div>", {id: "foo", "class": "a"});



$(".xxx").on('click', function() {
  if(soon!=2)
  {
  soon = 2;
  $(".xxx").hide(0);
  $("#box1").hide(0);
  $("#box2").hide(0);
  $(".xxx").delay(4000).show(0);
  $("#box1").delay(4000).show(0);
  $("#box2").delay(4000).show(0);

  $("body").append($effect);
  $(".a").css({"left" : agilities.x -25 , "top" : agilities.y -25 });
  $(".a").addClass("anime");
  hydration();
  if(iiii!=0)
  {
     $("#demooo").slideUp(500).delay(10).queue(function(n) {
        $(this).html("");
        n();
    }).slideDown();
    iiii=0;
 
  }
    $("#aboutpage").fadeOut(500);
    $("#aboutback").fadeOut(500);
      $("#contactpage").fadeOut(500);
    $("#contactback").fadeOut(500);
    $("#contactpage").delay(2000).hide(0);
  $("#contactback").delay(2000).hide(0);
    $("#aboutpage").delay(2000).hide(0);
    $("#aboutback").delay(2000).hide(0);
    $("#worksback").css('display','block');
    $("#workspage").css('display','block');
     TweenMax.to(".contain",1.5,{opacity : 0, y: -300,ease: Expo.easeOut});
   TweenMax.to(".contain",1,{opacity : 0, y: -1000, delay : 2});
        console.log(focalLength); 
              TweenMax.to("#canvas",3,{opacity : 1, delay : .5});
radius = 2;
TweenMax.to("#canvas",2,{opacity : 0, delay : 2});

speeder();  
 
           console.log(focalLength); 
            setTimeout(function () {    
             
        focalLength=100;   
        console.log(focalLength);      
              
   }, 5000)

TweenMax.from("#workspage",2,{opacity : 0, delay : 1,ease: Power3.easeIn});
TweenMax.from("#worksback",4,{opacity : 0, delay : 1,ease: Power3.easeIn});
console.log("r");
txxxt = ' MY WORKS ';
setTimeout(typeWriterrr, 3500) ;
TweenMax.to("#demooo",4,{opacity : 1, delay : 1,ease: Power3.easeIn});
wohyall = $("#demooo").offset();
eqo = wohyall.top + $("#demooo").height() + 40 ;
   $(".works_content").css('margin-top',eqo);
   console.log(eqo + "real g");
if ($(window).width() < 1000 && $(window).height() > 750 )
{
  iddqd = "60vh";
  console.log($(window).width() + " tits");
   console.log($(window).height() + " tits");

}
else
{
  iddqd = "40vh";
  console.log("ass");
    console.log($(document).width() + " tits");
   console.log($(window).height() + " tits");
}
$(".works_content").css('height',iddqd);
TweenMax.from(".works_content",4,{opacity : 0, height: 0, delay : 3,ease: Power3.easeOut});
     

setTimeout(surefour, 3500) ;
     }

});
$("#box1").on('click', function() {
  if(soon!=1)
  {
  soon = 1;
    $(".xxx").hide(0);
  $("#box1").hide(0);
  $("#box2").hide(0);
  $(".xxx").delay(4000).show(0);
  $("#box1").delay(4000).show(0);
  $("#box2").delay(4000).show(0);

  $("body").append($effect);
  $(".a").css({"left" : agilities.x -25 , "top" : agilities.y -25 });
  $(".a").addClass("anime");
  hydration();
   if(iiii!=0)
  {
    $("#demooo").slideUp(500).delay(10).queue(function(n) {
        $(this).html("");
        n();
    }).slideDown();
    iiii=0;

  }
      $("#workspage").fadeOut(500);
    $("#worksback").fadeOut(500);
      $("#contactpage").fadeOut(500);
    $("#contactback").fadeOut(500);
    $("#contactpage").delay(2000).hide(0);
  $("#contactback").delay(2000).hide(0);
  $("#workspage").delay(2000).hide(0);
  $("#worksback").delay(2000).hide(0);
  $("#aboutpage").css('display','block');
  $("#aboutback").css('display','block');
     TweenMax.to(".contain",1.5,{opacity : 0, y: -300,ease: Expo.easeOut});
   TweenMax.to(".contain",1,{opacity : 0, y: -1000, delay : 2});
        console.log(focalLength); 
              TweenMax.to("#canvas",3,{opacity : 1, delay : .5});
radius = 2;
TweenMax.to("#canvas",2,{opacity : 0, delay : 2});

speeder();  
 
           console.log(focalLength); 
            setTimeout(function () {    
             
        focalLength=100;   
        console.log(focalLength);      
              
   }, 5000)

TweenMax.from("#aboutpage",2,{opacity : 0, delay : 1,ease: Power3.easeIn});
TweenMax.from("#aboutback",4,{opacity : 0, delay : 1,ease: Power3.easeIn});
console.log("r");
txxxt = ' ALL ABOUT ME ';
setTimeout(typeWriterrr, 3500) ;
TweenMax.to("#demooo",4,{opacity : 1, delay : 1,ease: Power3.easeIn});
wohyall = $("#demooo").offset();
eqo = wohyall.top + $("#demooo").height() + 40 ;
   $(".about_content").css('margin-top',eqo);
   console.log(eqo + "real g");
if ($(window).width() < 1000 && $(window).height() > 750 )
{
  iddqd = "60vh";
  console.log($(window).width() + " tits");
   console.log($(window).height() + " tits");

}
else
{
  iddqd = "40vh";
  console.log("ass");
    console.log($(document).width() + " tits");
   console.log($(window).height() + " tits");
}

$(".about_content").css('height',iddqd);
TweenMax.from(".about_content",4,{opacity : 0, height: 0 , delay : 3,ease: Power3.easeOut});
    
setTimeout(surefour, 3500) ;

     }

});
$("#box2").on('click', function() {
  if(soon!=3)
  {
  soon = 3;

  $(".xxx").hide(0);
  $("#box1").hide(0);

  
  $("#box2").hide(0);
  
  $(".xxx").delay(4000).show(0);
  $("#box1").delay(4000).show(0);
  $("#box2").delay(4000).show(0);


  $("body").append($effect);
  $(".a").css({"left" : agilities.x -25 , "top" : agilities.y -25 });
  $(".a").addClass("anime");
  hydration();
   if(iiii!=0)
  {
    $("#demooo").slideUp(500).delay(10).queue(function(n) {
        $(this).html("");
        n();
    }).slideDown();
    iiii=0;

  }
      $("#workspage").fadeOut(500);
    $("#worksback").fadeOut(500);
     $("#aboutpage").fadeOut(500);
    $("#aboutback").fadeOut(500);
  $("#workspage").delay(2000).hide(0);
    $("#aboutpage").delay(2000).hide(0);
    $("#aboutback").delay(2000).hide(0);
  $("#worksback").delay(2000).hide(0);
  $("#contactpage").css('display','block');
  $("#contactback").css('display','block');






     TweenMax.to(".contain",1.5,{opacity : 0, y: -300,ease: Expo.easeOut});
   TweenMax.to(".contain",1,{opacity : 0, y: -1000, delay : 2});
        console.log(focalLength); 
              TweenMax.to("#canvas",3,{opacity : 1, delay : .5});
radius = 2;
TweenMax.to("#canvas",2,{opacity : 0, delay : 2});

speeder();  
 
           console.log(focalLength); 
            setTimeout(function () {    
             
        focalLength=100;   
        console.log(focalLength);      
              
   }, 5000)

TweenMax.from("#contactpage",2,{opacity : 0, delay : 1,ease: Power3.easeIn});
TweenMax.from("#contactback",4,{opacity : 0, delay : 1,ease: Power3.easeIn});
console.log("r");
txxxt = ' HIT ME UP ';
setTimeout(typeWriterrr, 3500) ;
TweenMax.to("#demooo",4,{opacity : 1, delay : 1,ease: Power3.easeIn});
wohyall = $("#demooo").offset();
eqo = wohyall.top + $("#demooo").height() + 40 ;
   $(".contact_content").css('margin-top',eqo);
   console.log(eqo + "real g");
if ($(window).width() < 1000 && $(window).height() > 750 )
{
  iddqd = "60vh";
  console.log($(window).width() + " tits");
   console.log($(window).height() + " tits");

}
else
{
  iddqd = "40vh";
  console.log("ass");
    console.log($(document).width() + " tits");
   console.log($(window).height() + " tits");
}

$(".contact_content").css('height',iddqd);
TweenMax.from(".contact_content",4,{opacity : 0, height: 0 , delay : 3,ease: Power3.easeOut});
    
setTimeout(surefour, 3500) ;

     }

});
});


