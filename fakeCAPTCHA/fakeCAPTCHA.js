//获取当前 JS 文件所在目录
var path = document.querySelectorAll("script")[document.querySelectorAll("script").length - 1].src.slice(0, -14);
//初始化验证器
function CAPTCHA(config) {
    //传递自身
    var self = this;
    //设置验证器状态
    this.checked = false;
    //填充验证器元素
    document.querySelector(config.element).classList.add("captcha");
    document.querySelector(config.element).innerHTML = `<div class="captcha-clickable">
        <div class="captcha-checkbox"></div>
        <svg class="captcha-icon captcha-spinner" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#448AFF">
            <path
                d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
        </svg>
        <svg class="captcha-icon captcha-success" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#4CAF50">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
        <svg class="captcha-icon captcha-failure" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#F44336">
            <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
        <div class="captcha-text">` + config.textBefore + `</div>
    </div>
    <a class="captcha-mark" href="https://fakecaptcha.netlify.app/" target="_blank">
        <div class="captcha-mark-text">fakeCAPTCHA</div>
        <img class="captcha-mark-logo" src="` + path + `fakeCAPTCHA-LOGO.png" alt="fakeCAPTCHA LOGO">
    </a>`;
    //检测深色主题
    if (config.dark) {
        document.querySelector(config.element).classList.add("captcha-dark");
    }
    //绑定点击事件
    document.querySelector(config.element + " .captcha-clickable").onclick = function () {
        //寻找所需元素
        var checkbox = document.querySelector(config.element + " .captcha-checkbox");
        var spinner = document.querySelector(config.element + " .captcha-spinner");
        var success = document.querySelector(config.element + " .captcha-success");
        var failure = document.querySelector(config.element + " .captcha-failure");
        var text = document.querySelector(config.element + " .captcha-text");
        //避免重复验证
        if (!self.checked) {
            //开始验证过程
            checkbox.style.borderRadius = "50%";
            checkbox.style.transform = "scale(0)";
            checkbox.style.outlineWidth = "4px";
            window.setTimeout(function () {
                spinner.style.opacity = "1";
                text.innerHTML = config.textDuring;
                window.setTimeout(function () {
                    if (config.success) {
                        success.style.transform = "scale(1.5)";
                    } else {
                        failure.style.transform = "scale(1.5)";
                    }
                    spinner.style.opacity = 0;
                    text.innerHTML = config.textAfter;
                    self.checked = true;
                }, config.duration);
            }, 150);
        }
    }
}