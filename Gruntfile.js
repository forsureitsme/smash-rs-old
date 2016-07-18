const
	fs = require('fs'),
	request = require('sync-request'),
	YAML = require('yamljs')
;

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.task.registerTask('videos', function() {
		var pkg = grunt.file.readJSON('package.json');
		var playlists = [];

		console.log('Fetching playlists');

		var playlists_json = JSON.parse(request('GET', 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&channelId=UCCz8lhD91prcrAtLqTzeKZQ&fields=items(id%2Csnippet%2Ftitle)&key='+pkg.youtube_key).getBody('utf8'));

		for(var k in playlists_json.items) {
			var playlist = playlists_json.items[k];
			if(playlist.snippet.title.toLowerCase().indexOf('smash') > -1) {
				playlists.push({
					id: playlist.id,
					name: playlist.snippet.title,
					videos: []
				});
			}
		};

		if(playlists.length > 0) {
			for(var j in playlists){
				console.log('Fetching videos from playlist: \n'+playlists[j].name);
				var playlist_json = JSON.parse(request('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+playlists[j].id+'&fields=items(snippet(publishedAt%2CresourceId%2FvideoId%2Ctitle))&key='+pkg.youtube_key).getBody('utf8'));

				for(var k in playlist_json.items) {
					var video = playlist_json.items[k].snippet;
					playlists[j].videos.push({
						id: video.resourceId.videoId,
						title: video.title,
						date: video.publishedAt
					});
				}
			}
		};

		console.log('Saving to "_data.videos.yml"');
		fs.writeFileSync('_data/videos.json', JSON.stringify({sections: playlists}));
	});

	grunt.registerTask('default', ['videos']);
};