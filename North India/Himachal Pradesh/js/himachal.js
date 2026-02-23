/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Back to Top Button
        const backToTopBtn = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        // Smooth scrolling for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.section-title, .place, .package, .testimonial, .footer-col');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.animationPlayState = 'running';
                }
            });
        };
        
        // Initialize animations
        window.addEventListener('load', () => {
            animateOnScroll();
        });
        
        window.addEventListener('scroll', () => {
            animateOnScroll();
        });
        
        // Package carousel navigation
        const packagesContainer = document.querySelector('.packages-container');
        const scrollLeftBtn = document.createElement('button');
        const scrollRightBtn = document.createElement('button');
        
        scrollLeftBtn.className = 'scroll-btn left';
        scrollLeftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        scrollRightBtn.className = 'scroll-btn right';
        scrollRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        packagesContainer.parentNode.insertBefore(scrollLeftBtn, packagesContainer);
        packagesContainer.parentNode.insertBefore(scrollRightBtn, packagesContainer.nextSibling);
        
        scrollLeftBtn.addEventListener('click', () => {
            packagesContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            packagesContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        // Hide scroll buttons when at ends
        const checkScrollButtons = () => {
            scrollLeftBtn.style.display = packagesContainer.scrollLeft <= 10 ? 'none' : 'flex';
            scrollRightBtn.style.display = packagesContainer.scrollLeft >= 
                (packagesContainer.scrollWidth - packagesContainer.clientWidth - 10) ? 'none' : 'flex';
        };
        
        packagesContainer.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        checkScrollButtons();