const header = document.querySelector('header');
const modal = document.getElementById('playerModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoSource = document.getElementById('videoSource');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.getElementById('closeModal');

// Lecteur vidéo
const triggers = document.querySelectorAll('.film-trigger');

triggers.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const src = el.dataset.src;
        const title = el.dataset.title;
        if (src && title) {
            videoSource.src = src;
            modalTitle.textContent = title;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            videoPlayer.load();
            videoPlayer.play();
        }
    });
});

function closePlayer() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    videoPlayer.pause();
}

closeBtn.addEventListener('click', closePlayer);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closePlayer();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePlayer();
});

// Header au scroll
window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);
});
