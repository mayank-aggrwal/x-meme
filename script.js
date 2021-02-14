$(document).ready(function() {
    $(window).scroll(function() {
        if (this.scrollY > 20) {
            console.log("I'm in scrolling motion")
            $('.navbar').addClass('sticky');
        }
        else {
            $('.navbar').removeClass('sticky');
        }
    })

    // toggle menu/navbar active state
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    })

})