/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-undef */



var x = 0

// 自我介绍在基本资料的开关
layui.use('form', function () {
  var form = layui.form
  form.on('switch(self1)', function (data) {
    console.log(data.elem) // 得到checkbox原始DOM对象
    console.log(data.elem.checked) // 开关是否开启，true或者false
    console.log(data.value) // 开关value值，也可以通过data.elem.value得到
    console.log(data.othis) // 得到美化后的DOM对象
    if (data.elem.checked == true) {
      x++
      var oself = document.createElement('textarea')
      $(oself).attr('required', '')
      $(oself).attr('lay-verify', 'required')
      oself.setAttribute('placeholder', '请输入')
      oself.setAttribute('class', 'layui-textarea')
      oself.setAttribute('id', `basic${8 + x}`)
      $('.introduction').append(oself)
      $(this).siblings().attr('disabled', '')
      var div = document.createElement('div')
      $(div).addClass('self_I_1')
      $(div).attr('style', 'order:1;')
      $(div).html(`<p class="Basic"id="Basic_${8 + x}"style="position: relative;margin:0px;float:left">自我介绍：</p>
    <p class="Basica"id="Basic${8 + x}"style="position: relative;margin-top:0px;width: 180px;" ></p>`)
      $('.last_item1').siblings().last().after(div)
      $(function () {
        for (let i = 1; i <= 8 + x; i++) {
          $(`#basic${i}`).on('input propertychange', function () {
            var a = $(`#basic${i}`).val()
            if (a == '') {
              $(`#Basic${i}`).css('display', 'none')
              $(`#Basic_${i}`).css('display', 'none')
            } else {
              $(`#Basic${i}`).css('display', 'inline-block')
              $(`#Basic_${i}`).css('display', 'inline-block')
            }
            $(`#Basic${i}`).html(a)
          })
        }
      })
    }
    if (data.elem.checked == false) {
      $('.self_I_1').remove()
      x--
      $('.introduction').children().remove()
      $(this).siblings().removeAttr('disabled')
    }
  })
})
// 自我介绍在详细内容的开关
layui.use('form', function () {
  var form = layui.form
  form.on('switch(self2)', function (data) {
    console.log(data.elem) // 得到checkbox原始DOM对象
    console.log(data.elem.checked) // 开关是否开启，true或者false
    console.log(data.value) // 开关value值，也可以通过data.elem.value得到
    console.log(data.othis) // 得到美化后的DOM对象
    if (data.elem.checked == true) {
      var oself = document.createElement('textarea')
      $(oself).attr('required', '')
      $(oself).attr('lay-verify', 'required')
      oself.setAttribute('placeholder', '请输入')
      oself.setAttribute('class', 'layui-textarea')
      $('.introduction').append(oself)
      $(this).siblings().attr('disabled', '')

      var div = document.createElement('div')
      $(div).addClass('father_detail')
      $(div).css('order', '8')
      $(div).html(`<h1 class="Detail1 title" style = "background-color: rgb(89, 119, 85);margin-bottom:2px;">自我介绍</h1><p class ="Detail description" style="font_size:18pt"></p>`)
      $('.Detail_content').append(div)
      $(document).on('input propertychange', $('.introduction').find('.layui-textarea'), function () {
        var a = $('.introduction').find('.layui-textarea').val()
        $(`.description`).each(function () {
          if ($(this).parent().css('order') == 8) { $(this).html(a) }
        })
      })
    }
    if (data.elem.checked == false) {
      $('.introduction').children().remove()
      $(this).siblings().removeAttr('disabled')
      $('div.father_detail').each(function () { if ($(this).css('order') == 8) { $(this).remove() } })
    }
  })
})
// 头像上传
$('.push_btn').on('click', function () {
  $('#imgpush').click()
})
/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 详细内容的文本域开关
layui.use('form', function () {
  var form = layui.form
  form.on('switch(myself)', function (data) {
    console.log(data.elem) // 得到checkbox原始DOM对象
    console.log(data.elem.checked) // 开关是否开启，true或者false
    console.log(data.value) // 开关value值，也可以通过data.elem.value得到
    console.log(data.othis) // 得到美化后的DOM对象
    if (data.elem.checked == true) {
      var div = document.createElement('div')
      let z = 1
      var temp = $(this)
      $(div).html(`<div class="detail_${z}"><input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea></div><div class="last_c" style="margin-top: 5px;"><button type="button" class="layui-btn detail_add" style="margin-left: 90px;">添加内容</button><button type="button" class="layui-btn layui-btn-danger detail_del" style="margin-left: 90px;">删除内容</button></div>`)
      $(div).addClass(`detail_content`)
      $(this).parent().next().after(div)

      // 详细内容与简历区绑定
      var o = $(this).parent().parent().css('order')
      var div = document.createElement('div')

      $(div).addClass('father_detail')
      $(div).css('order', o)

      var T = $(this).parent().siblings('label').text()

      $(div).html(`<h1 class="Detail${z} title" style = "background-color: rgb(89, 119, 85);">${T}</h1><div><h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p></div>`)

      // 小标题同步
      $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('input'), function () {
        for (let i = 1; i <= z; i++) {
          var a = $(temp).parent().next().next().find(`.detail_${i}`).find('.layui-input').val()
          $(`.Detail${i}`).each(function () {
            if ($(this).hasClass('s_title') && $(this).parent().parent().css('order') == $(temp).parent().parent().css('order')) { $(this).html(a) }
          })
        }
      })

      // 内容同步
      $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('textarea'), function () {
        for (let i = 1; i <= z; i++) {
          var a = $(temp).parent().next().next().find(`.detail_${i}`).find('textarea').val()
          $(`.Detail${i}`).each(function () {
            if ($(this).hasClass('description') && $(this).parent().parent().css('order') == $(temp).parent().parent().css('order')) {
              $(this).html(a)
            }
          })
        }
      })

      $('.Detail_content').append(div)

      z++
      $(function () {
        // 详细内容下添加内容
        $(temp).parent().next().next().children('.last_c').children('.detail_add').on('click', function () {
          var div = document.createElement('div')
          $(div).addClass(`detail_${z}`)
          $(div).html('<input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>')
          $(div).attr('style', 'margin-top: 5px;')
          $(this).parent().before(div)

          var div2 = document.createElement('div')
          $(div2).html(`<h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p>`)
          $('.father_detail').each(function () {
            if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).append(div2) }
            z++
          })
        })
      })
      $(function () {
        // 详细内容下删除内容
        $(temp).parent().next().next().children('.last_c').children('.detail_del').on('click', function () {
          z--
          if (z != 1) {
            $(this).parent().siblings(`.detail_${z}`).remove()
            $('.father_detail').each(function () {
              if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).children().find(`.Detail${z}`).remove() }
            })
          } else { z++ }
        })
      })
    }
    if (data.elem.checked == false) {
      $(this).parent().next().next().remove()
      var temp = $(this)
      $('.father_detail').each(function () {
        if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).remove() }
      })
    }
  })
})
/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 详细内容的自定义文本域开关
layui.use('form', function () {
  var form = layui.form
  form.on('switch(myself2)', function (data) {
    console.log(data.elem) // 得到checkbox原始DOM对象
    console.log(data.elem.checked) // 开关是否开启，true或者false
    console.log(data.value) // 开关value值，也可以通过data.elem.value得到
    console.log(data.othis) // 得到美化后的DOM对象
    if (data.elem.checked == true) {
      var div = document.createElement('div')
      let z = 1
      var temp = $(this)
      $(div).html(`<div class="detail_${z}"><input type="text" name="title" required lay-verify="required" placeholder="请输入主标题" autocomplete="off" class="layui-input B"> </input><input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input S"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea></div><div class="last_c" style="margin-top: 5px;"><button type="button" class="layui-btn detail_add" style="margin-left: 90px;">添加内容</button><button type="button" class="layui-btn layui-btn-danger detail_del" style="margin-left: 90px;">删除内容</button></div>`)
      $(div).addClass('detail_content')
      $(this).parent().next().after(div)

      // 详细内容与简历区绑定
      var o = $(this).parent().parent().css('order')
      var div = document.createElement('div')

      $(div).addClass('father_detail')
      $(div).css('order', o)

      var T = $(this).parent().siblings('label').text()

      $(div).html(`<h1 class="Detail${z} title" style = "background-color: rgb(89, 119, 85);">${T}</h1><div><h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p></div>`)

      // 主标题同步
      $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('input'), function () {
        for (let i = 1; i <= z; i++) {
          var a = $(temp).parent().next().next().find(`.detail_${i}`).find('.B').val()
          $(`.Detail${i}`).each(function () {
            if ($(this).hasClass('title') && $(this).parent().css('order') == $(temp).parent().parent().css('order')) { $(this).html(a) }
          })
        }
      })
      // 小标题同步
      $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('input'), function () {
        for (let i = 1; i <= z; i++) {
          var a = $(temp).parent().next().next().find(`.detail_${i}`).find('.S').val()
          $(`.Detail${i}`).each(function () {
            if ($(this).hasClass('s_title') && $(this).parent().parent().css('order') == $(temp).parent().parent().css('order')) { $(this).html(a) }
          })
        }
      })

      // 内容同步
      $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('textarea'), function () {
        for (let i = 1; i <= z; i++) {
          var a = $(temp).parent().next().next().find(`.detail_${i}`).find('textarea').val()
          $(`.Detail${i}`).each(function () {
            if ($(this).hasClass('description') && $(this).parent().parent().css('order') == $(temp).parent().parent().css('order')) {
              $(this).html(a)
            }
          })
        }
      })

      $('.Detail_content').append(div)

      z++

      $(function () {
        // 详细内容下添加内容
        $(temp).parent().next().next().children('.last_c').children('.detail_add').on('click', function () {
          var div = document.createElement('div')
          $(div).addClass(`detail_${z}`)
          $(div).html('<input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input S"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>')
          $(div).attr('style', 'margin-top: 5px;')
          $(this).parent().before(div)

          var div2 = document.createElement('div')
          $(div2).html(`<h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p>`)
          $('.father_detail').each(function () {
            if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).append(div2) }
            z++
          })
        })
      })
      $(function () {
        // 详细内容下删除内容
        $(temp).parent().next().next().children('.last_c').children('.detail_del').on('click', function () {
          z--
          if (z != 1) {
            $(this).parent().siblings(`.detail_${z}`).remove()
            $('.father_detail').each(function () {
              if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).children().find(`.Detail${z}`).remove() }
            })
          } else { z++ }
        })
      })
    }
    if (data.elem.checked == false) {
      $(this).parent().next().next().remove()
      var temp = $(this)
      $('.father_detail').each(function () {
        if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).remove() }
      })
    }
    /*  $(temp).parent().next().next().children('.last_c').children('.detail_add').on('click',function(){
          //详细内容下添加内容
          var div=document.createElement("div");
          $(div).addClass(`detail_${z}`);
          $(div).html('<input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>');
          $(div).attr("style","margin-top: 5px;");
          $(this).parent().before(div);
          z++;
        })
      $(function(){
        //详细内容下删除内容
        $(temp).parent().next().next().children('.last_c').children('.detail_del').on('click',function(){
          z--;
          if(z!=1)
          {
          $(this).parent().siblings(`.detail_${z}`).remove();
          }
          else
          z++;
        })
      })
      }
        if(data.elem.checked==false){
          $(this).parent().next().next().remove();
          } */
  })
})
/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 详细内容的上下按钮
$('.up').on('click', function () {
  var temp = $(this)
  var b = $(temp).parent().parent().css('order')
  var c = b - 1
  var temp2
  if (c != -1) {
    $('div.father_detail').siblings().each(function () {
      if ($(this).css('order') == b) {
        temp2 = $(this)
      }
      if ($(this).css('order') == c) {
        $(this).css('order', b)
      }
    })
    $(temp2).css('order', c)
  }

  if (c != -1) {
    $(temp).parent().parent().siblings().each(function () {
      if ($(this).css('order') == c) {
        $(this).css('order', b)
      }
    })
    $(temp).parent().parent().css('order', c)
  }
}
)

