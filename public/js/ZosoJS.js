function magnify(imgID, zoom) {
    let img, glass, w, h, bw;
    img = document.getElementById(imgID);

    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    glass.classList.remove("img-magnifier-glass")


    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    glass.addEventListener("mouseleave", function () {
        glass.classList.remove("img-magnifier-glass")
    });

    img.addEventListener("mouseleave", function () {
        glass.classList.remove("img-magnifier-glass")
    });

    glass.addEventListener("mouseenter", function () {
        glass.classList.add("img-magnifier-glass")
    });

    img.addEventListener("mouseenter", function () {
        glass.classList.add("img-magnifier-glass")
    });

    function moveMagnifier(e) {
        let pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {
            x = img.width - (w / zoom);
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > img.height - (h / zoom)) {
            y = img.height - (h / zoom);
        }
        if (y < h / zoom) {
            y = h / zoom;
        }
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x: x, y: y};
    }
}

magnify("myimage", 3);

jQuery(document).ready(function ($) {
    $("#rating-new").find(".btnrating").on('click', (function (e) {
        let previous_value = $("#selected-rating-new").val();
        let selected_value = $(this).attr("data-attr");
        $("#selected-rating-new").val(selected_value);
        $(".selected-rating-new").empty();
        $(".selected-rating-new").html(selected_value);
    }));

    $("#rating-edit").find(".btnrating").on('click', (function (e) {
        let previous_value = $("#selected-rating-edit").val();
        let selected_value = $(this).attr("data-attr");
        $("#selected-rating-edit").val(selected_value);
        $(".selected-rating-edit").empty();
        $(".selected-rating-edit").html(selected_value);
    }));

});


