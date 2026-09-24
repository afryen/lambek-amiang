/*
====================================================

LAMBEK AMIANG

PREMIUM AUTOMOTIVE WEBSITE ENGINE

VERSION 3.0

Clean Architecture
Smooth Animation System

====================================================
*/


"use strict";



/*
====================================================
CONFIGURATION
====================================================
*/


const CONFIG = {


    heroImages:[

        "assets/img/mobil.png",

        "assets/img/kumpul.png",

        "assets/img/kumpulan.png",

        "assets/img/bukber.png",

        "assets/img/Foto.png"

    ],



    heroSpeed:6000,


    revealOffset:120,


    animationSpeed:.08,


    debug:false


};








/*
====================================================
APPLICATION CORE
====================================================
*/


const App = {


    modules:[],



    init(){


        this.modules=[


            Navigation,


            HeroSlider,


            RevealAnimation,


            Counter,


            TiltEffect,


            MouseParallax,


            ImageEffect,


            ButtonEffect,


            LazyLoader,


            ScrollSystem,


            PageTransition



        ];





        this.modules.forEach(
        module=>{


            try{


                module.init();



            }
            catch(error){


                console.warn(
                    "Module error:",
                    error
                );


            }


        });



        console.log(`

================================

 LAMBEK AMIANG

 PREMIUM AUTOMOTIVE SYSTEM

 READY

================================

`);



    }



};





document.addEventListener(
"DOMContentLoaded",
()=>{


    App.init();



});









/*
====================================================
 NAVIGATION SYSTEM
====================================================
*/


const Navigation = {



init(){



const toggle =
document.querySelector(
".menu-toggle"
);



const menu =
document.querySelector(
".nav-menu"
);





if(toggle && menu){



toggle.addEventListener(
"click",
()=>{


menu.classList.toggle(
"active"
);



});



}






document.querySelectorAll(
".nav-menu a"
)
.forEach(
link=>{


link.addEventListener(
"click",
()=>{


if(menu)
menu.classList.remove(
"active"
);



});



});






const navbar =
document.querySelector(
".navbar"
);




if(navbar){



window.addEventListener(
"scroll",
()=>{



if(
window.scrollY>80
){


navbar.classList.add(
"scroll-active"
);



}
else{


navbar.classList.remove(
"scroll-active"
);



}



},
{

passive:true

}

);



}



}



};
/*
====================================================
 HERO CINEMATIC SLIDER SYSTEM
====================================================
*/


const HeroSlider = {



index:0,



init(){



const hero =
document.querySelector(
".hero-home"
);



if(!hero)
return;





hero.style.transition =
"opacity 1.2s ease";



hero.style.backgroundSize =
"cover";





setInterval(
()=>{



this.change(
hero
);



},
CONFIG.heroSpeed
);



this.startKenBurns(
hero
);



},







change(hero){



hero.style.opacity="0";





setTimeout(
()=>{



this.index++;





if(
this.index >= CONFIG.heroImages.length
){


this.index=0;


}







hero.style.backgroundImage =

`

linear-gradient(

90deg,

rgba(0,0,0,.85),

rgba(0,0,0,.35)

),

url('${CONFIG.heroImages[this.index]}')

`;





hero.style.opacity="1";





},
700
);



},







startKenBurns(hero){



let scale=100;



const animate=()=>{



scale +=0.003;






if(
scale>110
){


scale=100;


}





hero.style.backgroundSize =
scale+"%";





requestAnimationFrame(
animate
);



};




animate();



}



};









/*
====================================================
 SCROLL REVEAL ANIMATION ENGINE
====================================================
*/


const RevealAnimation = {



init(){



const elements =
document.querySelectorAll(

`

.stat-card,

.value-card,

.activity-card,

.gallery-item,

.about-image,

.about-content,

.section-title,

.hero-content

`

);



if(
elements.length===0
)
return;






elements.forEach(
(element,index)=>{



element.style.opacity="0";



element.style.transform =

"translateY(60px)";



element.style.filter =
"blur(8px)";





element.style.transition =

`

opacity .9s ease,

transform .9s cubic-bezier(.2,.8,.2,1),

filter .9s ease

`;





element.style.transitionDelay =

(index*70)+"ms";



});








const observer =
new IntersectionObserver(

entries=>{



entries.forEach(
entry=>{



if(
entry.isIntersecting
){



entry.target.style.opacity="1";



entry.target.style.transform =
"translateY(0)";



entry.target.style.filter =
"blur(0)";





observer.unobserve(
entry.target
);



}



});


},

{


threshold:.15,

rootMargin:
"0px 0px -100px"

}

);







elements.forEach(
element=>{


observer.observe(
element
);



});



}



};









