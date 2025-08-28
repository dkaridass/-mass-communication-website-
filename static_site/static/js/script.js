// Modern JavaScript with Video Background System and Smooth Scrolling for Mass Communication Website

document.addEventListener('DOMContentLoaded', function() {
    // Disable smooth scrolling for better video performance
    let lenis = null;
    console.log('Using native browser scrolling for optimal video performance');

    // Console branding
    console.log('%c🚀 Good connection detected. Enabling video backgrounds.', 'color: #2563eb; font-size: 12px; font-weight: 600;');
    console.log('%cMass Communication', 'color: #000; font-size: 24px; font-weight: 700; font-family: Inter, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);');
    console.log('%cDirection créative & production — Lubumbashi, RDC', 'color: #6b7280; font-size: 14px; font-family: Inter, sans-serif;');
    // NEW FLOATING NAVIGATION functionality
    const floatingNav = document.getElementById('floating-nav');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Mobile navigation toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingNav.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // Old navigation compatibility (removed)
    const nav = floatingNav;

    // Video background elements
    // Hero section is now clean/minimal - no video
    const servicesVideo = document.querySelector('.services-video');
    const contactVideo = document.querySelector('.contact-video');
    const serviceItemVideo = document.querySelector('.service-item-video');
    const backgroundImages = document.querySelectorAll('.section-bg-image');

    // Live time update for minimalist header
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', { 
            timeZone: 'Africa/Lubumbashi',
            hour12: false 
        }) + ' GMT+2';
        const timeElement = document.getElementById('live-time');
        if (timeElement) {
            timeElement.textContent = timeStr;
        }
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

    // Initialize video backgrounds
    initializeVideoBackgrounds();
    initializeImageBackgrounds();

    // Initialize Hau Studio contact functionality
    initializeContactSection();
    
    // Work item click functionality for portfolio
    const portfolioWorkItems = document.querySelectorAll('.work-item-hau[data-project]');
    portfolioWorkItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            // Redirect to portfolio page with project highlight
            window.location.href = `portfolio.html#${projectId}`;
        });
    });

    // Removed old mobile menu toggle - now handled by new floating nav

    // Smooth scrolling for navigation links using Lenis
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header scroll effect and back to top button
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.pageYOffset;
        
        // Header opacity based on scroll
        if (scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(15px)';
            backToTop.classList.add('show');
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
            backToTop.classList.remove('show');
        }

        // Update active navigation link
        updateActiveNavLink();
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], main[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollTop = window.pageYOffset;
        const navHeight = nav.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        const hauNavLinks = document.querySelectorAll('.hau-nav-link');
        hauNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Back to top button functionality
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Video background initialization and management
    function initializeVideoBackgrounds() {
        // Check if videos should be disabled on mobile
        const isMobile = window.innerWidth <= 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isLowBandwidth = navigator.connection && navigator.connection.effectiveType && 
                              (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');

        if (isMobile || prefersReducedMotion || isLowBandwidth) {
            // Disable videos and use fallback images
            disableVideos();
            return;
        }

        // Initialize videos with staggered loading for better performance
        setTimeout(() => initializeVideo(servicesVideo, 'services'), 100);
        setTimeout(() => initializeVideo(contactVideo, 'contact'), 300);
        setTimeout(() => initializeVideo(serviceItemVideo, 'service-item'), 500);
    }

    function initializeVideo(video, sectionName) {
        if (!video) {
            console.warn(`${sectionName} video element not found`);
            return;
        }

        // Force video to be visible immediately
        video.style.opacity = '1';
        video.style.display = 'block';
        video.classList.add('loaded');

        console.log(`Initializing ${sectionName} video:`, video.src);
        console.log(`Video element:`, video);
        console.log(`Video container:`, video.parentElement);

        // Handle video loading
        video.addEventListener('loadstart', () => {
            console.log(`Loading ${sectionName} video...`);
            video.style.opacity = '1';
        });

        video.addEventListener('canplaythrough', () => {
            video.classList.add('loaded');
            video.style.opacity = '1';
            console.log(`${sectionName} video loaded successfully`);
        });

        video.addEventListener('loadeddata', () => {
            video.style.opacity = '1';
            video.classList.add('loaded');
            console.log(`${sectionName} video data loaded`);
        });

        video.addEventListener('error', (e) => {
            console.warn(`${sectionName} video failed to load:`, e);
            console.warn(`Video error code:`, video.error ? video.error.code : 'Unknown');
            console.warn(`Video error message:`, video.error ? video.error.message : 'Unknown');
            handleVideoError(video, sectionName);
        });

        // Force play after a short delay
        setTimeout(() => {
            video.play().catch(err => console.warn(`${sectionName} video autoplay failed:`, err));
        }, 100);

        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (video.paused) {
                        video.play().catch(e => {
                            console.warn(`Failed to play ${sectionName} video:`, e);
                            handleVideoError(video, sectionName);
                        });
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(video.closest('.section') || video.closest('.hero'));
    }

    function handleVideoError(video, sectionName) {
        // Hide the video and show fallback
        video.style.display = 'none';
        
        // Set fallback background image
        const section = video.closest('.section') || video.closest('.hero');
        const fallbackImage = video.getAttribute('data-fallback');
        
        if (section && fallbackImage) {
            section.style.backgroundImage = `url('${fallbackImage}')`;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center';
            section.style.backgroundAttachment = 'fixed';
        }
    }

    function disableVideos() {
        // Hide all videos
        [servicesVideo, contactVideo, serviceItemVideo].forEach(video => {
            if (video) {
                video.style.display = 'none';
                video.pause();
                
                // Set fallback backgrounds
                const section = video.closest('.section') || video.closest('.hero');
                const fallbackImage = video.getAttribute('data-fallback');
                
                if (section && fallbackImage) {
                    section.style.backgroundImage = `url('${fallbackImage}')`;
                    section.style.backgroundSize = 'cover';
                    section.style.backgroundPosition = 'center';
                }
            }
        });
    }

    // Image background initialization
    function initializeImageBackgrounds() {
        backgroundImages.forEach(img => {
            // Lazy load images
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.addEventListener('load', () => {
                            image.classList.add('loaded');
                        });
                        
                        image.addEventListener('error', () => {
                            console.warn('Background image failed to load:', image.src);
                            image.style.display = 'none';
                        });
                        
                        observer.unobserve(image);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '100px'
            });
            
            observer.observe(img);
        });
    }

    // Work items enhanced hover effects
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
    });

    // Service items enhanced animations
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Stagger animation
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s ease-out';
        
        observer.observe(item);
    });

    // Contact form enhancement
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalBtnText = submitBtn.textContent;
        
        contactForm.addEventListener('submit', function(e) {
            // Add loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            
            // Form validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                    field.style.boxShadow = '0 0 0 1px #ef4444';
                } else {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && emailField.value && !emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#ef4444';
                emailField.style.boxShadow = '0 0 0 1px #ef4444';
            }
            
            if (!isValid) {
                e.preventDefault();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.opacity = '1';
                
                // Show error message
                showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
            }
        });
        
        // Real-time validation for form inputs
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                this.style.boxShadow = '0 0 0 1px rgba(255, 255, 255, 0.8)';
                this.style.background = 'rgba(255, 255, 255, 0.15)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                this.style.boxShadow = '';
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                    this.style.boxShadow = '0 0 0 1px #ef4444';
                }
                
                // Email validation
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.style.borderColor = '#ef4444';
                        this.style.boxShadow = '0 0 0 1px #ef4444';
                    }
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(239, 68, 68)') {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    this.style.boxShadow = '';
                }
            });
        });
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 500px;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let heroScrolled = false;
        
        function updateHeroParallax() {
            if (!heroScrolled) {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;
                const scrollRatio = Math.min(scrolled / heroHeight, 1);
                
                // Subtle parallax movement
                // Hero section is now clean/minimal - no video effects
                
                // Fade effect
                hero.style.opacity = Math.max(1 - scrollRatio * 0.5, 0.5);
                
                heroScrolled = false;
            }
        }
        
        window.addEventListener('scroll', () => {
            if (!heroScrolled && window.innerWidth > 768) {
                requestAnimationFrame(updateHeroParallax);
                heroScrolled = true;
            }
        });
    }

    // Statistics counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 60; // 60 frames for smooth animation
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            // Intersection Observer for counter animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(counter);
        });
    }

    animateCounters();

    // Automatic video/image detection and integration
    function detectAndIntegrateAssets() {
        const videoFiles = [
            'static/videos/hero-bg.mp4',
            'static/videos/services-bg.mp4',
            'static/videos/contact-bg.mp4'
        ];
        
        const imageFiles = [
            'static/images/hero/hero-fallback.jpg',
            'static/images/services/services-fallback.jpg',
            'static/images/contact/contact-fallback.jpg',
            'static/images/about/about-bg.jpg',
            'static/images/cases/work-bg.jpg'
        ];

        // Check for new video files
        videoFiles.forEach(videoPath => {
            fetch(videoPath, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        console.log(`✅ Video detected: ${videoPath}`);
                        // Reinitialize video backgrounds if new videos are found
                        setTimeout(() => {
                            initializeVideoBackgrounds();
                        }, 1000);
                    }
                })
                .catch(() => {
                    console.log(`⏳ Video not found: ${videoPath} - Upload your video here for automatic integration`);
                });
        });

        // Check for new image files
        imageFiles.forEach(imagePath => {
            const img = new Image();
            img.onload = () => {
                console.log(`✅ Image detected: ${imagePath}`);
            };
            img.onerror = () => {
                console.log(`⏳ Image not found: ${imagePath} - Upload your image here for automatic integration`);
            };
            img.src = imagePath;
        });
    }

    // Run asset detection
    detectAndIntegrateAssets();

    // Recheck for new assets every 10 seconds
    setInterval(detectAndIntegrateAssets, 10000);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('🚀 LCP:', entry.startTime + 'ms');
                    
                    // If LCP is slow, consider reducing video quality
                    if (entry.startTime > 4000) {
                        console.warn('⚠️ Slow loading detected. Consider optimizing video files.');
                    }
                }
            });
        });
        
        try {
            perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Silently fail on browsers that don't support this
        }
    }

    // Connection quality detection
    if (navigator.connection) {
        const connection = navigator.connection;
        
        function handleConnectionChange() {
            const effectiveType = connection.effectiveType;
            
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                console.warn('🐌 Slow connection detected. Disabling video backgrounds.');
                disableVideos();
            } else if ((effectiveType === '3g' || effectiveType === '4g') && window.innerWidth > 768) {
                console.log('🚀 Good connection detected. Enabling video backgrounds.');
                initializeVideoBackgrounds();
            }
        }
        
        connection.addEventListener('change', handleConnectionChange);
        handleConnectionChange(); // Check initial connection
    }

    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reinitialize video backgrounds on significant size changes
            if (Math.abs(window.innerWidth - lastWidth) > 100) {
                initializeVideoBackgrounds();
                lastWidth = window.innerWidth;
            }
        }, 250);
    });
    
    let lastWidth = window.innerWidth;

    // Add loading states management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading indicators
        const loadingElements = document.querySelectorAll('[data-loading]');
        loadingElements.forEach(el => {
            el.removeAttribute('data-loading');
        });
        
        console.log('🎉 Mass Communication website loaded successfully!');
    });

    // Console branding
    console.log(
        '%cMass Communication',
        'color: #000; font-size: 24px; font-weight: 700; font-family: Inter, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
    );
    console.log(
        '%cDirection créative & production — Lubumbashi, RDC',
        'color: #6b7280; font-size: 14px; font-family: Inter, sans-serif;'
    );
    console.log(
        '%c🎬 Premium video backgrounds ready! Upload your videos to see them automatically integrated.',
        'color: #2563eb; font-size: 12px; font-weight: 600;'
    );
});

