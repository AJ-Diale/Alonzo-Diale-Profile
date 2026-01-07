// GSAP Preloader Animation
const tl = gsap.timeline();

tl.to(".progress", {
  width: "100%",
  duration: 2,
  ease: "power1.inOut",
});

tl.to(".loader-text", {
  text: "Loaded!",
  duration: 0.5,
  delay: -0.2,
  ease: "none"
});

tl.to(".preloader", {
  y: "-100%",
  duration: 1,
  ease: "power4.inOut",
  delay: 0.5
});

tl.to(".main", {
  opacity: 1,
  visibility: "visible",
  duration: 1,
  ease: "power2.out",
}, "-=0.5");

// Add this after your existing GSAP timeline
tl.fromTo(".border-wrapper", 
  { borderWidth: "0px", borderColor: "transparent" },
  { borderWidth: "6px", borderColor: "#00ff99", duration: 1, ease: "power2.out" },
  "-=0.3"
);

// ABOUT SECTION ANIMATIONS
gsap.from(".about-image", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  x: -80,
  opacity: 0,
  duration: 1.4,
  ease: "power3.out",
});

gsap.from(".about-content", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  x: 80,
  opacity: 0,
  duration: 1.4,
  ease: "power3.out",
});

gsap.from(".skills-grid span", {
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 85%",
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.08,
  ease: "power2.out"
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".about-image img", {
  x: -200,           // start off-screen to the left
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about-image img",
    start: "top 85%",   // animate when 85% of viewport height is hit
    toggleActions: "play none none reverse"
  }
});


window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  const heroHeight = document.querySelector(".hero").offsetHeight;

  if (window.scrollY > heroHeight - 100) {
    nav.style.background = "rgba(0, 0, 0, 0.55)"; /* Darker after hero */
  } else {
    nav.style.background = "none"; /* Original on home */
  }
});

// Select all navbar links
gsap.registerPlugin(ScrollToPlugin);
const navLogo = document.querySelector(".logo");
navLogo.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior

  gsap.to(window, {
    scrollTo: {
      y: 0 // scroll to top
    },
    duration: 1,       // animation duration in seconds
    ease: "power2.inOut"
  });
});


const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default jump

    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      gsap.to(window, {
        scrollTo: {
          y: targetEl,
          offsetY: 80 // adjust if you have fixed navbar height
        },
        duration: 1,       // animation duration
        ease: "power2.inOut"
      });
    }
  });
});


const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active from all
    timelineItems.forEach(i => i.classList.remove('active'));
    // Add active to clicked item
    item.classList.add('active');
  });

  // Optional: enable keyboard accessibility
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

  var form = document.getElementById("my-form");
  
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)
