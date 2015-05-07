var Video = Backbone.Model.extend({});
var VideoCollection = Backbone.Collection.extend();

var VideoView = Backbone.View.extend({
    initialize : function(){
        this.listenTo(this.collection, 'add', this.render);
    },
    template: '#templateVideo',
    render : function(){
        var template = _.template($('#templateVideo').html());
        var videoTemplate = template({
            items: this.collection.toJSON()
        });

        this.$el.html(videoTemplate);

        return this;
    },
    collection: VideoCollection
});

var video = new Video;
var video2 = new Video;
var videoCollection = new VideoCollection;
var videoView = new VideoView({collection : videoCollection});

videoCollection.add(video);
videoCollection.add(video2);

var videoObj1 = {
    name : 'John',
    url : 'http://amazon.com'
};

var videoObj2 = {
    name : 'Carl',
    url : 'http://google.com'
}

video.set(videoObj1);
video2.set(videoObj2);

videoView.render();

$('#videoList').html(videoView.el);

//1. set backbone statements for model, collection and view
//2. set new models - var sab = new Sab
//3. set collection adding the models
//4. create objects
//5. set objects to models