$(document).ready(function () {

    // add to cart
    $('#add-to-favorites').click(function (e) {
        e.preventDefault();
        const data = {};
        data.productId = $(this).data('id');
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: data.productId+'/fav/new',
            success: function(data) {
                if(data === 'login') {
                    window.location.replace('/login')
                } else if (data === 'admin') {
                    window.location.replace('/')
                } else {
                    console.log('added to favs');
                }
            }
        });
    });

});

