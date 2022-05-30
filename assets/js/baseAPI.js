// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    options.url = `http://www.liulongbin.top:3007` + options.url
    // console.log(options.url);
    // includes
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem("token")
        }
    }
 // 每次发送请求回来校验 token 是否存在 或者是否过期 
    options.complete = (res) => {
        if (
            res.responseJSON.status === 1 &&
            res.responseJSON.message === "身份认证失败！"

        ) {
            // 1.强制清空 token
            localStorage.removeItem('token')
            // 2.跳转页面登录
            location.href = "/login.html"
        }
    }
})