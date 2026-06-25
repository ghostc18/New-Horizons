// EmailJS Lead Form Handler - Production Ready
// Configure at emailjs.com with:
// Service ID: service_xgvc5pa
// Template ID: template_7f7aqwc  
// Public Key: EisHia78uRV6zncJE

const EMAILJS_CONFIG = {
    serviceId: "service_xgvc5pa",
    templateId: "template_7f7aqwc",
    publicKey: "EisHia78uRV6zncJE",
    senderEmail: "isaiahjrod5@gmail.com"
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

function setLeadStatus(form, message, state) {
    const status = form.querySelector(".status");
    if (!status) {
        return;
    }

    status.textContent = message;
    status.classList.remove("success", "error");
    status.classList.add("show", state);
}

function serializeLeadForm(form) {
    const data = new URLSearchParams();
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        data.append(key, value.toString().trim());
    });

    // Add metadata for the email template
    data.append("form_type", form.dataset.formType || "lead");
    data.append("page_url", window.location.href);
    data.append("source", document.referrer || "direct");
    data.append("user_agent", navigator.userAgent);

    // Add lead timestamp
    data.append("lead_date", new Date().toISOString());
    data.append("business_name", "New Horizons Real Estate");

    return data;
}

async function submitLeadForm(form) {
    // Validate EmailJS configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
        setLeadStatus(form, "Email service not configured. Please contact us directly at (555) 123-4567.", "error");
        return;
    }

    const button = form.querySelector("button[type='submit']");
    const originalText = button ? button.textContent : "";

    if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
    }

    try {
        // Send email using EmailJS
        const result = await emailjs.sendForm(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            form
        );

        console.log("Email sent successfully:", result);
        
        // Success - reset form and show confirmation
        form.reset();
        setLeadStatus(form, "Thanks! We've received your request and will contact you shortly.", "success");
        
    } catch (error) {
        console.error("EmailJS Error:", error);
        
        // Handle specific EmailJS errors
        let errorMessage = "Something went wrong. Please call us directly at (555) 123-4567.";
        
        if (error.text) {
            if (error.text.includes("RATE_LIMIT_EXCEEDED")) {
                errorMessage = "We're receiving a lot of requests right now. Please call us at (555) 123-4567 or try again in an hour.";
            } else if (error.text.includes("INVALID_API_KEY")) {
                errorMessage = "Service configuration error. Please contact us directly at (555) 123-4567.";
            }
        }
        
        setLeadStatus(form, errorMessage, "error");
        
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = originalText;
        }
    }
}

function continueToFullForm(form) {
    const quickAddress = form.querySelector('input[name="address"]');
    const fullAddress = document.querySelector('#contact input[name="address"]');
    const firstContactField = document.querySelector("#contact input[name='name']");
    const contactSection = document.querySelector("#contact");

    if (quickAddress && fullAddress) {
        fullAddress.value = quickAddress.value.trim();
    }

    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.setTimeout(() => {
        if (firstContactField) {
            firstContactField.focus();
        }
    }, 450);
}

// Initialize all forms
function initForms() {
    document.querySelectorAll("[data-lead-form]").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (form.dataset.formType === "quick_address") {
                continueToFullForm(form);
                return;
            }

            submitLeadForm(form);
        });
    });

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForms);
    } else {
        initForms();
    }
}

// Add CSS for form status messages
const style = document.createElement('style');
style.textContent = `
.form-status {
    display: none;
    margin-top: 10px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
}

.form-status.show {
    display: block;
}

.form-status.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-status.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
`;
document.head.appendChild(style);

// Initialize forms when page loads
initForms();

// Debug helper (remove in production)
window.debugEmailJS = function() {
    console.log("EmailJS Config:", EMAILJS_CONFIG);
    console.log("EmailJS Initialized:", window.emailjs?.isInited);
};