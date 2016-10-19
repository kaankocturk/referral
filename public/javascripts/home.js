'use strict';

$(document).ready(init);

function init(){
  $('button#btracker').on('click', function(){
    location.href = '/share';
  });
  $('p#gizlilik').on('click', function(){
    location.href = '/privacy';
  });
  $('p#basin').on('click', function(){
    $('#mbasin').modal('show');
  });
  $('button#hur').on('click', function(){
    window.open('http://www.hurriyet.com.tr/whatsappa-turk-rakip-40212007', '_blank');
  });
  $('button#razzi').on('click', function(){
    window.open('http://webrazzi.com/2016/07/28/hakan-basin-yatirimcisi-oldugu-groop-iddiali-bir-sosyal-chat-uygulamasi/', '_blank');
  });
  $('p#ulasim').on('click', function(){
    window.open('mailto:test@example.com');
  });
  $('#foot').css('margin-top', '40vh');
}
