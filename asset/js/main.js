$(function(){

  
    $('#button_play').click(function(){
      $('#button_play').hide(); 
      $('#button_pause').show(); 
    });

    $('#button_pause').click(function(){
      $('#button_pause').hide(); 
      $('#button_play').show(); 
    });

    $('#button_expand').click(function(){
      $('#button_expand').hide(); 
      $('#button_compress').show(); 
    });

    $('#button_compress').click(function(){
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

});
