const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  toTop.classList.toggle("show", scrollTop > 500);
}
window.addEventListener("scroll", updateScrollUI, {passive:true});
updateScrollUI();

toTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, {rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in all fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:rajanprajapati123@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Opening your email app…";
});
