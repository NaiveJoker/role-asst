$(document).ready(function() {
  var dataUrl = null;
  $("form#form-image").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    // canvas转码
    // if (dataUrl) {
    //   console.log(typeof dataUrl);
    //   let newDataUrl = dataUrl.replace(/\+/g, "%2B");
    //   formData.append("screenshot", newDataUrl);
    // }
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
        if (data.error_code) {
          alert(`${data.error_code}: ${data.error_msg}!`);
          emptyLi();
          $("#result-list").append(
            `<li class="list-group-item">
            <p>error_code: ${data.error_code}</p>
            <p>error_msg: ${data.error_msg}!</p>
</p>          </li>`
          );
        } else {
          let result = data.result.face_list;
          console.log(result);
          console.log(data.result);
          emptyLi();
          for (let i = 0; i < result.length; i++) {
            insertResult(
              result[i].user_list[0].user_id,
              result[i].user_list[0].score
            );
          }
        }
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });
  $("#screenshot").click(function() {
    let canvas = $("<canvas>")[0];
    let canvasCtx = canvas.getContext("2d");
    let video = $("video")[0];
    let img = $("#preview")[0];
    let videoWidth = video.videoWidth;
    let videoHeight = video.videoHeight;
    let imgWidth = img.width;
    let imgHeight = img.height;
    video.pause();
    //设置画布宽高
    canvas.width = imgWidth = video.offsetWidth;
    canvas.height = imgHeight = video.offsetHeight;
    canvasCtx.drawImage(
      video,
      0,
      0,
      videoWidth,
      videoHeight,
      0,
      0,
      imgWidth,
      imgHeight
    );
    dataUrl = canvas.toDataURL("image/png");
    img.src = dataUrl;
  });
  function insertResult(key, score) {
    let resultList = $("#result-list");
    let li = templateLi(key, score);
    resultList.append(li);
  }
  function templateLi(key, score) {
    let li = `
    <li class="list-group-item"><p>姓名：${key}</p><p>可信度：${score}</p></li>
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
