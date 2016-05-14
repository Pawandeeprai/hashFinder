$(document).ready(function(){
  $("input").click(function(){
    debugger;
    $.ajax({
      url: "https://api.instagram.com/v1/tags/dogs/media/recent?access_token=223904829.1fb234f.8f26219ff30a413d93c7ea118c065e09",
      type: "GET",
      // dataType: 'jsonp',
      success: function(data){
      }
    });
  });
});
