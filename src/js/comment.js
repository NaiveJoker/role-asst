//评论模块JS
//页面预加载
$(function() {
  //获取用户评论，若评论不为空则渲染
  insertEmpty();
  $.get("http://localhost:5000/comments", function(data) {
    let comments = data.data;
    if (comments.length > 0) {
      emptyLi();
      for (let i = 0; i < comments.length; i++) {
        insertComments(comments[i].username, comments[i].content);
      }
    } else {
      insertEmpty();
    }
  });

  //插入用户评论
  function insertComments(username, content) {
    let commentLi = $("#commentsList");
    let cmli = templateLi(username, content);
    commentLi.append(cmli);
  }

  //插入无评论提示信息
  function insertEmpty() {
    let commentLi = $("#commentsList");
    let emptyli = emptyTemp();
    commentLi.append(emptyli);
  }

  //所插入的评论模板
  function templateLi(username, content) {
    let li = `
    <li class="media my-4">
      <img
        class="mr-3"
        src="../img/角色-01.png"
        width="40px"
        height="40px"
        alt="Generic placeholder image"
      />
      <div class="media-body">
        <h6 class="mt-0 mb-1">${username}</h6>
        ${content}
      </div>
    </li>
    `;
    return li;
  }

  //所插入的提示信息模板
  function emptyTemp() {
    let li = `
    <li class="media my-4">
      <div class="media-body">
        暂无评论，请留下您的宝贵意见或建议:-)
      </div>
    </li>
    `;
    return li;
  }

  //清空评论区
  function emptyLi() {
    let resultList = $("#commentsList");
    return resultList.empty();
  }
});
//页面加载即开始执行
$(document).ready(function() {
  //点击评论按钮后，提交评论请求
  $("form#form-comments").submit(function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    //获取sessionStorage中的登录状态（用户名
    let sessionName = sessionStorage.getItem("username");
    if (sessionName == undefined) {
      alert("请登录后进行评论！");
    } else {
      formData.append("username", sessionName);
      $.ajax({
        url: "http://localhost:5000/comments",
        type: "POST",
        data: formData,
        success: function(data) {
          if (data.status == 0) {
            alert("评论失败！");
          } else {
            alert("评论添加成功！");
            window.location.reload();
          }
        },
        cache: false,
        contentType: false,
        processData: false
      });
    }
  });
});
