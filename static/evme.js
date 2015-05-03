$('#projects').one('mixEnd', function(e, state){
  $('footer')[0].dataset.ready = 'true';
  loadBlogPosts();
  loadJobs();
});

function loadBlogPosts() {
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json&callback=?&q='
  var feed_url = 'http://geeks.everything.me/feed';

  $.getJSON(url+encodeURIComponent(feed_url)).done(function(data) {
    // up to 3 items
    var items = {'entries': data.responseData.feed.entries.slice(0,3)};

    var source   = $('#blog-template').html();
    var template = Handlebars.compile(source);
    var html = template(items);

    $('#blog').append(html);
  });
}

function loadJobs() {
  var apiUrl = 'https://api.import.io/store/data/b76794af-c9cb-4d26-bc5f-45966514f6da/_query'+
              '?input/webpage/url='+encodeURIComponent('http://everything.me/jobs')+
              '&_user=f3e9d602-9b6e-4492-bceb-4f0e2caa96f3'+
              '&_apikey=f3e9d602-9b6e-4492-bceb-4f0e2caa96f3:LapYuqZmTnPfyUXMdNI2JPXFfavUAKpPv/DmC2zXKsHE14kJftKrz14b3KeDD0d/QgUq5102mTs0fV2yoJsP8w==';

  $.getJSON(apiUrl).done(function(data) {
    var source   = $('#jobs-template').html();
    var template = Handlebars.compile(source);
    var html = template(data);

    $('#jobs').append(html);
  });
}
