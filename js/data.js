// Données des films et séries - localStorage + défauts
const STORAGE_KEY = 'novaStream_content';

const DEFAULT_FILMS = [
    {
        id: 'zootopia2',
        title: 'Zootopia 2',
        image: 'image/Zootopie2.png',
        videoUrl: 'https://edefd9d52b5f321b4fc1877dabf010b3.r2.cloudflarestorage.com/cgave/MOVIES/1084242/VF/01.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=457254629b6929aa015a1989ab1049c6%2F20260214%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260214T022503Z&X-Amz-SignedHeaders=host&X-Amz-Expires=2097&X-Amz-Signature=e051c0a52ede8403f447c27c47d9e94948776b5f8557dff66928126e38e4ed7b',
        year: '2025',
        genre: 'Animation',
        duration: '108'
    }
];

function getContent() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            return {
                films: data.films && data.films.length ? data.films : DEFAULT_FILMS,
                series: data.series || []
            };
        }
    } catch (e) {}
    return { films: DEFAULT_FILMS, series: [] };
}

function saveContent(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function addItem(category, item) {
    const content = getContent();
    const list = category === 'film' ? content.films : content.series;
    item.id = 'item_' + Date.now();
    list.push(item);
    saveContent(content);
    return item;
}

function deleteItem(category, id) {
    const content = getContent();
    const list = category === 'film' ? content.films : content.series;
    const filtered = list.filter(item => item.id !== id);
    if (category === 'film') {
        content.films = filtered.length ? filtered : DEFAULT_FILMS;
    } else {
        content.series = filtered;
    }
    saveContent(content);
}

function updateItem(category, id, updates) {
    const content = getContent();
    const list = category === 'film' ? content.films : content.series;
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return false;
    list[index] = { ...list[index], ...updates };
    saveContent(content);
    return true;
}

function getItemById(category, id) {
    const content = getContent();
    const list = category === 'film' ? content.films : content.series;
    return list.find(item => item.id === id) || null;
}
