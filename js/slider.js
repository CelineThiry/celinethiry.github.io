var slide = null; // slide function, define when the document is ready

var AUTO_SLIDE_DURATION = 5000;  // duration between automatic slide anims

var ANIM_STARTED = 0;
var ANIM_COMPLETED = 2;
var ANIM_STOPPED = -1;


$(function() {

    var ul = $(".slider-img ul");
    var ul_text = $(".slider-text ul");

    var slide_count = ul.children().length;
    
    console.log("slide_count: " + slide_count);
    
    var slide_width_pc = 100 / slide_count;
    var slide_index = 0;
    var anim_state = ANIM_STOPPED;

    // Var to clone the first and the last li
    var first_slide = ul.find("li:first-child");
    var last_slide = ul.find("li:last-child");

    var first_slide_text = ul_text.find("li:first-child");
    var last_slide_text = ul_text.find("li:last-child");


    // Clone the last slide and add as first li element :)
    last_slide.clone().prependTo(ul);
    last_slide_text.clone().prependTo(ul_text);    
    
    // Clone the first slide and add as last li element
    first_slide.clone().appendTo(ul);
    first_slide_text.clone().appendTo(ul_text);
    
    ul.css("margin-left", "-100%");
    ul_text.css("margin-left", "-100%");

    //Ajout des bullets en dessous du slider
    var bullets_html = '<ul>';
    for (i = 0; i < slide_count; i++) {
        bullets_html += '<li></li>'
    }
    bullets_html += '</ul>';
    $('.bullet').html(bullets_html);


    ul.find("li").each(function(indx) {
        var left_percent = (slide_width_pc * indx) + "%";
        $(this).css({"left": left_percent});
        $(this).css({width: (100 / slide_count) + "%"});
    });

    ul_text.find("li").each(function(indx) {
        var left_percent = (slide_width_pc * indx) + "%"; 
        // indx c'est le nombre de tour que each va faire, 3 li + 2 li clone = 5 >> indx=5 
        $(this).css({"left": left_percent});
        $(this).css({width: (100 / slide_count) + "%"});
    });

    // Listen for click of prev button
    $(".prev").click(function(){ if(anim_state == ANIM_STOPPED) slide(slide_index - 1); });

    // Listen for click of next button
    $(".next").click(function(){ if(anim_state == ANIM_STOPPED) slide(slide_index + 1); });
    
    // On click on a bullet, slider is animated and we get the related slider sliding in front of us !
    for(i = 0; i < slide_count; i++){
        $('.bullet li:nth-of-type(' + (i + 1) + ')').on('click',
            function(event) {
                if(anim_state == ANIM_STOPPED) {
                    event.preventDefault();
                    
                    var li_index = $(event.target).index();
                    
                    // display image directly
                    var percents = (li_index + 1) * - 100;
                    $('.bullet li').removeClass('active');
                    ul.css("margin-left", percents + '%');
                    ul_text.css("margin-left", percents + '%');
                    $(this).addClass('active');
                    
                    // update slide index to keep slideshow in sync
                    slide_index = li_index;
                }
            });
        }
    
    // start automatic slideshow
    setInterval(function () { if(anim_state == ANIM_STOPPED) slide(slide_index + 1); }, AUTO_SLIDE_DURATION);

    // Add active on class on the first slide bullet when doc is ready
    $('.bullet li:nth-of-type(1)').addClass('active');

    slide = function(new_slide_index) {        
        var nth_of_type = new_slide_index;        
        var margin_left_pc = (new_slide_index * (-100) - 100) + "%";
        
        // keep active bullet in sync
        if(nth_of_type >= slide_count) {
           nth_of_type = 0;
        } else if(nth_of_type < 0) {
           nth_of_type = slide_count - 1;
        }      
        $('.bullet li').removeClass('active');
        $('.bullet li:nth-of-type(' + (nth_of_type + 1) + ')').addClass('active');

        // Run a timer to check if ul and ul_text animations have finished
        anim_state = ANIM_STARTED;
        var anim_post_process_interval = setInterval(function() {
            if (anim_state == ANIM_COMPLETED) {
                clearInterval(anim_post_process_interval);
                if (new_slide_index < 0) {
                    // from first to last
                    ul.css("margin-left", ((slide_count) * (-100)) + "%");
                    ul_text.css("margin-left", ((slide_count) * (-100)) + "%");
                    new_slide_index = slide_count - 1;
                    console.log("main arriere");
                }
                else if (new_slide_index >= slide_count) {
                    // from last to first
                    ul.css("margin-left", "-100%");
                    ul_text.css("margin-left", "-100%");
                    new_slide_index = 0;
                    console.log("main avant");
                }
                slide_index = new_slide_index;
                anim_state = ANIM_STOPPED;
            }
        }, 20);

        // run margin animations
        ul.animate({"margin-left": margin_left_pc}, 400, function() {
            anim_state += 1;
        });
        ul_text.animate({"margin-left": margin_left_pc}, 400, function() {
            anim_state += 1;
        });

    }; //end function slide
});
