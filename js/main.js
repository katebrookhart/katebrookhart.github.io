document.addEventListener("DOMContentLoaded", function() {
  // Ensure the case-study-page element exists before initializing the animations
  const caseStudyPage = document.querySelector(".case-study-page");

  if (caseStudyPage) {
    initScrollAnimations();
  }
});

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Parallax scrolling effect
  gsap.to('.case-study-page .parallax-bg', {
    yPercent: 20, // Moves the background by 20% vertically as the user scrolls
    ease: "none", // No easing, just smooth scroll
    scrollTrigger: {
      trigger: ".case-study-page #big-hero",
      scrub: true, // Sync the scroll position with the animation
      start: "top top", // Start when the top of the hero section reaches the top of the viewport
      end: "bottom top", // End when the bottom of the hero section reaches the top of the viewport
    }
  });

});

function initScrollAnimations() {
  // Parallax effect (images move up at different speeds)
  gsap.to(".case-study-page img.zoom-effect", {
    scrollTrigger: {
      trigger: ".case-study-page",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    y: -60,
    ease: "none",
  });

  // Zoom effect on each image individually
  const images = document.querySelectorAll(".case-study-page img.zoom-effect");

  images.forEach((image, index) => {
    gsap.from(image, {
      scrollTrigger: {
        trigger: image,
        start: "top 100%", // Start animation earlier
        end: "bottom top",
        scrub: 0.5, // Reduce scrub for faster animation
      },
      scale: 0.95, // Less aggressive zoom for a more natural effect
      opacity: 0.80,
      duration: 0.6, // Speed up the fade-in effect
      ease: "power2.out",
    });
  });
}



// PARALLAX
document.addEventListener("scroll", function () {
    document.querySelectorAll("[data-speed]").forEach(el => {
        let speed = el.getAttribute("data-speed");
        let yPos = window.scrollY * speed;
        el.style.transform = `translateY(${yPos}px)`;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 } // Trigger earlier (10% visible)
    );

    fadeInElements.forEach((element) => {
        observer.observe(element);

        // 👇 If element is already visible on load, trigger immediately
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add("visible");
        }
    });
});




// HEADER & MOBILE MENU
document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear(); // Get the current year
    const yearElements = document.querySelectorAll(".year"); // Select all elements with the 'year' class

    // Set the text content of each element to the current year
    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });

    // Scroll effect for header
    const header = document.getElementById("main-header");
    const logo = document.getElementById("header-logo");
    const body = document.body;

    // Check if we're on the case study page
    const isCaseStudyPage = body.classList.contains("case-study-page");

    // Set the initial logo based on the page
    const defaultLogo = isCaseStudyPage
        ? "img/golden-bear-logo-full-white.png"
        : "img/golden-bear-logo-full-gold.png";

    const scrolledLogo = "img/golden-bear-logo.png"; // Logo used after scroll

    logo.src = defaultLogo; // Set the correct initial logo

    let hasSlid = false;

    function checkScroll() {
        const headerHeight = header.offsetHeight;
        const currentScrollY = window.scrollY;

        // When scrolling down
        if (currentScrollY > headerHeight && !hasSlid) {
            header.classList.add("sticky"); // Apply sticky class

            // Slide header down into view
            gsap.set(header, {
                top: -headerHeight, // Start above the screen
                opacity: 0,
            });

            gsap.to(header, {
                duration: 0.3,
                top: -1,  // Slide header into view
                opacity: 1,  // Fade in
                backgroundColor: "rgba(255, 255, 255, 0.95)", // Ensure background is visible
                ease: "power1.out"
            });

            gsap.to(logo, {
                duration: 0.3,
                ease: "ease.inOut"
            });

            logo.src = scrolledLogo; // Switch to the scrolled logo
            hasSlid = true;

        // When scrolling up
        } else if (currentScrollY <= headerHeight && hasSlid && currentScrollY > 0) {
            header.classList.add("sticky"); // Keep it sticky
            header.classList.remove("relative");

            gsap.to(header, {
                duration: 0.3,
                opacity: 1,
                ease: "power1.out"
            });

            gsap.to(logo, {
                duration: 0.3,
                ease: "ease.inOut"
            });

            logo.src = scrolledLogo; // Switch to the scrolled logo
        }

        // When at the very top (scrollY === 0), fade out the background before removing the class
        if (currentScrollY === 0) {
            gsap.to(header, {
                duration: 0.3,
                backgroundColor: "rgba(255, 255, 255, 0)", // Fade out background
                ease: "power1.out",
                onComplete: function () {
                    header.classList.remove("sticky"); // Remove sticky class after fade
                    header.classList.add("relative");
                }
            });

            gsap.to(logo, {
                duration: 0.3,
                ease: "ease.inOut"
            });

            logo.src = defaultLogo; // Restore the original logo based on the page

            hasSlid = false; // Reset scroll state
        }
    }

    checkScroll();
    window.addEventListener("scroll", checkScroll);

    // Mobile menu behaviour
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("mobile-menu-close");

    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.add("open");
        body.classList.add("mobile-menu-open");
    });

    closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        body.classList.remove("mobile-menu-open");
    });
});



// IMAGE SLIDER

document.addEventListener('DOMContentLoaded', function () {
  // Select all sliders and draggable containers
  const sliders = document.querySelectorAll('.scroll-slider');
  const draggableContainers = document.querySelectorAll('.draggable-container');

  // Loop through each draggable container and its corresponding slider
  draggableContainers.forEach(function (draggableContainer, index) {
    const slider = sliders[index]; // Get the corresponding slider
    const draggableWrapper = draggableContainer.querySelector('.draggable-wrapper');
    
    // Set the max scroll value based on the container's scroll width
    slider.max = draggableContainer.scrollWidth - draggableContainer.clientWidth;

    // Listen for slider input changes
    slider.addEventListener('input', function () {
      draggableContainer.scrollLeft = slider.value; // Adjust scroll position based on slider value
    });

    let initialTouchX = null;

    // Prevent horizontal scrolling but allow vertical scrolling
    draggableContainer.addEventListener('touchstart', function (e) {
      // Only prevent horizontal scroll if the user starts interacting horizontally
      if (e.touches.length > 1) {
        return; // Allow multi-touch or other gestures
      }

      // Disable horizontal scrolling
      const touch = e.touches[0];
      initialTouchX = touch.pageX;
    });

    draggableContainer.addEventListener('touchmove', function (e) {
      const touch = e.touches[0];
      const diffX = touch.pageX - initialTouchX;

      if (Math.abs(diffX) > 5) {
        e.preventDefault(); // Prevent horizontal scrolling
      } else {
        return; // Allow vertical scroll
      }
    });

    // Allow vertical scroll on page (not on the image itself)
    draggableContainer.addEventListener('touchend', function (e) {
      // Reset initial touch when the user stops interacting
      initialTouchX = null;
    });
  });
});







// BIG HERO NEGATIVE MARGIN-TOP ADJUSTMENT
function adjustHeroMargin() {
    const header = document.getElementById("main-header");
    const hero = document.getElementById("big-hero");

    if (header && hero) {
        hero.style.marginTop = `-${header.offsetHeight}px`;
    }
}

// Run on page load and window resize
window.addEventListener("load", adjustHeroMargin);
window.addEventListener("resize", adjustHeroMargin);
