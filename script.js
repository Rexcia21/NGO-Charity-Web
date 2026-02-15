// ========================================
// HOPE FOUNDATION - NGO WEBSITE SCRIPTS
// Interactive Features & Functionality
// ========================================

// ========== GLOBAL VARIABLES ==========
let currentTestimonial = 0;
let testimonialInterval;
const campaignGoal = 360000;
let totalRaised = 240000;

// Recent donations data (simulated)
const recentDonations = [
    { name: 'Priya Sharma', amount: 5000, cause: 'Education', time: '2 hours ago' },
    { name: 'Rajesh Kumar', amount: 2000, cause: 'Healthcare', time: '5 hours ago' },
    { name: 'Anonymous', amount: 10000, cause: 'General Fund', time: '1 day ago' },
    { name: 'Amit Verma', amount: 1500, cause: 'Food Support', time: '1 day ago' },
    { name: 'Sneha Patel', amount: 3000, cause: 'Women Empowerment', time: '2 days ago' }
];

// Testimonials data
const testimonials = [
    {
        text: "Hope Foundation changed my life completely. Their education program helped me get a scholarship and now I'm pursuing my dreams. I'm forever grateful for their support and guidance.",
        name: "Rahul Kumar",
        role: "Scholarship Recipient",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
        text: "The medical camp organized by Hope Foundation saved my daughter's life. They provided free treatment when we had nowhere else to go. This organization is truly a blessing for our community.",
        name: "Meena Devi",
        role: "Healthcare Beneficiary",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
    },
    {
        text: "As a volunteer, I've witnessed firsthand the incredible impact this organization makes. Every donation, every hour volunteered, creates real, lasting change in people's lives.",
        name: "Sarah Johnson",
        role: "Volunteer Since 2022",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
        text: "Hope Foundation doesn't just provide food and shelter - they give people dignity and hope for a better tomorrow. Their holistic approach to community development is truly inspiring.",
        name: "Dr. Arvind Mehta",
        role: "Partner Organization",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    }
];

// ========== PAGE LOAD INITIALIZATION ==========
window.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeCounters();
    initializeProgress();
    initializeTestimonials();
    initializeDonationsList();
    initializeForms();
});

