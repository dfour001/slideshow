function load_slideshow(url) {    
    $.getJSON(url, function (r) {
        console.log(r);
        let slides = r.slides;
        start_slideshow(slides);
    });
}

function start_slideshow(slides) {
    let curSlide = 0; // Index of slide currently being displayed
    let slideCount = slides.length; // Total number of slides

    let curText = 0; // Index of slide text currently being displayed
    let curTextCount = slides[0].text.length; // Total count of slide texts


    // Set event listeners
    $('#btnNext').on('click', function () {
        curText++;


        if (curSlide < slideCount) {
            // If more text, change text, but not slide
            if (curText < curTextCount) {
                console.log('More text to display');
                $('#text').html(slides[curSlide].text[curText]);
            } else { // If no more text, change to next slide
                if (curSlide + 1 < slideCount) {
                    console.log('No more text.  Next slide');
                    curSlide++;
                    next_slide(curSlide);
                };




            };

            if (curSlide + 1 == slideCount && curText + 1 == curTextCount) {
                $('#btnNext').hide();
            }
            console.log('slide ' + (curSlide + 1) + ' of ' + slideCount);
            console.log('text ' + (curText + 1) + ' of ' + curTextCount);

        }
    });

    // Display first slide
    $('#title').html(slides[curSlide].title);
    $('#text').html(slides[curSlide].text[curText]);


    // Load next slide

    function next_slide(curSlide) {
        curText = 0;
        curTextCount = slides[curSlide].text.length;
        $('#slideNum').html(curSlide + 1);
        $('#title').html(slides[curSlide].title);
        $('#text').html(slides[curSlide].text[curText]);
    }
}




load_slideshow('slideshows/testSlides.json');
