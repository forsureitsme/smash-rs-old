---
---

if ($('.header-video video').length) {
	var headerVideos = {{ site.data.gyfcats.headerVideos | jsonify }};
	var animal = headerVideos[Math.floor(Math.random() * headerVideos.length)];

	$('.header-video video').attr('poster', '//thumbs.gfycat.com/'+animal+'-poster.jpg');
	['webm','mp4'].forEach( function(ext) {
		$('.header-video video').append($('.header-video .source-template').text().replace(/ANIMAL/g, animal).replace(/EXTENSION/g, ext));
	});
}

if ($('input[name="_gotcha"]').length) {
	$('input[name="_gotcha"]').hide().prev('label').hide();
};