$('.down').on('click', function () {
  var tem = $(this)
  var e = $(tem).parent().parent().css('order')
  var f = e
  f++

  var temp2
  if (f != 8) {
    $('div.father_detail').siblings().each(function () {
      if ($(this).css('order') == e) {
        temp2 = $(this)
      }
      if ($(this).css('order') == f) {
        $(this).css('order', e)
      }
    })
    $(temp2).css('order', f)
  }
  if (f != 8) {
    $(tem).parent().parent().siblings().each(function () {
      if ($(this).css('order') == f) {
        $(this).css('order', e)
      }
    })
    $(tem).parent().parent().css('order', f)
  }
}
)

var a = 1
// 根据导航栏返回下面显示的内容
var btns = document.getElementsByClassName('layui-nav-item')
var contents = document.getElementsByClassName('content')
for (var i = 0; i < btns.length; i++) {
  btns[i].index = i
  btns[i].onclick = function () {
    for (var j = 0; j < btns.length; j++) {
      contents[j].className = contents[j].className.replace(' show', '').trim()
    }
    contents[this.index].className = contents[this.index].className + ' show'
  }
}

// 向左向右箭头改变导航栏页数
$('.btn1').click(function () { $('.page').removeClass('show'); $(this).parent().siblings().addClass('show') })

