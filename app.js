$(document).ready(function(){
  var repeatCalled = false
  var repeatCall;


  $(".search").on("input", $.debounce(function(){
    var searchTag = createValidTag($(".search").val());

    findHashTag(searchTag);
  }, 500, false))

  $("#repeat").click(function(){

    if (repeatCalled) {
      repeatCalled = false;
      clearInterval(repeatCall);
    } else {
      repeatCalled = true;
      repeatCall = setInterval(function(){
        var searchTag = createValidTag($(".search").val());

        $(".image").remove();

        findHashTag(searchTag);
      }, 30000);
    }

    $("#repeat").toggleClass("white");
    $("#repeat").toggleClass("blue");
    $("#repeat").toggleClass("blue-repeat");
    $("#repeat").toggleClass("white-repeat");
  });

  $("#clear").click(function(){
    $(".image").remove();
    $(".big").css("background-image","");
    $(".search").val("");

    $("#clear").toggleClass("white");
    $("#clear").toggleClass("blue");
    $("#clear").toggleClass("blue-clear");
    $("#clear").toggleClass("white-clear");

    setTimeout(function(){
      $("#clear").toggleClass("white");
      $("#clear").toggleClass("blue");
      $("#clear").toggleClass("blue-clear");
      $("#clear").toggleClass("white-clear");
    }, 250)
  });

  $(".hide").click(function(){
    $(".tool-bar-bg").hide();
  })
});



function findHashTag(hashtag){
  $(".image").remove();
  $(".big").css("background-image","");
  $.ajax({
    url: "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?access_token=223904829.1fb234f.8f26219ff30a413d93c7ea118c065e09",
    type: "GET",
    dataType: 'jsonp',
    success: function(photos){
      var photosArray = [];

      photos.data.forEach(function(photo){
        var photoObj = {
          url : photo.images.standard_resolution.url,
          likes : photo.likes.count,
          id : photo.id
        }
        if (photosArray[photoObj.likes]){
          photosArray[photoObj.likes].push(photoObj);
        } else {
          photosArray[photoObj.likes] = [photoObj];
        }

      });
      photosArray = photosArray.filter(function(value){
        if (value !== undefined){
          return value;
        }
      })
      photosArray = [].concat.apply([], photosArray)
      console.log(photosArray[photosArray.length - 1]);
      $(".right").css("background-image", "url(" + photosArray[photosArray.length - 1].url + ")" );
      $(".left").css("background-image", "url(" + photosArray[photosArray.length - 2].url + ")" );

      photosArray = photosArray.slice(0, photosArray.length - 2);

      photosArray.slice(2, 10).forEach(function(photo){
        $(".bottom").append("<div class='image' id="+ photo.id +" src="+ photo.url + "></div>");
        $("#" + photo.id).css("background-image", "url(" + photo.url+ ")");
      })

      photosArray.slice(10).forEach(function(photo){
        $(".top").append("<div class='image' id="+ photo.id +" src="+ photo.url + "></div>");
        $("#" + photo.id).css("background-image", "url(" + photo.url+ ")");
      })
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
