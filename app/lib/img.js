class Img {
  getImgName(img, prefix) {
    // 名字
    let name = ""
    if (img.name && img.name != "") {
      if (img.name.indexOf(".") === -1) {
        name = img.name + img.src.substr(img.src.lastIndexOf("."))
      } else {
        name = img.name
      }
    } else {
      name = img.src.substr(
        img.src.lastIndexOf("/") + 1
      );
    }

    if (name.length == 0) {
      name = img.src
    }

    return prefix + "_" + name
  }

  dataURItoBlob(dataURI) {
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
}

export default new Img()