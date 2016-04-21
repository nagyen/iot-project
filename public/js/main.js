( function( window ) {



    // Binds an element to callback on click
    // @param element object like document.getElementById() (has to be a single element)
    // @param callback function to run when the element is clicked
    var _bindClick = function( element, callback ) {
        if ( element.addEventListener ) {
            element.addEventListener( 'click', callback, false );
        } else {
            element.attachEvent( 'onclick', callback );
        }
    };


    // Bind that function to the appropriate link
    var isFilledElement = document.getElementById( 'check-is-filled' );
    _bindClick( isFilledElement, _sayIsVisualCaptchaFilled );
}( window ) );
