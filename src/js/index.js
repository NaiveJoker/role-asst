$(document).ready(function() {
  //修改标题中片源名称
  let videoname = $("source")
    .attr("src")
    .replace("../video/", "");
  $("#span-video-name").append(videoname);
  var dataUrl = null;
  //提交图片
  $("form#form-image").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    // canvas转码
    if (dataUrl) {
      //将base64图片转为对象
      var blob = dataURItoBlob(dataUrl);
      console.log(typeof blob);
      formData.append("screenshot", blob);
      formData.append("filename", "role.png");
    } else {
      alert("无图片，图片上传失败！");
    }
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
        //成功渲染结果
        if (data.error_code) {
          alert(`${data.error_code}: ${data.error_msg}!`);
          emptyLi();
          let error_code = `error_code: ${data.error_code}`;
          let error_msg = `error_msg: ${data.error_msg}!`;
          insertResult(error_code, error_msg);
        } else {
          let result = data.result.face_list;
          console.log(result);
          emptyLi();
          for (let i = 0; i < result.length; i++) {
            let userId = result[i].user_list;
            if (userId.length) {
              let user_id = `姓名： ${userId[0].user_id}`;
              let score = `可信度： ${userId[0].score}`;
              insertResult(user_id, score);
            } else {
              insertResult("角色未入库", "暂无评分");
            }
          }
        }
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });
  //点击截图后用canvas截图
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
    dataUrl = canvas.toDataURL("image/jpg");
    img.src = dataUrl;
  });
  function insertResult(info1, info2) {
    let resultList = $("#result-list");
    let li = templateLi(info1, info2);
    resultList.append(li);
  }
  function templateLi(info1, info2) {
    let li = `
    <li class="list-group-item result-li">
      <p class="result-p">${info1}</p>
      <p class="result-p">${info2}</p>
    </li>
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
  function dataURItoBlob(base64Data) {
    var byteString;
    if (base64Data.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(base64Data.split(",")[1]);
    else byteString = unescape(base64Data.split(",")[1]);
    var mimeString = base64Data
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
});
