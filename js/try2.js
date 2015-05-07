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

var video = new Video;
var video2 = new Video;
var videoCollection = new VideoCollection;
var videoView = new VideoView({collection: videoCollection});

videoCollection.add(video);
videoCollection.add(video2);

var objVideo1 = {
    name : 'Mark',
    url : 'google.com'
};

var objVideo2 = {
    name : 'Jane',
    url : 'apple.com'
}

video.set(objVideo1);
video2.set(objVideo2);

videoView.render();

$('#videoList').html(videoView.el);




//1. set backbone statements for model, collection and view
//2. set new models - var sab = new Sab
//3. set collection adding the models
//4. create objects
//5. set objects to models

// set view
// initialize view > choose template (#id)
// render view > choose collection
// new view setting to collection
// render the view that was set
// add to dom (jquery)