// Utility functions for external use
window.MassCommunication = {
    scrollToSection: function(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const nav = document.getElementById('header');
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    showNotification: function(message, type = 'info') {
        const event = new CustomEvent('showNotification', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    },
    
    // Check video support and status
    checkVideoStatus: function() {
        const videos = {
            hero: document.querySelector('.hero-video'),
            services: document.querySelector('.services-video'),
            contact: document.querySelector('.contact-video')
        };
        
        Object.entries(videos).forEach(([name, video]) => {
            if (video) {
                const isLoaded = video.classList.contains('loaded');
                const isPlaying = !video.paused;
                console.log(`${name} video: ${isLoaded ? '✅ Loaded' : '⏳ Loading'}, ${isPlaying ? '▶️ Playing' : '⏸️ Paused'}`);
            } else {
                console.log(`${name} video: ❌ Not found`);
            }
        });
    }
};

// Hau Studio Contact Section Functionality
function initializeContactSection() {
    const contactButton = document.querySelector('.hau-contact-button');
    const contactFormSection = document.querySelector('.contact-form-section');
    const contactInfoSection = document.querySelector('.contact-info-section');
    
    if (contactButton && contactFormSection) {
        contactButton.addEventListener('click', function() {
            // Toggle form visibility
            const isFormVisible = contactFormSection.style.display !== 'none';
            
            if (isFormVisible) {
                // Hide form, show info
                contactFormSection.style.display = 'none';
                contactInfoSection.style.display = 'block';
                contactButton.textContent = 'PRENDRE CONTACT';
            } else {
                // Show form, hide info sections temporarily
                contactFormSection.style.display = 'block';
                contactInfoSection.style.display = 'none';
                contactButton.textContent = 'ANNULER';
                
                // Focus on first input
                const firstInput = contactFormSection.querySelector('input[type="text"]');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 100);
                }
            }
        });
    }
    
    // Handle form submission for Netlify Forms
    const contactForm = document.querySelector('.hau-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Show success message
            const successMessage = document.getElementById('contact-success');
            const errorMessage = document.getElementById('contact-error');
            
            if (successMessage) {
                successMessage.style.display = 'block';
                // Hide after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
            
            // Reset form
            contactForm.reset();
            
            // Hide form and show info
            contactFormSection.style.display = 'none';
            contactInfoSection.style.display = 'block';
            contactButton.textContent = 'PRENDRE CONTACT';
            
            console.log('Contact form submitted to Netlify');
        });
    }
}