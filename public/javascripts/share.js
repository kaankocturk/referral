'use strict';

$(document).ready(initialize);

function initialize(){
  var em = localStorage.getItem('email');
  var url = localStorage.getItem('url');
  var id = localStorage.getItem('id');
  shareUrl(url, id);
  tracker(em);
  $('div#nav').on('click', function(){
    location.href = '/home';
  });
}

function shareView(){
  $('body').css('background-image', 'none');
  $('body').css('color', 'black');
  $('#ss').text('Sana özel linki paylaş, e-postasını bırakan her arkadaşınla Groop ayrıcalıklarına sahip ol.');
  $("#davet").text('PAYLAŞ VE KAZAN!');
}

function shareUrl(u, i){
  shareView();
  var a = u.split('/')[3];
  var b = u.split('/')[2];
  // var uri = '<p>'+ u + '</p>';
  var fbsrc = "https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2F"+b+"%2F"+a+"&layout=button&size=large&mobile_iframe=true&width=73&height=28&appId";
  var fb = '<iframe id="iframe" src="" width="73" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'
  var tw = '<a href="https://twitter.com/share" class="twitter-share-button" data-url='+ u +  ' data-hashtags="groopapp" data-show-count="false" data-size="large"></a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
  document.getElementById("sharelink").value = u;
  $('#fb').append(fb);
  document.getElementById("iframe").src = fbsrc;
  $('#tw').append(tw);
}

function tracker(ema){
    $.get('/users/'+ ema).success(function(data){
    if(data.count>15){
      var c = 15;
    }else{
      var c = data.count;
    }
    var x = (c*10/1.5).toString();
    if(c){
      var y = c.toString();
    }
    if(c!= 0){
      $('#asayisi').text('Katılan arkadaş sayısı: ' + y);
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
