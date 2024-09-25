document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.getElementById('closeModal');
    const saveEvent = document.getElementById('saveEvent');
    const eventContainer = document.getElementById('eventContainer');
    const createEventBtn = document.getElementById('createEventBtn');
    const categoryTitle = document.getElementById('categoryTitle');
    const logoutBtn = document.getElementById('logoutBtn');

    // Redirect to login if not logged in
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }

    // Define category background images
    const categoryBackgrounds = {
        "Sports": "url('path_to_sports_image.jpg')",
        "Exams": "url('path_to_exam_image.jpg')",
        "Entertainment": "url('path_to_entertainment_image.jpg')",
        "default": "url('path_to_default_image.jpg')"
    };

    // Load events from localStorage based on the selected category
    const loadEvents = (category) => {
        const events = JSON.parse(localStorage.getItem(`${loggedInUser}_events`) || '[]');
        eventContainer.innerHTML = '';  // Clear the current event list
        categoryTitle.classList.remove('hidden');
        categoryTitle.textContent = `${category} Events`;

        // Filter and display events based on category
        const filteredEvents = events.filter(event => event.category === category);
        filteredEvents.forEach((event, index) => {
            const bgImage = categoryBackgrounds[event.category] || categoryBackgrounds['default'];
            const eventCard = `
                <div class="relative bg-cover bg-center rounded-lg shadow-lg p-6 text-white" style="background-image: ${bgImage};">
                    <button onclick="deleteEvent(${index})" class="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded">Delete</button>
                    <h4 class="text-xl font-bold mb-2">${event.title}</h4>
                    <p class="text-sm mb-2">${event.date}</p>
                    <p class="mb-2">${event.description}</p>
                    <p class="mt-2">Category: ${event.category}</p>
                </div>
            `;
            eventContainer.insertAdjacentHTML('beforeend', eventCard);
        });
    };

    // Open modal to create a new event
    createEventBtn.addEventListener('click', () => {
        eventModal.classList.remove('hidden');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        eventModal.classList.add('hidden');
    });

    // Save new event
    saveEvent.addEventListener('click', () => {
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventCategory = document.getElementById('eventCategory').value;

        if (eventTitle && eventDate && eventDescription && eventCategory) {
            const events = JSON.parse(localStorage.getItem(`${loggedInUser}_events`) || '[]');
            events.push({ title: eventTitle, date: eventDate, description: eventDescription, category: eventCategory });
            localStorage.setItem(`${loggedInUser}_events`, JSON.stringify(events));

            // Reload events and close modal
            loadEvents(eventCategory);
            eventModal.classList.add('hidden');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    // Delete event
    window.deleteEvent = (index) => {
        const events = JSON.parse(localStorage.getItem(`${loggedInUser}_events`) || '[]');
        const eventCategory = events[index].category;  // Get the category before deletion
        events.splice(index, 1);  // Remove event at the index
        localStorage.setItem(`${loggedInUser}_events`, JSON.stringify(events));
        loadEvents(eventCategory);  // Reload events from the same category
    };
});
