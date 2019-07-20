$(document).ready(function() {
  $("form#form-user").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "http://localhost:5000/signup",
      type: "POST",
      data: formData,
      success: function(data) {
        if (data.status == 1) {
          alert("注册成功");
          window.location.href = "/src/template/login.html";
        } else {
          alert("邮箱已存在，请切换邮箱或直接登录");
        }
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });
});
