var Video = Backbone.Model.extend({});
var VideoCollection = Backbone.Collection.extend({});

var VideoView = Backbone.View.extend({
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

var video = new Video; // creating new model
var video2 = new Video;
var videoCollection = new VideoCollection; // creating new collection
var videoView = new VideoView({collection : videoCollection}); // creating a view

videoCollection.add(video); // adding model to collection
videoCollection.add(video2);

var videoObj = {
    name: 'Muz',
    url: 'https://www.test.com'
};

var videoObj2 = {
    name: 'Liam',
    url: 'https://goldengridsystem.com'
}

video.set(videoObj); // updating / setting the model attributes
video2.set(videoObj2);

videoView.render(); // outputing to the view

$('#videoList').html(videoView.el); // adding view to DOM