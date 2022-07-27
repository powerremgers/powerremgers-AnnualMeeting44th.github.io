"use strict";

var menuButton = document.querySelector("button.menu-btn");
//var subMenu = document.querySelector("#menu-item-1545");
var subMenu = document.querySelector("#menu-item-1556");

if (menuButton) {
  menuButton.addEventListener("click", function () {
    this.parentNode.classList.toggle("is-active"); // also close the submenu and the change arrow position

    subMenu.lastElementChild.classList.remove("is-active");
    subMenu.firstChild.firstElementChild.classList.remove("arrow-up");
    subMenu.firstChild.firstElementChild.classList.add("arrow-down");
  });
}

if (subMenu) {
  // add the dropdown icon
  subMenu.firstChild.insertAdjacentHTML(
    "beforeend",
    '<span class="arrow arrow-down"></span>',
  );
  subMenu.addEventListener("click", function (e) {
    if (e.target.textContent === "Sponsors") {
      // toggling the arrow
      var arrow = e.target.firstChild.nextSibling;
      arrow.classList.toggle("arrow-down");
      arrow.classList.toggle("arrow-up");
      var selectedSubMenu = subMenu.lastElementChild;
      selectedSubMenu.classList.toggle("is-active");
    }
  });
}

// For the Sponsors Details
var sponsorSections = document.querySelectorAll('.sponsor-details .sponsor-header-group');

if(sponsorSections) {
  sponsorSections.forEach(function (sponsorSection) {
    sponsorSection.addEventListener('click', function (e) {
      e.preventDefault();
      var sponsorSection = e.target.parentElement.lastElementChild;
      sponsorSection.classList.toggle('arrow-down');
      sponsorSection.classList.toggle('arrow-up');
      var sponsorContent = sponsorSection.parentElement.nextElementSibling;
      sponsorContent.classList.toggle('is-active');
    });
  });
}

// Removing the default sizes and cols for the Contact form
var fields = document.querySelectorAll('.wpcf7-form-control-wrap');

if(fields) {
  fields.forEach(function (field) {
    if (field.firstElementChild.hasAttribute('size')) {
      field.firstElementChild.removeAttribute('size');
    }

    if (field.firstElementChild.hasAttribute('cols')) {
      field.firstElementChild.removeAttribute('cols');
    }
  });
}

// equal heights for the sponsor banners
var sponsorBanners = document.querySelectorAll("img.sponsor-banner");
var sponsorContainer = document.querySelector(".sponsor-container"); 

if (sponsorBanners) {
  sponsorBanners.forEach(function (sponsorBanner) {
    function resizeWindow() {
      var heightArr = [];
      sponsorBanners.forEach(function (sponsorBanner) {

        var bannerHeight = sponsorBanner.height;
        heightArr.push(sponsorBanner.height);
      }); 

      heightArr.sort(function (a, b) {
        return a - b;
      });
      var smallBanner = heightArr[0];

      var bigBanner = heightArr[1];

      if (sponsorBanner.height !== smallBanner) {
        var _longBanner = sponsorBanner.parentElement;
        var bannerH = "height: " + smallBanner + "px;";

        _longBanner.setAttribute("style", bannerH);

        _longBanner.setAttribute("class", "long-banner");
      }
    }

    resizeWindow();
    window.addEventListener("resize", resizeWindow);
  });
  var heightArr = [];
  sponsorBanners.forEach(function (sponsorBanner) {

    var bannerHeight = sponsorBanner.height;
    heightArr.push(sponsorBanner.height);
  });
  heightArr.sort(function (a, b) {
    return a - b;
  });
  var smallBanner = heightArr[0];

  var bigBanner = heightArr[1];

  var longBanners = document.querySelectorAll(".long-banner");
  var expand = '<div class="banner-expand">Expand</div>';

  if (longBanners) {

    longBanners.forEach(longBanner => {
      
      longBanner.insertAdjacentHTML("beforeend", expand);

      var expandBanner = document.querySelector(".sponsor-container");

      expandBanner.addEventListener("click", expandCompress);

      function expandCompress(event) {
        event.preventDefault();

        if(event.target.getAttribute("class") == 'banner-expand') {

          var currentBanner = event.target.parentElement;
          var currentSetBannerHeight = currentBanner.getAttribute("style");

          if (
            currentSetBannerHeight !== undefined ||
            currentSetBannerHeight !== null
          ) {
            currentBanner.removeAttribute("style");
          }

          if (
            currentSetBannerHeight === undefined ||
            currentSetBannerHeight === null
          ) {
            currentBanner.setAttribute("style", "height: " + smallBanner + "px;");
          } // toggle button text

          if (event.target.innerHTML === "Expand") {
            event.target.innerHTML = "Compress";
          } else {
            event.target.innerHTML = "Expand";
          }

        }

      }      

    });
  } else {
    if (
      document.querySelector(".bronze-sponsors") ||
      document.querySelector(".silver-sponsors")
    ) {
      console.log("Not equal banners. Try refreshing your browser.");
    }
  }
}
