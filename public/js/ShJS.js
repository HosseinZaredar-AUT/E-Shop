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
    $("#color").prepend("                                            <div style=\"direction: rtl\" class=\"position-relative\">\n" +
        "                                                <a onclick=\"this.parentNode.remove()\" class=\"text-danger\" style=\"font-size: 25px\">\n" +
        "                                                    <i class=\"fa fa-close position-absolute\"\n" +
        "                                                       style=\"right: 55px;top:8px;\"></i>\n" +
        "                                                </a>\n" +
        "                                                <input type=\"color\" name=\"colors\"\n" +
        "                                                       class=\"form-control d-inline w-75\">\n" +
        "                                                <hr>\n" +
        "                                            </div>");

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
    $("#other").prepend("                                            <div style=\"direction: rtl;position: relative\">\n" +
        "                                                <a onclick=\"this.parentNode.remove()\" class=\"text-danger\" style=\"font-size: 25px\">\n" +
        "                                                    <i class=\"fa fa-close position-absolute\"\n" +
        "                                                       style=\"right: 55px;top:8px;\"></i>\n" +
        "                                                </a>\n" +
        "                                                <input type=\"text\" name=\"property\" class=\"form-control d-inline w-25\"\n" +
        "                                                       placeholder=\"مشخصه :\">\n" +
        "                                                <input type=\"text\" name=\"property\" class=\"form-control d-inline w-50\"\n" +
        "                                                       placeholder=\"توضیح :\">\n" +
        "                                                <hr>\n" +
        "                                            </div>");

}