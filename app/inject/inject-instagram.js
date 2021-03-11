setInterval(() => {
  var menulist = document.querySelectorAll(".layer_menu_list")
  if (menulist && menulist.length > 0) {
    for (let i = 0; i < menulist.length; i++) {
      const element = menulist[i];
      if (element) {
        var isexist = element.querySelectorAll(".ihere")
        if (isexist.length > 0) {
          continue
        } else {
          var li = document.createElement("li")

          var li_a = document.createElement("a")
          li_a.className = "ihere"
          li_a.text = "[" + i + "] 下载所有图片(zip)"
          li_a.setAttribute('href', 'javascript:void(0);')

          li_a.onclick = (e) => {
            var textv = e.target.textContent
            e.target.text = "下载中..."

            var eParentNode = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

            // 是否转发
            var username = eParentNode.querySelectorAll(".face a")[0].title || "_"
            var wbtext = eParentNode.querySelectorAll(".WB_text")[0].textContent
            if (eParentNode.querySelectorAll(".WB_feed_expand").length > 0) {
              username = eParentNode.querySelectorAll(".WB_feed_expand .WB_info a")[0].title
              wbtext = eParentNode.querySelectorAll(".WB_feed_expand .WB_text")[0].textContent
            }

            wbtext = wbtext.replace("\n", "").replace(/#.*#/, "").replaceAll(" ", "").substring(0, 20)

            console.log("username", username, wbtext);

            var imgList = eParentNode.querySelectorAll(".WB_pic img")

            var downloadimgs = []
            for (let z = 0; z < imgList.length; z++) {
              const element2 = imgList[z];
              var imgsrc = element2.src.replace("thumb150", "large").replace("orj360", "large");
              console.log(imgsrc);
              downloadimgs.push({
                "src": imgsrc,
                "name": ""
              })
            }

            // 发送消息到chrome进行下载
            var zipFileName = username + "_" + wbtext + ".zip";
            chrome.runtime.sendMessage({
              cmd: "download",
              data: {
                zipname: zipFileName,
                imgs: downloadimgs
              }
            }, (resp) => {
              e.target.text = textv + "下载完成"
              console.log("下载完成", resp);
            });
          }

          li.append(li_a)
          element.querySelectorAll("ul")[0].appendChild(li)
        }
      }
    }
  }
}, 1000);