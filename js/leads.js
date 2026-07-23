const LEAD_CONFIG = {
    emailjs: {
        serviceId: "service_xgvc5pa",
        businessTemplateId: "template_7f7aqwc",
        customerTemplateId: "",
        publicKey: "EisHia78uRV6zncJE",
        businessEmail: "isaiahjrod5@gmail.com"
    },
    spreadsheetEndpointUrl: "https://script.google.com/macros/s/1I1MQfz2X3ocx2c3cHrIHpfxsMHlCjgxDmMVErmXCEfDEPE8eRAvihiXX/exec",
    thankYouUrl: "thank-you.html"
};

function hasEmailJsConfig() {
    return Boolean(
        window.emailjs &&
        LEAD_CONFIG.emailjs.serviceId &&
        LEAD_CONFIG.emailjs.businessTemplateId &&
        LEAD_CONFIG.emailjs.publicKey
    );
}

function setLeadStatus(form, message, state) {
    const status = form.querySelector(".status");
    if (!status) {
        return;
    }

    status.textContent = message;
    status.classList.remove("success", "error");
    status.classList.add("show", state);
}

function formDataToObject(form) {
    const formData = new FormData(form);
    const lead = {};

    formData.forEach((value, key) => {
        lead[key] = value.toString().trim();
    });

    lead.form_type = form.dataset.formType || "lead";
    lead.page_url = window.location.href;
    lead.source = document.referrer || "direct";
    lead.user_agent = navigator.userAgent;
    lead.lead_date = new Date().toLocaleString();
    lead.sms_consent = lead.sms_consent || "No";
    lead.sms_consent_timestamp = lead.sms_consent === "Yes" ? new Date().toISOString() : "";
    lead.sms_consent_language = lead.sms_consent === "Yes"
        ? "I agree to receive text messages from HomeQuest Solutions about my property request at the phone number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase."
        : "";
    lead.business_name = "HomeQuest Solutions";
    lead.to_email = LEAD_CONFIG.emailjs.businessEmail;
    lead.reply_to = lead.email || LEAD_CONFIG.emailjs.businessEmail;

    return lead;
}

function leadToSearchParams(lead) {
    const data = new URLSearchParams();

    Object.entries(lead).forEach(([key, value]) => {
        data.append(key, value || "");
    });

    return data;
}

async function sendEmailNotifications(lead) {
    if (!hasEmailJsConfig()) {
        throw new Error("EmailJS is not configured or the SDK did not load.");
    }

    window.emailjs.init({ publicKey: LEAD_CONFIG.emailjs.publicKey });

    await window.emailjs.send(
        LEAD_CONFIG.emailjs.serviceId,
        LEAD_CONFIG.emailjs.businessTemplateId,
        {
            ...lead,
            to_email: LEAD_CONFIG.emailjs.businessEmail,
            subject: "HomeQuest Solutions lead request"
        }
    );

    if (LEAD_CONFIG.emailjs.customerTemplateId && lead.email) {
        await window.emailjs.send(
            LEAD_CONFIG.emailjs.serviceId,
            LEAD_CONFIG.emailjs.customerTemplateId,
            {
                ...lead,
                to_email: lead.email,
                subject: "We received your HomeQuest Solutions request"
            }
        );
    }
}

async function sendLeadToSpreadsheet(lead) {
    if (!LEAD_CONFIG.spreadsheetEndpointUrl) {
        return;
    }

    await fetch(LEAD_CONFIG.spreadsheetEndpointUrl, {
        method: "POST",
        mode: "no-cors",
        body: leadToSearchParams(lead)
    });
}

async function submitLeadForm(form) {
    const lead = formDataToObject(form);

    if (lead.company_website) {
        return;
    }

    const button = form.querySelector("button[type='submit']");
    const originalText = button ? button.textContent : "";

    if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
    }

    try {
        await Promise.all([
            sendEmailNotifications(lead),
            sendLeadToSpreadsheet(lead)
        ]);

        window.location.href = LEAD_CONFIG.thankYouUrl;
    } catch (error) {
        console.error("Lead submission error:", error);
        setLeadStatus(form, "Something went wrong. Please call us directly at (555) 123-4567 or try again in a moment.", "error");

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
}

function initStickyCTA() {
    const hero = document.querySelector('.hero');
    const stickyCTA = document.querySelector('.mobile-sticky-cta');
    
    if (!hero || !stickyCTA) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                stickyCTA.classList.add('is-visible');
            } else {
                stickyCTA.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(hero);
}

function initAddressAutocomplete() {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.places === 'undefined') {
        return;
    }

    const quickAddress = document.getElementById('quick-address');
    if (quickAddress) {
        new google.maps.places.Autocomplete(quickAddress, {
            types: ['address'],
            componentRestrictions: { country: 'us' }
        });
    }

    const fullAddress = document.getElementById('address');
    if (fullAddress) {
        new google.maps.places.Autocomplete(fullAddress, {
            types: ['address'],
            componentRestrictions: { country: 'us' }
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initForms();
        initStickyCTA();
        initAddressAutocomplete();
    });
} else {
    initForms();
    initStickyCTA();
    initAddressAutocomplete();
}
