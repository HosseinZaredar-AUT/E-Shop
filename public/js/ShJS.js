function openBar() {
    if (document.getElementById("sideBar").classList.contains("leftSideOpen")) {
        // document.getElementById("sideBar").style.width = "75%";
        // document.getElementById("sideBar").style.paddingLeft = "35px";
        // document.getElementById("sideBar").style.paddingRight = "35px";
        // document.getElementById("sideBar").style.paddingBottom = "85px";
        document.getElementById("sideBar").classList.remove("leftSideOpen");
        document.getElementById("body").classList.remove("hidedBody");
        document.getElementById("body").classList.add("shoppingBody");
        document.getElementById("body").classList.add("shoppingBody");
        document.getElementById("overlay").style.display = "none";
        document.getElementById("setting").style.display = "";
        setTimeout(function () {
            document.getElementById("close").style.display = "none";
        }, 500);
    } else {
        document.getElementById("sideBar").classList.add("leftSideOpen");
        document.getElementById("body").classList.add("hidedBody");
        document.getElementById("body").classList.remove("shoppingBody");
        document.getElementById("overlay").style.display = "block";
        document.getElementById("setting").style.display = "block";
        document.getElementById("close").style.display = "block";
    }
}

dropThePage = (id) => {
    console.log(document.getElementById(id).scrollHeight);
    // document.getElementById(id).style.top = "0";
    document.getElementById(id).style.display = "block";
    setTimeout(() => {
        document.getElementById(id).style.top = "0";
    },100);
};

packThePage = (id) => {
    console.log(document.getElementById(id).style.height);
    setTimeout(() => {
        document.getElementById(id).style.display = "none";

    },500);
    document.getElementById(id).style.top = -1 * document.getElementById(id).scrollHeight + 'px';
};

function addColor() {
    $("#color").prepend("    <div style=\"direction: rtl\">\n" +
        "            <input type=\"color\"\n" +
        "    class=\"form-control d-inline w-75\">\n" +
        "            </div>\n" +
        "            <hr>");

}

function addPhoto() {
    $("#photo").prepend("                                        <div class=\"\" style=\"direction: rtl\">\n" +
        "                                            <div class=\"input-group w-75 mr-5\">\n" +
        "\n" +
        "                                                <div class=\"custom-file\">\n" +
        "                                                    <input type=\"file\" class=\"custom-file-input\" id=\"inputGroupFile01\"\n" +
        "                                                           aria-describedby=\"inputGroupFileAddon01\">\n" +
        "                                                    <label class=\"custom-file-label\"\n" +
        "                                                           for=\"inputGroupFile01\">انتخاب</label>\n" +
        "                                                </div>\n" +
        "                                            </div>\n" +
        "                                        </div>\n" +
        "                                        <hr>");

}

function addCat() {
    $("#cat").prepend("                                        <div style=\"direction: rtl\">\n" +
        "                                            <select type=\"text\" class=\"form-control d-inline w-75\">\n" +
        "                                                <option selected>\n" +
        "                                                    دسته بندی\n" +
        "                                                </option>\n" +
        "                                                <option>\n" +
        "                                                    خوراکی\n" +
        "                                                </option>\n" +
        "                                                <option>\n" +
        "                                                    لباس\n" +
        "                                                </option>\n" +
        "                                                <option>\n" +
        "                                                    ساز\n" +
        "                                                </option>\n" +
        "                                                <option>\n" +
        "                                                    لوازم بهداشتی\n" +
        "                                                </option>\n" +
        "                                                <option>\n" +
        "                                                    خودرو\n" +
        "                                                </option>\n" +
        "                                            </select>\n" +
        "                                        </div>\n" +
        "                                        <hr>");

}

function addOther() {
    $("#other").prepend("                                        <div style=\"direction: rtl\">\n" +
        "                                            <input type=\"text\" class=\"form-control d-inline w-25\" placeholder=\"مشخصه :\">\n" +
        "                                            <input type=\"text\" class=\"form-control d-inline w-50\" placeholder=\"توضیح :\">\n" +
        "                                        </div>\n" +
        "                                        <hr>");

}