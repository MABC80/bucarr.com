(function () {
  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var track = root.querySelector(".carousel-track");
  var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
  var prev = root.querySelector("[data-carousel-prev]");
  var next = root.querySelector("[data-carousel-next]");
  var toggle = root.querySelector("[data-carousel-toggle]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var index = 0;
  var timer = null;
  var paused = reduce.matches;
  var intervalMs = 6000;

  if (!track || slides.length < 2 || !prev || !next || !toggle) return;

  function setPaused(nextPaused) {
    paused = nextPaused;
    if (paused) stop();
    else play();
    toggle.setAttribute("aria-pressed", paused ? "true" : "false");
    toggle.textContent = paused ? "Wiedergabe starten" : "Wiedergabe pausieren";
  }

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-index * 100) + "%)";
    slides.forEach(function (slide, slideIndex) {
      var active = slideIndex === index;
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      if (active) slide.removeAttribute("inert");
      else slide.setAttribute("inert", "");
    });
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function play() {
    if (paused || timer !== null) return;
    timer = window.setInterval(function () {
      show(index + 1);
    }, intervalMs);
  }

  root.classList.add("is-ready");
  show(0);
  setPaused(paused);

  prev.addEventListener("click", function () {
    show(index - 1);
  });
  next.addEventListener("click", function () {
    show(index + 1);
  });
  toggle.addEventListener("click", function () {
    setPaused(!paused);
  });

  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    }
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", function () {
    if (!paused) play();
  });
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", function (event) {
    if (!root.contains(event.relatedTarget) && !paused) play();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else if (!paused) play();
  });

  if (typeof reduce.addEventListener === "function") {
    reduce.addEventListener("change", function () {
      if (reduce.matches) setPaused(true);
    });
  }
})();
