// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem("token")
        // },
        success: (res) => {
            //   console.log(res);
            if (res.status !== 0) return layer.msg("用户信息获取失败")
            layer.msg("用户信息获取成功")
            renderAvatar(res.data)
        }
    })
}

// 渲染头像
const renderAvatar = (user) => {
    // 获取用户名称
    let name = user.nickname || user.username
    // 渲染欢迎语
    $('#welcome').html(`欢迎 ${name}`)
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 设置图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    }
    else {
        // 设置文本头像
        $(".layui-nav-img").hide()
        // let firstName = name[0].toUpperCase()
        $(".text-avatar").html(name[0].toUpperCase())
    }
}
// 推出功能
$('#btnlogoout').click(() => {
    layui.layer.confirm("确定退出登录？", { icon: 3, title: "" }, function (index) {
        localStorage.removeItem('token')
        location.href = "/login.html"
    })
})
getUserInfo()