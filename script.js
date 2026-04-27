document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Auth Modal Logic ---
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    document.getElementById('loginBtn').onclick = () => loginModal.classList.add('active');
    document.getElementById('signupBtn').onclick = () => signupModal.classList.add('active');
    document.getElementById('closeLoginModal').onclick = () => loginModal.classList.remove('active');
    document.getElementById('closeSignupModal').onclick = () => signupModal.classList.remove('active');

    // --- 3. Destination Filtering ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.dest-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filter = tab.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });

    // --- 4. Smart Itinerary Generator ---
    const plannerForm = document.getElementById('plannerForm');
    const itineraryResult = document.getElementById('itineraryResult');
    const placeholder = document.getElementById('itineraryPlaceholder');

    plannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation check
        const dest = document.getElementById('tripDestination').value;
        if(!dest) return showToast("Please enter a destination!", "error");

        // Show loading state
        placeholder.classList.add('hidden');
        itineraryResult.classList.remove('hidden');
        itineraryResult.innerHTML = `<div class="itin-header"><h2 class="itin-title">Generating your plan for ${dest}...</h2></div>`;

        // Simulate "Smart" Logic
        setTimeout(() => {
            const tripType = document.getElementById('tripType').value || "Adventure";
            const budget = document.getElementById('budget').value;
            
            generateDynamicItinerary(dest, tripType, budget);
        }, 1500);
    });

    function generateDynamicItinerary(dest, type, budget) {
        let activities = {
            "Adventure": ["Hiking Trail", "Water Sports", "Local Safari"],
            "Beach": ["Sunrise Yoga", "Island Hopping", "Seafood Dinner"],
            "Cultural": ["Museum Visit", "Old Town Walk", "Traditional Workshop"]
        };

        let selectedActivities = activities[type] || activities["Adventure"];

        itineraryResult.innerHTML = `
            <div class="itin-header">
                <h2 class="itin-title">Your ${type} Trip to ${dest}</h2>
                <div class="itin-meta">
                    <span><i class="fa-solid fa-wallet"></i> Budget: ₹${budget}</span>
                    <span><i class="fa-solid fa-calendar"></i> 3-Day Sample Plan</span>
                </div>
            </div>
            <div class="itin-day">
                <div class="itin-day-label">Day 1: Arrival & Exploration</div>
                <div class="itin-activities">
                    <div class="itin-activity"><i class="fa-solid fa-check"></i> Check-in & ${selectedActivities[0]}</div>
                    <div class="itin-activity"><i class="fa-solid fa-check"></i> Dinner at a top-rated local spot</div>
                </div>
            </div>
            <div class="itin-day">
                <div class="itin-day-label">Day 2: Deep Dive</div>
                <div class="itin-activities">
                    <div class="itin-activity"><i class="fa-solid fa-check"></i> ${selectedActivities[1]}</div>
                    <div class="itin-activity"><i class="fa-solid fa-check"></i> Evening Leisure walk</div>
                </div>
            </div>
            <div class="itin-tip">
                <i class="fa-solid fa-lightbulb"></i>
                <div><strong>Smart Tip:</strong> Based on your ₹${budget} budget, we recommend using local transport to save 20% on costs!</div>
            </div>
        `;
        showToast("Itinerary Generated Successfully!");
    }

    // --- 5. Toast Notification System ---
    function showToast(msg) {
        const toast = document.getElementById('toast');
        document.getElementById('toastMsg').innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});
