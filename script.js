// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// ==================== MENU INTERACTIONS ====================
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== DATE & TIME ====================
function updateDateTime() {
    const deploymentDate = document.getElementById('deploymentDate');
    const lastUpdated = document.getElementById('lastUpdated');
    
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    deploymentDate.textContent = now.toLocaleDateString('en-US', options);
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    lastUpdated.textContent = `${hours}:${minutes}`;
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

// ==================== REFRESH BUTTON ====================
const refreshBtn = document.getElementById('refreshBtn');
const activityLog = document.getElementById('activityLog');

refreshBtn.addEventListener('click', () => {
    // Add loading animation
    refreshBtn.style.transform = 'rotate(360deg)';
    refreshBtn.textContent = '⏳ Loading...';
    
    setTimeout(() => {
        // Add new activity
        const activities = [
            { icon: '🔄', title: 'Configuration Updated', time: 'Just now' },
            { icon: '📊', title: 'Metrics Refreshed', time: 'Just now' },
            { icon: '🔍', title: 'Health Check Passed', time: 'Just now' },
            { icon: '💾', title: 'Data Synchronized', time: 'Just now' }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.style.animation = 'slideUp 0.6s ease-out';
        newActivity.innerHTML = `
            <div class="activity-icon">${randomActivity.icon}</div>
            <div class="activity-content">
                <p class="activity-title">${randomActivity.title}</p>
                <p class="activity-time">${randomActivity.time}</p>
            </div>
        `;
        
        activityLog.insertBefore(newActivity, activityLog.firstChild);
        
        // Keep only last 5 activities
        while (activityLog.children.length > 5) {
            activityLog.removeChild(activityLog.lastChild);
        }
        
        refreshBtn.style.transform = '';
        refreshBtn.textContent = '🔄 Refresh';
        
        // Show success message
        showNotification('Data refreshed successfully!', 'success');
    }, 1000);
});

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== NAVIGATION LINKS ====================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const page = link.textContent.trim();
        showNotification(`Navigating to ${page}...`, 'info');
    });
});

// ==================== STAT CARDS ANIMATION ====================
const statCards = document.querySelectorAll('.stat-card');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== METRICS ANIMATION ====================
const metricFills = document.querySelectorAll('.metric-fill');

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

metricFills.forEach(fill => {
    metricsObserver.observe(fill);
});

// ==================== ACTIVITY LOG AUTO-UPDATE ====================
let activityCounter = 0;

function addRandomActivity() {
    activityCounter++;
    
    if (activityCounter % 5 === 0) { // Add activity every 5th interval (30 seconds)
        const activities = [
            { icon: '📈', title: 'Traffic Spike Detected', time: 'Just now' },
            { icon: '🔒', title: 'Security Scan Completed', time: 'Just now' },
            { icon: '💡', title: 'Optimization Suggested', time: 'Just now' },
            { icon: '🌐', title: 'CDN Cache Updated', time: 'Just now' }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.style.animation = 'slideUp 0.6s ease-out';
        newActivity.innerHTML = `
            <div class="activity-icon">${randomActivity.icon}</div>
            <div class="activity-content">
                <p class="activity-title">${randomActivity.title}</p>
                <p class="activity-time">${randomActivity.time}</p>
            </div>
        `;
        
        activityLog.insertBefore(newActivity, activityLog.firstChild);
        
        while (activityLog.children.length > 5) {
            activityLog.removeChild(activityLog.lastChild);
        }
    }
}

// Auto-update activities every 6 seconds
setInterval(addRandomActivity, 6000);

// ==================== USER PROFILE DROPDOWN ====================
const userProfile = document.querySelector('.user-profile');

userProfile.addEventListener('click', () => {
    showNotification('Profile settings coming soon!', 'info');
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Ctrl/Cmd + R for refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshBtn.click();
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INITIALIZATION MESSAGE ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        showNotification('Dashboard loaded successfully! 🚀', 'success');
    }, 500);
});

// ==================== PERFORMANCE MONITORING ====================
console.log('%c🚀 AWS Amplify Dashboard Loaded', 'color: #667eea; font-size: 16px; font-weight: bold');
console.log('%cKeyboard Shortcuts:', 'color: #48bb78; font-weight: bold');
console.log('  • Ctrl/Cmd + K: Toggle theme');
console.log('  • Ctrl/Cmd + R: Refresh data');

// ==================== RESPONSIVE SIDEBAR TOGGLE ====================
function createMobileMenu() {
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        let menuBtn = document.getElementById('mobile-menu-btn');
        
        if (!menuBtn) {
            menuBtn = document.createElement('button');
            menuBtn.id = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-primary);
                padding: 0.5rem;
            `;
            
            navbar.insertBefore(menuBtn, navbar.firstChild);
            
            menuBtn.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('active');
            });
        }
    }
}

createMobileMenu();
window.addEventListener('resize', createMobileMenu);