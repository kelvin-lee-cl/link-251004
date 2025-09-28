// showTeacherArea(); // Moved to after navbar loads

let currentImageIndex = 0;
const images = [
    'highlight/1.png',
    'highlight/2.png',
    'highlight/3.jpeg',
    'highlight/4.png',
    'highlight/5.png',
    'highlight/6.png',
    'highlight/7.png',
    'highlight/9.jpg',
    'highlight/10.jpg',
    'highlight/11.jpg',
    'highlight/12.jpg',
    'highlight/13.jpg',
    'highlight/14.jpg'
];

function setImage(index) {
    currentImageIndex = index;
    document.getElementById('modalImage').src = images[currentImageIndex];
}



function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Loop to last image
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Loop to first image
    }
    document.getElementById('modalImage').src = images[currentImageIndex];
}

const rows = document.querySelectorAll('.row.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Fade in
        } else {
            entry.target.classList.remove('visible'); // Fade out
        }
    });
}, { threshold: 0.1 }); // Adjust threshold as needed

rows.forEach(row => {
    observer.observe(row);
});

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        changeImage(-1); // Trigger changeImage for left arrow
    } else if (event.key === 'ArrowRight') {
        changeImage(1); // Trigger changeImage for right arrow
    }
});

// Reverse mapping: passcode to user ID
const passcodeToUser = {
    // First set (1-35)
    'A1B2': '1', 'C3D4': '2', 'E5F6': '3', 'G7H8': '4', 'J9K1': '5',
    'L2M3': '6', 'N4Q5': '7', 'R6S7': '8', 'T8U9': '9', 'V1W2': '10',
    'X3Y4': '11', 'Z5A6': '12', 'B7C8': '13', 'D9E1': '14', 'F2G3': '15',
    'H4J5': '16', 'K6L7': '17', 'M8N9': '18', 'Q1R2': '19', 'S3T4': '20',
    'U5V6': '21', 'W7X8': '22', 'Y9Z1': '23', 'A2B3': '24', 'C4D5': '25',
    'E6F7': '26', 'G8H9': '27', 'J1K2': '28', 'L3M4': '29', 'N5Q6': '30',
    'R7S8': '31', 'T9U1': '32', 'V2W3': '33', 'X4Y5': '34', 'Z6A7': '35',

    // Second set (36-71)
    'B8C9': '36', 'D1E2': '37', 'F3G4': '38', 'H5J6': '39', 'K7L8': '40',
    'M9N1': '41', 'Q2R3': '42', 'S4T5': '43', 'U6V7': '44', 'W8X9': '45',
    'Y1Z2': '46', 'A3B4': '47', 'C5D6': '48', 'E7F8': '49', 'G9H1': '50',
    'J2K3': '51', 'L4M5': '52', 'N6Q7': '53', 'R8S9': '54', 'T1U2': '55',
    'V3W4': '56', 'X5Y6': '57', 'Z7A8': '58', 'B9C1': '59', 'D2E3': '60',
    'F4G5': '61', 'H6J7': '62', 'K8L9': '63', 'M1N2': '64', 'Q3R4': '65',
    'S5T6': '66', 'U7V8': '67', 'W9X1': '68', 'Y2Z3': '69', 'A4B5': '70',
    'C6D7': '71',

    // Third set (72-107)
    'E8F9': '72', 'G1H2': '73', 'J3K4': '74', 'L5M6': '75', 'N7Q8': '76',
    'R9S1': '77', 'T2U3': '78', 'V4W5': '79', 'X6Y7': '80', 'Z8A9': '81',
    'B1C2': '82', 'D3E4': '83', 'F5G6': '84', 'H7J8': '85', 'K9L1': '86',
    'M2N3': '87', 'Q4R5': '88', 'S6T7': '89', 'U8V9': '90', 'W1X2': '91',
    'Y3Z4': '92', 'A5B6': '93', 'C7D8': '94', 'E9F1': '95', 'G2H3': '96',
    'J4K5': '97', 'L6M7': '98', 'N8Q9': '99', 'R1S2': '100', 'T3U4': '101',
    'V5W6': '102', 'X7Y8': '103', 'Z9A1': '104', 'B2C3': '105', 'D4E5': '106',
    'F6G7': '107',

    // Fourth set (108-143)
    'H8J9': '108', 'K1L2': '109', 'M3N4': '110', 'Q5R6': '111', 'S7T8': '112',
    'U9V1': '113', 'W2X3': '114', 'Y4Z5': '115', 'A6B7': '116', 'C8D9': '117',
    'E1F2': '118', 'G3H4': '119', 'J5K6': '120', 'L7M8': '121', 'N9Q1': '122',
    'R2S3': '123', 'T4U5': '124', 'V6W7': '125', 'X8Y9': '126', 'Z1A2': '127',
    'B3C4': '128', 'D5E6': '129', 'F7G8': '130', 'H9J1': '131', 'K2L3': '132',
    'M4N5': '133', 'Q6R7': '134', 'S8T9': '135', 'U1V2': '136', 'W3X4': '137',
    'Y5Z6': '138', 'A7B8': '139', 'C9D1': '140', 'E2F3': '141', 'G4H5': '142',
    'J6K7': '143',

    // Fifth set (144-179)
    'L8M9': '144', 'N1Q2': '145', 'R3S4': '146', 'T5U6': '147', 'V7W8': '148',
    'X9Y1': '149', 'Z2A3': '150', 'B4C5': '151', 'D6E7': '152', 'F8G9': '153',
    'H1J2': '154', 'K3L4': '155', 'M5N6': '156', 'Q7R8': '157', 'S9T1': '158',
    'U2V3': '159', 'W4X5': '160', 'Y6Z7': '161', 'A8B9': '162', 'C1D2': '163',
    'E3F4': '164', 'G5H6': '165', 'J7K8': '166', 'L9M1': '167', 'N2Q3': '168',
    'R4S5': '169', 'T6U7': '170', 'V8W9': '171', 'X1Y2': '172', 'Z3A4': '173',
    'B5C6': '174', 'D7E8': '175', 'F9G1': '176', 'H2J3': '177', 'K4L5': '178',
    'M6N7': '179',

    // Sixth set (180-200)
    'Q8R9': '180', 'S1T2': '181', 'U3V4': '182', 'W5X6': '183', 'Y7Z8': '184',
    'A9B1': '185', 'C2D3': '186', 'E4F5': '187', 'G6H7': '188', 'J8K9': '189',
    'L1M2': '190', 'N3Q4': '191', 'R5S6': '192', 'T7U8': '193', 'V9W1': '194',
    'X2Y3': '195', 'Z4A5': '196', 'B6C7': '197', 'D8E9': '198', 'F1G2': '199',
    'H3J4': '200', 'M514': '201'
};

