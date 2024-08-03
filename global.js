//载入主题
function loadTheme() {
    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList.add("mdui-theme-dark");
        document.documentElement.classList.remove("mdui-theme-auto");
        document.getElementById("themeSwitcher").icon = "dark_mode";
    } else if (localStorage.getItem("theme") == "light") {
        document.documentElement.classList.remove("mdui-theme-dark");
        document.documentElement.classList.remove("mdui-theme-auto");
        document.getElementById("themeSwitcher").icon = "light_mode";
    } else {
        document.documentElement.classList.remove("mdui-theme-dark");
        document.documentElement.classList.add("mdui-theme-auto");
        localStorage.setItem("theme", "auto");
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.getElementById("themeSwitcher").icon = "dark_mode";
        } else {
            document.getElementById("themeSwitcher").icon = "light_mode";
        }
    }
    document.getElementById("themeMenu").value = localStorage.getItem("theme");
}
//页面加载完成时执行
window.addEventListener("load", function () {
    //显示页面
    document.body.style.opacity = 1;
    //载入主题
    loadTheme();
    //监听浏览器主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", function () {
        loadTheme();
    });
    //检测系统语言
    if (localStorage.getItem("lang") == undefined) {
        if (navigator.language.indexOf("zh-") != -1) {
            localStorage.setItem("lang", "zh");
        } else {
            localStorage.setItem("lang", "en");
        }
    }
    loadLang();
});
//页面跳转
function openPage(URL) {
    document.body.style.opacity = 0;
    window.setTimeout(function () {
        location.href = URL;
    }, 300);
}
//切换主题
function setTheme(value) {
    window.setTimeout(function () {
        localStorage.setItem("theme", value);
        loadTheme();
    }, 0);
}
//设置语言列表
const langs_normal = ["zh", "en"];
const langs_label = ["zh-label", "en-label"];
const langs_value = ["zh-value", "en-value"];
const langs_headline = ["zh-headline", "en-headline"];
//应用语言（最终步骤）
function applyLang(langs, lang, attr) {
    //获取所有需要载入语言的元素
    var items = document.querySelectorAll("*[" + langs[0] + "]");
    if (attr === undefined) {
        //方法 1：载入到 innerHTML
        items.forEach(function (item) {
            item.innerHTML = item.getAttribute(lang);
        });
    } else {
        //方法 2：载入到指定属性
        items.forEach(function (item) {
            item.setAttribute(attr, item.getAttribute(lang));
        });
    }
}
//载入语言
function loadLang() {
    var currentLang = localStorage.getItem("lang");
    applyLang(langs_normal, currentLang);
    applyLang(langs_label, currentLang + "-label", "label");
    applyLang(langs_value, currentLang + "-value", "value");
    applyLang(langs_headline, currentLang + "-headline", "headline");
    document.getElementById("langMenu").value = currentLang;
}
//更改语言
function setLang(lang) {
    window.setTimeout(function () {
        localStorage.setItem("lang", lang);
        loadLang();
    }, 0);
}