var Video = Backbone.Model.extend({});

var VideoView = Backbone.View.extend({
    template: '#templateVideo',
    initialize: function() {
        this.render();
        this.listenTo(this.model, "change", this.render);
    },
    render: function () {
        var template = _.template($('#templateVideo').html());
        var videoTemplate = template(this.model.attributes);

        this.$el.html(videoTemplate);

        return this;
    },
    model: Video
});

var video = new Video;
var videoView = new VideoView({model : video});

var videoObj = {
    name: 'video name',
    url: 'https://www.test.com'
};

video.set(videoObj);

videoView.render();

$('#videoList').html(videoView.el);