// 风格切换
$('.theme.b').on('click', function () {
  $('.Basic_content').addClass('Simplicity')
  $('.Basica').addClass('Simplicity')
  $('.Basic').addClass('Simplicity')
  $('.title').addClass('Simplicity')
  $('#writing').addClass('Simplicity')
  $('.vertical_Basic_content').addClass('Simplicity')
  $('#vertical_writing').addClass('Simplicity')
})
$('.theme.a').on('click', function () {
  $('.Basic_content').removeClass('Simplicity')
  $('.Basica').removeClass('Simplicity')
  $('.Basic').removeClass('Simplicity')
  $('.title').removeClass('Simplicity')
  $('#writing').removeClass('Simplicity')
  $('.vertical_Basic_content').removeClass('Simplicity')
  $('#vertical_writing').removeClass('Simplicity')
})

// 导入图标库
for (let i = 1; i < 67; i++) {
  var oImg = new Image()
  oImg.src = `img/icon/icon (${i}).svg`
  oImg.className = 'icon'
  $('.IconArea').append(oImg)
}
for (let i = 1; i < 67; i++) {
  var oImg = new Image()
  oImg.src = `img/icon/icon (${i}).svg`
  oImg.className = 'icon'
  $('.IconArea2').append(oImg)
}
// 导入样式库
for (let i = 1; i < 67; i++) {
  var oImg = new Image()
  oImg.src = `img/icon/icon (${i}).svg`
  oImg.className = 'icon'
  $('.StyleArea').append(oImg)
}

// 主题调色
var color = document.getElementById('color') // 通过使用 getElementById() 来访问 <color> 元素

function changeColor () { // 改变颜色的事件
  $('.Basic_content').css('background-color', color.value)
  $('.title').css('background-color', color.value)
  $('.vertical_Basic_content').css('background-color', color.value)
}

// 工作区基本资料放到简历区
$(function () {
  // 增删自定义信息
  $('.add').click(function () {
    x++
    var ocustom = document.createElement('input')
    ocustom.setAttribute('type', 'text')
    ocustom.setAttribute('class', 'basic_content custom')
    ocustom.setAttribute('placeholder', '自定义信息（xxx：xxx）')
    ocustom.setAttribute('id', `basic${8 + x}`)
    $('.Custom').append(ocustom)
    var div = document.createElement('div')
    $(div).addClass('ADD')
    $(div).html(`<p class="Basica"id="Basic${8 + x}"></p>`)
    $('.last_item1').siblings().last().after(div)
  })
  $('.del').click(function () {
    $('.Custom :last').remove()
    if ($('.last_item1').siblings().last().hasClass('ADD')) {
      $('.last_item1').siblings().last().remove()
      x--
    }
  })
  $('.add').on('click', function () {
    for (let i = 1; i <= 8 + x; i++) {
      $(`#basic${i}`).on('input propertychange', function () {
        var a = $(`#basic${i}`).val()
        if (a == '') {
          $(`#Basic${i}`).css('display', 'none')
          $(`#Basic_${i}`).css('display', 'none')
        } else {
          $(`#Basic${i}`).css('display', 'inline-block')
          $(`#Basic_${i}`).css('display', 'inline-block')
        }
        $(`#Basic${i}`).html(a)
      })
    }
  })
})

