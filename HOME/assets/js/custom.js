// Javascript Document

/* =================================
   LOADER                     
=================================== */
// makes sure the whole site is loaded
$(window).load(function() {

    "use strict";

    // will first fade out the loading animation
    $(".signal").fadeOut();
        // will fade out the whole DIV that covers the website.
    $(".preloader").fadeOut("slow");

});


/* =================================
   EARLY ACCESS MODAL                     
=================================== */
function showEarlyAccessForm(){
    "use strict";
    $('.modal-title').html('Get Early Access');
    $('.modal-subtitle').html('Enter your email and Join Beta.');
    
    $('.error').removeClass('alert alert-danger').html('');
}

function openEarlyAccessModal(){
    "use strict";
    showEarlyAccessForm();
    $('#loginModal').modal('show');
}


/* =================================
   SCROLL NAVBAR
=================================== */
$(window).scroll(function(){
    "use strict";
    var b = $(window).scrollTop();
    if( b > 60 ){
        $(".navbar").addClass("is-scrolling");
    } else {
        $(".navbar").removeClass("is-scrolling");
    }
});


/* =================================
   DATA SPY FOR ACTIVE SECTION                 
=================================== */
(function($) {
    
    "use strict";
    
    $('body').attr('data-spy', 'scroll').attr('data-target', '.navbar-fixed-top').attr('data-offset', '11');

})(jQuery);


/* =================================
   HIDE MOBILE MENU AFTER CLICKING 
=================================== */
(function($) {
    
    "use strict";
    
    $('.nav.navbar-nav li a').click(function () {
        var $togglebtn = $(".navbar-toggle");
        if (!($togglebtn.hasClass("collapsed")) && ($togglebtn.is(":visible"))){
            $(".navbar-toggle").trigger("click");
        }
    });

})(jQuery);


/* ==================================================== */
/* ==================================================== */
/* =======================================================
   DOCUMENT READY
======================================================= */
/* ==================================================== */
/* ==================================================== */

$(document).ready(function() {

"use strict";


/* =====================================
    PARALLAX STELLAR WITH MOBILE FIXES                    
======================================== */
if (Modernizr.touch && ($('.header').attr('data-stellar-background-ratio') !== undefined)) {
    $('.header').css('background-attachment', 'scroll');
    $('.header').removeAttr('data-stellar-background-ratio');
} else {
    $(window).stellar({
        horizontalScrolling: false
    });
}


/* =================================
    WOW ANIMATIONS                   
=================================== */
new WOW().init();


/* ==========================================
    VENOBOX - LIGHTBOX FOR GALLERY AND VIDEOS
============================================= */
$('.venobox').venobox();

/* =================================
   SCROLL TO                  
=================================== */
var onMobile;

onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

if (onMobile === true) {
    jQuery('a.scrollto').click(function (event) {
    jQuery('html, body').scrollTo(this.hash, this.hash, {gap: {y: -10}, animation:  {easing: 'easeInOutCubic', duration: 0}});
    event.preventDefault();
});
} else {
    jQuery('a.scrollto').click(function (event) {
    jQuery('html, body').scrollTo(this.hash, this.hash, {gap: {y: -10}, animation:  {easing: 'easeInOutCubic', duration: 1500}});
        event.preventDefault();
});
}


/* =============================================
   MAILCHIMP EARLY-ACCESS - HEADER SUBSCRIPTION
============================================= */
$("#subscribe").ajaxChimp({
    callback: mailchimpCallbackbetaform,
    url: "http://themedept.us9.list-manage.com/subscribe/post?u=63465a86fdd5f3b9fa31f9278&amp;id=52df53337f" // Replace your mailchimp post url inside double quote "". 
});

function mailchimpCallbackbetaform(resp) {
if(resp.result === 'success') {
    $('.mcbeta-success')
    .html('<i class="icon icon_check_alt2"></i>' + resp.msg)
    .fadeIn(1000);

    $('.mcbeta-failed').fadeOut(500);
        
} else if(resp.result === 'error') {
    $('.mcbeta-failed')
    .html('<i class="icon icon_close_alt2"></i>' + resp.msg)
    .fadeIn(1000);
            
    $('.mcbeta-success').fadeOut(500);
}
}


/* ==========================================
   MAILCHIMP EARLY-ACCESS - MODAL SUBSCRIPTION
============================================= */
$("#earlyaccess-modal").ajaxChimp({
    callback: mailchimpCallbackmodal,
    url: "http://themedept.us9.list-manage.com/subscribe/post?u=63465a86fdd5f3b9fa31f9278&amp;id=52df53337f" // Replace your mailchimp post url inside double quote "".  
});

function mailchimpCallbackmodal(resp) {
if(resp.result === 'success') {
    $('.lm-success')
    .html('<i class="icon icon_check_alt2"></i>' + resp.msg)
    .fadeIn(1000);

    $('.lm-failed').fadeOut(500);
        
} else if(resp.result === 'error') {
    $('.lm-failed')
    .html('<i class="icon icon_close_alt2"></i>' + resp.msg)
    .fadeIn(1000);
            
    $('.lm-success').fadeOut(500);
}
}


/* ==========================================
   FUNCTION FOR EMAIL ADDRESS VALIDATION
============================================= */
function isValidEmail(emailAddress) {

    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    return pattern.test(emailAddress);

}


/* ==========================================
   CONTACT FORM
============================================= */
$("#contact").submit(function(e) {
    e.preventDefault();
    var data = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val(),
    };

    if ( isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) ) {
        $.ajax({
            type: "POST",
            url: "assets/php/sendmail.php",
            data: data,
            success: function() {
                $('.email-success').delay(500).fadeIn(1000);
                $('.email-failed').fadeOut(500);
            }
        });
    } else {
        $('.email-failed').delay(500).fadeIn(1000);
        $('.email-success').fadeOut(500);
    }

    return false;
});


