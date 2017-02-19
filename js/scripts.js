---
---

$(document).ready(function() {
	window.queryParams = (function() {
	    qs = document.location.search.split('+').join(' ');

	    var params = {},
	        tokens,
	        re = /[?&]?([^=]+)=([^&]*)/g;

	    while (tokens = re.exec(qs)) {
	        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	    }

	    return params;
	})();

	if ($('.header-video video').length) {
		var headerVideos = {{ site.data.gyfcats.headerVideos | jsonify }};
		var animal = headerVideos[Math.floor(Math.random() * headerVideos.length + 1)];

		$('.header-video video').attr('poster', '//thumbs.gfycat.com/'+animal+'-poster.jpg');
		['mp4','webm'].forEach(function(ext) {
			$('.header-video video').append(
				$('.header-video .source-template').text()
					.replace(/ANIMAL/g, animal)
					.replace(/EXTENSION/g, ext)
			);
		});
	}

	if ($('input[name="_gotcha"]').length) {
		$('input[name="_gotcha"]').hide().prev('label').hide();
	};

	if($('.js-lazyYT').length) {
		$('.js-lazyYT').lazyYT();
	}
});

$(window).one('load', function() {
	window.$showVideo = $('[data-youtube-id="'+window.queryParams.v+'"]');
	if(window.$showVideo.length) {
		window.$showVideo.click().closest('.collapse').one('shown.bs.collapse', function() {
			$('html, body').animate({
				scrollTop: window.$showVideo.offset().top + window.$showVideo.outerHeight()/2 - $(window).height()/2
			}, 3000);
		}).collapse('show');
	}
});