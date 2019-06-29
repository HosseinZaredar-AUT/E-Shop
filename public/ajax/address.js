$(document).ready(function () {

    $('#cart-add-new-address').click(function (e) {
        e.preventDefault();
        let province = $('#cart-new-address-province').val(),
            city = $('#cart-new-address-city').val(),
            postalCode = $('#cart-new-address-postal-code').val(),
            address = $('#cart-new-address-address').val(),
            homePhone = $('#cart-new-address-home-phone').val();
        const data = {
            province:   province,
            city:       city,
            postalCode: postalCode,
            address:    address,
            homePhone:  homePhone,
            ajax:       true
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/userDashboard/address',
            success: function(res) {
                console.log(res);
                if(res.status === 'done') {
                    if(province && city && postalCode && address && homePhone) {
                        let select = $('#addresses-select');
                        select.prepend('<option value=' + res.data._id + ' selected><span>' + res.data.address + '</span></option>')
                    }
                }
            }
        });
    });

});

