$(function(){

  function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

    $('#button_play').click(function(){
      $('#button_play').hide(); 
      $('#button_pause').show(); 
    });

    $('#button_pause').click(function(){
      $('#button_pause').hide(); 
      $('#button_play').show(); 
    });

    $('#button_expand').click(function(){
      launchIntoFullscreen(document.documentElement);
      $('#button_expand').hide(); 
      $('#button_compress').show(); 
    });

    $('#button_compress').click(function(){
      exitFullscreen();
      $('#button_compress').hide(); 
      $('#button_expand').show(); 
    });

    $('#button_speed').click(function(){
      default_wpm = parseInt($('#count_wpm').html());
      if (default_wpm < 1000) {
        $('#count_wpm').html(default_wpm + 50); 
      }
    });

    $('#button_slow').click(function(){
      default_wpm = parseInt($('#count_wpm').html());
      if (default_wpm > 100) {
        $('#count_wpm').html(default_wpm - 50); 
      }
    });

    $('#button_click_file').bind("click", function(){
      $('#button_input_file').click(); 
    });

  $('#button_input_file').change(function(evt){
    var files = evt.target.files; // FileList object
    var textType = /text*/;

    var file = $(this)[0].files[0];

    if (file.type.match(textType)) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#content_text').html(reader.result);
      }
      reader.readAsText(file);	
    }

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      $('#info_file_name').html(f.name);
    }


  });


});
