document.getElementById('year').textContent = new Date().getFullYear();

// mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.documentElement.classList.toggle('no-scroll', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.documentElement.classList.remove('no-scroll');
}));

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .school-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// hero burette fill on load
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.getElementById('heroFill').style.height = '72%';
  });
});

// enrollment form -> WhatsApp handoff
const enrollForm = document.getElementById('enrollForm');
if (enrollForm) {
  enrollForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('efName').value.trim();
    const phone = document.getElementById('efPhone').value.trim();
    const track = document.getElementById('efTrack').value;
    const school = document.getElementById('efSchool').value;
    const location = document.getElementById('efLocation').value.trim();
    const notes = document.getElementById('efNotes').value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and WhatsApp number.');
      return;
    }

    let msg = 'Hello Nanis Formulations Academy, I would like to enroll.\n\n';
    msg += 'Name: ' + name + '\n';
    msg += 'WhatsApp: ' + phone + '\n';
    msg += 'Track: ' + (track || 'Not specified') + '\n';
    msg += 'School interest: ' + (school || 'Not specified') + '\n';
    if (location) msg += 'Location: ' + location + '\n';
    if (notes) msg += 'Notes: ' + notes + '\n';

    // Academy WhatsApp number in international format, no plus sign, no spaces
    const academyNumber = '233209517130';
    const url = 'https://wa.me/' + academyNumber + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  });
}

// testimonial slider
const slides = document.querySelectorAll('.t-slide');
const dotsWrap = document.getElementById('tDots');
let tIndex = 0;
let tTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 't-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Show review ' + (i + 1));
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll('.t-dot');

function goTo(i) {
  slides[tIndex].classList.remove('active');
  dots[tIndex].classList.remove('active');
  tIndex = (i + slides.length) % slides.length;
  slides[tIndex].classList.add('active');
  dots[tIndex].classList.add('active');
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function startAuto() {
  if (reduceMotion) return;
  tTimer = setInterval(() => goTo(tIndex + 1), 7000);
}
function stopAuto() { clearInterval(tTimer); }

document.getElementById('tPrev').addEventListener('click', () => { goTo(tIndex - 1); stopAuto(); startAuto(); });
document.getElementById('tNext').addEventListener('click', () => { goTo(tIndex + 1); stopAuto(); startAuto(); });
document.querySelector('.testimonial-stage').addEventListener('mouseenter', stopAuto);
document.querySelector('.testimonial-stage').addEventListener('mouseleave', startAuto);
startAuto();

const gauge = document.getElementById('pathGauge');
if (gauge) {
  const gaugeIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gauge.style.height = '88%';
        gaugeIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  gaugeIO.observe(gauge);
}
