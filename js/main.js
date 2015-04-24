var Video = Backbone.Model.extend({});

var VideoView = Backbone.View.extend({
    template: '#templateVideo'
});

var video = new Video({});
var videoView = VideoView({});

// $('#videoList').append(viewView.render())
