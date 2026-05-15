const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 70);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.10 }
);

const btnOpenInvite = document.getElementById('btn-open-invite');
const envelopeOverlay = document.getElementById('envelope-overlay');
const mainContent = document.getElementById('top');

if (btnOpenInvite) {
    btnOpenInvite.addEventListener('click', () => {
        envelopeOverlay.classList.add('opened');
        mainContent.classList.remove('hidden-content');
        setTimeout(() => {
            revealEls.forEach(el => revealObserver.observe(el));
        }, 300);
    });
}

const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (scrollBtn) {
        scrollBtn.classList.toggle('visible', window.scrollY > 100);
    }
}, { passive: true });

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function copyAddress(e) {
    e.preventDefault();
    const addr = 'Trung tâm Hội nghị Quốc gia Việt Nam, Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm, Hà Nội';

    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(addr)
            .then(() => showToast('Đã sao chép địa chỉ!'))
            .catch(() => fallbackCopy(addr));
    } else {
        fallbackCopy(addr);
    }
}

function fallbackCopy(text) {
    const ta = Object.assign(document.createElement('textarea'), {
        value: text,
        style: 'position:fixed;opacity:0;top:0;left:0'
    });
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try {
        document.execCommand('copy');
        showToast('Đã sao chép địa chỉ!');
    } catch {
        showToast('Không thể sao chép địa chỉ.');
    }
    document.body.removeChild(ta);
}