for (let i = 1; i <= 8 + x; i++) {
  $(`#basic${i}`).on('input propertychange', function () {
    var a = $(`#basic${i}`).val()
    if (a == '') {
      $(`#Basic${i}`).css('display', 'none')
      $(`#Basic_${i}`).css('display', 'none')
    } else {
      $(`#Basic${i}`).css('display', 'inline-block')
      $(`#Basic_${i}`).css('display', 'inline-block')
    }
    $(`#Basic${i}`).html(a)
  })
}

layui.use('form', function () {
  var form = layui.form
  form.on('switch(V_and_h)', function (data) {
    console.log(data.elem) // 得到checkbox原始DOM对象
    console.log(data.elem.checked) // 开关是否开启，true或者false
    console.log(data.value) // 开关value值，也可以通过data.elem.value得到
    console.log(data.othis) // 得到美化后的DOM对象
    if (data.elem.checked == true) {
      var resume = document.getElementsByClassName('resume')
      resume[0].className = 'vertical_resume'
      var Basic_content = document.getElementsByClassName('Basic_content')
      Basic_content[0].className = 'vertical_Basic_content'
      document.getElementById('father_Basic').id = 'vertical_father_Basic'
      document.getElementById('connect').id = 'vertical_connect'

      document.getElementById('writing').id = 'vertical_writing'
      $('#Basic1').css('left', '55%')
      $('.save_img').attr('class', 'layui-btn save_V_img')
    }

    if (data.elem.checked == false) {
      var vertical_resume = document.getElementsByClassName('vertical_resume')
      vertical_resume[0].className = 'resume'
      var vertical_Basic_content = document.getElementsByClassName('vertical_Basic_content')
      vertical_Basic_content[0].className = 'Basic_content'
      document.getElementById('vertical_father_Basic').id = 'father_Basic'
      document.getElementById('vertical_writing').id = 'writing'
      document.getElementById('vertical_connect').id = 'connect'
      $('#Basic1').css('left', '33%')

      $('.save_V_img').attr('class', 'layui-btn save_img')
    }
  })
})

/* function printme () {
  var headstr = '<html><head><title></title></head><body>' // 打印头部
  var footstr = '</body></html>' // 打印尾部
  var printData = document.getElementById('frame').innerHTML // 获得 div 里的所有 html 数据
  var oldstr = document.body.innerHTML
  document.body.innerHTML = headstr + printData + footstr
  window.print();
  document.body.innerHTML = oldstr;

  /* var obj = document.getElementById('frame')
  var new_iframe = document.createElement('IFRAME')
  var doc = null
  new_iframe.setAttribute('style', 'width:0px;height:0px;position:absolute;left:-2000px;top:-2000px;')
  new_iframe.setAttribute('align', 'center')
  document.body.appendChild(new_iframe)
  doc = new_iframe.contentWindow.document
  var head = doc.getElementsByTagName('head')
  var linkTag = document.createElement('link')
  linkTag.href = './style.css'
  linkTag.setAttribute('rel', 'stylesheet')
  linkTag.setAttribute('type', 'text/css')
  $(head).append(linkTag)
  doc.write(obj.innerHTML)
  doc.close()
  new_iframe.contentWindow.print()
  document.body.removeChild(iframe) */

  $(document).on('click', '.save_img', function () {

    var resume = document.getElementById('frame').innerHTML
    var headstr = '<html><head><title></title><link rel="stylesheet" href="print2.css"><link rel="stylesheet" href="layui-v2.6.8/layui/css/layui.css" media="all"></head><body style="margin:0">' // 打印头部
    var footstr = '</body></html>' // 打印尾部
    // 准备文件内容和文件名
    var change=$('.resume').position().left
    var text = headstr + resume
    $('.box0').each(function(i){
     var div=document.createElement('div')
     let temp=$(this).clone()
     let left=$(temp).css('left')
     left=parseInt(left) 
     let end=left-change
     $(temp).addClass('temp')
     $(temp).css('left',end)
     text=text+temp
     $(div).append(temp)
     var dtemp=div.innerHTML
     text=text+dtemp
     $(div).remove
    })
    text+=footstr
    new QWebChannel(qt.webChannelTransport, function (channel) {
        //Get Qt interact object
        var JsInterfaceObj = channel.objects.QTWindow;

        //Web send message to Qt
        JsInterfaceObj.preview(text);
    });
  })
  /* var resume = document.getElementById('frame').innerHTML
  var headstr = '<html><head><title></title><link rel="stylesheet" href="print2.css"><link rel="stylesheet" href="layui-v2.6.8/layui/css/layui.css" media="all"></head><body style="margin:0">' // 打印头部
  var footstr = '</body></html>' // 打印尾部
  // 准备文件内容和文件名
  text = headstr+resume+footstr */
  /* var element = document.createElement('a')
  element.setAttribute('href', './新建文本文档.html')
  element.click() */

  /* filename = 'hhh.html'

  // 建立一个新的属性
  var element = document.createElement('a')

  // 属性一 设置字符集并且转码
  // 属性二 添加download按钮
  element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  // 元素隐藏 并追加到document中
  element.style.display = 'none'
  document.body.appendChild(element)

  // 点击事件
  element.click()

  // 移除元素
  document.body.removeChild(element) */


  /* downloadTextFile(text) */

