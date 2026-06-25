const LEAD_ENDPOINT_URL = "";

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

    data.append("form_type", form.dataset.formType || "lead");
    data.append("page_url", window.location.href);
    data.append("source", document.referrer || "direct");
    data.append("user_agent", navigator.userAgent);

    return data;
}

async function submitLeadForm(form) {
    if (!LEAD_ENDPOINT_URL) {
        setLeadStatus(form, "Lead backend is not connected yet. Add your Google Apps Script URL in js/leads.js.", "error");
        return;
    }

    const button = form.querySelector("button[type='submit']");
    const originalText = button ? button.textContent : "";

    if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
    }

    try {
        await fetch(LEAD_ENDPOINT_URL, {
            method: "POST",
            mode: "no-cors",
            body: serializeLeadForm(form)
        });

        form.reset();
        setLeadStatus(form, "Thanks. Your request was sent.", "success");
    } catch (error) {
        setLeadStatus(form, "Something went wrong. Please call or try again in a moment.", "error");
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
