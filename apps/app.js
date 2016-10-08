$(function() {
  function Video() {
    this.title = '';
    this.videoId = '';
    this.content = '';
    this.showResults = function(results, origin) {
      if (origin === 'youtube') {
        for (var i = 0; i < results.items.length; i++) {
          var title = results.items[i].snippet.title;
          var videoId = results.items[i].id.videoId;
          var thumb = results.items[i].snippet.thumbnails.medium.url;
          var content = '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img class="thumbnail" src="' + thumb + '"></a><br><p class="title"><a href="https://www.youtube.com/watch?v=' + videoId + '">' + title + '</a>';
          $('.results').append(content);
        }
      } else if (origin === 'vimeo') {
        console.log("VIMEO");
        for (var x = 0; x < 6; x++) {
          var vimeoTitle = results.data[x].name;
          var vimeoVideoId = results.data[x].link;
          var vimeoThumb = results.data[x].pictures.sizes[2].link;
          var vimeoContent = '<a href="' + vimeoVideoId + '"><img class="thumbnail" src="' + vimeoThumb + '"></a><br><p class="title"><a href="' + vimeoVideoId + '">' + vimeoTitle + '</a>';
          $('.results').append(vimeoContent);
        }
      }
    };
    this.getRequest = function(url, params, origin) {
      var self = this;
      $.getJSON(url, params, function(data) {
        self.showResults(data, origin);
        console.log(data);
      });
    };
  }

  $('#searchTerm').submit(function(e) {
    e.preventDefault();
    $('.results').empty();
    var userKeyword = $('#searchInput').val();
    var vimeoParams = {
      query: userKeyword,
      sort: 'relevant',
      access_token: '61e0241835e91946ea726efe08bcf6a2',
      token_type: 'Bearer',
      scope: 'public'
    };
    var vimeoUrl = 'https://api.vimeo.com/videos?';
    var params = {
      part: 'snippet',
      key: 'AIzaSyDOA-ddJ3xi67PNWuEVlqfalhKlxDqj538',
      q: userKeyword
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var youtubeVideo = new Video();
    youtubeVideo.getRequest(url, params, 'youtube');
    var vimeoVideo = new Video();
    vimeoVideo.getRequest(vimeoUrl, vimeoParams, 'vimeo');
    clearForm();
  });

  function clearForm() {
    document.getElementById('searchTerm').reset();
  }
});
