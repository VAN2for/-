//main.js

//头像上传

var file=document.getElementById("file");
var portrait1=document.getElementById("portrait1");
file.onclick=function()
{   
    $('.wrapper').removeClass('hiddle');
}




$(function () {
  'use strict';
  var $image = $('#image');
  var $download = $('#download');

  var options = {
      viewMode:1,
      aspectRatio: 1 /1,//设置裁切框的宽高比。默认情况下，裁剪框是自由比例。
      preview: '.img-preview',
      crop: function (e) {
      }
  };
  // 初始化函数
  $image.cropper(options);
  $image.cropper({
      built: function () {
      }
  });

  // 移动函数
  $('#move_container .btn').click(function (event) {
      event.stopPropagation();
      var dataMovex = parseInt($(this).attr('data-movex'));
      var dataMovey = parseInt($(this).attr('data-movey'));
      $image.cropper('move', dataMovex, dataMovey)
  });

  // 移动函数
  $('#move_container .btn').click(function (event) {
      event.stopPropagation();
      var dataMovex = parseInt($(this).attr('data-movex'));
      var dataMovey = parseInt($(this).attr('data-movey'));
      $image.cropper('move', dataMovex, dataMovey)
  });

  // Keyboard
  $(document.body).on('keydown', function (e) {
      if (!$image.data('cropper') || this.scrollTop > 300) {
          return;
      }
      switch (e.which) {
          case 37:
              e.preventDefault();
              $image.cropper('move', -1, 0);
              break;

          case 38:
              e.preventDefault();
              $image.cropper('move', 0, -1);
              break;

          case 39:
              e.preventDefault();
              $image.cropper('move', 1, 0);
              break;

          case 40:
              e.preventDefault();
              $image.cropper('move', 0, 1);
              break;
      }

  });
  // 放大缩小
  $('#zoom_container .btn').click(function (event) {
      event.stopPropagation();
      var dataZoom = $(this).attr('data-zoom');
      $image.cropper('zoom', dataZoom);
  });
  // 旋转
  $('#rotate_container .btn').click(function (event) {
      event.stopPropagation();
      var dataRotate = $(this).attr('data-rotate');
      $image.cropper('rotate', dataRotate);
  });
  // 翻转
  var scalexVal = 1;
  var scaleyVal = 1;
  $('#scale_container .btn').click(function (event) {
      event.stopPropagation();
      var dataScale = $(this).attr('data-scale');
      if (dataScale == 'x') {
          scalexVal = -scalexVal;
          $image.cropper('scaleX', scalexVal);
      } else if (dataScale == 'y') {
          scaleyVal = -scaleyVal;
          $image.cropper('scaleY', scaleyVal);
      }
  });


  // destroy()：销毁剪裁函数。
  $('#destroy').click(function (event) {
      event.stopPropagation();
      $image.cropper('destroy');
  });
  //上传图片
  $('#upload').change(function (event) {
      var files = this.files;
      if (files && files.length) {
          var file = files[0];
          if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
              var uploadedImageURL = window.URL.createObjectURL(file);
              $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
              $download.attr('download', uploadedImageURL);
              $('#upload').val('');
          } else {
              alert('请选择正确的图片格式！');
          }
      }
  });
  //修改图片地址
  var imgUrl = 'images/picture.jpg';
  $('#replace').click(function (event) {
      event.stopPropagation();
      imgUrl = (imgUrl == 'images/picture_new.jpg' ? 'images/picture.jpg' : 'images/picture_new.jpg');
      $image.cropper('replace', imgUrl);
      $download.attr('download', imgUrl);
  });
  // 输出裁剪好的图片
  $('#getCroppedCanvas').click(function (event) {
      event.stopPropagation();
      var imgurl = $image.cropper("getCroppedCanvas");
      $("#canvas").html(imgurl);
      $download.attr('href', imgurl.toDataURL());
      $('.fixed-canvas').removeClass('hiddle');

  });
  $('#check_true').click(function(event)
  {
      event.stopPropagation();
      var imgurl = $image.cropper("getCroppedCanvas");
      $("#canvas").html(imgurl);
     var portrait1=document.getElementById('portrait1');
     var obj_temp=imgurl.toDataURL();
     alert("上传成功")
     $(portrait1).attr('src',obj_temp);
     $('.wrapper').addClass('hiddle');
     
     
  })



  $('#cancel').click(function(event)
  {
      $('.wrapper').addClass('hiddle');
  })

  //点击取消或者下载之后
  $('#modal_canvas_btn .btn').click(function (event) {
      $('.fixed-canvas').addClass('hiddle');
  });
  // 获取数据
  $('#getData').click(function (event) {
      event.stopPropagation();
      var getData = $image.cropper("getData")
      console.log(getData);
  });



});

function destory() {
  $image.cropper('destroy').cropper(options);
}

//m,n为正整数的分子和分母
function reductionTo(m, n) {
  var arr = [];
  if (!isInteger(m) || !isInteger(n)) {
      // console.log('m和n必须为整数');
      arr[0] = 0;
      arr[1] = 0;
      return arr;
  } else if (m <= 0 || n <= 0) {
      // console.log('m和n必须大于0');
      arr[0] = 0;
      arr[1] = 0;
      return arr;
  }
  var a = m;
  var b = n;
  (a >= b) ? (a = m, b = n) : (a = n, b = m);
  if (m != 1 && n != 1) {
      for (var i = b; i >= 2; i--) {
          if (m % i == 0 && n % i == 0) {
              m = m / i;
              n = n / i;
          }
      }
  }
  arr[0] = m;
  arr[1] = n;
  return arr;
}

//判断一个数是否为整数
function isInteger(obj) {
  return obj % 1 === 0
};