// ========== NAVIGATION ==========
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.substring(1));
            
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            if (nav) nav.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in animation
    const animatedElements = document.querySelectorAll('.cause-card, .stat-card, .story-card, .impact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== COUNTER ANIMATION ==========
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString('en-IN');
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.textContent = target.toLocaleString('en-IN');
                        counter.classList.add('counted');
                    }
                };
                
                updateCounter();
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ========== PROGRESS BAR ANIMATION ==========
function initializeProgress() {
    updateMainProgress();
    
    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function updateMainProgress() {
    const percentage = Math.min((totalRaised / campaignGoal) * 100, 100);
    const progressFill = document.getElementById('mainProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressFill && progressPercentage) {
        setTimeout(() => {
            progressFill.style.width = percentage + '%';
            progressPercentage.textContent = Math.floor(percentage) + '% Funded';
        }, 500);
    }
}

// ========== TESTIMONIALS CAROUSEL ==========
function initializeTestimonials() {
    const wrapper = document.getElementById('testimonialsWrapper');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!wrapper || !dotsContainer) return;
    
    // Create testimonial slides
    testimonials.forEach((testimonial, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.innerHTML = `
            <div class="testimonial-content">
                <i class="fas fa-quote-left quote-icon"></i>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    // Start automatic sliding
    startTestimonialAutoplay();
}

function changeTestimonial(direction) {
    const wrapper = document.getElementById('testimonialsWrapper');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    currentTestimonial += direction;
    
    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    } else if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    
    updateTestimonialDisplay();
    resetTestimonialAutoplay();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialDisplay();
    resetTestimonialAutoplay();
}

function updateTestimonialDisplay() {
    const wrapper = document.getElementById('testimonialsWrapper');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (wrapper) {
        wrapper.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

function resetTestimonialAutoplay() {
    clearInterval(testimonialInterval);
    startTestimonialAutoplay();
}

// ========== DONATIONS LIST ==========
function initializeDonationsList() {
    const donationsList = document.getElementById('donationsList');
    if (!donationsList) return;
    
    recentDonations.forEach(donation => {
        const donationItem = document.createElement('div');
        donationItem.className = 'donation-item';
        
        const initial = donation.name.charAt(0).toUpperCase();
        
        donationItem.innerHTML = `
            <div class="donor-info">
                <div class="donor-avatar">${initial}</div>
                <div class="donor-details">
                    <h4>${donation.name}</h4>
                    <p>${donation.cause} • ${donation.time}</p>
                </div>
            </div>
            <div class="donation-amount">₹${donation.amount.toLocaleString('en-IN')}</div>
        `;
        
        donationsList.appendChild(donationItem);
    });
}

function addNewDonation(name, amount, cause) {
    const newDonation = {
        name: name,
        amount: amount,
        cause: cause,
        time: 'Just now'
    };
    
    recentDonations.unshift(newDonation);
    if (recentDonations.length > 5) {
        recentDonations.pop();
    }
    
    // Refresh donations list
    const donationsList = document.getElementById('donationsList');
    if (donationsList) {
        donationsList.innerHTML = '';
        initializeDonationsList();
    }
}

// ========== DONATION MODAL ==========
function openDonateModal(cause = '') {
    const modal = document.getElementById('donateModal');
    const causeSelect = document.getElementById('donationCause');
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (cause && causeSelect) {
            causeSelect.value = cause;
        }
        
        // Add smooth entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'none';
            setTimeout(() => {
                modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 10);
        }
    }
}

function closeDonateModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function setAmount(amount) {
    const amountInput = document.getElementById('donationAmount');
    if (amountInput) {
        amountInput.value = amount;
    }
    
    // Highlight active button
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ========== FORM SUBMISSIONS ==========
function initializeForms() {
    // Volunteer Form
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleVolunteerSubmission();
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission();
        });
    }
    
    // Donation Form
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDonationSubmission();
        });
    }
}

function handleVolunteerSubmission() {
    const name = document.getElementById('volName').value;
    const email = document.getElementById('volEmail').value;
    const phone = document.getElementById('volPhone').value;
    const skills = document.getElementById('volSkills').value;
    const availability = document.getElementById('volAvailability').value;
    const message = document.getElementById('volMessage').value;
    
    // Validation
    if (!name || !email || !phone || !skills || !availability || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Success
    showNotification(`Thank you ${name}! Your volunteer application has been submitted successfully. We'll contact you soon.`, 'success');
    document.getElementById('volunteerForm').reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleContactSubmission() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Success
    showNotification(`Thank you ${name}! Your message has been sent. We'll get back to you within 24 hours.`, 'success');
    document.getElementById('contactForm').reset();
}

function handleNewsletterSubmission() {
    const email = document.getElementById('newsletterEmail').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Success
    showNotification('Successfully subscribed to our newsletter! Check your inbox for confirmation.', 'success');
    document.getElementById('newsletterForm').reset();
}

function handleDonationSubmission() {
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const amount = parseInt(document.getElementById('donationAmount').value);
    const cause = document.getElementById('donationCause').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    // Validation
    if (!name || !email || !amount || !paymentMethod) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (amount < 100) {
        showNotification('Minimum donation amount is ₹100', 'error');
        return;
    }
    
    // Process donation
    totalRaised += amount;
    document.getElementById('totalRaised').textContent = totalRaised.toLocaleString('en-IN');
    updateMainProgress();
    
    // Add to recent donations
    addNewDonation(name, amount, cause);
    
    // Success message
    showNotification(`Thank you ${name} for your generous donation of ₹${amount.toLocaleString('en-IN')}! Your contribution will make a real difference. ❤️`, 'success');
    
    // Reset form and close modal
    document.getElementById('donationForm').reset();
    closeDonateModal();
    
    // Scroll to impact section
    setTimeout(() => {
        scrollToSection('impact');
    }, 1000);
}

// ========== VALIDATION FUNCTIONS ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
    const notification = document.getElementById('successMessage');
    const text = document.getElementById('successText');
    
    if (!notification || !text) return;
    
    text.textContent = message;
    
    if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#10b981';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// ========== UTILITY FUNCTIONS ==========
// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('donateModal');
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
        closeDonateModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDonateModal();
    }
});

// ========== SMOOTH SCROLL ENHANCEMENT ==========
// Enhance scroll behavior for hero stats
const heroStats = document.querySelectorAll('.hero-stat-item');
heroStats.forEach((stat, index) => {
    stat.style.animationDelay = `${index * 0.1}s`;
});

// Add entrance animation to sections
const observeSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observeSections.observe(section);
});

// ========== CONSOLE MESSAGE ==========
console.log('%c Hope Foundation NGO Website ', 'background: #1e40af; color: #fbbf24; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Built with ❤️ for making a difference ', 'color: #1e40af; font-size: 14px; padding: 5px;');
console.log('%c Redesigned with premium UI/UX ', 'color: #fbbf24; font-size: 12px; padding: 5px;');
