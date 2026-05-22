
const galleryData = [
    {
        id: 1,
        title: "Misty Mountain Peaks",
        category: "nature",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90"
    },
    {
        id: 2,
        title: "Urban Architecture",
        category: "technology",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=90"
    },
    {
        id: 3,
        title: "Santorini Sunset",
        category: "travel",
        url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1600&q=90"
    },
    {
        id: 4,
        title: "Majestic Lion",
        category: "animals",
        url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1600&q=90"
    },
    {
        id: 5,
        title: "Forest Pathway",
        category: "nature",
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=90"
    },
    {
        id: 6,
        title: "Circuit Board",
        category: "technology",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90"
    },
    {
        id: 7,
        title: "Tokyo Streets",
        category: "travel",
        url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=90"
    },
    {
        id: 8,
        title: "Arctic Fox",
        category: "animals",
        url: "https://cdn.britannica.com/64/5864-050-88E958F1/phase-White-Arctic-fox-summer-coat.jpg",
        fullUrl: "https://cdn.britannica.com/64/5864-050-88E958F1/phase-White-Arctic-fox-summer-coat.jpg"
    },
    {
        id: 9,
        title: "Ocean Waves",
        category: "nature",
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=90"
    },
    {
        id: 10,
        title: "Smartphone Tech",
        category: "technology",
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&q=90"
    },
    {
        id: 11,
        title: "Swiss Alps",
        category: "travel",
        url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        fullUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=90"
    },
    {
        id: 12,
        title: "Colorful Parrot",
        category: "animals",
        url: "https://www.thesprucepets.com/thmb/7QTyA39OBnveyyLjbmgmuDd4NcM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/blue-gold-macaw-142968676-resized-58a6e8a55f9b58a3c918de32.jpg",
        fullUrl: "https://www.thesprucepets.com/thmb/7QTyA39OBnveyyLjbmgmuDd4NcM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/blue-gold-macaw-142968676-resized-58a6e8a55f9b58a3c918de32.jpg"
    }
];




const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxOverlay = document.getElementById('lightboxOverlay');

// State
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [...galleryData];




function init() {
    renderGallery(galleryData);
    setupEventListeners();
}




function renderGallery(images) {
    galleryGrid.innerHTML = '';
    
    images.forEach((image, index) => {
        const item = createGalleryItem(image, index);
        galleryGrid.appendChild(item);
    });
}

function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-id', image.id);
    item.setAttribute('data-category', image.category);
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${image.title}`);
    
    // Stagger animation delay
    item.style.animationDelay = `${index * 0.05}s`;
    
    item.innerHTML = `
        <div class="gallery-image-wrapper">
            <img 
                src="${image.url}" 
                alt="${image.title}" 
                class="gallery-image"
                loading="lazy"
            >
            <div class="gallery-overlay">
                <h3 class="gallery-title">${image.title}</h3>
                <span class="gallery-category">${image.category}</span>
            </div>
        </div>
    `;
    
    // Click to open lightbox
    item.addEventListener('click', () => openLightbox(image.id));
    
    // Keyboard accessibility
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(image.id);
        }
    });
    
    return item;
}


function filterGallery(category) {
    currentFilter = category;
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
    
    // Filter images
    filteredImages = category === 'all' 
        ? [...galleryData] 
        : galleryData.filter(img => img.category === category);
    
    // Animate out current items
    const currentItems = document.querySelectorAll('.gallery-item');
    currentItems.forEach(item => {
        item.classList.add('fade-out');
    });
    
    // Render new items after animation
    setTimeout(() => {
        renderGallery(filteredImages);
    }, 300);
}




function openLightbox(imageId) {
    // Find image in current filtered set
    const index = filteredImages.findIndex(img => img.id === imageId);
    if (index === -1) return;
    
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const image = filteredImages[currentImageIndex];
    
    // Preload image
    const img = new Image();
    img.src = image.fullUrl;
    
    lightboxImage.src = image.fullUrl;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxContent();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
}





function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterGallery(btn.dataset.filter);
        });
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage(); // Swipe left -> next
            } else {
                showPrevImage(); // Swipe right -> prev
            }
        }
    }
}




document.addEventListener('DOMContentLoaded', init);