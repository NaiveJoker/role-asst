$(document).ready(function() {
  $("form#form-user").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "http://localhost:5000/signup",
      type: "POST",
      data: formData,
      success: function(data) {
        alert("注册成功");
        window.location.href = "/src/template/login.html";
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });
});
