'use strict';

$(document).ready(init);
var $top;

function init(){
  $('p#gizlilik, li#giz').on('click', function(){
    $('#mgizlilik').modal('show');
  });
  $('p#basin, li#bas').on('click', function(){
    $('#mbasin').modal('show');
  });
  $('button#hur').on('click', function(){
    window.open('http://www.hurriyet.com.tr/whatsappa-turk-rakip-40212007', '_blank');
  });
  $('button#razzi').on('click', function(){
    window.open('http://webrazzi.com/2016/07/28/hakan-basin-yatirimcisi-oldugu-groop-iddiali-bir-sosyal-chat-uygulamasi/', '_blank');
  });
  if(localStorage.getItem('email')) {
    var em = localStorage.getItem('email');
    tracker(em);
  }else{
    $top = $('#top').detach();
    $("#reward, nav").css('visibility','hidden');
    $('form').on('submit', getUser);
  }
}

function getUser(e){
  e.preventDefault();
  $.post('/users', {email: $('input#email').val(), count: 0})
  .success(function(data){
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
    shareUrl(url, data._id);
    })
  .fail(function(error){
    });
}

function shareView(){
  $('body').css('background-image', 'none');
  $('body').css('color', 'black');
  $('#mid, #g1, #foot, #g2').remove();
  $("#reward, nav").css('visibility','visible');
  $('#ss').text('Sana özel linki paylaş, e-postasını bırakan her arkadaşınla Groop ayrıcalıklarına sahip ol.');
  $('#blockcontent').prepend($top);
  $("#davet").text('PAYLAŞ VE KAZAN!');
}

function shareUrl(u, i){
  shareView();
  var a = u.split('/')[3];
  var b = u.split('/')[2];
  var uri = '<p>'+ u + '</p>';
  var fbsrc = "https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2F"+b+"%2F"+a+"&layout=button&size=large&mobile_iframe=true&width=73&height=28&appId";
  var fb = '<iframe id="iframe" src="" width="73" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'
  var tw = '<a href="https://twitter.com/share" class="twitter-share-button" data-url='+ u +  ' data-hashtags="groopapp" data-show-count="false" data-size="large"></a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
  document.getElementById("sharelink").value = u;
  $('#fb').append(fb);
  document.getElementById("iframe").src = fbsrc;
  $('#tw').append(tw);
}

function tracker(ema){
    shareView();
    $.get('/users/'+ ema).success(function(data){
    console.log(data);
    var urp = window.location.href + data._id;
    shareUrl(urp,data._id);
    if(data.count>15){
      var c = 15;
    }else{
      var c = data.count;
    }
    var x = (c*10/1.5).toString()
    if(c!= 0){
      $('#pr').attr('aria-valuenow', x);
      $('#pr').attr('style', 'width:'+x+'%');
      if(c>=5){
        $('#five').removeClass('btn-default');
        $('#five').addClass('btn-success');
        $('#bes').addClass('glyphicon-ok');
      }
      if(c>=10){
        $('#ten').removeClass('btn-default');
        $('#ten').addClass('btn-success');
        $('#on').addClass('glyphicon-ok');
      }
      if(c==15){
        $('#fifteen').removeClass('btn-default');
        $('#fifteen').addClass('btn-success');
        $('#onbes').addClass('glyphicon-ok');
      }
    }
  })
  .fail(function(err) {
  });
}
