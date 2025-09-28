// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

// Use shared Firebase config
const firebaseConfig = getFirebaseConfig();

// Initialize Firebase
let app, storage;
try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");

    // Initialize Storage
    try {
        storage = getStorage(app);
        console.log("Firebase Storage initialized successfully");
        window.fbStorage = storage; // Make storage available globally
    } catch (storageError) {
        console.error("Storage initialization failed:", storageError);
        alert("Firebase storage initialization failed. Upload functionality may not be available.");
    }
} catch (firebaseError) {
    console.error("Firebase initialization failed:", firebaseError);
    alert("Firebase initialization failed. Upload functionality is not available.");
}

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const testApiKeyBtn = document.getElementById('testApiKeyBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultContainer = document.getElementById('resultContainer');
const generatedImage = document.getElementById('generatedImage');
const errorMessage = document.getElementById('errorMessage');
const imageUploadSection = document.getElementById('imageUploadSection');
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const styleSelect = document.getElementById('styleSelect');
const sizeSelect = document.getElementById('sizeSelect');

// Text to Image elements removed - only image-to-image mode now

// Image to Image elements
const personDescription = document.getElementById('personDescription');
const clothingStyle = document.getElementById('clothingStyle');
const backgroundStyle = document.getElementById('backgroundStyle');
const imageToImagePrompt = document.getElementById('imageToImagePrompt');
const randomizeStyleBtn = document.getElementById('randomizeStyleBtn');
const clearStyleBtn = document.getElementById('clearStyleBtn');
const imageToImageSection = document.getElementById('imageToImageSection');

// Function to show error messages
function showError(message, type = 'error') {
    console.log(`${type.toUpperCase()}:`, message);
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
        errorMessage.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    }
}

// Function to get current prompt for gallery
function getCurrentPrompt() {
    const imageToImagePrompt = document.getElementById('imageToImagePrompt');
    return imageToImagePrompt ? imageToImagePrompt.textContent : 'Smart City Image Generation';
}

// Recraft AI Configuration
const RECRAFT_API_KEY = 'LaDYxX96gOXhk3O2cSk7l1yKKFmRAFGywyyCNxXvUyagC6lkQt9D5kasFeTJtG2p';

