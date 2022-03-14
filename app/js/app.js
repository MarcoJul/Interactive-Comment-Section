"use strict";

////////ELEMENTS

const commentSection = document.querySelector(".comments");
const replySection = document.querySelector(".replies");

const textArea = document.querySelector(".comment-input");
const imgUserForm = document.querySelector(".img-user-form");
const commentButton = document.querySelector(".comment-submit-button");
const replyButton = document.querySelector(".reply-button");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnOpenModal = document.querySelectorAll(".btn-modal");
const btnDeleteComment = document.querySelector(".confirm");
const btnCancelDeletingComment = document.querySelector(".cancel");

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

const fetchActiveUser = async () => {
  try {
    const response = await fetch(
      "https://interactive-comments-77e4e-default-rtdb.europe-west1.firebasedatabase.app/currentUser.json"
    );
    const activeUser = await response.json();
    imgUserForm.src = activeUser.image.png;
    return activeUser;
  } catch (error) {
    console.log(error);
  }
};

// const activeUserData = async () => {
//   const activeUser = await fetchActiveUser();
//   return currentUser;
// };

// const activeUser = activeUserData();

//// HTML GROUPS

const createActionBox = (username, user) => {
  let actionBox;
  if (user.username === username) {
    actionBox = `<button class="reply-button btn-modal">
    <img src="images/icon-delete.svg" />
    Delete
    </button>
    <button class="reply-button btn-modal">
    <img src="images/icon-edit.svg" />
    Edit
    </button>`;
  } else {
    actionBox = `<button class="reply-button btn-modal">
        <img src="images/icon-reply.svg" />
        Reply
        </button>`;
  }
  return actionBox;
};

const createHtmlComments = (comment, user) => {
  let actionBox = createActionBox(comment.user.username, user);
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
      ${actionBox}
  </div>
  </div>
  <div class="replies${comment.id} reply-section"></div>`;
  return commentsHtml;
};

const createReplyHtml = (reply, user) => {
  let actionBox = createActionBox(reply.user.username, user);
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
  ${actionBox}
  </div>
  </div>`;
  return replyHtml;
};

/// DATE OPERATION - TIME PASSED

const formatCommentsDate = (date) => {
  const calcDayPassed = (date1, date2) => {
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const dayPassed = calcDayPassed(new Date(), date);
  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;
};

//// OPERATIVE SECTION

const loadComments = async () => {
  const comments = await fetchData();
  const activeUser = await fetchActiveUser();
  console.log("comments", comments);
  console.log("active", activeUser);

  if (comments) {
    comments.forEach((comment, i) => {
      const commentsHtml = createHtmlComments(comment, activeUser);

      commentSection.insertAdjacentHTML("beforeend", commentsHtml);

      if (comment.replies) {
        const replies = comment.replies;
        replies.forEach((reply) => {
          const replyHtml = createReplyHtml(reply, activeUser);

          const replySection = document.querySelector(`.replies${comment.id}`);

          replySection.insertAdjacentHTML("beforeend", replyHtml);
        });
      }
    });
  }
};

loadComments();

//// FORM ACTION

const printField = async () => {
  const activeUser = await fetchActiveUser();
  const newComment = {
    content: textArea.value,
    createdAt: "Today",
    id: Math.random(),
    score: 0,
    user: activeUser,
    reply: [],
  };
  const newCommentContent = createHtmlComments(newComment, activeUser);

  commentSection.insertAdjacentHTML("beforebegin", newCommentContent);
  textArea.value = "";
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

commentButton.addEventListener("click", printField);

//// DELETE ACTION

const openModal = (event, action) => {
  event.preventDefault();
  if (action === "open") {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else if (action === "close") {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
};

btnOpenModal.forEach((btn) =>
  btn.addEventListener("click", console.log("click"))
);
