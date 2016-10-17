'use strict';

$(document).ready(init);

function init(){
  if(localStorage.getItem('email')) {
    location.href = '/share';
  }else{
    $('form').on('submit', getUser);
  }
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
}

function getUser(e){
  e.preventDefault();
  $.post('/users', {email: $('input#email').val(), count: 0})
  .success(function(data){
    if(data=='registered'){
      alert('Bu email zaten kayitli');
    }else{
      var uid = window.location.pathname;
      if(uid.length>1){
        var referrer = uid.slice(1,uid.length);
        var loc = window.location.href;
        var uri = loc.replace(uid,'/');
        var url = (uri + data._id);
        $.post('/users/referral', {_id: referrer})
        .success(function(info){
        })
        .fail(function(error){
        });
      }else{
        var url = window.location.href + data._id;
      }
      localStorage.setItem('email', data.email);
      localStorage.setItem('url', url);
      localStorage.setItem('id', data._id);
      location.href = '/share';
    }
  })
  .fail(function(error){
    });
}
