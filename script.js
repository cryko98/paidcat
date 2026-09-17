/* =========================================================
   PAIDCAT — site config + interactions
   EDIT THE CONFIG BELOW WHEN THE LINKS ARE READY
   ========================================================= */

const CONFIG = {
  // Paste the real mint address here when the coin is live
  contract: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

  // Telegram group
  telegram: "https://t.me/paidcatonsol",

  // pump.fun coin page (e.g. "https://pump.fun/coin/<contract>")
  pump: "https://pump.fun",
};

/* ---------- apply config ---------- */
document.querySelectorAll(".ca-row code").forEach((el) => {
  el.textContent = CONFIG.contract;
});

document.querySelectorAll("[data-telegram]").forEach((el) => {
  if (CONFIG.telegram) {
    el.href = CONFIG.telegram;
  } else {
    el.href = "#";
    el.removeAttribute("target");
    el.dataset.soon = "1";
  }
});

document.querySelectorAll("[data-pump]").forEach((el) => {
  el.href = CONFIG.pump;
});

/* ---------- copy contract address ---------- */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const tmp = document.createElement("textarea");
    tmp.value = text;
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.appendChild(tmp);
    tmp.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(tmp);
    return ok;
  }
}

function selectCode(btn) {
  const code = btn.closest(".ca-row").querySelector("code");
  const range = document.createRange();
  range.selectNodeContents(code);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const ok = await copyText(CONFIG.contract);
    const label = btn.querySelector("span");
    const original = label ? label.textContent : "";

    if (ok) {
      btn.classList.add("done");
      if (label) label.textContent = "Copied";
      showToast("Contract address copied 🐾");
    } else {
      // Clipboard blocked by the browser — select the text so it can be copied by hand
      selectCode(btn);
      showToast("Copy blocked — the address is selected, hit Ctrl+C");
    }

    setTimeout(() => {
      btn.classList.remove("done");
      if (label) label.textContent = original;
    }, 1800);
  });
});

/* ---------- telegram "coming soon" ---------- */
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-telegram]");
  if (link && link.dataset.soon === "1") {
    e.preventDefault();
    showToast("Telegram opens soon — stay tuned 🧢");
  }
});

/* ---------- sticky nav state ---------- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- mobile menu ---------- */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

/* ---------- falling money ---------- */
const billsLayer = document.getElementById("bills");
const BILL_CHARS = ["💵", "💸", "💰", "🐾"];

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const count = window.innerWidth < 640 ? 8 : 16;
  for (let i = 0; i < count; i++) {
    const bill = document.createElement("span");
    bill.className = "bill";
    bill.textContent = BILL_CHARS[Math.floor(Math.random() * BILL_CHARS.length)];
    bill.style.left = `${Math.random() * 100}%`;
    bill.style.fontSize = `${18 + Math.random() * 20}px`;
    bill.style.animationDuration = `${12 + Math.random() * 16}s`;
    bill.style.animationDelay = `${-Math.random() * 20}s`;
    bill.style.opacity = `${0.18 + Math.random() * 0.3}`;
    billsLayer.appendChild(bill);
  }
}

/* ---------- footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
