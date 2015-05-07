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
    tagName: 'li',
    template: '#templateVideo',
});

var VideoLayoutHeader = Mn.ItemView.extend({
    template: '#templateHeader',
});

var CollectionView = Mn.CollectionView.extend({
    initialize : function(){
        this.listenTo(this.collection, 'add', this.render);
    },
    tagName: 'ul',
    className:  'video-list',
    childView : VideoView,
    collection: VideoCollection
});

var VideoLayoutView = Mn.LayoutView.extend({
    template: '#templateVideo2',

    regions: {
        headerRegion: '#header-region',
        videoListRegion: '#video-list-region',
        videoPlayRegion: '#video-play-region'
    },

    el: '#videoList2'
});

var videoCollection = new VideoCollection; // creating new collection
var videoLayoutView = new VideoLayoutView({});

videoCollection.fetch();
videoLayoutView.render();
videoLayoutView.videoListRegion.show(new CollectionView({collection : videoCollection}));
videoLayoutView.headerRegion.show(new VideoLayoutHeader());
