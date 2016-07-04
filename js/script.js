$(function() {
    console.log( "ready!" );
    var Myburger = $('.burger');

	Myburger.on('click', function(e){
		e.preventDefault();
		console.log('Myburger is cliqued');
		$('#sidebar').toggleClass('active');
	});

	
});
	
