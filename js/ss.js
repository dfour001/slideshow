function load_slideshow(url) {
    $.getJSON(url, function (r) {
        console.log(r);
        let slides = r.slides;
        let titlePage = r.titlePage;
        start_slideshow(titlePage, slides);
    });
}

function start_slideshow(titlePage, slides) {
    let curSlide = -1; // Index of slide currently being displayed
    let slideCount = slides.length; // Total number of slides

    let curText = 0; // Index of slide text currently being displayed
    let curTextCount = slides[0].text.length; // Total count of slide texts

    let slide = $('#display');
    let img = $('#img');
    let btnNext = $('#btnNext');


    // Set event listeners
    $('#btnNext').on('click', function () {
        // If title slide is displayed (curSlide == -1), set curSlide to 0
        // Else increment the curText variable.
        if (curSlide == -1) {
            next_slide();
            return
        } else {
            curText++;
        };

        if (curSlide < slideCount) {
            // If more text, change text, but not slide
            if (curText < curTextCount) {
                let textObj = $('#text');
                let text = slides[curSlide].text[curText];
                update_text(textObj, text);
            } else { // If no more text, change to next slide
                if (curSlide + 1 < slideCount) {
                    next_slide();
                };
            };

            if (curSlide + 1 == slideCount && curText + 1 == curTextCount) {
                $('#btnNext').hide();
            }

        };
    });

    // Display first slide
    $('#title').html(titlePage.title);
    $('#text').html(titlePage.text);
    $('#img').css("background-image", "url(" + titlePage.images[0].url + ")");


    function next_slide() {
        // Increment slide
        curSlide++;

        // Animate slide out
        slide_out();

        // Update slide data and animate slide in
        setTimeout(function () {
            update_slide_data(curSlide);
        }, 250);


        // Animate slide in
        setTimeout(function () {
            slide_in();
        }, 300);
    }
    // Load next slide
    function update_slide_data(curSlide) {
        curText = 0;
        curTextCount = slides[curSlide].text.length;
        $('#slideNum').html(curSlide + 1);
        //$('#title').html(slides[curSlide].title);
        update_text($('#title'), slides[curSlide].title);
        //$('#text').html(slides[curSlide].text[curText]);
        update_text($('#text'), slides[curSlide].text[curText]);
        $('#img').css("background-image", "url(" + slides[curSlide].images[0].url + ")");

        slide.removeClass('slideOut');
        img.removeClass('slideOut');
        slide.addClass('slideIn');
        img.addClass('slideIn');
    }

    // Slide animations
    function slide_out() {
        slide.removeClass(['slideShow', 'slideIn']);
        img.removeClass(['slideShow', 'slideIn']);
        btnNext.addClass('arrowHide');
        slide.addClass('slideOut');
        img.addClass('slideOut');
    }

    function slide_in() {
        slide.removeClass('slideIn');
        img.removeClass('slideIn');
        slide.addClass('slideShow');
        img.addClass('slideShow');
        
        setTimeout(function() {
            btnNext.removeClass('arrowHide');
        }, 1000);
    }


    function update_text(obj, txt) {
        obj.addClass('textHide');
        if (txt != '') {
            setTimeout(function () {
                obj.html(txt);
                obj.removeClass('textHide');
            }, 750);
        };
    }
}




load_slideshow('slideshows/testSlides.json');