$(document).on('click', '.save_V_img', function () { 
  var resume = document.getElementById('frame').innerHTML
    var headstr = '<html><head><title></title><link rel="stylesheet" href="print2.css"><link rel="stylesheet" href="layui-v2.6.8/layui/css/layui.css" media="all"></head><body style="margin:0">' // 打印头部
    var footstr = '</body></html>' // 打印尾部
    // 准备文件内容和文件名
    var change=$('.resume').position().left
    var text = headstr + resume
    $('.box0').each(function(i){
     var div=document.createElement('div')
     let temp=$(this).clone()
     let left=$(temp).css('left')
     left=parseInt(left) 
     let end=left-change
     $(temp).addClass('temp')
     $(temp).css('left',end)
     text=text+temp
     $(div).append(temp)
     var dtemp=div.innerHTML
     text=text+dtemp
     $(div).remove
    })
    text+=footstr
    new QWebChannel(qt.webChannelTransport, function (channel) {
        //Get Qt interact object
        var JsInterfaceObj = channel.objects.QTWindow;

        //Web send message to Qt
        JsInterfaceObj.preview(text);
    });
  })

/* function qt_print(pD=printData){
  return pD
} */

/* $(document).on('click',".save_img",function(){$('.resume').jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: false//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        })})
        $(document).on('click',".save_V_img",function(){$('.vertical_resume').jqprint({
          debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
          importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
          printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
          operaSupport: false//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        })}) */

/* $(function() {
  $( ".custom" ).on("input",function (){
  var value = $(this).val();
  if(value!=''){
  var ocustom = new Input();
  ocustom.setAttribute("type", "text");
  ocustom.setAttribute("class", "basic_content custom Add");
  ocustom.setAttribute("placeholder", "自定义信息");
  $(this).after(ocustom);
  $(this).removeClass("custom")
}
  if($('.custom.Add').val()==""){
    $(".custom.Add").next().remove();
}})})
 */
/* $(".basic_content").hover(function(){
  $(this).css("border-bottom-color","#5fb878");
  },
  function(){
    $(this).css("border-bottom-color","#000000");
  }) */
/* $(".basic_content").checked( function () {
  $(this).css("border-bottom-color","#5fb878");
} ); */

/* //构建复制函数
          function funx(obj)
          {
            obj.onmousedown=function(event)
            {
              var box_num=obj.cloneNode(true);
              box_num.id="box"+num;
              box_num.style.cssText="position:absolute;z-index:999";

              fun(box_num);
              num++;

            }
          } */

$('.loadJson').on('click', function () {
  /*
{"name":"撒地方","searchFor":"自行车","sex":"啊啊","age":"的萨芬","college":"现场v","major":"和","email":"二点","phone":" 士大夫","addInfo":["aasdf"],"details":{"工作经历":{"detail_1":{"title":"asdf","content":"asdf"},"detail_2":{"title":"asdf","content":"asdfsdf"},"detail_3":{"title":"as","content":"sddf"}},"项目经历":{"detail_1":{"title":"asdf","content":"asdfasfdasdf"},"detail_2":{"title":"asdf","content":"asdfasdf"}},"掌握技能":{},"教育背景":{},"校园经历":{},"技能特长":{},"荣誉证书":{},"自定义模块":{}},"introduction":""}

*/
  /*
  var index = 2;
  //搞到分享码 然后下载下来 （未考虑数据安全问题）
  const http = new XMLHttpRequest();
  const url='http://localhost:8080/index?index=' + index;
  http.open("GET", url);
  http.onload = function() {//请求完成时调用的
    console.log(http.responseText);
    var json = JSON.parse(http.responseText);
    console.log(json);
    alert(JSON.stringify(json));
  }
  http.send();
  */
  var jsonText = document.getElementById('jsonLoad').value
  try {
    var json = JSON.parse(jsonText)

    console.log(json)

    /// //////////////////
    // 写数据
    document.getElementById('basic1').value = json.name
    document.getElementById('basic2').value = json.searchFor
    document.getElementById('basic3').value = json.sex
    document.getElementById('basic4').value = json.age
    document.getElementById('basic5').value = json.college
    document.getElementById('basic6').value = json.major
    document.getElementById('basic7').value = json.email
    document.getElementById('basic8').value = json.phone

    // 添加自己增加的信息
    // 1 生成input框框
    for (let i = 0; i < json.addInfo.length; i++) {
      x++
      var ocustom = document.createElement('input')
      ocustom.setAttribute('type', 'text')
      ocustom.setAttribute('class', 'basic_content custom')
      ocustom.setAttribute('placeholder', '自定义信息（xxx：xxx）')
      ocustom.setAttribute('id', `basic${8 + x}`)
      $('.Custom').append(ocustom)
      var div = document.createElement('div')
      $(div).addClass('ADD')
      $(div).html(`<p class="Basica"id="Basic${8 + x}"></p>`)
      $('.last_item1').siblings().last().after(div)
    }

    // 2 填入信息
    json.addInfo.forEach(function (item, index) {
      var id = `basic${8 + index + 1}`
      document.getElementById(id).value = item
    })
    // 3 同步
    for (let i = 1; i <= 8 + x; i++) {
      var a = $(`#basic${i}`).val()
      if (a == '') {
        $(`#Basic${i}`).css('display', 'none')
        $(`#Basic_${i}`).css('display', 'none')
      } else {
        $(`#Basic${i}`).css('display', 'inline-block')
        $(`#Basic_${i}`).css('display', 'inline-block')
      }
      $(`#Basic${i}`).html(a)
    }

    /// /////////////////////////////
    // 详细内容
    /* {"name":"name","searchFor":"aaa","sex":"bbb","age":"ccc","college":"ddd","major":"eee","email":"fff","phone":"ggg","addInfo":["hhh","iii","jjj","kkkk"],"details":{"工作经历":{"detail_1":{"title":"asd","content":"asd"},"detail_2":{"title":"zzz","content":"zzz"}},"项目经历":{"detail_1":{"title":"qwe","content":"qwe"},"detail_2":{"title":"aaa","content":"aaa"}},"掌握技能":{"detail_1":{"title":"qqq","content":"qqq"},"detail_2":{"title":"www","content":"www"}},"教育背景":{"detail_1":{"title":"ttt","content":"yyy"},"detail_2":{"title":"tyty","content":"tyty"}},"校园经历":{"detail_1":{"title":"uuu","content":"uiiik"},"detail_2":{"title":"sgfh","content":"sss"}},"技能特长":{"detail_1":{"title":"ser","content":"sdfgdsfg"},"detail_2":{"title":"wwfgds","content":"jhjn"}},"荣誉证书":{},"自定义模块":{}},"introduction":"cvxcv"}

    */
    var det = document.getElementById('details').getElementsByClassName('layui-form-item detail')
    syncData('工作经历', 'worked', det[0], json, 0)
    syncData('项目经历', 'projected', det[1], json, 1)
    syncData('掌握技能', 'talented', det[2], json, 2)
    syncData('教育背景', 'educated', det[3], json, 3)
    syncData('校园经历', 'campaigned', det[4], json, 4)
    syncData('技能特长', 'goodat', det[5], json, 5)
    syncData('荣誉证书', 'certificated', det[6], json, 6)
  } catch (error) {
    alert('请输入正确的JSON格式')
  }

  layui.form.render() // 这句必须（用来更新渲染页面）
}
)

