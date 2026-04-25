/* 
 * Apex International School - JavaScript
 * Handles interactions and simple animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

    const toggleMenu = () => {
        mobileBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Optional: prevents background scrolling
    };

    mobileBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust to trigger a bit earlier
            if (scrollY >= (sectionTop - header.offsetHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Number Counter Animation (Stats Section) ---
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to speed up
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Intersection Observer for triggering counters only when visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible
        
        observer.observe(statsSection);
    }
});
