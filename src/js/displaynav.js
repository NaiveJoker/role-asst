$(function() {
  //查看当前用户是否登录
  let username = sessionStorage.getItem("username");
  //如果登录，加载用户模块
  if (username != undefined) {
    insertUser(username);
  } else {
    //否则加载登录模块
    insertEntry();
  }
  //插入用户名展示及登出按钮
  function insertUser(username) {
    let userbox = $("#userbox");
    let userdisplay = templateUser(username);
    userbox.append(userdisplay);
  }
  //用户未登录，插入登录入口
  function insertEntry() {
    let userbox = $("#userbox");
    let entry = templateEntry();
    userbox.append(entry);
  }
  //用户登陆后展示内容
  function templateUser(username) {
    let userdisplay = `
      <li class="nav-item">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            ${username}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" id="logout" href="#">登出</a>
          </div>
        </div>
      </li>
      `;
    return userdisplay;
  }
  //登录入口模板
  function templateEntry() {
    let entry = `
    <li class="nav-item">
      <a href="/src/template/signup.html" class="nav-link">注册</a>
    </li>
    <li class="nav-item">
      <a href="/src/template/login.html" class="nav-link">登录</a>
    </li>
      `;
    return entry;
  }
});

//页面加载后执行
$(document).ready(function() {
  $("#logout").click(function() {
    //删除sessionStorage中存储的用户名
    sessionStorage.removeItem("username");
    //刷新当前页面，重新加载
    window.location.reload();
  });
});
