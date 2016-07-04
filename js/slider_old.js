
var slide = null;

$(function() {

    var ul = $(".slider-img ul");
    var ul_text = $(".slider-text ul");


    var slide_count = ul.children().length;
    var slide_width_pc = 100.0 / slide_count;
    var slide_index = 0;

    // Var to clone the first and the last li
    var first_slide = ul.find("li:first-child");
    var last_slide = ul.find("li:last-child");

    var first_slide_text = ul_text.find("li:first-child");
    var last_slide_text = ul_text.find("li:last-child");


    // Clone the last slide and add as first li element :)
    last_slide.clone().prependTo(ul);
    last_slide_text.clone().prependTo(ul_text);

    //Ajout des bullets en dessous du slider
    var bullets_html = '<ul>';
    for(i = 1;i <= slide_count; i++) {
      bullets_html = bullets_html + '<li><a onclick="slide('+i+');"></a></li>'

    }
    bullets_html += '</ul>';

    jQuery('.bullet').html(bullets_html);

    // Clone the first slide and add as last li element
    first_slide.clone().appendTo(ul);
    first_slide_text.clone().appendTo(ul_text);
   

    ul.css("margin-left", "-100%");
    ul_text.css("margin-left", "-100%");


    ul.find("li").each(function(indx) {
        var left_percent = (slide_width_pc * indx) + "%";
        $(this).css({
            "left": left_percent
        });
        $(this).css({
            width: (100 / slide_count) + "%"
        });
    });

   ul_text.find("li").each(function(indx) {
        var left_percent = (slide_width_pc * indx) + "%";
        $(this).css({
            "left": left_percent
        });
        $(this).css({
            width: (100 / slide_count) + "%"
        });
    });


    // Listen for click of prev button
    $(".prev").click(function() {
        console.log("prev button clicked");
        slide(slide_index - 1);
    });

    // Listen for click of next button
    $(".next").click(function() {
        console.log("next button clicked");
        slide(slide_index + 1);
    });



    slide = function(new_slide_index) {
        console.log("SLIDESWITCH: " + new_slide_index);
        var margin_left_pc = (new_slide_index * (-100) - 100) + "%";

        var anim_is_done = 0; 

        var anim_post_process_interval = setInterval(function() {
          if(anim_is_done == 2) {
            clearInterval(anim_post_process_interval);
                        // If new slide is before first slide...
            if (new_slide_index < 0) {
                ul.css("margin-left", ((slide_count) * (-100)) + "%");
                ul_text.css("margin-left", ((slide_count) * (-100)) + "%");
                new_slide_index = slide_count - 1;
                console.log("main arriere");
            }
            // If new slide is after last slide...
            else if (new_slide_index >= slide_count) {
                ul.css("margin-left", "-100%");
                ul_text.css("margin-left", "-100%");
                new_slide_index = 0;
                console.log("main avant");
            }

            slide_index = new_slide_index;

          }

        }, 20);


        ul.animate({
            "margin-left": margin_left_pc
        }, 400, function() {

            anim_is_done = anim_is_done + 1;

        });

      ul_text.animate({
            "margin-left": margin_left_pc
        }, 400, function() {

          anim_is_done = anim_is_done + 1;

        });


    }

});

/*
    $('.bullet li').on('click', function(event) {
        event.preventDefault();
        $('.bullet li').removeClass('active');
        $(this).addClass('active');
        slide(new_slide_index);
    });

*/
    // var auto = window.setInterval(slide(), 1000); // 1000 ms = 1 sec


/* var slidecount contient le nombre de slide que j'ai dans mon slideshow
Je dois créer une boucle pour faire apparaitre les bullets dynamiquemenent
une boucle de 0 au nombre toal de slidechauqe passage dans la boucle qui un point dans le slider en dessous
fonction > choisir la slide ou je veux aller > il faut lui passer.

decompose en problème simple !!!!!!!

*/