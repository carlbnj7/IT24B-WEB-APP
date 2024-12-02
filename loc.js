class LeafletMap {
    constructor(containerId, center, zoom) {
        // Disable default zoom controls
        this.map = L.map(containerId, { zoomControl: false }).setView(center, zoom);
        this.initTileLayer();

        // Add zoom controls at a new position (e.g., bottom-right)
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);

        // Add a modal container to the body
        this.createModalContainer();
    }

    // Initialize the tile layer
    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    // Add marker with custom icon and popup
    addMarker(lat, lng, message, imageUrl) {
        // Create a custom icon
        const customIcon = L.icon({
            iconUrl: imageUrl,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });

        // Add marker with custom icon to the map
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);

        // Create popup content
        const popupContent = `
            <div>
                <img src="${imageUrl}" alt="Popup Image" style="width: 100%; max-width: 200px; height: auto; border-radius: 5px;"/>
                <p>${message}</p>
            </div>
        `;

        // Bind the popup to the marker
        marker.bindPopup(popupContent);

        // Add click event to show a larger image
        marker.on('click', () => this.showModal(imageUrl, message));
    }

    // Create a modal container
    createModalContainer() {
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.zIndex = '1000';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        modal.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90%; text-align: center;">
                <img id="modal-image" src="" alt="Large Image" style="max-width: 100%; max-height: 80%; border-radius: 5px;"/>
                <p id="modal-message" style="color: white; margin-top: 10px;"></p>
                <button id="close-modal" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add close functionality
        modal.querySelector('#close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Show the modal with an image and message
    showModal(imageUrl, message) {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalMessage = document.getElementById('modal-message');

        modalImage.src = imageUrl;
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    // Load markers from a JSON file
    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(
                        marker.latitude,
                        marker.longitude,
                        marker.message,
                        marker.imageUrl
                    );
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

// Initialize the map
const myMap = new LeafletMap('map', [8.36038, 124.86751], 17);

// Load markers from JSON
myMap.loadMarkersFromJson('loc.json');