/*
====================================================
 NUMBER COUNTER PREMIUM
====================================================
*/


const Counter = {



init(){



const items =
document.querySelectorAll(
".stat-card h2"
);





items.forEach(
item=>{



const target =
parseInt(
item.innerText
);





if(
isNaN(target)
)
return;





item.innerText="0";






const observer =
new IntersectionObserver(
entries=>{



if(
entries[0].isIntersecting
){



this.run(
item,
target
);



observer.disconnect();



}



});





observer.observe(
item
);



});



},






run(element,target){



const duration=1500;


const start =
performance.now();





const animate=(time)=>{



let progress =

(
time-start
)
/
duration;





if(
progress>1
)
progress=1;






const value =

Math.floor(

target *

(
1-Math.pow(
1-progress,
4
)

)

);






element.innerText =
value+"+";






if(
progress<1
){


requestAnimationFrame(
animate
);



}

else{


element.innerText =
target+"+";


}



};






requestAnimationFrame(
animate
);



}



};









/*
====================================================
 3D CARD TILT EFFECT
====================================================
*/


const TiltEffect={



init(){



const cards =
document.querySelectorAll(

`

.gallery-item,

.activity-card,

.value-card,

.stat-card

`

);





cards.forEach(
card=>{



let frame=null;





card.addEventListener(
"mousemove",
event=>{



cancelAnimationFrame(
frame
);





frame =
requestAnimationFrame(
()=>{



const rect =
card.getBoundingClientRect();





const x =
event.clientX -
rect.left;



const y =
event.clientY -
rect.top;






const rotateX =

-(

y -
rect.height/2

)
/
20;






const rotateY =

(

x -
rect.width/2

)
/
20;







card.style.transform =

`

perspective(900px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

scale(1.04)

`;



});




});








card.addEventListener(
"mouseleave",
()=>{



card.style.transform="";



});



});



}



};









/*
====================================================
 MOUSE PARALLAX ENGINE
====================================================
*/


const MouseParallax={



init(){



const target =
document.querySelector(
".hero-content"
);



if(!target)
return;





let x=0;

let y=0;

let cx=0;

let cy=0;






document.addEventListener(
"mousemove",
event=>{



x =

(
event.clientX /
window.innerWidth -
.5

)
*
20;





y =

(
event.clientY /
window.innerHeight -
.5

)
*
20;



});







function animate(){



cx +=
(
x-cx
)
*
.08;




cy +=
(
y-cy
)
*
.08;






target.style.transform =

`

translate3d(

${cx}px,

${cy}px,

0

)

`;





requestAnimationFrame(
animate
);



}



animate();



}



};
/*
====================================================
 IMAGE PREMIUM EFFECT
====================================================
*/


const ImageEffect = {



init(){



const images =
document.querySelectorAll(
"img"
);



images.forEach(
image=>{



image.style.transition =

"transform .6s cubic-bezier(.2,.8,.2,1), filter .6s ease";






image.addEventListener(
"mouseenter",
()=>{



image.style.transform =
"scale(1.06)";



image.style.filter =
"brightness(1.15)";



});







image.addEventListener(
"mouseleave",
()=>{



image.style.transform =
"scale(1)";



image.style.filter =
"brightness(1)";



});



});



}



};









/*
====================================================
 BUTTON RIPPLE EFFECT
====================================================
*/


const ButtonEffect = {



init(){



const buttons =
document.querySelectorAll(

`

.btn-primary,

.btn-outline,

button

`

);





buttons.forEach(
button=>{





button.addEventListener(
"click",
function(event){



const ripple =
document.createElement(
"span"
);



ripple.className =
"ripple";






const rect =
this.getBoundingClientRect();






ripple.style.left =

(
event.clientX -
rect.left
)

+
"px";






ripple.style.top =

(
event.clientY -
rect.top
)

+
"px";






this.appendChild(
ripple
);







setTimeout(
()=>{


ripple.remove();



},
600
);



});



});



}



};









/*
====================================================
 MAGNETIC BUTTON
====================================================
*/


const MagneticButton = {



init(){



document.querySelectorAll(

`

.btn-primary,

.btn-outline

`

)
.forEach(
button=>{



button.addEventListener(
"mousemove",
event=>{





const rect =
button.getBoundingClientRect();





const x =

event.clientX -

(
rect.left +
rect.width/2
);





const y =

event.clientY -

(
rect.top +
rect.height/2
);







button.style.transform =

`

translate3d(

${x*.15}px,

${y*.15}px,

0

)

`;



});








button.addEventListener(
"mouseleave",
()=>{



button.style.transform =
"";



});



});



}



};









