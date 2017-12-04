(function(){
    var blackList = ["牛客运营小妹", "牛妹","王阿清"];//屏蔽用户列表
    var elementsToHide = [
        ".mini-banner",//顶部广告
        "#jsSideTopicList",//热门推荐
        ".phone-qrcode",//二维码
        ".fixed-menu", //右侧菜单
        ".nav-msg-num" //新消息提醒
        ];//隐藏的类元素
    var css = document.createElement("style");
    css.nodeType = "css/text";
    css.innerHTML = elementsToHide.join(",") + "{display: none !important;}";
    document.head.appendChild(css);
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
    var blackSet = {};
    for (var i = 0; i < blackList.length; ++i) {
        blackSet[blackList[i]] = 1;
    }
    Array.prototype.forEach.call(document.querySelectorAll(".d-name"),
    function(x){
        if (x.innerText in blackSet) {
            removeSelf(findParent(x));
        }
    });
})();