$('.saveJson').on('click', function () {
  var json = {}
  /// /////////////////////
  // 获取基础信息
  json.name = document.getElementById('basic1').value
  json.searchFor = document.getElementById('basic2').value
  json.sex = document.getElementById('basic3').value
  json.age = document.getElementById('basic4').value
  json.college = document.getElementById('basic5').value
  json.major = document.getElementById('basic6').value
  json.email = document.getElementById('basic7').value
  json.phone = document.getElementById('basic8').value

  // 获取基础信息的自定义信息
  var addInfoList = document.getElementById('father_Basic').getElementsByClassName('ADD')

  var addInfo = []
  for (var i = 0; i < addInfoList.length; i++) {
    var addInfoItem = addInfoList[i]
    addInfo.push(addInfoItem.getElementsByClassName('Basica')[0].innerHTML)
  }

  json['addInfo'] = addInfo
  /// ///////////////////
  // 获取详细信息
  var det = document.getElementById('details')
  var detList = det.getElementsByClassName('layui-form-item detail')

  var detailsJson = {}
  for (var i = 0; i < detList.length; i++) {
    var detItem = detList[i]
    var subJson = {}

    try {
      var j = 1
      while (true) {
        var shortJson = {}
        var title = detItem.getElementsByClassName('detail_' + j)[0].getElementsByClassName('layui-input')[0].value
        var content = detItem.getElementsByClassName('detail_' + j)[0].getElementsByClassName('layui-textarea')[0].value

        shortJson['title'] = title
        shortJson['content'] = content

        subJson['detail_' + j] = shortJson
        j++
      }
    } catch (error) {

    }

    detailsJson[detItem.getElementsByClassName('layui-form-label')[0].innerHTML] = subJson
  }
  json['details'] = detailsJson

  /// /////////////////
  // 自我介绍的获取
  json['introduction'] = ''
  try {
    json['introduction'] = document.getElementsByClassName('introduction')[0].getElementsByClassName('layui-textarea')[0].value
  } catch (error) {

  }

  /// ///////////////
  // 上传服务器


  console.log(JSON.stringify(json));
  document.getElementById("saveJsonTextarea").value = JSON.stringify(json);
  alert("生成成功，快去和其他人分享吧！");

  /*
  const http = new XMLHttpRequest();
  const url='http://localhost:8080/uploadJson?json=' + JSON.stringify(json);
  http.open("GET", url);
  http.send();

  http.onreadystatechange = (e) => {
    console.log(http.responseText);
  }
  */
}
)

