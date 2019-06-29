function showMessage(type, message) {
    if(type==='info' || type==='success' || type==='danger' || type==='warning')
        return "<div class=\"alert alert-" + type + "\" role=\"alert\">" + message + "</div>";

}

$(document).ready(function () {

    // add to cart
    $('.add-to-cart-action').click(function (e) {
        e.preventDefault();
        const data = {};
        data.productId = $(this).data('id');
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/cart/add',
            success: function(data) {
                if(data.status !== 'done') {
                    window.location.replace('/login')
                } else {
                    const number = $('#number-of-products-added');
                    number.html(data.cartSize);
                }
            }
        });
    });

});

