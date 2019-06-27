
let successButton = document.getElementsByClassName("add-to-cart-action")[0];
let transitionTime = "0.4s";
let check = successButton.getElementsByClassName("fa fa-plus")[0];
let prevAdd = successButton.innerText;
let pluses = document.getElementsByClassName("add-to-cart-action");
for (var i = 0; i < pluses.length; i++)
{
    let plus = pluses[i];
    let transitionTime = "0.4s";
    let productCard = plus.parentElement;
    let successButton = productCard.getElementsByClassName("btn-success")[0];
    plus.addEventListener('click', () => {
        fetch('http://localhost:3000/cart/add',
        {
            method: 'POST',
            body: JSON.stringify({
                productId: successButton.getAttribute("data-id")
            }),
            headers: {'Content-Type': 'application/json'}
        }).then((res) => { 
        if (res.url.endsWith("cart"))
        {
            if (plus.className.includes("btn"))
                productCard = productCard.parentElement;
            let bigPlus = productCard.getElementsByClassName("fa fa-plus add-to-cart-plus")[0];
            console.log(productCard);
            if (bigPlus)
                bigPlus.style.display = "none";
            let overlay = productCard.getElementsByClassName("card-img-overlay")[0];
            
            let prevAdd = successButton.innerText;
            image = productCard.getElementsByClassName("card-img-top")[0];
            image.style.transition = transitionTime;
            image.style.filter = "blur(5px)";
            overlay.style.display = "block";
            successButton.style.transition = transitionTime;
            var checkPlus = document.createElement("i"),
                newCheck = document.createElement("i");
            checkPlus.className = "fa fa-check";
            newCheck.className = "fa fa-plus";
            successButton.innerText = " " + overlay.innerText;
            successButton.appendChild(checkPlus);            
            setTimeout(() => {
                image.style.filter = "none";
                overlay.style.display = "none";
                successButton.innerText= prevAdd;
                successButton.appendChild(newCheck);
                if (bigPlus)
                    bigPlus.style.display = "";
            }, 1000);
        }   
    })
    });
}