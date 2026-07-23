// JavaScript utilities for the website

// Utility functions
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics (placeholder)
function trackEvent(eventName, properties) {
    console.log('Analytics Event:', eventName, properties);
    // Integrate with Google Analytics, Mixpanel, etc.
}

// Performance monitoring
function trackPageView() {
    trackEvent('Page View', {
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    window.addEventListener('load', trackPageView);
}