/* ==========================================
   LOCAL NEWSLETTER 
============================================= */
/*
$("#subscribe").submit(function(e) {
    e.preventDefault();
    var data = {
        email: $("#s-email").val()
    };

    if ( isValidEmail(data['email']) ) {
        $.ajax({
            type: "POST",
            url: "assets/php/subscribe.php",
            data: data,
            success: function() {
                $('.subscription-success').fadeIn(1000);
                $('.subscription-failed').fadeOut(500);
            }
        });
    } else {
        $('.subscription-failed').fadeIn(1000);
        $('.subscription-success').fadeOut(500);
    }

    return false;
}); 
*/


/* =======================================================================
   TIMECIRCLE - COUNTDOWN
========================================================================== */
var countdown =  $('.countdown-time');

createTimeCicles();

$(window).on('resize', windowSize);

function windowSize(){
    countdown.TimeCircles().destroy();
    createTimeCicles();
    countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
            countdown.removeClass('animated bounceIn');
    });
}

function createTimeCicles() {
    countdown.addClass('animated bounceIn');
    countdown.TimeCircles({
    fg_width: 0.011,
    bg_width: 0.1,
    circle_bg_color: '#ffffff',
    time: {
            Days: {color: '#c0392b'},
            Hours: {color: '#c0392b'},
            Minutes: {color: '#c0392b'},
            Seconds: {color: '#c0392b'}
           }
    });
    countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
    countdown.removeClass('animated bounceIn');
    });
}


/* ===========================================================
   BOOTSTRAP FIX FOR IE10 in Windows 8 and Windows Phone 8  
============================================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
            )
        );
    document.querySelector('head').appendChild(msViewportStyle);
}


});

$("#count-btn").click(function(){
    $("#count-btn-show").show(1000);
  });
$("#count-btn-show").click(function(){
    $("#count-btn-show").hide();
});

$("#annual-fee-btn").click(function(){
    $("#count-btn-show-2").show(1000);
  });
$("#count-btn-show-2").click(function(){
    $("#count-btn-show-2").hide();
});

$("#count-btn-3").click(function(){
    $("#count-btn-show-3").show(1000);
  });
$("#count-btn-show-3").click(function(){
    $("#count-btn-show-3").hide();
});




if (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) {
    $("h1.text-white.hr-top-text").html("設計你的法律服務");
    $("div.hero-section p.text-white").html("全新專案，貼心計畫");
    $("h2.se2-mobile").html("法律服務觸手可及");
    $("p.se2-mobile.large").html("專業與創新<br>每個人都可擁有專屬的法律管家");
    $("p.se2-mobile.large").css("line-height","25px");
    $("p.se2-1-mobile").html("一對一視訊諮詢，全方位深入解答");
    $("p.se2-2-mobile").html("購買專屬方案，臨時困難，彈性使用");
    $("p.se2-3-mobile").html("事先預防保障，整套規劃，折價享有");
    $("p.se2-4-mobile").html("多位專業律師，一說就懂的法律知識");
    $("p.se2-1-mobile .se2-2-mobile .se2-3-mobile,p.se5-mobile,p.se6-mobile").css("font-size","90%");
    $(".icon-se2-mobile").css("height","90px");
    $(".icon-sm").css("font-size","37px");
    $("h2.se3-mobile").html("法律的創新時代");
    $("h2.se7-mobile").html("限量方案<br>＄999搶購中");
    $(".header").css("background-size","1650px");



};

