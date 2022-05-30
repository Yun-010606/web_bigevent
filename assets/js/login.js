$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(() => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录让 注册框隐藏，登录框显示
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 引入form
    const form = layui.form
    const layer = layui.layer
    // 自定义校验规则
    form.verify({
        // 密码校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        // 再次确认密码校验
        repwd: (value) => {
            const pwd = $("#form_reg [name=password]").val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })
    // 设置 baseurl 
    // const baseUrl = `http://www.liulongbin.top:3007`
    // 注册功能
    $("#form_reg").on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'/api/reguser',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("注册失败")
                layer.msg("注册成功")
                // 手动点击
                $("#link_login").click()
            }
        })
    })
    // 登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data: $(this).serialize(),
            success:(res) => {
                console.log(res);
                if(res.status !== 0) return layer.msg("登录失败")
                layer.msg("登录成功！")
                // 登录成功后拿到身份效验存放在本地存储
                localStorage.setItem('token',res.token)
                // 跳转到主页
                // location.href = "/index.html"
            }
        })
    })
})
