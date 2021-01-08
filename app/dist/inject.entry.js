/*! Copyright rose2099.c@gmail.com */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/inject/inject.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/inject/inject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nsetInterval(function () {\n  var menulist = document.querySelectorAll(\".layer_menu_list\");\n  console.log(\"menulist.length\", menulist.length);\n  if (menulist && menulist.length > 0) {\n    for (var i = 0; i < menulist.length; i++) {\n      var element = menulist[i];\n      if (element) {\n        var isexist = element.querySelectorAll(\".ihere\");\n        if (isexist.length > 0) {\n          continue;\n        } else {\n          var li = document.createElement(\"li\");\n\n          var li_a = document.createElement(\"a\");\n          li_a.className = \"ihere\";\n          li_a.text = \"[\" + i + \"] 下载所有图片(zip)\";\n          li_a.setAttribute('href', 'javascript:void(0);');\n\n          li_a.onclick = function (e) {\n            var textv = e.target.textContent;\n            e.target.text = \"下载中...\";\n\n            var eParentNode = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;\n\n            // 是否转发\n            var username = eParentNode.querySelectorAll(\".face a\")[0].title || \"_\";\n            var wbtext = eParentNode.querySelectorAll(\".WB_text\")[0].textContent;\n            if (eParentNode.querySelectorAll(\".WB_feed_expand\").length > 0) {\n              username = eParentNode.querySelectorAll(\".WB_feed_expand .WB_info a\")[0].title;\n              wbtext = eParentNode.querySelectorAll(\".WB_feed_expand .WB_text\")[0].textContent;\n            }\n\n            wbtext = wbtext.replace(\"\\n\", \"\").replace(/#.*#/, \"\").replaceAll(\" \", \"\").substring(0, 20);\n\n            console.log(\"username\", username, wbtext);\n\n            var imgList = eParentNode.querySelectorAll(\".WB_pic img\");\n\n            var downloadimgs = [];\n            for (var z = 0; z < imgList.length; z++) {\n              var element2 = imgList[z];\n              var imgsrc = element2.src.replace(\"thumb150\", \"large\").replace(\"orj360\", \"large\");\n              console.log(imgsrc);\n              downloadimgs.push({\n                \"src\": imgsrc,\n                \"name\": \"\"\n              });\n            }\n\n            // 发送消息到chrome进行下载\n            var zipFileName = username + \"_\" + wbtext + \".zip\";\n            chrome.runtime.sendMessage({\n              cmd: \"download\",\n              data: {\n                zipname: zipFileName,\n                imgs: downloadimgs\n              }\n            }, function (resp) {\n              e.target.text = textv + \"下载完成\";\n              console.log(\"下载完成\", resp);\n            });\n          };\n\n          li.append(li_a);\n          element.querySelectorAll(\"ul\")[0].appendChild(li);\n        }\n      }\n    }\n  }\n}, 1000);\n\n//# sourceURL=webpack:///./app/inject/inject.js?");

/***/ })

/******/ });