function addMainTextareaInDetails (t, z) {
  var div = document.createElement('div')
  var temp = $(t)
  $(div).html(`<div class="detail_${z}"><input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea></div><div class="last_c" style="margin-top: 5px;"><button type="button" class="layui-btn detail_add" style="margin-left: 90px;">添加内容</button><button type="button" class="layui-btn layui-btn-danger detail_del" style="margin-left: 90px;">删除内容</button></div>`)
  $(div).addClass(`detail_content`)
  $(t).parent().next().after(div)

  // 详细内容与简历区绑定
  var o = $(t).parent().parent().css('order')
  var div = document.createElement('div')

  $(div).addClass('father_detail')
  $(div).css('order', o)

  var T = $(t).parent().siblings('label').text()

  $(div).html(`<h1 class="Detail${z} title" style = "background-color: rgb(89, 119, 85);">${T}</h1><div><h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p></div>`)

  // 小标题同步
  $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('input'), function () {
    for (let i = 1; i <= z; i++) {
      var a = $(temp).parent().next().next().find(`.detail_${i}`).find('.layui-input').val()
      $(`.Detail${i}`).each(function () {
        if ($(this).hasClass('s_title') && $(this).parent().parent().css('order') == $(temp).parent().parent().css('order')) { $(this).html(a) }
      })
    }
  })

  // 内容同步
  $(document).on('input propertychange', $(temp).parent().next().next().find(`.detail_${z}`).find('textarea'), function () {
    for (let i = 1; i <= z; i++) {
      var a = $(temp).parent().next().next().find(`.detail_${i}`).find('textarea').val()
      $(`.Detail${i}`).each(function () {
        if ($(this).hasClass('description') && $(this).parent().parent().css('order') == $(temp).parent().parent().css('order')) {
          $(this).html(a)
        }
      })
    }
  })

  $('.Detail_content').append(div)

  z++
  $(function () {
    // 详细内容下添加内容
    $(temp).parent().next().next().children('.last_c').children('.detail_add').on('click', function () {
      var div = document.createElement('div')
      $(div).addClass(`detail_${z}`)
      $(div).html('<input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>')
      $(div).attr('style', 'margin-top: 5px;')
      $(this).parent().before(div)

      var div2 = document.createElement('div')
      $(div2).html(`<h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p>`)
      $('.father_detail').each(function () {
        if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).append(div2) }
        z++
      })
    })
  })
  $(function () {
    // 详细内容下删除内容
    $(temp).parent().next().next().children('.last_c').children('.detail_del').on('click', function () {
      z--
      if (z != 1) {
        $(this).parent().siblings(`.detail_${z}`).remove()
        $('.father_detail').each(function () {
          if ($(this).css('order') == $(temp).parent().parent().css('order')) { $(this).children().find(`.Detail${z}`).remove() }
        })
      } else { z++ }
    })
  })
}
function addTextareaInDetails (t, z, index) {
  // 详细内容下添加内容
  var temp = $(t)
  var div = document.createElement('div')
  $(div).addClass(`detail_${z}`)
  $(div).html('<input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input S"> </input><textarea name="" required lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>')
  $(div).attr('style', 'margin-top: 5px;')
  $(t).parent().next().next().children().last().before(div)

  var div2 = document.createElement('div')
  $(div2).html(`<h2 class ="Detail${z} s_title"></h2><p class ="Detail${z} description"></p>`)
  $(document.getElementsByClassName('father_detail')[index]).append(div2)
}

function syncData (cnName, enName, det, json, index) {
  var first = true
  var t = document.getElementById(enName)

  // 在这里加框框
  var temp = $(t)
  let s = 1
  for (var key in json.details[cnName]) {
    if (first) {
      first = false
      $(`#${enName}`).prop('checked', true)
      addMainTextareaInDetails(t, s)
    } else {
      addTextareaInDetails(t, s, index)
    }
    s++
  }
  // 填数据
  layui.form.render()
  var j = 1
  for (var key in json.details[cnName]) {
    det.getElementsByClassName('detail_' + j)[0].getElementsByClassName('layui-input')[0].value = json.details[cnName][key]['title']
    det.getElementsByClassName('detail_' + j)[0].getElementsByClassName('layui-textarea')[0].value = json.details[cnName][key]['content']
    j++
  }

  // 小标题同步

  // 改右侧
  var temp = $(t)
  for (let i = 1; i <= s; i++) {
    var a = $(temp).parent().next().next().find(`.detail_${i}`).find('textarea').val()
    $(document.getElementsByClassName(`Detail${i} description`)[index]).html(a)
    a = $(temp).parent().next().next().find(`.detail_${i}`).find('input').val()
    $(document.getElementsByClassName(`Detail${i} s_title`)[index]).html(a)
  }
}




///////////////////////////////////
//拖拽图标库
var console_wrapper1=document.getElementById("console_wrapper1");
var IconArea=document.getElementById("IconArea");
var icon=document.getElementsByClassName("icon");
var check_1=0;



//实现垃圾桶功能
function del(obj)
{
  var scroll_main = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  var garbege=document.getElementById("garbege");
  let x_left=garbege.offsetLeft;
  let x_right=x_left+garbege.offsetWidth;
  let y_top=garbege.offsetTop-console_wrapper1.scrollTop+scroll_main;
  let y_button=y_top+garbege.offsetHeight;
  
  if(obj.offsetLeft>x_left && obj.offsetLeft<x_right && obj.offsetTop<y_button && obj.offsetTop>y_top)
  {
    $('#garbege').css('border-color','#ff0000');
    check_1=1;

  }
  else
  {
    $('#garbege').css('border-color','#dcdfe6');
    check_1=0;
    

  }

}



/*           btn1.onclick=function()
{
  alert(st);
} */
var num=0;
for(var i=0;i<icon.length;i++)
{
  //icon[i].style.cssText="position:relative";
  funx(icon[i]);
}

//构建复制函数
function funx(obj)
{
  obj.onmousedown=function(event)
  {
   event=event||window.event
    var a = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var box_num=obj.cloneNode(true);
    var left=obj.offsetLeft;
    var top=obj.offsetTop-IconArea.scrollTop-console_wrapper1.scrollTop+a;
    $(box_num).addClass("box"+num);
    box_num.style.cssText="position:absolute;z-index:999";
    box_num.style.left=left+"px";
    box_num.style.top=top+"px";
    document.body.appendChild(box_num);
    fun(box_num);


  }
}









function fun(obj)
{
  obj.onmousedown=function(event)
  {
    event=event||window.event;
    var ol=event.clientX-obj.offsetLeft;
    var ot=event.clientY-obj.offsetTop;

    document.onmousemove=function(event)
    {
    event=event||window.event;
    var left=event.clientX-ol;
    var top=event.clientY-ot;
    obj.style.left=left+"px";
    obj.style.top=top+"px";
    del(obj);


    document.onmouseup=function()
    {     
      document.onmousemove=null;
      if(check_1==1)
      {
        obj.parentNode.removeChild(obj);
        $('#garbege').css('border-color','#dcdfe6');
        
      }
  
      document.onmouseup=null;
    }
    return false;
  }
}
}


