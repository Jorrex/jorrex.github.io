$(document).ready(function() {
    var url = 'https://www.nespresso.com/be/en/order/capsules/original';
    $.ajax({
        url: url,
        dataType: 'text',
        headers: {'Access-Control-Allow-Origin': ''},
        success: function(data) {
            alert('Success');
            console.log(data);
        }
    });
});