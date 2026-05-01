// =====================================================
// NGO WEBSITE JAVASCRIPT UPGRADES - FINAL YEAR PROJECT
// Add these functions to your existing script.js
// =====================================================

// ========== FEATURE 3: DARK MODE TOGGLE ==========
function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle.querySelector('i');
    
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode');
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle?.querySelector('i');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
});


// ========== FEATURE 2: LIVE DONATION TICKER ==========
const tickerDonations = [
    'Priya Sharma donated ₹5,000 just now ❤️',
    'Rajesh Kumar donated ₹2,000 • 2 mins ago',
    'Anonymous donated ₹10,000 • 5 mins ago',
    'Sneha Patel donated ₹3,000 • 10 mins ago',
    'Amit Verma donated ₹1,500 • 15 mins ago',
    'Kavita Singh donated ₹7,500 • 20 mins ago',
    'Rohan Malhotra donated ₹4,000 • 25 mins ago'
];

function initializeTicker() {
    const tickerContent = document.getElementById('tickerContent');
    if (!tickerContent) return;
    
    // Duplicate content for seamless loop
    const allDonations = [...tickerDonations, ...tickerDonations];
    
    allDonations.forEach(donation => {
        const item = document.createElement('div');
        item.className = 'ticker-item';
        item.innerHTML = `<i class="fas fa-heart"></i> ${donation}`;
        tickerContent.appendChild(item);
    });
}

function addToTicker(name, amount) {
    const newDonation = `${name} donated ₹${amount.toLocaleString('en-IN')} just now ❤️`;
    tickerDonations.unshift(newDonation);
    if (tickerDonations.length > 10) tickerDonations.pop();
    
    // Refresh ticker
    const tickerContent = document.getElementById('tickerContent');
    if (tickerContent) {
        tickerContent.innerHTML = '';
        initializeTicker();
    }
}

// Initialize ticker on load
window.addEventListener('DOMContentLoaded', initializeTicker);


// ========== FEATURE 1: DONOR LEADERBOARD ==========
let donorLeaderboard = [
    { name: 'Rajesh Kumar & Family', amount: 50000, donations: 12 },
    { name: 'Priya Sharma', amount: 35000, donations: 8 },
    { name: 'Anonymous Donor', amount: 30000, donations: 5 },
    { name: 'Amit Verma Foundation', amount: 25000, donations: 15 },
    { name: 'Sneha & Arjun Patel', amount: 20000, donations: 10 }
];

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    // Sort by amount (highest first)
    donorLeaderboard.sort((a, b) => b.amount - a.amount);
    
    // Keep top 5
    const topDonors = donorLeaderboard.slice(0, 5);
    
    leaderboardList.innerHTML = '';
    
    topDonors.forEach((donor, index) => {
        const rank = index + 1;
        const item = document.createElement('div');
        item.className = `leaderboard-item rank-${rank}`;
        
        item.innerHTML = `
            <div class="leaderboard-rank">${rank === 1 ? '🏆' : rank}</div>
            <div class="leaderboard-donor-info">
                <div class="leaderboard-donor-name">${donor.name}</div>
                <div class="leaderboard-donor-count">${donor.donations} donations made</div>
            </div>
            <div class="leaderboard-amount">₹${donor.amount.toLocaleString('en-IN')}</div>
        `;
        
        leaderboardList.appendChild(item);
    });
}

function addToLeaderboard(name, amount) {
    // Check if donor exists
    const existingDonor = donorLeaderboard.find(d => d.name === name);
    
    if (existingDonor) {
        existingDonor.amount += amount;
        existingDonor.donations += 1;
    } else {
        donorLeaderboard.push({
            name: name,
            amount: amount,
            donations: 1
        });
    }
    
    updateLeaderboard();
}

// Initialize leaderboard on load
window.addEventListener('DOMContentLoaded', updateLeaderboard);


// ========== FEATURE 9: IMPACT GROWTH CHART ==========
let impactChart = null;

function initializeImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;
    
    // Simulated monthly data
    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        donations: [45000, 52000, 48000, 65000, 70000, 85000, 92000, 88000, 95000, 110000, 120000, 135000]
    };
    
    impactChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.labels,
            datasets: [{
                label: 'Monthly Donations (₹)',
                data: monthlyData.donations,
                borderColor: '#1e40af',
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#fbbf24',
                pointBorderColor: '#1e40af',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 14, family: 'Poppins' },
                        color: '#111827'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 64, 175, 0.9)',
                    titleFont: { size: 14, family: 'Poppins' },
                    bodyFont: { size: 13, family: 'Poppins' },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value/1000) + 'K';
                        },
                        font: { family: 'Poppins' }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                    ticks: { font: { family: 'Poppins' } },
                    grid: { display: false }
                }
            }
        }
    });
}

// Initialize chart on load
window.addEventListener('DOMContentLoaded', function() {
    // Wait for Chart.js to load
    setTimeout(initializeImpactChart, 500);
});


// ========== FEATURE 6: VOLUNTEER ENHANCEMENTS ==========
function initializeVolunteerEnhancements() {
    const volunteerForm = document.getElementById('volunteerForm');
    const volSkills = document.getElementById('volSkills');
    const volAdditionalSkills = document.getElementById('volAdditionalSkills');
    const skillSuggestion = document.getElementById('skillSuggestion');
    const suggestionText = document.getElementById('suggestionText');
    
    // Skill-based suggestion
    if (volSkills && skillSuggestion && suggestionText) {
        volSkills.addEventListener('change', function() {
            const selected = this.value;
            let suggestion = '';
            
            if (selected === 'Education') {
                suggestion = '💡 Great! Your education skills can help children in our scholarship programs.';
            } else if (selected === 'Healthcare') {
                suggestion = '💡 Excellent! We need healthcare volunteers for our medical camps.';
            } else if (selected === 'Food Distribution') {
                suggestion = '💡 Perfect! You can help distribute meals to families in need.';
            } else if (selected === 'Fundraising') {
                suggestion = '💡 Amazing! Your fundraising skills will help us reach more people.';
            } else if (selected === 'Social Media') {
                suggestion = '💡 Wonderful! Help us spread awareness through social media campaigns.';
            }
            
            if (suggestion) {
                suggestionText.textContent = suggestion;
                skillSuggestion.style.display = 'flex';
            } else {
                skillSuggestion.style.display = 'none';
            }
        });
    }
    
    // Additional skills enhancement
    if (volAdditionalSkills) {
        volAdditionalSkills.addEventListener('change', function() {
            const selected = Array.from(this.selectedOptions).map(opt => opt.value);
            
            if (selected.includes('Medical') && skillSuggestion && suggestionText) {
                suggestionText.textContent = '🏥 Medical skills detected! Consider joining our Healthcare program.';
                skillSuggestion.style.display = 'flex';
            }
        });
    }
    
    // Update volunteer counter from localStorage
    updateVolunteerCounter();
}

function updateVolunteerCounter() {
    const counter = document.getElementById('totalVolunteers');
    if (!counter) return;
    
    let volunteers = localStorage.getItem('totalVolunteers');
    if (!volunteers) {
        volunteers = Math.floor(Math.random() * 50) + 20; // Random initial count
        localStorage.setItem('totalVolunteers', volunteers);
    }
    
    // Animate counter
    animateCounter(counter, 0, parseInt(volunteers), 1500);
}

