//加载主题
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
    //加载主题
    loadTheme();
    //监听浏览器主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", function () {
        loadTheme();
    });
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