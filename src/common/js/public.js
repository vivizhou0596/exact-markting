import $ from 'jquery'
let html2canvas = require("./html2canvas.js")
let jsPDF = require("./jsPdf.debug.js")
var pdf =null
export function downPdf(){//将页面保存成pdf的方法
      html2canvas(document.body, {
      onrendered:function(canvas) {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = contentWidth / 592.28 * 841.89;
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //pdf页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 595.28;
          var imgHeight = 592.28/contentWidth * contentHeight;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);

          pdf = new jsPDF('', 'pt', 'a4');
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
          } else {
              while(leftHeight > 0) {
                  pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                  leftHeight -= pageHeight;
                  position -= 841.89;
                  //避免添加空白页
                  if(leftHeight > 0) {
                      pdf.addPage();
                  }
              }
          }
          if (pdf!=null) {
            console.log('渲染完成')
            pdf.save('result.pdf');
          }
          
      }
  })
}

var whatMode = 'dev' // 指明使用开发模式还是生产模式的变量，可选值'dev'/'prod'
// obj对象有以下属性fake, url, succ, fail，在下方调用makeAction函数时会说明各个参数
var makeAction = function(obj) {
  if (whatMode === 'dev') {
    $.ajax({
      url: obj.fake,
      async: false,
      dataType: 'json',
      success: function (data) {
        obj.succ(data)
      },
      error: function(err) {
        obj.fail(err)
      }
    })
  } else if (whatMode === 'prod') {
     $.ajax({
      url: obj.url,
      dataType: 'json',
      async: false,
      type:obj.type,
      data:obj.data,
      success: function (data) {
        obj.succ(data)
      },
      error: function(err) {
        obj.fail(err)
      }
    })
  }
}
export{makeAction}
