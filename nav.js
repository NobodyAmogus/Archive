(function () {
  var nav = document.querySelector(".main-nav");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // mark the current page's nav link
  var page = document.body.getAttribute("data-page");
  if (page) {
    var current = document.querySelector('.main-nav a[data-page="' + page + '"]');
    if (current) current.setAttribute("aria-current", "page");
  }
})();
