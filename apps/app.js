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
      showResults(data.Search);
    });
  }

  function showResults(results) {
    var html = '';
    $.each(results, function(index, value) {
      html += '<img src="' + value.thumbnail + '">';
    });
    $('.results').html(html);
  }
});
