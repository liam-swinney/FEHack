var Video = Backbone.Model.extend({});

var VideoCollection = Backbone.Collection.extend({
	url: function() {
		var url = 'https://www.googleapis.com/youtube/v3/search?type=video&q='+ this.requestTerm +'&part=snippet&key=AIzaSyCHxd44vP-j7eB9F-dpnV3oKNpXDysDEds'

		return url;
	},
	parse: function(data) {
		var array = $.map(data.items, function(value, index) {
			value.id = value.id.videoId
			return [value];
		});

		return array;
	}
});

// Layout
var Layout = Mn.LayoutView.extend({
	template: '#templateLayout',
	el: '.js-video-player-app',
	regions: {
		videoList: '.js-video-list',
		videoPlayer: '.js-video-player',
		videoSearch: '.js-search'
	}
});

var layout = new Layout();

var VideoView = Mn.ItemView.extend({
	template: '#templateVideo',
	model: Video,
	tagName: 'li'
});

var VideoPlayer = Mn.ItemView.extend({
	template: '#templateVideoPlayer',
	model: Video
});

var VideoSearch = Mn.ItemView.extend({
	template: '#templateVideoSearch',
	events: {
		'click .js-submit-button': 'getVideos',
		'keyup .js-input':  'getVideos'
	},
	getVideos: function(e) {
		var searchTerm = this.$el.find('.js-input').val();

		if (searchTerm) {
			videoCollection.requestTerm = searchTerm;
			videoCollection.fetch();
		} else {
			videoCollection.reset();
		}
	}
});

var EmptyVideoView = Mn.ItemView.extend({
	template: '#templateVideoNoResults'
});

var VideosView = Marionette.CollectionView.extend({
	el: '#videoList',
	childView: VideoView,
	emptyView: EmptyVideoView,
	collection: VideoCollection,
	events: {
		'click .video': 'showVideo'
	},
	showVideo: function(e) {
		e.preventDefault();
		var id = $(e.currentTarget).data("videoid");

		layout.videoPlayer.show(new VideoPlayer({
			model: this.collection.get(id)
		}));
	}
});

var videoCollection = new VideoCollection; // creating new collection

layout.render();

// Show inner view
layout.videoSearch.show(new VideoSearch());
layout.videoList.show(new VideosView({
	collection : videoCollection
}));

