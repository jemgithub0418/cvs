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

var contactUsTarget = document.getElementById('contactUs')

contactUsButton.addEventListener('click', function(){
    smoothScroll(contactUsTarget.id, 1000)
})