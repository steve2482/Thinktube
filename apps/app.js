$(function() {
  $('#searchTerm').submit(function(e) {
    e.preventDefault();
    var userKeyword = $('#searchInput').val();
    getRequest(userKeyword);
    clearForm();
  });

  function getRequest(userKeyword) {
    var params = {
      part: 'snippet',
      key: 'AIzaSyDOA-ddJ3xi67PNWuEVlqfalhKlxDqj538',
      q: userKeyword
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) {
      showResults(data);
    });
  }

  function showResults(results) {
    $('.results').empty();
    for (var i = 0; i < results.items.length; i++) {
      var title = results.items[i].snippet.title;
      var videoId = results.items[i].id.videoId;
      var Content = '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img class="thumbnail" src="' + results.items[i].snippet.thumbnails.medium.url + '"></a><br><p class="title"><a href="https://www.youtube.com/watch?v=' + videoId + '">' + title + '</a>';
      $('.results').append(Content);
    }

    // ----------------This did not work------------------
    // var html = '';
    // var i = 0;
    // $.each(results, function(index, value) {
    //   html += '<img class="thumbnail" src="' + results.items[i].snippet.thumbnails.medium.url + '">';
    // });
    // $('.results').html(html);
  }

  function clearForm() {
    document.getElementById('searchTerm').reset();
  }
});
