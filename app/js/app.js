"use strict";

////////ELEMENTS

const commentSection = document.querySelector(".comments");
const replySection = document.querySelector(".replies");

//// HTML GROUPS

const createHtmlComments = (comment) => {
  let commentsHtml = `<div class="comment-box">
  <div class="user-box">
  <img class="user-img"
  src=${comment.user.image.png}
  alt="profile-pic-${comment.user.username}"
  />
  <p class="username">${comment.user.username}</p>
  <p class="time">${comment.createdAt}</p>
  </div>
  <p class="text">
  ${comment.content}
  </p>
  <div class="action">
  <div class="vote-box">
  <button>
  <img src="images/icon-plus.svg" class="vote-button" />
  </button>
  <span>${comment.score}</span>
  <button><img src="images/icon-minus.svg" /></button>
  </div>
  <button class="reply-button"><img src="images/icon-reply.svg" />Reply</button>
  </div>
  </div>
  <div class="replies${comment.id} reply-section"></div>`;
  return commentsHtml;
};
const createReplyHtml = (reply) => {
  let replyHtml = `<div class="reply-box">
  <div class="user-box">
  <img class="user-img"
  src=${reply.user.image.png}
  alt="profile-pic-${reply.user.username}"
  />
  <p class="username">${reply.user.username}</p>
  <p class="time">${reply.createdAt}</p>
  </div>
  <p class="text">
  ${reply.content}
  </p>
  <div class="action">
  <div class="vote-box">
  <button>
  <img src="images/icon-plus.svg" class="vote-button" />
  </button>
  <span>${reply.score}</span>
  <button><img src="images/icon-minus.svg" /></button>
  </div>
  <button class="reply-button"><img src="images/icon-reply.svg" />Reply</button>
  </div>
  </div>`;
  return replyHtml;
};

/// FETCH OPERATIONS

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://interactive-comments-77e4e-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//// OPERATIVE SECTION

const loadComments = async () => {
  const comments = await fetchData();
  console.log(comments);

  if (comments) {
    comments.forEach((comment) => {
      const commentsHtml = createHtmlComments(comment);

      commentSection.insertAdjacentHTML("beforeend", commentsHtml);

      const replySection = document.querySelector(".replies");

      if (comment.replies) {
        const replies = comment.replies;
        replies.forEach((reply) => {
          const replyHtml = createReplyHtml(reply);

          const replySection = document.querySelector(`.replies${comment.id}`);

          replySection.insertAdjacentHTML("beforeend", replyHtml);
        });
      }
    });
  }
};

loadComments();
