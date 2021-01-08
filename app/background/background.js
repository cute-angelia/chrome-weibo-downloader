
import Img from '../lib/img'

var isLock = false
var JSZip = require("jszip");
var FileSaver = require('file-saver');

function dataURItoBlob(dataURI) {
  return new Promise((resolve) => {
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    resolve(mimeString, bb)
  })
}


// 收集命令
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponseParam
) {
  var responseStatus = {
    bCalled: false
  };

  function sendResponse(obj) {
    //dummy wrapper to deal with exceptions and detect async
    try {
      sendResponseParam(obj);
    } catch (e) {
      //error handling
    }
    responseStatus.bCalled = true;
  }

  switch (request.cmd) {
    case "download":
      var zip = new JSZip();
      var zipedImgCount = 0; // 用户预处理图片是否加载完成

      var imgs = request.data.imgs
      var zipname = request.data.zipname
      for (let i = 0; i < imgs.length; i++) {

        const img = imgs[i];
        const img_name = Img.getImgName(img, i)

        if (img.src == "" || img.src == null || img.src == undefined) {
          imgs.splice(i, 1)
          i = i - 1
          continue;
        }

        // base64 图片
        if (img.src.indexOf("data") >= 0) {
          dataURItoBlob(img.src).then((type, blob) => {
            zip.file(img_name, blob);
            zipedImgCount += 1
          }).catch((error) => {
            zipedImgCount += 1
            console.error('There has been a problem with your fetch operation:', error);
          })
        } else {
          fetch(img.src).then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob();
          }).then((blob) => {
            // console.log(blob);
            zip.file(img_name, blob);
            zipedImgCount += 1
          }).catch((error) => {
            zipedImgCount += 1
            console.error('There has been a problem with your fetch operation:', error);
          })
        }
      }

      var zx = setInterval(() => {
        if (zipedImgCount == imgs.length) {
          zipedImgCount = 0; // 清零
          // 清理定时器
          clearInterval(zx)

          zip.generateAsync({
            type: "blob"
          })
            .then(function (content) {
              FileSaver.saveAs(content, zipname);
              // saveAs(content, "example.zip");
              // chrome.downloads.download bug with filename is not work
              // const link = URL.createObjectURL(content);
              // console.log(link);
              // chrome.downloads.download({
              //   url: link,
              //   filename: "example.zip",
              // });
              sendResponse("download success");
            });
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(zx)
      }, 120000);

      break;
  }

  if (!responseStatus.bCalled) {
    //if its set, the call wasn't async, else it is.
    return true;
  }
});