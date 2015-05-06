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

var VideoView = Mn.ItemView.extend({
    template: '#templateVideo',
    model: Video,
    tagName: 'li'
});

var VideosView = Marionette.CollectionView.extend({
    el: '#videoList',
    childView: VideoView,
    collection: VideoCollection
});

var videoCollection = new VideoCollection; // creating new collection
var videosView = new VideosView({collection : videoCollection}); // creating a view

videosView.render();
videoCollection.fetch();