/*
====================================================
 LAZY IMAGE SYSTEM
====================================================
*/


const LazyLoader = {



init(){



const images =
document.querySelectorAll(
"img"
);





if(
!"IntersectionObserver" in window
)
return;







const observer =
new IntersectionObserver(

entries=>{



entries.forEach(
entry=>{



if(
entry.isIntersecting
){



entry.target.classList.add(
"loaded"
);



observer.unobserve(
entry.target
);



}



});


},

{


rootMargin:
"150px"


}

);






images.forEach(
image=>{


observer.observe(
image
);



});



}



};









/*
====================================================
 SCROLL SYSTEM
====================================================
*/


const ScrollSystem={



init(){



this.createProgress();


this.createBackButton();


},







createProgress(){



const progress =
document.createElement(
"div"
);



progress.className =
"scroll-progress";



document.body.appendChild(
progress
);






let ticking=false;







window.addEventListener(
"scroll",
()=>{



if(
!ticking
){



requestAnimationFrame(
()=>{





const height =

document.documentElement.scrollHeight -

window.innerHeight;






const percent =

(
window.scrollY /
height
)
*
100;






progress.style.width =

percent+"%";







ticking=false;



});


ticking=true;



}



},

{

passive:true

}

);



},







createBackButton(){



const button =
document.createElement(
"button"
);



button.className =
"back-top";



button.innerHTML =
"↑";



document.body.appendChild(
button
);







window.addEventListener(
"scroll",
()=>{



if(
window.scrollY>600
){



button.classList.add(
"active"
);



}

else{


button.classList.remove(
"active"
);



}



});








button.onclick=()=>{



window.scrollTo({

top:0,

behavior:
"smooth"

});



};



}



};









/*
====================================================
 PAGE TRANSITION
====================================================
*/


const PageTransition={



init(){



document.querySelectorAll(
"a"
)
.forEach(
link=>{





const href =
link.getAttribute(
"href"
);





if(
!href ||
!href.endsWith(
".html"
)
)
return;







link.addEventListener(
"click",
event=>{



event.preventDefault();





document.body.classList.add(
"page-exit"
);







setTimeout(
()=>{



window.location.href =
href;



},
500
);





});



});



}



};









/*
====================================================
 PERFORMANCE OPTIMIZER
====================================================
*/


const PerformanceSystem={



init(){



// GPU acceleration



document.querySelectorAll(
`

.hero-content,

.gallery-item,

.activity-card,

.value-card

`

)
.forEach(
element=>{



element.style.willChange =
"transform,opacity";



element.style.backfaceVisibility =
"hidden";



});






// reduced motion support



if(
window.matchMedia(
"(prefers-reduced-motion: reduce)"
)
.matches
){



document.body.classList.add(
"reduce-motion"
);



}



}



};









/*
====================================================
 CURSOR LIGHT EFFECT
====================================================
*/


const CursorEffect={



init(){



if(
window.innerWidth<768
)
return;







const cursor =
document.createElement(
"div"
);



cursor.className =
"cursor-light";



document.body.appendChild(
cursor
);







let x=0;

let y=0;





document.addEventListener(
"mousemove",
event=>{



x=event.clientX;

y=event.clientY;



cursor.style.transform =

`

translate3d(

${x}px,

${y}px,

0

)

`;



});



}



};









/*
====================================================
 FINAL START SYSTEM
====================================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{



ImageEffect.init();


ButtonEffect.init();


MagneticButton.init();


LazyLoader.init();


ScrollSystem.init();


PageTransition.init();


PerformanceSystem.init();


CursorEffect.init();



});









/*
====================================================
 FINAL BRAND LOG
====================================================
*/


console.log(`

====================================

 LAMBEK AMIANG

 PREMIUM AUTOMOTIVE COMMUNITY

 SMOOTH ENGINE V3 ACTIVE

====================================

`);
/*
====================================================
 SOCIAL MEDIA CONNECTION
====================================================
*/


const SocialMedia={


init(){


const links =
document.querySelectorAll(
".social-link"
);



links.forEach(
link=>{


link.addEventListener(
"click",
()=>{


console.log(

"Lambek Amiang Social Media:",

link.href

);



});


});


}


};





document.addEventListener(
"DOMContentLoaded",
()=>{


SocialMedia.init();


});