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

});
