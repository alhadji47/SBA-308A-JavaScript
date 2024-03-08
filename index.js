// api.js content
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.thecatapi.com/v1';

const fetchCats = async (breed) => {
    try {
        const response = await fetch(`${BASE_URL}/images/search?breed_ids=${breed}&limit=10`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cats:", error);
        return [];
    }
};

const fetchBreeds = async () => {
    const response = await fetch(`${BASE_URL}/breeds`, {
        headers: {
            'x-api-key': API_KEY
        }
    });
    const data = await response.json();
    return data;
};

// ui.js content
const updateGallery = (cats) => {
    const gallery = document.getElementById('cat-gallery');
    gallery.innerHTML = '';
    cats.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        img.alt = 'Cat';
        gallery.appendChild(img);
    });
};

// main.js content
document.getElementById('search-btn').addEventListener('click', async () => {
    const breedInput = document.getElementById('search-input').value;
    const cats = await fetchCats(breedInput);
    updateGallery(cats);
});

// Initialize the app with a default search
(async () => {
    const cats = await fetchCats('beng');
    updateGallery(cats);
})();