function animateCounter(element, start, end, duration) {
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Update volunteer form submission
const originalVolunteerSubmission = handleVolunteerSubmission;
handleVolunteerSubmission = function() {
    originalVolunteerSubmission();
    
    // Increment volunteer counter
    let volunteers = parseInt(localStorage.getItem('totalVolunteers') || 0);
    volunteers += 1;
    localStorage.setItem('totalVolunteers', volunteers);
    updateVolunteerCounter();
    
    // Save volunteer data
    const volunteerData = {
        name: document.getElementById('volName').value,
        email: document.getElementById('volEmail').value,
        skills: document.getElementById('volSkills').value,
        experience: document.getElementById('volExperience')?.value,
        timestamp: new Date().toISOString()
    };
    
    let volunteers_list = JSON.parse(localStorage.getItem('volunteers') || '[]');
    volunteers_list.push(volunteerData);
    localStorage.setItem('volunteers', JSON.stringify(volunteers_list));
};

// Initialize on load
window.addEventListener('DOMContentLoaded', initializeVolunteerEnhancements);


// ========== FEATURE 8: RECURRING DONATION ==========
function initializeRecurringDonation() {
    const recurringCheckbox = document.getElementById('recurringDonation');
    const recurringInfo = document.getElementById('recurringInfo');
    const recurringAmount = document.getElementById('recurringAmount');
    const donationAmount = document.getElementById('donationAmount');
    
    if (recurringCheckbox && recurringInfo && recurringAmount) {
        recurringCheckbox.addEventListener('change', function() {
            if (this.checked) {
                recurringInfo.style.display = 'block';
                const amount = donationAmount?.value || 0;
                recurringAmount.textContent = parseInt(amount).toLocaleString('en-IN');
            } else {
                recurringInfo.style.display = 'none';
            }
        });
    }
    
    if (donationAmount && recurringAmount) {
        donationAmount.addEventListener('input', function() {
            if (recurringCheckbox?.checked) {
                recurringAmount.textContent = parseInt(this.value || 0).toLocaleString('en-IN');
            }
        });
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initializeRecurringDonation);


// ========== FEATURE 7: DONATION RECEIPT ==========
function generateTransactionID() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TXN${timestamp}${random}`;
}

function showDonationReceipt(donorData) {
    const modal = document.getElementById('receiptModal');
    if (!modal) return;
    
    // Populate receipt data
    document.getElementById('receiptTxnId').textContent = generateTransactionID();
    document.getElementById('receiptName').textContent = donorData.name;
    document.getElementById('receiptEmail').textContent = donorData.email;
    document.getElementById('receiptAmount').textContent = '₹' + donorData.amount.toLocaleString('en-IN');
    document.getElementById('receiptCause').textContent = donorData.cause;
    document.getElementById('receiptPayment').textContent = donorData.paymentMethod;
    
    const now = new Date();
    document.getElementById('receiptDateTime').textContent = now.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Show recurring status if applicable
    const recurringStatus = document.getElementById('receiptRecurring');
    if (donorData.recurring && recurringStatus) {
        recurringStatus.style.display = 'flex';
    } else if (recurringStatus) {
        recurringStatus.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function downloadReceipt() {
    showNotification('Receipt download started! (Simulated for demo)', 'success');
    // In production, you would generate a PDF here
}

// Update donation submission to show receipt
const originalDonationSubmission = handleDonationSubmission;
handleDonationSubmission = function() {
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const amount = parseInt(document.getElementById('donationAmount').value);
    const cause = document.getElementById('donationCause').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const recurring = document.getElementById('recurringDonation')?.checked || false;
    
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
    
    // Add to leaderboard
    addToLeaderboard(name, amount);
    
    // Add to ticker
    addToTicker(name, amount);
    
    // Close donation modal
    closeDonateModal();
    
    // Show receipt
    setTimeout(() => {
        showDonationReceipt({
            name: name,
            email: email,
            amount: amount,
            cause: cause,
            paymentMethod: paymentMethod,
            recurring: recurring
        });
    }, 500);
    
    // Reset form
    document.getElementById('donationForm').reset();
};


// ========== FEATURE 10: SCROLL REVEAL ANIMATIONS ==========
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.cause-card, .stat-card, .story-card, .impact-item, .leaderboard-item');
    
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initializeScrollReveal);


// ========== FEATURE 4: ANIMATED STATISTICS (Enhanced) ==========
// This enhances the existing counter animation to trigger only once on scroll
function initializeEnhancedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                let current = 0;
                
                counter.classList.add('counted');
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString('en-IN');
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.textContent = target.toLocaleString('en-IN');
                    }
                };
                
                updateCounter();
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counter.textContent = '0';
        observer.observe(counter);
    });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initializeEnhancedCounters);


// ========== CONSOLE MESSAGE ==========
console.log('%c🎓 NGO Website - Final Year Project Level ', 'background: #1e40af; color: #fbbf24; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c✨ Features Added: Dark Mode, Leaderboard, Ticker, Charts, Receipts, Recurring Donations ', 'color: #1e40af; font-size: 12px; padding: 5px;');
