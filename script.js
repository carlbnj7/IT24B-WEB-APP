// Function to handle tab switching
function openTab(event, floorId) {
  // Hide all tab content
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(content => {
    content.classList.remove("active");
  });

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.classList.remove("active");
  });

  // Show the selected tab's content and mark the tab as active
  document.getElementById(floorId).classList.add("active");
  event.currentTarget.classList.add("active");
}

// Function to show the modal with room details
function viewDetails(imageSrc, description) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalDescription = document.getElementById("modal-description");

  // Set the modal content
  modalImg.src = imageSrc;
  modalDescription.textContent = description;

  // Show the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
