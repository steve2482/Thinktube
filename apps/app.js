$(function() {
  function Video() {
    this.title = '';
    this.videoId = '';
    this.content = '';
    this.showResults = function(results) {
      $('.results').empty();
      for (var i = 0; i < results.items.length; i++) {
        var title = results.items[i].snippet.title;
        var videoId = results.items[i].id.videoId;
        var content = '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img class="thumbnail" src="' + results.items[i].snippet.thumbnails.medium.url + '"></a><br><p class="title"><a href="https://www.youtube.com/watch?v=' + videoId + '">' + title + '</a>';
        $('.results').append(content);
      }
    };
    this.getRequest = function(userKeyword) {
      var self = this;
      var params = {
        part: 'snippet',
        key: 'AIzaSyDOA-ddJ3xi67PNWuEVlqfalhKlxDqj538',
        q: userKeyword
      };
      var url = 'https://www.googleapis.com/youtube/v3/search';
      $.getJSON(url, params, function(data) {
        self.showResults(data);
      });
    };
  }

  $('#searchTerm').submit(function(e) {
    e.preventDefault();
    var userKeyword = $('#searchInput').val();
    var youtubeVideo = new Video();
    youtubeVideo.getRequest(userKeyword);
    clearForm();
  });

  function clearForm() {
    document.getElementById('searchTerm').reset();
  }
});
