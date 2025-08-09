$(function() {
  
  let userid = 1;
  const maxuserid = 30;

  function userByid(id){
    $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      type: 'GET',
      dataType: 'json',
      success: function(user){
        $(".info__image img").attr("src", user.image);
        $(".info__content").html(`
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>Email: ${user.email}</p>
          <p>Age: ${user.age}</p>`  
        )
       postTodos(id,user.firstName);
       todosById(id,user.firstName); 
      },
      error: function(error){
        console.error("Error:", error);
      }
    })
  }

  function postTodos(id, name) {
  $.ajax({
    url: `https://dummyjson.com/posts/user/${id}`,
    method: "GET",
    dataType: "json",
    success: function (response) {
      $(".posts h3").text(`${name}'s Posts`);

      if (response.posts.length === 0) {
        $(".posts ul").html(`<li class="no-posts">User no has posts</li>`);
        return;
      }

      const items = response.posts.map(post => `
        <li class="post-item">
          <h4 class="post-title" 
              data-title="${post.title}" 
              data-body="${post.body}" 
              data-views="${post.views}">
            ${post.title}
          </h4>
          <p>${post.body}</p>
        </li>
      `).join("");

      $(".posts ul").html(items);
    },
    error: function (error) {
      console.error("Error posts:", error);
      $(".posts ul").html(`<li class="error-posts">Error posts</li>`);
    }
  });
}



  function todosById(id, name) {
  $.ajax({
    url: `https://dummyjson.com/todos/user/${id}`,
    method: "GET",
    dataType: "json",
    success: function (response) {
      $(".todos h3").text(`${name}'s To Dos`);

      if (response.todos.length === 0) {
        $(".todos ul").html(`<li class="no-todos">User has not Todos.</li>`);
        return;
      }
      const items = response.todos.map(todo => `
        <li>${todo.todo} ${todo.completed ? "Completed" : "Not Completed"}</li>
      `).join("");

      $(".todos ul").html(items);
    },
    error: function (error) {
      console.error("Error todos:", error);
      $(".todos ul").html(`<li class="error-todos">Error todos</li>`);
    }
  });
}

$(document).on("click", ".post-title", function () {
  const title = $(this).data("title");
  const body = $(this).data("body");
  const views = $(this).data("views");

  const modal = $(`
    <div class="modal">
      <h2>${title}</h2>
      <p>${body}</p>
      <p><strong>Views:</strong> ${views}</p>
      <button class="close-modal">Close Modal</button>
    </div>
    <div class="modal-overlay"></div>
  `);

  $("body").append(modal);

  $(".close-modal").on("click", function () {
    $(".modal, .modal-overlay").remove();
  });
});

  $("header button").first().on("click", function () {
    userid = userid === 1 ? maxuserid : userid - 1;
    userByid(userid);
  });

  $("header button").last().on("click", function () {
    userid = userid === maxuserid ? 1 : userid + 1;
    userByid(userid);
  });

  $(".posts h3").on("click", function () {
    $(".posts ul").slideToggle();
  });

  $(".todos h3").on("click", function () {
    $(".todos ul").slideToggle();
  });

  userByid(userid);

})