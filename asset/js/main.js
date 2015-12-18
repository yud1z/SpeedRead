$(function(){
  
    $('#button_play').click(function(){
      $('#button_play').hide(); 
      $('#button_pause').show(); 
    });


    $('#button_pause').click(function(){
      $('#button_pause').hide(); 
      $('#button_play').show(); 
    });

});
