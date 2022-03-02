"use strict";

////////ELEMENTS

const commentSection = document.querySelector(".comments");

const fetchData = async () => {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const loadComments = async () => {
  const data = await fetchData();
  if (data.comments) {
    const comments = data.comments;
    comments.forEach((comment) => {
      let html = `<div class="comment-box">
    <div class="user-box">
    <img
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
    <button><img src="images/icon-reply.svg" />Reply</button>
    </div>
    </div>
    <div class="replies"></div>`;

      commentSection.insertAdjacentHTML("beforebegin", html);

      const replySection = document.querySelector(".replies");
      console.log(replySection);

      if (comment.replies !== []) {
        const replies = comment.replies;
        console.log(replies);
        let replyHtml = `<div class="comment-box">
        <div class="user-box">
        <img
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
        <button><img src="images/icon-reply.svg" />Reply</button>
        </div>
        </div>
        <div class="replies"></div>`;
      }
    });
  }
};

loadComments();
