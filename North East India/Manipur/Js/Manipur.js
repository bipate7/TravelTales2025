/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

        // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').style.opacity = '0';
                document.getElementById('preloader').style.visibility = 'hidden';
            }, 800);
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Fade-in on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Accordion
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });

        // Packages Carousel Auto-scroll
        const carousel = document.getElementById('packagesCarousel');
        let scrollAmount = 0;
        let autoScroll;

        const startAutoScroll = () => {
            autoScroll = setInterval(() => {
                scrollAmount += 1;
                if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                    scrollAmount = 0;
                }
                carousel.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }, 5000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScroll);
        };

        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
        startAutoScroll();

        // Dot Navigation
        const dots = document.querySelectorAll('.carousel-dot');
        carousel.addEventListener('scroll', () => {
            const scrollPos = carousel.scrollLeft;
            const cardWidth = 380; // 350 + 30 gap
            const index = Math.round(scrollPos / cardWidth);
            
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                carousel.scrollTo({
                    left: i * 380,
                    behavior: 'smooth'
                });
            });
        });

        // Ambient Sound (Pena Music)
        const soundToggle = document.getElementById('soundToggle');
        const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_89a4b6c69c.mp3?filename=ambient-himalayan-flute-11294.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        let isPlaying = false;

        soundToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audio.play().catch(e => console.log("Audio autoplay blocked"));
                soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            isPlaying = !isPlaying;
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Stats Counter Animation
        const animateCounter = (element, target, duration) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + (target === 99 ? '%' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + (target === 99 ? '%' : '');
                }
            }, 16);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(document.getElementById('stat1'), 500, 2000);
                    animateCounter(document.getElementById('stat2'), 12, 1500);
                    animateCounter(document.getElementById('stat3'), 8, 1500);
                    animateCounter(document.getElementById('stat4'), 99, 2000);
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        statsObserver.observe(document.querySelector('.stats-section'));
