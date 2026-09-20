(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const year = document.querySelector("#year");
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const navLinks = document.querySelectorAll('#site-nav a[href^="#"]');

  const INTEREST_LABELS = {
    assessment: "Vulnerability assessment",
    hardening: "Hardening recommendations",
    remediation: "Remediation guidance",
    "not-sure": "Not sure yet — let's talk",
  };

  // Keep mailto: URLs under common client/browser limits.
  const MAX_MAILTO_LENGTH = 1800;

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  const openNav = () => {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeNav();
      else openNav();
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => closeNav());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeNav();
    });
  }

  // Highlight current section in nav
  const sectionIds = ["services", "how-we-work", "why-us", "contact"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActiveLink = () => {
    const offset = (header?.offsetHeight || 72) + 24;
    let current = null;

    for (const section of sections) {
      const top = section.getBoundingClientRect().top;
      if (top - offset <= 0) current = section.id;
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const id = href.replace("#", "");
      if (id && id === current) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.classList.remove("is-success", "is-error");

      // Honeypot: abort silently if filled (likely a bot).
      const honeypot = form.querySelector("#website");
      if (honeypot && honeypot.value.trim() !== "") {
        return;
      }

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const company = form.querySelector("#company");
      const interest = form.querySelector("#interest");
      const message = form.querySelector("#message");

      const nameVal = name?.value.trim() || "";
      const emailVal = email?.value.trim() || "";

      if (!nameVal || !emailVal) {
        status.textContent = "Please add your name and work email.";
        status.classList.add("is-error");
        (nameVal ? email : name)?.focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("is-error");
        email?.focus();
        return;
      }

      const interestKey = interest?.value || "";
      if (!Object.prototype.hasOwnProperty.call(INTEREST_LABELS, interestKey)) {
        status.textContent = "Please choose a valid interest option.";
        status.classList.add("is-error");
        interest?.focus();
        return;
      }
      const interestLabel = INTEREST_LABELS[interestKey];

      const companyVal = company?.value.trim() || "Not specified";
      const messageVal = message?.value.trim() || "No additional details";

      const subject = encodeURIComponent(`Assessment request — ${nameVal}`);
      const body = encodeURIComponent(
        [
          `Name: ${nameVal}`,
          `Email: ${emailVal}`,
          `Company: ${companyVal}`,
          `Interest: ${interestLabel}`,
          "",
          "Message:",
          messageVal,
        ].join("\n")
      );

      const mailto = `mailto:hello@deftdefense.com?subject=${subject}&body=${body}`;
      if (mailto.length > MAX_MAILTO_LENGTH) {
        status.textContent =
          "Your message is too long to open in an email client. Please shorten it, or email hello@deftdefense.com directly.";
        status.classList.add("is-error");
        message?.focus();
        return;
      }

      status.textContent =
        "Opening your email client… If nothing opens, write us at hello@deftdefense.com.";
      status.classList.add("is-success");

      window.location.href = mailto;
    });
  }
})();