// Test API Key
testApiKeyBtn.addEventListener('click', async () => {
    try {
        testApiKeyBtn.disabled = true;
        testApiKeyBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Testing...';
        if (errorMessage) errorMessage.classList.add('d-none');

        console.log('Testing API key...');
        const response = await fetch('/api/verify-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: RECRAFT_API_KEY
            })
        });

        console.log('API Response Status:', response.status);
        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
            showError('API key is valid! You can now generate images.', 'success');
            if (generateBtn) generateBtn.disabled = false;
        } else {
            throw new Error(data.details || data.message || 'Invalid API key');
        }
    } catch (error) {
        console.error('API Key Test Error:', error);
        showError(error.message || 'Failed to test API key. Please try again.');
        if (generateBtn) generateBtn.disabled = true;
    } finally {
        testApiKeyBtn.disabled = false;
        testApiKeyBtn.textContent = 'Test API Key';
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Text-to-image functions removed - only image-to-image mode now

    // Function to generate filename
    function generateFilename(userId, type, prompt) {
        const timestamp = Date.now();
        // Encode the prompt to handle special characters and spaces
        const encodedPrompt = encodeURIComponent(prompt).replace(/%20/g, '_');
        return `${userId}_${timestamp}_${type}_${encodedPrompt}.png`;
    }

    // Function to update the image-to-image prompt
    function updateImageToImagePrompt() {
        const description = personDescription.value.trim();
        const clothing = clothingStyle.value;
        const background = backgroundStyle.value;

        if (description && clothing && background) {
            // Get the optgroup labels to determine the types
            const clothingGroup = clothingStyle.options[clothingStyle.selectedIndex].parentElement.label;
            const backgroundGroup = backgroundStyle.options[backgroundStyle.selectedIndex].parentElement.label;

            // Add smart city elements based on the clothing and background types
            let techElement = '';
            if (clothingGroup === 'Futuristic Tech Wear') {
                techElement = 'wearing cutting-edge smart city attire with integrated technology';
            } else if (clothingGroup === 'Smart City Uniforms') {
                techElement = 'wearing professional smart city uniform with digital accessories';
            } else if (clothingGroup === 'Future Fashion') {
                techElement = 'wearing innovative futuristic fashion with smart features';
            } else if (clothingGroup === 'Smart Accessories') {
                techElement = 'wearing advanced smart city accessories with holographic elements';
            }

            let environmentElement = '';
            if (backgroundGroup === 'Smart City Architecture') {
                environmentElement = 'in a futuristic smart city architectural environment';
            } else if (backgroundGroup === 'Tech Environments') {
                environmentElement = 'in an advanced technological setting';
            } else if (backgroundGroup === 'Future Urban Scenes') {
                environmentElement = 'in a vibrant smart city urban landscape';
            } else if (backgroundGroup === 'Futuristic Art Styles') {
                environmentElement = 'in a digitally rendered futuristic art style';
            } else if (backgroundGroup === 'Smart City Elements') {
                environmentElement = 'in a smart city infrastructure setting';
            }

            // Create the complete prompt with all elements
            const completePrompt = [
                // Main description
                `${description} ${techElement}, ${clothing}, ${environmentElement} in a ${background}`,
                // Smart city promotion
                "This image showcases the future of smart cities, combining human innovation with cutting-edge technology in a sustainable urban environment"
            ].join('. ');

            // Update the display with the complete prompt
            imageToImagePrompt.textContent = completePrompt;
        } else {
            const emptyPrompt = 'Describe your character and select smart city styles to generate a futuristic prompt...';
            imageToImagePrompt.textContent = emptyPrompt;
        }
    }

    // Function to get random option from a select element
    function getRandomOption(selectElement) {
        const options = Array.from(selectElement.options).filter(option => option.value !== '');
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex].value;
    }

    // Text-to-image functions removed

    // Function to randomize image-to-image style selections
    function randomizeImageToImageStyles() {
        clothingStyle.value = getRandomOption(clothingStyle);
        backgroundStyle.value = getRandomOption(backgroundStyle);
        updateImageToImagePrompt();
    }

    // Text-to-image functions removed

    // Function to clear image-to-image selections
    function clearImageToImageSelections() {
        personDescription.value = '';
        clothingStyle.value = '';
        backgroundStyle.value = '';
        updateImageToImagePrompt();
    }

    // Function to handle image upload
    function handleImageUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('d-none');
            uploadArea.classList.add('d-none');
        };
        reader.readAsDataURL(file);
    }

    // Function to remove uploaded image
    function removeUploadedImage() {
        imageInput.value = '';
        previewContainer.classList.add('d-none');
        uploadArea.classList.remove('d-none');
    }

    // Make removeUploadedImage available globally
    window.removeUploadedImage = removeUploadedImage;

    // Text-to-image event listeners removed

    // Event listeners for image-to-image prompt generation
    if (personDescription) personDescription.addEventListener('input', updateImageToImagePrompt);
    if (clothingStyle) clothingStyle.addEventListener('change', updateImageToImagePrompt);
    if (backgroundStyle) backgroundStyle.addEventListener('change', updateImageToImagePrompt);
    if (randomizeStyleBtn) randomizeStyleBtn.addEventListener('click', randomizeImageToImageStyles);
    if (clearStyleBtn) clearStyleBtn.addEventListener('click', clearImageToImageSelections);

    // Set default style to vector illustration for smart city theme
    if (styleSelect) styleSelect.value = 'vector_illustration';

    // Event listeners for image upload
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('border-primary');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('border-primary');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('border-primary');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImageUpload(file);
            }
        });
    }

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImageUpload(file);
            }
        });
    }

    // Generate image using Recraft AI
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const prompt = imageToImagePrompt.textContent;
            const style = styleSelect ? styleSelect.value : 'vector_illustration';
            const size = sizeSelect ? sizeSelect.value : '1024x1024';

            if (prompt === 'Describe your character and select smart city styles to generate a futuristic prompt...') {
                showError('Please describe your character and select smart city styles');
                return;
            }
            if (!imageInput.files[0]) {
                showError('Please upload an image first');
                return;
            }

            const imageFile = imageInput.files[0];

            // Check file size (10MB limit for AI API compatibility)
            const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
            if (imageFile.size > maxFileSize) {
                showError(`File too large. Please use an image smaller than 10MB. Current size: ${(imageFile.size / (1024 * 1024)).toFixed(1)}MB`);
                return;
            }

            try {
                // Show loading state
                generateBtn.disabled = true;
                generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...';
                if (resultContainer) resultContainer.classList.add('d-none');
                if (errorMessage) errorMessage.classList.add('d-none');

                const formData = new FormData();
                const imageFile = imageInput.files[0];

                // Debug image file
                console.log('Image file details:', {
                    name: imageFile.name,
                    type: imageFile.type,
                    size: imageFile.size,
                    lastModified: imageFile.lastModified
                });

                formData.append('image', imageFile);
                formData.append('prompt', prompt);
                formData.append('apiKey', RECRAFT_API_KEY);
                formData.append('style', style);
                formData.append('strength', '0.2');

                console.log('Sending smart city image-to-image request:', {
                    prompt,
                    style,
                    strength: '0.2',
                    hasImage: true,
                    imageDetails: {
                        name: imageFile.name,
                        type: imageFile.type,
                        size: imageFile.size
                    }
                });

                const response = await fetch('/api/generate-from-image', {
                    method: 'POST',
                    body: formData
                });

                console.log('API Response Status:', response.status);

                if (!response.ok) {
                    // Handle different error types
                    if (response.status === 401) {
                        throw new Error('You must be logged in to generate images. Please log in first.');
                    } else if (response.status === 413) {
                        throw new Error('File too large. Please use an image smaller than 20MB.');
                    } else if (response.status === 500) {
                        // Try to get error details from response
                        let errorMessage = `Server Error: ${response.status} ${response.statusText}`;
                        try {
                            const errorData = await response.json();
                            errorMessage = errorData.details || errorData.error || errorMessage;
                        } catch (e) {
                            // If response is not JSON, use default message
                            console.log('Non-JSON error response received');
                        }
                        throw new Error(errorMessage);
                    } else {
                        throw new Error(`API Error: ${response.status} ${response.statusText}`);
                    }
                }

                const data = await response.json();
                console.log('API Response:', data);

                if (!data.imageUrl) {
                    throw new Error('No image URL in response');
                }

                // Save to Firebase Storage
                try {
                    const currentUserId = localStorage.getItem('currentUserId');
                    if (!currentUserId) {
                        throw new Error('User not logged in');
                    }

                    // Generate filename
                    const filename = generateFilename(currentUserId, 'smart-city-image', prompt);

                    // Get Firebase storage instance
                    const storage = window.fbStorage;
                    if (!storage) {
                        throw new Error('Firebase storage not initialized');
                    }

                    // Create a reference to the file location
                    const aiGeneratedRef = ref(storage, `ai_generated/${filename}`);

                    // Fetch the image from the URL
                    const imageResponse = await fetch(data.imageUrl);
                    const imageBlob = await imageResponse.blob();

                    // Upload to Firebase
                    await uploadBytes(aiGeneratedRef, imageBlob);

                    // Get the download URL
                    const downloadURL = await getDownloadURL(aiGeneratedRef);
                    console.log('Image saved to Firebase:', downloadURL);

                    // Display the generated image
                    if (generatedImage) generatedImage.src = downloadURL;
                    if (resultContainer) resultContainer.classList.remove('d-none');
                    showError('Image generated and saved successfully!', 'success');

                    // Add to gallery
                    addToGallery(downloadURL, getCurrentPrompt());

                } catch (error) {
                    console.error('Error saving to Firebase:', error);
                    // If Firebase save fails, still display the original image
                    if (generatedImage) generatedImage.src = data.imageUrl;
                    if (resultContainer) resultContainer.classList.remove('d-none');
                    showError('Image generated but could not be saved to gallery. ' + error.message, 'warning');

                    // Add to gallery even if Firebase save failed
                    addToGallery(data.imageUrl, getCurrentPrompt());
                }
            } catch (error) {
                console.error('Generation Error:', error);
                if (error.message === 'Failed to fetch') {
                    showError('Unable to connect to the image generation service. Please check your internet connection and try again.');
                } else if (error.message.includes('must be logged in')) {
                    showError('You must be logged in to generate images. Redirecting to login page...');
                    setTimeout(() => {
                        window.location.href = '../static/index.html';
                    }, 2000);
                } else {
                    showError(error.message || 'Failed to generate image. Please try again.');
                }
            } finally {
                if (generateBtn) {
                    generateBtn.disabled = false;
                    generateBtn.textContent = 'Generate Image';
                }
            }
        });
    }

    // Function to save image
    window.saveImage = function () {
        if (generatedImage && generatedImage.src) {
            const link = document.createElement('a');
            link.href = generatedImage.src;
            link.download = 'generated-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Function to regenerate image
    window.regenerateImage = function () {
        if (generateBtn) generateBtn.click();
    };
});

