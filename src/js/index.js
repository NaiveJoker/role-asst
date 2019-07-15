$(document).ready(function() {
  $("form#form-image").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "http://localhost:5000/upload",
      type: "POST",
      data: formData,
      beforeSend: function() {
        //ajax发送请求之前显示提示内容
        emptyLi();
        $("#result-list").append(
          `<li class="list-group-item">
            上传图片分析中，请等待...
          </li>`
        );
      },
      success: function(data) {
        let result = data.result;
        console.log(result);
        emptyLi();
        for (let i = 0; i < result.length; i++) {
          insertResult(result[i].keyword, result[i].score);
        }
        activeLi();
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });
  function insertResult(key, score) {
    let resultList = $("#result-list");
    let li = templateLi(key, score);
    resultList.append(li);
  }
  function templateLi(key, score) {
    let li = `
    <li class="list-group-item">${key}--${score}</li>
    `;
    return li;
  }
  function emptyLi() {
    let resultList = $("#result-list");
    return resultList.empty();
  }
  function activeLi() {
    let li = $("#result-list li:first");
    return li.addClass("active");
  }
});