document.addEventListener('DOMContentLoaded', function () {
    // Debug: Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap is not loaded!');
    } else {
        console.log('Bootstrap loaded successfully');
    }

    // Debug: Check if modal elements exist
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
    console.log('Login modal element:', loginModal);
    console.log('Login button element:', loginBtn);

    // Manually initialize modal and add click event as backup
    if (loginModal && loginBtn) {
        // Initialize Bootstrap modal
        const modalInstance = new bootstrap.Modal(loginModal);

        // Add manual click event listener as backup
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Login button clicked, showing modal');
            modalInstance.show();
        });
    }

    const loginForm = document.getElementById('loginForm');
    const teamRegistrationForm = document.getElementById('teamRegistrationForm');
    const teamEditingForm = document.getElementById('teamEditingForm');
    const passwordStep = document.getElementById('passwordStep');
    const teamRegistrationStep = document.getElementById('teamRegistrationStep');
    const teamEditingStep = document.getElementById('teamEditingStep');

    // Back to password step function
    window.backToPasswordStep = function () {
        passwordStep.classList.remove('d-none');
        teamRegistrationStep.classList.add('d-none');
        teamEditingStep.classList.add('d-none');
        document.getElementById('passcode').value = '';
    };

    // Proceed to dashboard function
    window.proceedToDashboard = function () {
        // Close modal and redirect to public display
        const loginModal = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getInstance(loginModal) || new bootstrap.Modal(loginModal);
        if (modal) {
            modal.hide();
        }
        window.location.href = 'public-display.html';
    };

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const passcode = document.getElementById('passcode').value.toUpperCase();
            const submitBtn = document.getElementById('loginSubmitBtn');
            const loginText = submitBtn.querySelector('.login-text');
            const loginSpinner = submitBtn.querySelector('.login-spinner');

            // Show loading state
            submitBtn.disabled = true;
            loginText.classList.add('d-none');
            loginSpinner.classList.remove('d-none');

            try {
                // Use server-side authentication
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({ passcode: passcode })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Store user information
                    localStorage.setItem('currentUserId', data.userId);
                    localStorage.setItem('userType', data.userType);
                    localStorage.setItem('userRole', data.userRole);

                    // Check if user is Marble Run participant (ID 1-16)
                    if (data.userType === 'marble_run') {
                        // Check if user already has a team
                        try {
                            const teamResponse = await fetch('/api/user-team', {
                                method: 'GET',
                                credentials: 'include'
                            });

                            if (teamResponse.ok) {
                                const teamData = await teamResponse.json();

                                if (teamData.hasTeam) {
                                    // User has existing team, show editing step
                                    passwordStep.classList.add('d-none');
                                    teamEditingStep.classList.remove('d-none');

                                    // Populate editing form with existing team data
                                    document.getElementById('editTeamName').value = teamData.team.name;
                                    document.getElementById('editTeamMembers').value = teamData.team.members.join(', ');

                                    // Show current scores
                                    document.getElementById('currentQuizScore').textContent = teamData.team.quizScore || 0;
                                    document.getElementById('currentConstructionScore').textContent = teamData.team.constructionScore || 0;
                                    document.getElementById('currentInnovationScore').textContent = teamData.team.innovationScore || 0;
                                    document.getElementById('currentTotalScore').textContent = teamData.team.totalScore || 0;

                                    // Store team data for editing
                                    window.currentEditingTeam = teamData.team;
                                } else {
                                    // User doesn't have a team, show registration step
                                    passwordStep.classList.add('d-none');
                                    teamRegistrationStep.classList.remove('d-none');
                                }
                            } else {
                                // Fallback to registration step if team check fails
                                passwordStep.classList.add('d-none');
                                teamRegistrationStep.classList.remove('d-none');
                            }
                        } catch (teamError) {
                            console.error('Error checking user team:', teamError);
                            // Fallback to registration step
                            passwordStep.classList.add('d-none');
                            teamRegistrationStep.classList.remove('d-none');
                        }
                    } else {
                        // Individual users go directly to their dashboard
                        window.location.href = 'index.html';
                    }
                } else {
                    alert('Wrong Password！');
                    console.error('Login failed:', data.error);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            } finally {
                // Reset loading state
                submitBtn.disabled = false;
                loginText.classList.remove('d-none');
                loginSpinner.classList.add('d-none');
            }
        });
    }

    if (teamRegistrationForm) {
        teamRegistrationForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const teamName = document.getElementById('teamName').value.trim();
            const teamMembers = document.getElementById('teamMembers').value.trim();

            if (!teamName || !teamMembers) {
                alert('請填寫所有欄位');
                return;
            }

            const submitBtn = document.getElementById('teamSubmitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>註冊中...';

            try {
                // Register team with server
                const response = await fetch('/api/register-team', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({
                        teamName: teamName,
                        teamMembers: teamMembers.split(',').map(member => member.trim()).filter(member => member.length > 0)
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    if (data.isExisting) {
                        // Team already exists, show editing step
                        teamRegistrationStep.classList.add('d-none');
                        teamEditingStep.classList.remove('d-none');

                        // Populate editing form with existing team data
                        document.getElementById('editTeamName').value = data.teamData.name;
                        document.getElementById('editTeamMembers').value = data.teamData.members.join(', ');

                        // Show current scores
                        document.getElementById('currentQuizScore').textContent = data.teamData.quizScore || 0;
                        document.getElementById('currentConstructionScore').textContent = data.teamData.constructionScore || 0;
                        document.getElementById('currentInnovationScore').textContent = data.teamData.innovationScore || 0;
                        document.getElementById('currentTotalScore').textContent = data.teamData.totalScore || 0;

                        // Store team data for editing
                        window.currentEditingTeam = data.teamData;
                    } else {
                        // New team registered successfully
                        const userId = data.userId;

                        // Store the user ID in localStorage for client-side checks
                        localStorage.setItem('currentUserId', userId);
                        localStorage.setItem('teamName', teamName);
                        localStorage.setItem('teamMembers', JSON.stringify(data.teamMembers));

                        // Hide the login modal
                        const loginModal = document.getElementById('loginModal');
                        const modal = bootstrap.Modal.getInstance(loginModal) || new bootstrap.Modal(loginModal);
                        if (modal) {
                            modal.hide();
                        }

                        const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
                        if (loginBtn) {
                            loginBtn.style.display = 'none';

                            // Add simple welcome message
                            const welcomeContainer = document.createElement('div');
                            welcomeContainer.className = 'mt-5 welcome-container text-center';
                            welcomeContainer.innerHTML = `
                                <h4 class="mb-3">Welcome! 🎉</h4>
                                <p class="mb-0">You are now logged in and can access all features.</p>
                                <small class="text-muted">Your user info is displayed in the navigation bar above.</small>
                            `;
                            loginBtn.parentNode.appendChild(welcomeContainer);
                        }

                        // Show user info section in navbar
                        showUserInfoInNavbar(userId, 'Marble Run Game Participant');

                        // Show the class presentation link
                        const classPptLink = document.getElementById('classPptLink');
                        if (classPptLink) {
                            classPptLink.classList.remove('d-none');
                        }
                        const imgGenLink = document.getElementById('imgGenLink');
                        if (imgGenLink) {
                            imgGenLink.classList.remove('d-none');
                        }

                        // Show teacher area
                        showTeacherArea();

                        // After login, redirect back if a redirect target is provided
                        try {
                            const params = new URLSearchParams(window.location.search);
                            const redirectTarget = params.get('redirect');
                            if (redirectTarget) {
                                window.location.href = redirectTarget;
                                return;
                            }
                        } catch (err) {
                            console.warn('Failed to parse redirect params:', err);
                        }
                    }
                } else {
                    // Show specific error message for user ID restriction
                    if (data.error && data.error.includes('Only users with ID 1-16')) {
                        alert('註冊失敗：只有用戶ID 1-16可以註冊團隊。您的用戶ID不符合註冊條件。');
                    } else {
                        alert('團隊註冊失敗: ' + (data.error || '未知錯誤'));
                    }
                    console.error('Team registration failed:', data.error);
                }
            } catch (error) {
                console.error('Team registration error:', error);
                alert('Team registration failed. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    if (teamEditingForm) {
        teamEditingForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const teamName = document.getElementById('editTeamName').value.trim();
            const teamMembers = document.getElementById('editTeamMembers').value.trim();

            if (!teamName || !teamMembers) {
                alert('請填寫所有欄位');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>更新中...';

            try {
                // Update team with server
                const response = await fetch('/api/update-team', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({
                        teamName: teamName,
                        teamMembers: teamMembers.split(',').map(member => member.trim()).filter(member => member.length > 0)
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Team updated successfully
                    alert('團隊資訊已更新！');

                    // Hide the login modal
                    const loginModal = document.getElementById('loginModal');
                    const modal = bootstrap.Modal.getInstance(loginModal) || new bootstrap.Modal(loginModal);
                    if (modal) {
                        modal.hide();
                    }

                    const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
                    if (loginBtn) {
                        loginBtn.style.display = 'none';

                        // Add simple welcome message
                        const welcomeContainer = document.createElement('div');
                        welcomeContainer.className = 'mt-5 welcome-container text-center';
                        welcomeContainer.innerHTML = `
                            <h4 class="mb-3">Welcome Back! 👋</h4>
                            <p class="mb-0">Your team information has been updated.</p>
                            <small class="text-muted">Your user info is displayed in the navigation bar above.</small>
                        `;
                        loginBtn.parentNode.appendChild(welcomeContainer);
                    }

                    // Show user info section in navbar
                    const userRole = localStorage.getItem('userRole') || 'User';
                    showUserInfoInNavbar(data.teamData.createdBy || localStorage.getItem('currentUserId'), userRole);

                    // Show the class presentation link
                    const classPptLink = document.getElementById('classPptLink');
                    if (classPptLink) {
                        classPptLink.classList.remove('d-none');
                    }
                    const imgGenLink = document.getElementById('imgGenLink');
                    if (imgGenLink) {
                        imgGenLink.classList.remove('d-none');
                    }

                    // Show teacher area
                    showTeacherArea();

                } else {
                    alert('Team update failed: ' + (data.error || 'Unknown error'));
                    console.error('Team update failed:', data.error);
                }
            } catch (error) {
                console.error('Team update error:', error);
                alert('Team update failed. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

// Check login status when page loads
document.addEventListener('DOMContentLoaded', async function () {
    // Skip auth check if we're in the middle of logging out or another check is in progress
    if (window.isLoggingOut || window.authCheckInProgress) {
        console.log('Skipping auth check - logout in progress or check already running');
        return;
    }

    window.authCheckInProgress = true;

    try {
        // Verify authentication with server
        console.log('Checking authentication status...');
        console.log('Current cookies:', document.cookie);
        const response = await fetch('/api/auth-status', {
            credentials: 'include' // Include cookies
        });
        const authData = await response.json();
        console.log('Auth response:', authData);

        if (authData.authenticated) {
            const currentUserId = authData.userId;
            // Update localStorage with server data
            localStorage.setItem('currentUserId', currentUserId);

            // User is logged in, hide login button and show welcome message
            const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
            if (loginBtn) {
                loginBtn.style.display = 'none';

                const welcomeContainer = document.createElement('div');
                welcomeContainer.className = 'mt-5 welcome-container text-center';
                welcomeContainer.innerHTML = `
                    <h4 class="mb-3">Welcome Back! 👋</h4>
                    <p class="mb-0">You are logged in and ready to explore.</p>
                    <small class="text-muted">Your user info and logout option are in the navigation bar above.</small>
                `;
                loginBtn.parentNode.appendChild(welcomeContainer);
            }

            // Show user info section in navbar
            const userRole = localStorage.getItem('userRole') || 'User';
            showUserInfoInNavbar(currentUserId, userRole);

            // Show the class presentation link
            const classPptLink = document.getElementById('classPptLink');
            if (classPptLink) {
                classPptLink.classList.remove('d-none');
            }

            // Show the AI Art Studio link
            const imgGenLink = document.getElementById('imgGenLink');
            if (imgGenLink) {
                imgGenLink.classList.remove('d-none');
            }

            // Show AI tools link
            const aitool = document.getElementById('aitool');
            if (aitool) {
                aitool.classList.remove('d-none');
            }
        } else {
            // Clear localStorage if server says not authenticated
            localStorage.removeItem('currentUserId');
        }

        // Enforce auth on protected pages (all except index.html)
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        const isHome = currentPage === '' || currentPage === 'index.html' || currentPath === '/';

        console.log('Current page:', currentPage, 'Is home:', isHome, 'Authenticated:', authData.authenticated);

        if (!isHome && !authData.authenticated) {
            console.log('Redirecting to home - not authenticated on protected page');
            const redirectUrl = encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
            window.location.href = `index.html?redirect=${redirectUrl}`;
            return;
        }
    } catch (err) {
        console.warn('Auth status check error:', err);
        // Fallback to localStorage check
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            // Show UI elements as before
            const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
            if (loginBtn) {
                loginBtn.style.display = 'none';
                const welcomeContainer = document.createElement('div');
                welcomeContainer.className = 'mt-5 welcome-container text-center';
                welcomeContainer.innerHTML = `
                    <h4 class="mb-3">Welcome Back! 👋</h4>
                    <p class="mb-0">You are logged in and ready to explore.</p>
                    <small class="text-muted">Your user info and logout option are in the navigation bar above.</small>
                `;
                loginBtn.parentNode.appendChild(welcomeContainer);
            }

            const userRole = localStorage.getItem('userRole') || 'User';
            showUserInfoInNavbar(currentUserId, userRole);
        }

        // Enforce auth on protected pages (fallback to localStorage)
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        const isHome = currentPage === '' || currentPage === 'index.html' || currentPath === '/';

        console.log('Fallback auth check - Current page:', currentPage, 'Is home:', isHome);

        if (!isHome) {
            const isLoggedIn = !!localStorage.getItem('currentUserId');
            console.log('Fallback - Is logged in:', isLoggedIn);
            if (!isLoggedIn) {
                console.log('Fallback redirecting to home - not logged in');
                const redirectUrl = encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
                window.location.href = `index.html?redirect=${redirectUrl}`;
                return;
            }
        }
    } finally {
        window.authCheckInProgress = false;
    }
});

// Flags to prevent auth check conflicts
window.isLoggingOut = false;
window.authCheckInProgress = false;

// Helper function to show user info in navbar with retry mechanism
function showUserInfoInNavbar(userId, userRole, retryCount = 0) {
    const userInfoSection = document.getElementById('userInfoSection');
    const userIdText = document.getElementById('userIdText');

    if (userInfoSection && userIdText) {
        userInfoSection.classList.remove('d-none');
        userIdText.innerHTML = `User ID: ${userId} ${getEmojiForUserId(userId)} (${userRole || 'User'})`;
        console.log('User info section shown for user:', userId, 'as', userRole);
        return true;
    } else if (retryCount < 5) {
        console.log(`Navbar not ready, retrying... (${retryCount + 1}/5)`);
        setTimeout(() => showUserInfoInNavbar(userId, userRole, retryCount + 1), 200);
        return false;
    } else {
        console.error('Failed to find user info elements after retries');
        return false;
    }
}

function updateNavbarForUserType(userType) {
    console.log('Updating navbar for user type:', userType);

    // Hide all navigation links first (except home and logout)
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        if (link.id !== 'homeLink' && link.id !== 'logoutBtn' && !link.onclick) {
            link.style.display = 'none';
        }
    });

    if (userType === 'marble_run') {
        // Marble Run participants can access all pages EXCEPT img_gen and gallery
        const marbleRunLinks = [
            'questionBoothLink',
            'redemptionBoothLink',
            'constructionCornerLink',
            'publicDisplayLink'
        ];

        marbleRunLinks.forEach(linkId => {
            const link = document.getElementById(linkId);
            if (link) {
                link.style.display = 'block';
            }
        });

        // Hide img_gen and gallery links for Marble Run participants
        const imgGenLink = document.getElementById('imgGenLink');
        if (imgGenLink) {
            imgGenLink.style.display = 'none';
        }

        const teacherArea = document.getElementById('teacherArea');
        if (teacherArea) {
            teacherArea.style.display = 'none';
        }

        console.log('Marble Run participant - showing navigation links (excluding img_gen and gallery)');
    } else if (userType === 'individual') {
        // Individual users can ONLY access img_gen and gallery
        const individualLinks = [
            'imgGenLink'
        ];

        individualLinks.forEach(linkId => {
            const link = document.getElementById(linkId);
            if (link) {
                link.style.display = 'block';
            }
        });

        // Show gallery link for individual users
        const teacherArea = document.getElementById('teacherArea');
        if (teacherArea) {
            teacherArea.style.display = 'block';
        }

        // Hide all other links for individual users
        const restrictedLinks = [
            'questionBoothLink',
            'redemptionBoothLink',
            'constructionCornerLink',
            'publicDisplayLink'
        ];

        restrictedLinks.forEach(linkId => {
            const link = document.getElementById(linkId);
            if (link) {
                link.style.display = 'none';
            }
        });

        console.log('Individual user - showing img_gen and gallery navigation links');
    }

    // Ensure logout button is always visible for logged-in users
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        console.log('Logout button is visible for user type:', userType);
    } else {
        console.error('Logout button not found!');
    }
}

// Logout function with user confirmation
async function logout() {
    // Confirm logout action
    if (!confirm('確認要登出嗎？ (Are you sure you want to sign out?)')) {
        return;
    }

    window.isLoggingOut = true;

    try {
        // Show loading state if possible
        const logoutLinks = document.querySelectorAll('a[onclick*="logout()"]');
        logoutLinks.forEach(link => {
            link.style.pointerEvents = 'none';
            link.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        });

        // Call server logout endpoint
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include cookies
        });

        if (response.ok) {
            console.log('Logout successful');
        } else {
            console.error('Logout failed on server');
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always clear local storage and redirect regardless of server response
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('userType');
        localStorage.removeItem('userRole');

        // Show success message briefly before redirect
        const logoutLinks = document.querySelectorAll('a[onclick*="logout()"]');
        logoutLinks.forEach(link => {
            link.innerHTML = '<i class="fas fa-check"></i>';
            link.style.color = '#28a745';
        });

        // Redirect after a brief delay
        setTimeout(() => {
            // Force reload the current page or go to home
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                window.location.reload();
            } else {
                // Check if we're in a subdirectory and redirect to main index.html
                const currentPath = window.location.pathname;
                if (currentPath.includes('/img-gen/') || currentPath.includes('/static/')) {
                    window.location.href = '../static/index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }
        }, 1000);
    }
}

// Check if currentUserId is already declared
if (!window.currentUserId) {
    window.currentUserId = localStorage.getItem('currentUserId');
}

// Check if user is already logged in when page loads
document.addEventListener('DOMContentLoaded', function () {
    const currentUserId = localStorage.getItem('currentUserId');
    const userType = localStorage.getItem('userType');
    const userRole = localStorage.getItem('userRole');

    if (currentUserId) {
        console.log('User already logged in on page load:', { currentUserId, userType, userRole });
        // Wait for navbar to load, then update it
        setTimeout(() => {
            showUserInfoInNavbar(currentUserId, userRole);
            updateNavbarForUserType(userType);
        }, 1000);
    }
});

// After successful login and user ID verification
function showTeacherArea() {
    const currentUserId = localStorage.getItem('currentUserId');
    console.log("it is working!");
    if (currentUserId) {
        const teacherArea = document.getElementById('teacherArea');
        if (teacherArea) {
            teacherArea.classList.remove('d-none'); // Remove the 'd-none' class
        } else {
            console.log('Teacher area element not found yet, will retry after navbar loads');
        }
    }
}

// Array of kid-friendly, positive emojis
const kidFriendlyEmojis = [
    '🌟', '🌈', '🦄', '🐱', '🐶', '🦁', '🐼', '🐨', '🦊', '🦋',
    '🌸', '🌺', '🌻', '🌞', '⭐', '🌙', '☀️', '🌤️', '🌺', '🌷',
    '🍀', '🌱', '🌳', '🌴', '🌵', '🌿', '🍄', '🌼', '🌻', '🌹',
    '🎨', '🎭', '🎪', '🎯', '🎲'
];

// Function to get emoji based on user ID
function getEmojiForUserId(userId) {
    // Subtract 1 from userId since we want to start from 0
    const index = (userId - 1) % kidFriendlyEmojis.length;
    return kidFriendlyEmojis[index];
}

// Function to load shared navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert navbar into the page
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
                console.log('Navbar loaded successfully');
                // Set active navbar item based on current page
                setActiveNavbarItem();
                // Call showTeacherArea after navbar is loaded
                showTeacherArea();

                // Initialize tooltips for navbar icons
                setTimeout(() => {
                    const tooltipTriggerList = navbarContainer.querySelectorAll('[data-bs-toggle="tooltip"]');
                    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

                    // Check if user should be logged in and show user info section
                    const currentUserId = localStorage.getItem('currentUserId');
                    const userType = localStorage.getItem('userType');
                    const userRole = localStorage.getItem('userRole');

                    if (currentUserId) {
                        console.log('Found stored user ID, showing user info section:', currentUserId);
                        showUserInfoInNavbar(currentUserId, userRole);
                        updateNavbarForUserType(userType);

                        // Additional check to ensure user info section is visible
                        setTimeout(() => {
                            const userInfoSection = document.getElementById('userInfoSection');
                            if (userInfoSection && userInfoSection.classList.contains('d-none')) {
                                console.log('User info section still hidden, forcing visibility...');
                                userInfoSection.classList.remove('d-none');
                            }
                        }, 500);
                    }
                }, 100);

                // Prevent navigating to protected pages when not logged in
                try {
                    // Check server authentication status instead of just localStorage
                    fetch('/api/auth-status', { credentials: 'include' })
                        .then(response => response.json())
                        .then(authData => {
                            if (!authData.authenticated) {
                                const links = navbarContainer.querySelectorAll('.nav-link');
                                links.forEach(link => {
                                    const href = link.getAttribute('href');
                                    if (href && !/index\.html$/.test(href) && !href.startsWith('#') && !href.startsWith('http')) {
                                        link.addEventListener('click', function (evt) {
                                            evt.preventDefault();
                                            // Redirect to home page with login prompt
                                            window.location.href = 'index.html';
                                        });
                                    }
                                });
                            } else {
                                // User is authenticated, add user type specific restrictions
                                const userType = authData.userType;
                                const links = navbarContainer.querySelectorAll('.nav-link');

                                links.forEach(link => {
                                    const href = link.getAttribute('href');

                                    if (userType === 'individual') {
                                        // Individual users can only access img_gen and gallery
                                        if (href && !href.includes('img_gen') && !href.includes('teacherdashboard') && !/index\.html$/.test(href) && !href.startsWith('#') && !href.startsWith('http')) {
                                            link.addEventListener('click', function (evt) {
                                                evt.preventDefault();
                                                alert('Individual users can only access the AI Art Studio and Gallery. Please use those links.');
                                            });
                                        }
                                    } else if (userType === 'marble_run') {
                                        // Marble Run participants cannot access img_gen or gallery
                                        if (href && (href.includes('img_gen') || href.includes('teacherdashboard'))) {
                                            link.addEventListener('click', function (evt) {
                                                evt.preventDefault();
                                                alert('Marble Run participants cannot access the AI Art Studio or Gallery. Please use other available features.');
                                            });
                                        }
                                    }
                                });
                            }
                        })
                        .catch(err => console.warn('Auth check error:', err));
                } catch (err) {
                    console.warn('Navbar auth guard error:', err);
                }
            } else {
                console.error('Navbar container not found');
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            // Fallback: create a simple navbar
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = `
                    <nav class="navbar navbar-expand-lg navbar-light px-5 fixed-top">
                        <div class="d-flex align-items-center">
                            <a class="navbar-brand me-3" href="https://future-leaders-union.odoo.com/zh_TW" target="_blank">
                                <img src="./images/FLU_logo2.png" width="80" height="80" class="d-inline-block align-middle" alt="">
                            </a>
                            <a class="navbar-brand me-3" href="https://www.hkcnlink.hk/link-centre/" target="_blank">
                                <img src="https://storage.googleapis.com/www-hkcnlink-hk/2014/10/header_11.png" height="80"
                                    class="d-inline-block align-middle" style="padding:5px;" alt="" target="_blank">
                            </a>
                            <a class="navbar-brand me-3" href="https://mcsps.edu.hk/" target="_blank">
                                <img src="https://www.hkcnlink.hk/wp-content/uploads/2014/10/header_2.png" height="80"
                                    class="d-inline-block align-middle" style="padding:5px;" alt="" target="_blank">
                            </a>
                        </div>
                        <div class="justify-content-end collapse navbar-collapse">
                            <ul class="navbar-nav ml-auto mx-2">
                                <li class="nav-item">
                                    <a class="nav-link" href="index.html" data-bs-toggle="tooltip" title="Home">
                                        <i class="fas fa-home"></i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="public-display.html" data-bs-toggle="tooltip" title="Public Display">
                                        <i class="fas fa-tv"></i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="question-booth.html" data-bs-toggle="tooltip" title="Question Booth">
                                        <i class="fas fa-question-circle"></i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="redemption-booth.html" data-bs-toggle="tooltip" title="Redemption Booth">
                                        <i class="fas fa-gift"></i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="construction-corner.html" data-bs-toggle="tooltip" title="Construction Corner">
                                        <i class="fas fa-tools"></i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="../img-gen/img_gen.html" data-bs-toggle="tooltip" title="Gen-AI Art Studio">
                                        <i class="fas fa-palette"></i>
                                    </a>
                                </li>
                                <li class="nav-item d-none" id="teacherArea">
                                    <a class="nav-link" href="teacherdashboard.html" data-bs-toggle="tooltip" title="Gallery">
                                        <i class="fas fa-images"></i>
                                    </a>
                                </li>
                            </ul>
                            
                            <!-- User Info Section (appears after login) -->
                            <div class="d-flex align-items-center d-none" id="userInfoSection">
                                <span id="userIdDisplay" class="navbar-text me-3">
                                    <i class="fas fa-user me-1"></i>
                                    <span id="userIdText">User ID: </span>
                                </span>
                                <a class="nav-link logout-btn" href="#" onclick="logout(); return false;" 
                                   data-bs-toggle="tooltip" title="Sign Out">
                                    <i class="fas fa-sign-out-alt"></i>
                                </a>
                            </div>
                        </div>
                    </nav>
                `;
                console.log('Fallback navbar loaded');
                // Set active navbar item based on current page
                setActiveNavbarItem();
                // Call showTeacherArea after fallback navbar is loaded
                showTeacherArea();

                // Initialize tooltips for fallback navbar icons
                setTimeout(() => {
                    const tooltipTriggerList = navbarContainer.querySelectorAll('[data-bs-toggle="tooltip"]');
                    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

                    // Check if user should be logged in and show user info section
                    const currentUserId = localStorage.getItem('currentUserId');
                    if (currentUserId) {
                        console.log('Fallback: Found stored user ID, showing user info section:', currentUserId);
                        const userRole = localStorage.getItem('userRole') || 'User';
                        showUserInfoInNavbar(currentUserId, userRole);
                    }
                }, 100);
            }
        });
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
});

// Centralized Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwCc-Ea9uopnRjZevEN1BsqurRhWGceQQ",
    authDomain: "link-251004.firebaseapp.com",
    projectId: "link-251004",
    storageBucket: "link-251004.firebasestorage.app",
    messagingSenderId: "693066011981",
    appId: "1:693066011981:web:be64856468f37af572d304",
    measurementId: "G-37DK60Y8YZ"
};

// Function to get Firebase config
function getFirebaseConfig() {
    return firebaseConfig;
}

// Make it available globally
window.FIREBASE_CONFIG = firebaseConfig;
window.getFirebaseConfig = getFirebaseConfig;

// Function to set active navbar item based on current page
function setActiveNavbarItem() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('#navbar-container .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Set active class based on current page
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('#navbar-container a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    } else if (currentPage === 'public-display.html') {
        const publicDisplayLink = document.querySelector('#navbar-container a[href="public-display.html"]');
        if (publicDisplayLink) publicDisplayLink.classList.add('active');
    } else if (currentPage === 'question-booth.html') {
        const questionBoothLink = document.querySelector('#navbar-container a[href="question-booth.html"]');
        if (questionBoothLink) questionBoothLink.classList.add('active');
    } else if (currentPage === 'redemption-booth.html') {
        const redemptionBoothLink = document.querySelector('#navbar-container a[href="redemption-booth.html"]');
        if (redemptionBoothLink) redemptionBoothLink.classList.add('active');
    } else if (currentPage === 'construction-corner.html') {
        const constructionCornerLink = document.querySelector('#navbar-container a[href="construction-corner.html"]');
        if (constructionCornerLink) constructionCornerLink.classList.add('active');
    } else if (currentPage === 'img_gen.html' || currentPath.includes('/img-gen/')) {
        const imgGenLink = document.querySelector('#navbar-container a[href="../img-gen/img_gen.html"]');
        if (imgGenLink) imgGenLink.classList.add('active');
    } else if (currentPage === 'teacherdashboard.html') {
        const teacherDashboardLink = document.querySelector('#navbar-container a[href="teacherdashboard.html"]');
        if (teacherDashboardLink) teacherDashboardLink.classList.add('active');
    }
}


