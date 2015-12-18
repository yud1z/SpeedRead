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


    $('#button_click_file').bind("click", function(){
      $('#button_input_file').click(); 
    });

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  $('#button_input_file').change(function(evt){
    var files = evt.target.files; // FileList object

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      $('#info_file_name').html(f.name);
    }


  });


});