async function generateImageFromImage() {
    try {
        if (!uploadedImage) {
            throw new Error('Please upload an image first');
        }

        const prompt = document.getElementById('prompt').value;
        const style = document.getElementById('style').value;
        const strength = document.getElementById('strength').value;
        const apiKey = document.getElementById('apiKey').value;

        if (!prompt || !style || !strength || !apiKey) {
            throw new Error('Please fill in all fields');
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('image', uploadedImage);
        formData.append('prompt', prompt);
        formData.append('style', style);
        formData.append('strength', strength);
        formData.append('apiKey', apiKey);

        console.log('Sending request with FormData:', {
            hasImage: true,
            prompt,
            style,
            strength,
            apiKeyLength: apiKey.length
        });

        const response = await fetch('/api/generate-from-image', {
            method: 'POST',
            body: formData
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok) {
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch (e) {
                errorData = { error: responseText };
            }
            console.error('Server error details:', {
                status: response.status,
                statusText: response.statusText,
                data: errorData
            });
            throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse response as JSON:', e);
            throw new Error('Invalid JSON response from server');
        }

        console.log('Parsed response data:', data);

        if (data.imageUrl) {
            // Display the generated image in the same way as text-to-image
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = `
                <div class="result-image">
                    <img src="${data.imageUrl}" alt="Generated Image" class="img-fluid">
                    <div class="mt-3">
                        <a href="${data.imageUrl}" download="generated-image.png" class="btn btn-primary">
                            <i class="fas fa-download"></i> Download Image
                        </a>
                    </div>
                </div>
            `;
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error('No image URL in response');
        }
    } catch (error) {
        console.error('Generation Error:', error);
        alert(error.message);
    }
} 