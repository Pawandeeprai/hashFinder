$(document).ready(function(){
  var repeatCalled = false
  var repeatCall;


  $(".search").on("input", $.debounce(function(){
    var searchTag = createValidTag($(".search").val());

    $("img").remove();

    findHashTag(searchTag);
  }, 100, false))

  $("#repeat").click(function(){

    if (repeatCalled) {
      repeatCalled = false;
      clearInterval(repeatCall);
      debugger;
    } else {
      repeatCalled = true;
      repeatCall = setInterval(function(){
        var searchTag = createValidTag($(".search").val());

        $("img").remove();

        findHashTag(searchTag);
      }, 10000);
      console.log(repeatCall);
    }

    $("#repeat").toggleClass("white")
    $("#repeat").toggleClass("blue")
    $("#repeat").toggleClass("blue-repeat")
    $("#repeat").toggleClass("white-repeat")
  });

  $("#clear").click(function(){
    $("img").remove();
    $(".search").val("");

    $("#clear").toggleClass("white")
    $("#clear").toggleClass("blue")
    $("#clear").toggleClass("blue-clear")
    $("#clear").toggleClass("white-clear")

    setTimeout(function(){
      $("#clear").toggleClass("white")
      $("#clear").toggleClass("blue")
      $("#clear").toggleClass("blue-clear")
      $("#clear").toggleClass("white-clear")
    }, 250)
  });
});



function findHashTag(hashtag){
  $.ajax({
    url: "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?access_token=223904829.1fb234f.8f26219ff30a413d93c7ea118c065e09",
    type: "GET",
    dataType: 'jsonp',
    success: function(photos){

      photos.data.forEach(function(photo){
        var photoUrl = photo.images.standard_resolution.url;
        var likes = photo.likes.count;
        var id = photo.id


        if (likes > 15){
          $(".left").append("<img src=" + photoUrl + " class='image' id="+ id +"></img>")
          $("#" + id).css("width", "600")
        } else {
          $(".right").append("<img src=" + photoUrl + " class='image' id="+ id +"></img>")
          $("#" + id).css("width", "300")
        }
      });
    }
  });
}

function createValidTag(inputBoxValue) {
  var validTag = inputBoxValue.split(" ").join("");
  validTag = validTag.split("#").join("");
  return validTag
}

$.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if ( !immediate ) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if ( callNow ) {
            func.apply(context, args);
        }
    };
};
