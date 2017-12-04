(function(){
    if (!("blackList" in localStorage)) {
        localStorage["blackList"] = "{}";
    }
    var blackSet = JSON.parse(localStorage["blackList"]);
    var elementsToHide = [
        "#jsSideTopicList",//热门推荐
        ".phone-qrcode",//二维码
        ];//隐藏的类元素
    var css = document.createElement("style");
    css.nodeType = "css/text";
    css.innerHTML = elementsToHide.join(",") + "{display: none !important;}";
    document.head.appendChild(css);
    document.body.ondblclick = function(x) {
        var tar = findParent(x.srcElement);
        var href = tar.querySelectorAll(".discuss-main a")[0].href;
        blackSet[href] = 1;
        localStorage["blackList"] = JSON.stringify(blackSet);
        removeSelf(tar);
    };
    function findParent(x) {
        while (x != null) {
            if (x.nodeName == "LI" && x.classList.value.split(" ").includes("clearfix")) {
                break;
            }
            else {
                x = x.parentElement;
            }
        }
        return x;
    }
    function removeSelf(x) {
        if (x != null && x.parentElement != null) {
            x.parentElement.removeChild(x);
        }
    }
    Array.prototype.forEach.call(document.querySelectorAll(".discuss-main a"),
    function(x){
        if (x.href in blackSet) {
            removeSelf(findParent(x));
        }
    });
})();