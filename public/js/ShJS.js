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