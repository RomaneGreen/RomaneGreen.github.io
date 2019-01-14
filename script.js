


"use strict";

const data = [
  {
    url: "https://greensgourmets.com/",
    gitHubUrl: "https://github.com/",
    img: "img/fifteen-ss.png",
    title: "Fifteen",
    desc:
      "Web app."
  },
  {
    url: "https://streamdefy.com/",
    gitHubUrl: "https://github.com/",
    img: "img/dashboard-box.png",
    title: "Dashboard Box",
    desc:
      "web app"
  },
  {
    url: "https://www.knewtocrypto.com",
    gitHubUrl: "https://github.com/",
    img: "img/bryant-ss.png",
    title: "Bryant Hill",
    desc:
      "web app"
  },
  {
    url: "https://rivify.com",
    gitHubUrl: "https://github.com/",
    img: "img/natour-ss.png",
    title: "Naurs",
    desc:
      "web app"
  },
  {
    url: "https://codersconscious.com",
    gitHubUrl: "https://github.com/",
    img: "img/natour-ss.png",
    title: "Natours",
    desc:
      "web app"
  }
];

let flexGrid = document.querySelector(".flex-grid");

data.forEach(function(el) {
  return (flexGrid.innerHTML +=
    '<article class="card">\n<div class="card__thumbnail">\n  <a href=' +
    el.url +
    ' target="_blank">\n    <img src=' +
    el.img +
    " alt=" +
    el.title +
    ' class="card__img">\n  </a>\n</div>\n<div class="card__description">\n  <h3 class="card__heading">\n    <a href=' +
    el.url +
    ' target="_blank" class="card__link">' +
    el.title +
    '</a>\n  </h3>\n  <p class="card__text">' +
    el.desc +
    "</p>\n  <a href=" +
    el.gitHubUrl +
    ' target="_blank" class="card__github">\n    GitHub\n    <i class="fab fa-github"></i>\n  </a>\n</div>\n</article>');
});

// Browser support
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) {
    return self.pageYOffset;
  }
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) {
    return document.body.scrollTop;
  }

  return 0;
}

// Determine the position of the destination element
function elmYPosition(eID) {
  let elm = document.querySelector(eID);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

// Function to do the scrolling
function smoothScroll(eID) {
  let startY = currentYPosition();
  let stopY = elmYPosition(eID);
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  let step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

// Triggering scroll function
document.querySelector(".user-nav").addEventListener("click", function(event) {
  let target = event.target;
  let anchorID = target.getAttribute("href");

  if (target.nodeName === "I" || target.nodeName === "SPAN") {
    anchorID = target.parentElement.getAttribute("href");
  }

  smoothScroll(anchorID);
});

document
  .querySelector(".footer-nav")
  .addEventListener("click", function(event) {
    let target = event.target;
    let anchorID = target.getAttribute("href");
    smoothScroll(anchorID);
  });

document.querySelector("#cta").addEventListener("click", function() {
  smoothScroll("#portfolio");
});

// Submit form
document.querySelector(".form__submit").addEventListener("click", function() {
  let formInputs = document.querySelectorAll(".form__input");

  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i].value === "" && formInputs[i].hasAttribute("required")) {
      return false;
    }
  }
  document.querySelector(".expand").classList.add("show-expand");
});

document.querySelector(".close-btn").addEventListener("click", function() {
  document.querySelector(".expand").classList.remove("show-expand");
});