$(document).ready(function() {
  $("form#form-login").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "http://localhost:5000/login",
      type: "POST",
      data: formData,
      success: function(data) {
        //登录成功，设置sessionStorage记录登录状态（用户名)
        let sessionName = data.data;
        console.log(sessionName);
        sessionStorage.removeItem("username");
        sessionStorage.setItem("username", sessionName);
        //转到登录页
        window.location.href = "/src/template/index.html";
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });
});
