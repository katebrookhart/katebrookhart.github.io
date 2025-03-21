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
      start: "top bottom", // Start when the top of the case-study-page hits the bottom of the viewport
      end: "bottom top",   // End when the bottom of the case-study-page hits the top of the viewport
      scrub: true,
    },
    y: -60, // Reduced the vertical movement to prevent overlap
    ease: "none",
  });

  // Zoom effect on each image individually
  const images = document.querySelectorAll(".case-study-page img.zoom-effect");
  
  images.forEach((image, index) => {
    gsap.from(image, {
      scrollTrigger: {
        trigger: image, // Apply to each image individually
        start: "top 80%", // Start zooming in when 80% of the image is in view
        end: "bottom top",
        scrub: true,
      },
      scale: 0.9, // Starts slightly smaller and zooms in
      opacity: 0,
      ease: "power3.out", // Smooth ease
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
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay using setTimeout
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, index * 100); // Adjust delay timing (e.g., 150ms per element)
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        { threshold: 0.25 } // Trigger when 10% of the element is visible
    );

    fadeInElements.forEach((element) => observer.observe(element));
});





// HEADER & MOBILE MENU
document.addEventListener("DOMContentLoaded", function () {
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




// BARBA TRANSITION
function init() {

    const loader = document.querySelector('.loader');

    // reset position of the loading screen
    gsap.set(loader, {
        scaleX: 0,
        rotation: 10,
        xPercent: -5,
        yPercent: -50,
        transformOrigin: 'left center',
        autoAlpha: 1
    });

    function loaderIn() {
        // GSAP tween to stretch the loading screen across the whole screen
        return gsap.fromTo(loader,
            {
                rotation: 10,
                scaleX: 0,
                xPercent: -5
            },
            {
                duration: 0.8,
                xPercent: 0,
                scaleX: 1,
                rotation: 0,
                ease: 'Power4.inOut',
                transformOrigin: 'left center'
            });
    }

    function loaderAway() {
        // GSAP tween to hide the loading screen
        return gsap.to(loader, {
            duration: 0.8,
            scaleX: 0,
            xPercent: 5,
            rotation: -10,
            transformOrigin: 'right center',
            ease: 'Power4.inOut'
        });
    }

    // do something before the transition starts
    barba.hooks.before(() => {
        document.querySelector('html').classList.add('is-transitioning');
        barba.wrapper.classList.add('is-animating');
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        document.querySelector('html').classList.remove('is-transitioning');
        barba.wrapper.classList.remove('is-animating');
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        transitions: [{
            async leave() {
                await loaderIn();
            },
            enter() {
                loaderAway();
            }
        }]
    });
}

window.addEventListener('load', function () {
    init();
});
