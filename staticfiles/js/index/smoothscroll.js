function smoothScroll(target, duration){
    var target = document.getElementById(target)
    var targetPosition = target.getBoundingClientRect().top
    var startPosition = window.pageYOffset
    var distance = targetPosition - startPosition
    var startTime = null

    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime
        var run = ease(timeElapsed,startPosition,distance, duration)
        window.scrollTo(0, run)
        if(timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d){
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;

    }

    requestAnimationFrame(animation);

}

// targets
var navbar = document.getElementById('navbar')
var newsAndEvents = document.getElementById('news-and-events')
var contactUsTarget = document.getElementById('contactUs')



var contactUsButton = document.getElementById('contactUsButton')

contactUsButton.addEventListener('click', function(){
    smoothScroll(contactUsTarget.id, 100)
})

const backToTopBtn = document.getElementById('back-to-top-btn')

backToTopBtn.addEventListener('click', function(){
    smoothScroll(navbar.id, 100)
})

var eventBtn = document.getElementById('eventsButton')
eventBtn.addEventListener('click', function(){
    smoothScroll(newsAndEvents.id,100)
})



window.addEventListener('scroll', backToTop);

// back to top function

function  backToTop(){
    // show button
    if(window.pageYOffset > 300){
        backToTopBtn.style.display = "block"
    }
    else {
        backToTopBtn.style.display = "none"
    }
}