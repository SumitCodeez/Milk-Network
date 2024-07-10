function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
function textAnimation() {
  gsap.to(".dash", {
    opacity: 0,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
  });

  var tl = gsap.timeline({ repeat: -1 });

  animateLetters(tl, ".spanletter", 0.1);
  animateLetters(tl, ".spanletter-2", 0.1);
  animateLetters(tl, ".spanletter-3", 0.1);
  animateLetters(tl, ".spanletter-4", 0.1);
  animateLetters(tl, ".spanletter-5", 0.1);
  animateLetters(tl, ".spanletter-6", 0.1);
  animateLetters(tl, ".spanletter-7", 0.1);
  animateLetters(tl, ".spanletter-8", 0.1);
  animateLetters(tl, ".spanletter-9", 0.1);
  animateLetters(tl, ".spanletter-10", 0.1);
}
function animateLetters(timeline, selector, staggerAmount) {
  var spanLetters = document.querySelectorAll(selector);

  spanLetters.forEach(function (elem) {
    let clutter = "";
    elem.textContent.split("").forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
  });

  timeline.from(`${selector} span`, {
    opacity: 0,
    duration: 0.5,
    stagger: staggerAmount,
  });

  timeline.to(`${selector} span`, {
    opacity: 0,
    duration: 0.5,
    stagger: -staggerAmount,
  });
}
function videoAnimation() {
  var videoC = document.querySelector("#page-1 video");
  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page-1",
      scroller: "#main",
      start: "50% 50%",
      end: "200% 50%",
      scrub: true,
      pin: true,
    },
  });

  tl2.from("#page-1 video", {
    scale: 0.3,
  });
  tl2.to("#page-1 video", {
    scale: 0.98,
  });
  videoC.addEventListener("mouseenter", function () {
    gsap.to(".mousefollower", {
      opacity: 0,
    });
    gsap.to(".play-btn", {
      opacity: 1,
    });
  });
  videoC.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });

    gsap.to(".play-btn", {
      opacity: 0,
    });
  });

  videoC.addEventListener("mousemove", function (dets) {
    gsap.to(".play-btn", {
      left: dets.x,
      top: dets.y,
    });
  });

  var flag = 0;

  videoC.addEventListener("click", function () {
    if (flag == 0) {
      document.querySelector(".play-btn").innerHTML =
        '<i class="ri-volume-mute-line"></i>';
      videoC.muted = false;
      flag = 1;
    } else {
      document.querySelector(".play-btn").innerHTML =
        '<i class="ri-volume-up-line"></i>';

      videoC.muted = true;
      flag = 0;
    }
  });
}
function loaderAnimation() {
  var loaderh1 = document.querySelectorAll(".loader h1");

  loaderh1.forEach(function (elem) {
    let clutter = "";
    elem.textContent.split("").forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
    if (window.innerWidth <= 600) {
      elem.style.transformOrigin = "0% 450%";
    } else {
      elem.style.transformOrigin = "bottom left";
    }
  });
  var tl3 = gsap.timeline();
  tl3.from(".loader h1 span", {
    y: 370,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.2,
  });
  tl3.to(
    ".loader h1",
    {
      scale: "0.2",
      delay: 0.2,
      ease: Power4.in,
      paddingTop: "14vw",
    },
    "a"
  );
  tl3.to(
    ".loader",
    {
      opacity: 0,
      ease: "power4.out",
      duration: 0.5,
      onComplete: function () {
        document.querySelector(".loader").style.display = "none";
      },
    },
    "a+=1"
  );
}
function navAnim() {
  var anim = document.querySelectorAll(".anim");
  anim.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to(e.querySelector(".line"), {
        scaleX: 1,
        transformOrigin: "left",
        ease: "power2.out",
      });
    });
    e.addEventListener("mouseleave", function () {
      gsap.to(e.querySelector(".line"), {
        scaleX: 0,
        transformOrigin: "right",
        ease: "power2.in",
      });
    });
  });
}
function imgGrow() {
  const screenWidth = window.innerWidth;
  let startValue = "110% 50%";
  let endValue = "240% 50%";

  if (screenWidth <= 600) {
    startValue = "70% 50%";
    endValue = "200% 50%";
  }

  var tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page-3",
      scroller: "#main",
      start: startValue,
      end: endValue,
      scrub: true,
    },
  });

  tl4.to(".img-part img", {
    width: "100%",
    stagger: 0.2,
  });
}
function imgCursor() {
  var imgSections = document.querySelectorAll("#page-4 .img-section");
  var cursor = document.querySelector("#page-4 .cursor-btn");

  imgSections.forEach(function (boxContainer) {
    function updateCursorPosition(det) {
      var rect = boxContainer.getBoundingClientRect();
      var x = det.clientX - rect.left;
      var y = det.clientY - rect.top;
      gsap.to(cursor, {
        left: x,
        top: y,
      });
    }

    boxContainer.addEventListener("mouseenter", function () {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to(cursor, {
        opacity: 1,
      });
    });

    boxContainer.addEventListener("mousemove", updateCursorPosition);

    boxContainer.addEventListener("mouseleave", function () {
      gsap.to(".mousefollower", {
        opacity: 1,
      });
      gsap.to(cursor, {
        opacity: 0,
      });
    });
  });

  window.addEventListener("scroll", function () {});
}
function lineAnim() {
  var anim1 = document.querySelectorAll(".animation");
  anim1.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to(e.querySelector(".underline"), {
        scaleX: 1,
        ease: "power2.out",
      });
    });
    e.addEventListener("mouseleave", function () {
      gsap.to(e.querySelector(".underline"), {
        scaleX: 0,
        ease: "power2.in",
      });
    });
  });
}
function cursorPage5() {
  var boxSection = document.querySelector("#page-5 .box-inside");
  var cursor = document.querySelector(".box-inside .cursor");

  boxSection.addEventListener("mouseenter", function () {
    gsap.to(".mousefollower", {
      opacity: 0,
    });
    gsap.to(cursor, {
      opacity: 1,
    });
  });

  boxSection.addEventListener("mousemove", function (data) {
    var rect = boxSection.getBoundingClientRect();
    var x = data.clientX - rect.left;
    var y = data.clientY - rect.top;
    gsap.to(cursor, {
      left: x,
      top: y,
    });
  });

  boxSection.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to(cursor, {
      opacity: 0,
    });
  });
}
function lineAnim2() {
  var anim2 = document.querySelectorAll(".anim-2");
  anim2.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to(e.querySelector(".under-line"), {
        scaleX: 1,
        ease: "power2.out",
      });
    });
    e.addEventListener("mouseleave", function () {
      gsap.to(e.querySelector(".under-line"), {
        scaleX: 0,
        ease: "power2.in",
      });
    });
  });
}
function arrowMove() {
  var email = document.querySelector(".email-input");
  email.addEventListener("mouseenter", function () {
    gsap.to("#secondi", {
      left: "100%",
      duration: 0.3,
    });
    gsap.to("#firsti", {
      left: "35%",
      duration: 0.3,
    });
  });
  email.addEventListener("mouseleave", function () {
    gsap.to("#secondi", {
      left: "31%",
      duration: 0.3,
    });
    gsap.to("#firsti", {
      left: "-28%",
      duration: 0.3,
    });
  });
}
function readAnim() {
  let heading = document.querySelectorAll(".heading");
  let head1 = document.querySelectorAll(".head1");
  let head2 = document.querySelectorAll(".head2");
  heading.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to(head1, {
        y: -130,
        duration: 0.6,
      });
      gsap.to(head2, {
        y: -30,
        duration: 0.8,
      });
    });

    e.addEventListener("mouseleave", function () {
      gsap.to(head1, {
        y: -2,
        duration: 0.6,
      });
      gsap.to(head2, {
        y: 120,
        duration: 0.8,
      });
    });
  });
}
function bottleImg() {
  var bottle = document.querySelector(".bottle-img");
  var animation;

  bottle.addEventListener("mouseenter", function () {
    if (animation) {
      animation.kill();
    }

    animation = gsap.to(".bottle-img img", {
      rotation: "+=360",
      duration: 10,
    });
  });

  bottle.addEventListener("mouseleave", function () {
    if (animation) {
      animation.kill();
    }
  });
}

Shery.mouseFollower();
locomotive();
bottleImg();
lineAnim();
readAnim();
imgCursor();
imgGrow();
navAnim();
videoAnimation();
loaderAnimation();
textAnimation();
cursorPage5();
lineAnim2();
arrowMove();
