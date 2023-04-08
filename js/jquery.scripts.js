$(window).on('load', function () {
	// Homepage Slider

	$('#home-slider, #room-wrap').flexslider({
		controlNav: false,
		start: function (slider) {
			var src = slider.slides.eq(0).attr('alt');
			$('.flex-captions p').html(src);
		},
		after: function (slider) {
			var src = slider.slides.eq(slider.currentSlide).attr('alt');
			$('.flex-captions p').html(src);
		}
	});

	$('#home-slider .flex-direction-nav, #home-slider .flex-captions, #room-wrap .flex-direction-nav, #room-wrap .flex-captions').wrapAll('<div class="flex-utils container" />');
});

jQuery(document).on('ready', function ($) {

	//Submenu
	$('.nav').superfish({
		animation: {
			opacity: "show",
			height: "show"
		},
		speed: "fast",
		delay: 250
	});

	//Datepickers
	$('.calendar').datepicker();

	// Responsive Menu
	// Create the dropdown base
	$("<select class='alt-nav' />").appendTo("#navigation");

	// Create default option "Go to..."
	$("<option />", {
		"selected": "selected",
		"value": "",
		"text": "Go to..."
	}).appendTo("#navigation select");

	// Populate dropdown with menu items
	$("#navigation a").each(function () {
		var el = $(this);
		$("<option />", {
			"value": el.attr("href"),
			"text": el.text()
		}).appendTo("nav select");
	});

	$("#navigation select").change(function () {
		window.location = $(this).find("option:selected").val();
	});

	$('#btnBook').click(function () {
		var arrivalDate = $('#arrival');
		var departureDate = $('#departure');
		var adultsEl = $('#adults');
		var childrenEl = $('#children');

		var arrival = parseDate(arrivalDate.val());
		var departure = parseDate(departureDate.val())
		var adults = adultsEl.val() || 2;
		var children = childrenEl.val() || 0;

		var bookingURL = 'https://booking.com/hotel/be/b-amp-b-lobelia-brugge.html';
		bookingURL += '?dest_id=1170523';
		bookingURL += '&dest_type=hotel';
		bookingURL += '&place_id_lat=51,194176145077';
		bookingURL += '&place_id_long=3.1710186315ç94';
		bookingURL += '&ss_raw=Lobelia+Brugge';
		bookingURL += '&ac_position=0';
		bookingURL += '&ac_langcode=en';
		bookingURL += '&from_sf=1';
		bookingURL += '&no_rooms=1';
		bookingURL += '&group_children=' + children;
		bookingURL += '&group_adults=' + adults;
		bookingURL += '&checkout_monthday=' + departure.day;
		bookingURL += '&checkout_month=' + departure.month;
		bookingURL += '&checkout_year=' + departure.year;
		bookingURL += '&checkin_monthday=' + arrival.day;
		bookingURL += '&checkin_month=' + arrival.month;
		bookingURL += '&checkin_year=' + arrival.year;
		bookingURL += '&ss=B&B+Lobelia_Brugge,+Bruges,+West-Flanders,+Belgium';
		bookingURL += '&src=hotel';
		bookingURL += '&src_elem=sb';

		window.open(bookingURL, '_blank');
	});


	var parseDate = function (date) {
		if (!date) return;
		var parts = date.split('/');
		if (!parts || parts.length !== 3) return;
		var month = parts[0];
		var day = parts[1];
		var year = parts[2];
		return { day: day, month: month, year: year };
	}


	// Google Maps code
	setTimeout(() => {
		if ($('#map').length > 0) {
			var firstLocation = new google.maps.LatLng(51.194449, 3.171292);
			//center map to first event
			var myOptions = {
				zoom: 14,
				center: firstLocation,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				streetViewControl: false,
				mapTypeControl: false
			};
			var map = new google.maps.Map(document.getElementById("map"), myOptions);
			var info = new google.maps.InfoWindow({
				content: '<div>Lobelia B&B</div><div>Nieuwe Sint-Annadreef 4</div><div>8200 Bruges</div><div>Belgium</div>'
			});
			var marker = new google.maps.Marker({
				position: firstLocation,
				map: map,
				title: 'Lobelia B&B',
				animation: google.maps.Animation.DROP
			});
			google.maps.event.addListener(marker, 'click', function () {
				info.open(map, marker);
			})
		}
	}, 5_000);

	//Fancybox
	if ($('.fb').length > 0) {
		$(".fb").fancybox({
			padding: 0,
			helpers: {
				title: {
					type: 'outside'
				},
				overlay: {
					opacity: 0.8,
					css: {
						'background-color': '#000'
					}
				},
				thumbs: {
					width: 50,
					height: 50
				}
			}
		});
	}

	//Block hover
	if ($('.block .fb').length > 0) {
		$(".block .fb").hover(
			function () {
				var o = $(this).find('.overlay');
				o.fadeIn('fast');
			},
			function () {
				$(this).find('.overlay').fadeOut('fast');
			});
	}

});
