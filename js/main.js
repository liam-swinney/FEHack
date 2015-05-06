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

var VideoView = Mn.View.extend({
    initialize : function(){
        this.listenTo(this.collection, 'add', this.render);
    },
    template: '#templateVideo',
    render: function () {
        var template = _.template($('#templateVideo').html());
        var videoTemplate = template({
            items: this.collection.toJSON()
        });

        this.$el.html(videoTemplate);

        return this;
    },
    collection: VideoCollection
});


var videoCollection = new VideoCollection; // creating new collection
var videoView = new VideoView({collection : videoCollection}); // creating a view
videoCollection.fetch();

$('#videoList').html(videoView.el); // adding view to DOM
