$(function () {
    // 引入 form 表单
    const form = layui.form
    // 自定义校验
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
        },
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
        },
    });

    // 发送请求，重置密码
    $(".layui-form").on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(".layui-form").serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg("更新密码失败！");
                // layer.msg("更新密码成功！");
                localStorage.removeItem("token")
                window.parent.location.href = "/login.html"
                // 重置表单
                // $(".layui-form")[0].reset();
            },
        });
    });
})