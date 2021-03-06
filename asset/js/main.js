$(function(){

var STATE = {
  Empty:    {value: 0, text: 'Empty'},
  Loaded:   {value: 1, text: 'Loaded'},
  Reading:  {value: 2, text: 'Reading'},
  Paused:   {value: 3, text: 'Paused'},
  NewModal: {value: 4, text: 'NewModal'},
  Options:  {value: 5, text: 'Options'}
};

var wpm = 300;
var chunk = 1;
var chunkLen = 20;
var txt;
var wpmdelta = 50;
var skipbackWords = 10;
var skipEnabled = 1;
var canStore = 0; // 1 if local storage is available
var storageEnabled = 1; // 0 if local storage is turned off manually
var darkMode = 0; // 0 if light mode, 1 if dark mode
var hideMode = 1; // whether the extra divs should be hidden while reading
var defaultText;
var filesSupported = ['txt'];

var eState = STATE.Empty;
var ePrevState = STATE.Empty;

checkLocalStorageSupport();
InitEngine();
loadState();

function checkLocalStorageSupport() {
  try {
    canStore = 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    canStore = 0;
  }
}

function loadState() {
  if (!canStore) return;

  if (localStorage.getItem("spdWPM") !== null) {
    storageEnabled = parseInt(localStorage.storage, 10);
  }

  if (!storageEnabled) return;

  if (localStorage.getItem("spdWPM") !== null) {
    wpm = parseInt(localStorage.spdWPM, 10);
  }

  if (localStorage.getItem("spdDelta") !== null) {
    wpmdelta = parseInt(localStorage.spdDelta, 10);
  }

  if (localStorage.getItem("spdChunk") !== null) {
    chunk = parseInt(localStorage.spdChunk, 10);
  }

  if (localStorage.getItem("spdChunkLen") !== null) {
    chunkLen = parseInt(localStorage.spdChunkLen, 10);
  }

  if (localStorage.getItem("hideMode") !== null) {
    hideMode = parseInt(localStorage.hideMode, 10);
  }

  if (localStorage.getItem("skipbackWords") !== null) {
    skipbackWords = parseInt(localStorage.skipbackWords, 10);
  }

  if (localStorage.getItem("skipEnabled") !== null) {
    skipEnabled = parseInt(localStorage.skipEnabled, 10);
  }

  if (localStorage.getItem("darkMode") !== null) {
    darkMode = parseInt(localStorage.darkMode, 10);
  }

  changeWPM(0);
  changeChunkSize(0);
}

function changeWPM(delta) {
  if (wpm + delta < 0) return;

  wpm += delta;
  Engine.setWPM(wpm);
  saveState();
  /*$('#count_wpm').text(delta);*/
}

function saveState() {
  if (!canStore || !storageEnabled) return;

  localStorage.spdWPM = wpm;
  localStorage.spdDelta = wpmdelta;
  localStorage.spdChunk = chunk;
  localStorage.spdChunkLen = chunkLen;
  localStorage.hideMode = hideMode;
  localStorage.skipEnabled = skipEnabled;
  localStorage.skipbackWords = skipbackWords;
  localStorage.darkMode = darkMode;
}


function changeChunkSize(delta) {
  if (chunk + delta < 0) return;

  chunk += delta;
  Engine.setChunk(delta);
  Engine.setChunkLen(chunkLen);
  saveState();
  /*$('#divChunk').text(chunk);*/
}

function changeState(state) {
  ePrevState = eState;
  eState = state;
}

function EngineCallback(state, text) {
  if (state == EngSTATE.Finished) {
    changeState(STATE.Loaded);
    return;
  }
  else if (state == EngSTATE.Paused) {
    changeState(STATE.Paused);
    return;
  }

  $('#content_chunk').html(text);
}

function InitEngine() {
  Engine.setWPM(0);
  Engine.setCallback(EngineCallback);
}

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

  txt = $('#content_text').text();
  if (txt != "") {

    $('#button_play').hide(); 
    $('#button_pause').show(); 

    if (eState == STATE.Paused) {
      changeState(STATE.Reading);
      Engine.resume();
    }
    else{

      var res = Engine.setText($('#content_text').text());
      changeState(STATE.Reading);
      changeChunkSize(1);
      changeWPM(300);
      Engine.start();
      $('#content_chunk').text(Engine.getNextChunk());
    }


  }
  else  {
      $('#button_input_file').click(); 
  }


    });

    $('#button_pause').click(function(){
      changeState(STATE.Paused);
      Engine.pause();
      $('#button_pause').hide(); 
      $('#button_play').show(); 
    });

    $('#button_expand').click(function(){
      $('#fscren').html('yes');
      launchIntoFullscreen(document.documentElement);
      $('#button_expand').hide(); 
      $('#button_compress').show(); 
    });

    $('#button_compress').click(function(){
      $('#fscren').html('no');
      exitFullscreen();
      $('#button_compress').hide(); 
      $('#button_expand').show(); 
    });

    $('#button_speed').click(function(){
      default_wpm = parseInt($('#count_wpm').html());
      if (default_wpm < 1000) {
        $('#count_wpm').html(default_wpm + 50); 
        default_wpm = parseInt($('#count_wpm').html());
        wpm_no = parseInt($('#count_wpm').html());
        changeWPM(wpm_no);
      }
    });

    $('#button_slow').click(function(){
      default_wpm = parseInt($('#count_wpm').html());
      if (default_wpm > 100) {
        $('#count_wpm').html(default_wpm - 50); 
        wpm_no = parseInt($('#count_wpm').html());
        changeWPM(-wpm_no);
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
        $('#button_play').click(); 
      }
      reader.readAsText(file);	
    }

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      $('#info_file_name').html(f.name);
    }



  });

$(document).keydown(function(event){

  if(event.keyCode == 32){  //prev Space
      if (eState == STATE.Paused) {
        $('#button_play').click(); 
      }
      else{
        $('#button_pause').click(); 
      }
  }

  if(event.keyCode == 74){  //prev J
        $('#button_speed').click(); 
  }

  if(event.keyCode == 75){  //prev K
        $('#button_slow').click(); 
  }

  if(event.keyCode == 70){  //prev F
      fscr = $('#fscren').html();
      if (fscr == "no") {
        $('#button_expand').click();
      }
      else{
        $('#button_compress').click();
      }
  }

  if(event.keyCode == 79){  //prev O
      $('#button_input_file').click(); 
  }

});


});