//写文件
var saveAs = saveAs || (function(view) {
  "use strict";
  // IE <10 is explicitly unsupported
  if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
      return;
  }
  var
        doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
      , get_URL = function() {
          return view.URL || view.webkitURL || view;
      }
      , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
      , can_use_save_link = "download" in save_link
      , click = function(node) {
          var event = new MouseEvent("click");
          node.dispatchEvent(event);
      }
      , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
      , is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
      , throw_outside = function(ex) {
          (view.setImmediate || view.setTimeout)(function() {
              throw ex;
          }, 0);
      }
      , force_saveable_type = "application/octet-stream"
      // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
      , arbitrary_revoke_timeout = 1000 * 40 // in ms
      , revoke = function(file) {
          var revoker = function() {
              if (typeof file === "string") { // file is an object URL
                  get_URL().revokeObjectURL(file);
              } else { // file is a File
                  file.remove();
              }
          };
          setTimeout(revoker, arbitrary_revoke_timeout);
      }
      , dispatch = function(filesaver, event_types, event) {
          event_types = [].concat(event_types);
          var i = event_types.length;
          while (i--) {
              var listener = filesaver["on" + event_types[i]];
              if (typeof listener === "function") {
                  try {
                      listener.call(filesaver, event || filesaver);
                  } catch (ex) {
                      throw_outside(ex);
                  }
              }
          }
      }
      , auto_bom = function(blob) {
          // prepend BOM for UTF-8 XML and text/* types (including HTML)
          // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
          if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
              return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
          }
          return blob;
      }
      , FileSaver = function(blob, name, no_auto_bom) {
          if (!no_auto_bom) {
              blob = auto_bom(blob);
          }
          // First try a.download, then web filesystem, then object URLs
          var
                filesaver = this
              , type = blob.type
              , force = type === force_saveable_type
              , object_url
              , dispatch_all = function() {
                  dispatch(filesaver, "writestart progress write writeend".split(" "));
              }
              // on any filesys errors revert to saving with object URLs
              , fs_error = function() {
                  if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                      // Safari doesn't allow downloading of blob urls
                      var reader = new FileReader();
                      reader.onloadend = function() {
                          var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                          var popup = view.open(url, '_blank');
                          if(!popup) view.location.href = url;
                          url=undefined; // release reference before dispatching
                          filesaver.readyState = filesaver.DONE;
                          dispatch_all();
                      };
                      reader.readAsDataURL(blob);
                      filesaver.readyState = filesaver.INIT;
                      return;
                  }
                  // don't create more object URLs than needed
                  if (!object_url) {
                      object_url = get_URL().createObjectURL(blob);
                  }
                  if (force) {
                      view.location.href = object_url;
                  } else {
                      var opened = view.open(object_url, "_blank");
                      if (!opened) {
                          // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                          view.location.href = object_url;
                      }
                  }
                  filesaver.readyState = filesaver.DONE;
                  dispatch_all();
                  revoke(object_url);
              }
          ;
          filesaver.readyState = filesaver.INIT;

          if (can_use_save_link) {
              object_url = get_URL().createObjectURL(blob);
              setTimeout(function() {
                  save_link.href = object_url;
                  save_link.download = name;
                  click(save_link);
                  dispatch_all();
                  revoke(object_url);
                  filesaver.readyState = filesaver.DONE;
              });
              return;
          }

          fs_error();
      }
      , FS_proto = FileSaver.prototype
      , saveAs = function(blob, name, no_auto_bom) {
          return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
      }
  ;
  // IE 10+ (native saveAs)
  if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
      return function(blob, name, no_auto_bom) {
          name = name || blob.name || "download";

          if (!no_auto_bom) {
              blob = auto_bom(blob);
          }
          return navigator.msSaveOrOpenBlob(blob, name);
      };
  }

  FS_proto.abort = function(){};
  FS_proto.readyState = FS_proto.INIT = 0;
  FS_proto.WRITING = 1;
  FS_proto.DONE = 2;

  FS_proto.error =
  FS_proto.onwritestart =
  FS_proto.onprogress =
  FS_proto.onwrite =
  FS_proto.onabort =
  FS_proto.onerror =
  FS_proto.onwriteend =
      null;

  return saveAs;
}(
     typeof self !== "undefined" && self
  || typeof window !== "undefined" && window
  || this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
define("FileSaver.js", function() {
  return saveAs;
});
}
function downloadTextFile (mobileCode) {
  //mobileCode 为写入文件的内容，可以通过获取文本框的value写入
      var file = new File([mobileCode], "test.html", { type: "text/plain;charset=utf-8" });
      saveAs(file);
  }










 ////////图片素材上传新
 var img_num=0;
 var Detail_content=document.getElementsByClassName("Detail_content");
 var up__img=document.getElementsByClassName("box0");




$('#upimg1').change(function(event)
{
  var files = this.files;
      if (files && files.length) {
          var file = files[0];
          if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
              var uploadedImageURL = window.URL.createObjectURL(file);
              var img =new Image;
              img.id="img"+img_num;
              img.setAttribute("src", uploadedImageURL);
              
              img.className='box0'
              img.style.cssText="position:absolute;width:80px;height:25px;left:1000px;top:600px";    
              document.body.appendChild(img);
              fun(img);
              
          } else {
              alert('请选择正确的图片格式！');
          }
      }
}) 


 


 