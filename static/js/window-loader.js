$(window).on('load', function () {
    $('.g-loader').fadeOut('fast');
    setTimeout(function () {
        $('.g-loader').fadeOut('slow').hide();
    }, 1000);
});

const toggleLoader = (check) => {
    if (check) {
        $('.g-loader').show();
    }
    else if (!check) {
        $('.g-loader').fadeOut('slow').hide();
    }
}