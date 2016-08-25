$(function() {
  $('#searchTerm').submit(function(e) {
    e.preventDefault();
    var userKeyword = $('#searchInput').val();
    console.log(userKeyword);
    getRequest(userKeyword);
  });

  function getRequest(userKeyword) {
    var params = {
      part: 'snippet',
      key: 'AIzaSyDOA-ddJ3xi67PNWuEVlqfalhKlxDqj538',
      q: userKeyword
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) {
      console.log(data);
      showResults(data);
    });
  }

  function showResults(results) {
    var html = '';
    var i = 0;
    $.each(results, function(index, value) {
      html += '<img class="thumbnail" src="' + results.items[0][i].snippet.thumbnails.medium.url + '">';
      console.log(results.items[1].snippet.thumbnails.medium.url);
      // i++;
    });
    $('.results').html(html);
  }
});
