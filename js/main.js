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

var CollectionView = Mn.CollectionView.extend({
    initialize : function(){
        this.listenTo(this.collection, 'add', this.render);
    },
    //tagName: 'li',
    el: '#videoList',
    childView : VideoView,
    collection: VideoCollection
});

var videoCollection = new VideoCollection; // creating new collection
var collectionView = new CollectionView({collection : videoCollection}); // creating a view

videoCollection.fetch();
