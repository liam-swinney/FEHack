var Video = Backbone.Model.extend({});

var VideoCollection = Backbone.Collection.extend({
    url: function() {
        var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCHxd44vP-j7eB9F-dpnV3oKNpXDysDEds'

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
  // define regions
  regions: {
    videoList: '.js-video-list',
    videoPlayer: '.js-video-player'
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

var VideosView = Marionette.CollectionView.extend({
    el: '#videoList',
    childView: VideoView,
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
videoCollection.fetch();

layout.render();

// Show inner view
layout.videoList.show(new VideosView({collection : videoCollection}));
