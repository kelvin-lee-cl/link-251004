// Quiz System Configuration
const QUIZ_CONFIG = {
    // Quiz topics with difficulty levels and descriptions
    topics: [
        {
            id: 'math-basics',
            name: 'Math Basics',
            difficulty: 'easy',
            description: 'Basic arithmetic operations, fractions, and simple equations',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is 15 + 27?',
                    options: ['40', '41', '42', '43'],
                    correct: 2
                },
                {
                    type: 'multiple-choice',
                    question: 'What is 8 × 7?',
                    options: ['54', '56', '58', '60'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is 144 ÷ 12?',
                    answer: 12
                },
                {
                    type: 'multiple-choice',
                    question: 'What is 3/4 as a decimal?',
                    options: ['0.25', '0.5', '0.75', '0.8'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is 5² + 3²?',
                    answer: 34
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the square root of 64?',
                    options: ['6', '7', '8', '9'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is 20% of 150?',
                    answer: 30
                },
                {
                    type: 'multiple-choice',
                    question: 'What is 2/3 + 1/6?',
                    options: ['1/2', '5/6', '3/9', '1/3'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is 15 × 4 - 20?',
                    answer: 40
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the next number in the sequence: 2, 4, 8, 16, ?',
                    options: ['20', '24', '32', '64'],
                    correct: 2
                }
            ]
        },
        {
            id: 'geometry',
            name: 'Geometry',
            difficulty: 'medium',
            description: 'Shapes, angles, area, perimeter, and basic geometric concepts',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the sum of angles in a triangle?',
                    options: ['90°', '180°', '270°', '360°'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the area of a rectangle with length 8 and width 5?',
                    answer: 40
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the formula for the circumference of a circle?',
                    options: ['πr', '2πr', 'πr²', '2πr²'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the perimeter of a square with side length 6?',
                    answer: 24
                },
                {
                    type: 'multiple-choice',
                    question: 'How many sides does a hexagon have?',
                    options: ['5', '6', '7', '8'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the area of a circle with radius 7? (Use π = 3.14)',
                    answer: 153.86
                },
                {
                    type: 'multiple-choice',
                    question: 'What type of angle is 90°?',
                    options: ['Acute', 'Right', 'Obtuse', 'Straight'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the volume of a cube with side length 4?',
                    answer: 64
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the name of a 3D shape with 6 square faces?',
                    options: ['Cylinder', 'Cube', 'Sphere', 'Pyramid'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the area of a triangle with base 10 and height 8?',
                    answer: 40
                }
            ]
        },
        {
            id: 'algebra',
            name: 'Algebra',
            difficulty: 'hard',
            description: 'Variables, equations, solving for x, and algebraic expressions',
            questions: [
                {
                    type: 'number',
                    question: 'Solve for x: 2x + 5 = 13',
                    answer: 4
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the value of x in 3x - 7 = 14?',
                    options: ['5', '6', '7', '8'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'Solve for x: x² = 25',
                    answer: 5
                },
                {
                    type: 'multiple-choice',
                    question: 'What is 2x + 3x simplified?',
                    options: ['5x', '6x', '5x²', '6x²'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'Solve for x: 4x - 12 = 2x + 8',
                    answer: 10
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the coefficient of x in 7x + 3?',
                    options: ['3', '7', 'x', '10'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'Solve for x: (x + 3)(x - 2) = 0',
                    answer: 2
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the slope of the line y = 2x + 3?',
                    options: ['2', '3', '5', '6'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'Solve for x: 2x + 4 = 3x - 1',
                    answer: 5
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the y-intercept of y = 3x + 7?',
                    options: ['3', '7', '10', '21'],
                    correct: 1
                }
            ]
        },
        {
            id: 'physics-basics',
            name: 'Physics Basics',
            difficulty: 'medium',
            description: 'Motion, forces, energy, and basic physics concepts',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the unit of force?',
                    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the acceleration due to gravity on Earth? (m/s²)',
                    answer: 9.8
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the formula for kinetic energy?',
                    options: ['mv', 'mv²', '½mv²', 'mgh'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the speed of light in vacuum? (m/s)',
                    answer: 300000000
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the unit of power?',
                    options: ['Joule', 'Newton', 'Watt', 'Ampere'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the weight of a 10kg object on Earth? (N)',
                    answer: 98
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the law of conservation of energy?',
                    options: ['Energy cannot be created', 'Energy cannot be destroyed', 'Energy cannot be created or destroyed', 'Energy can be created but not destroyed'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the frequency of a wave with period 0.5 seconds? (Hz)',
                    answer: 2
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the unit of electric current?',
                    options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the potential energy of a 5kg object at height 10m? (J)',
                    answer: 490
                }
            ]
        },
        {
            id: 'chemistry-basics',
            name: 'Chemistry Basics',
            difficulty: 'medium',
            description: 'Elements, compounds, reactions, and basic chemistry concepts',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the chemical symbol for water?',
                    options: ['H2O', 'CO2', 'NaCl', 'O2'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'What is the atomic number of carbon?',
                    answer: 6
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the pH of pure water?',
                    options: ['6', '7', '8', '9'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'How many atoms are in one molecule of methane (CH4)?',
                    answer: 5
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the most abundant gas in Earth\'s atmosphere?',
                    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the molecular weight of oxygen (O2)?',
                    answer: 32
                },
                {
                    type: 'multiple-choice',
                    question: 'What type of bond forms between sodium and chlorine in NaCl?',
                    options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'How many electrons does hydrogen have?',
                    answer: 1
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the chemical symbol for gold?',
                    options: ['Go', 'Gd', 'Au', 'Ag'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the boiling point of water in Celsius?',
                    answer: 100
                }
            ]
        },
        {
            id: 'biology-basics',
            name: 'Biology Basics',
            difficulty: 'easy',
            description: 'Cells, organisms, ecosystems, and basic biology concepts',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the basic unit of life?',
                    options: ['Tissue', 'Organ', 'Cell', 'Organism'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'How many chambers does a human heart have?',
                    answer: 4
                },
                {
                    type: 'multiple-choice',
                    question: 'What process do plants use to make food?',
                    options: ['Respiration', 'Photosynthesis', 'Digestion', 'Circulation'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'How many bones are in an adult human body?',
                    answer: 206
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the powerhouse of the cell?',
                    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'How many pairs of chromosomes do humans have?',
                    answer: 23
                },
                {
                    type: 'multiple-choice',
                    question: 'What gas do plants absorb from the atmosphere?',
                    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the normal body temperature in Celsius?',
                    answer: 37
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the largest organ in the human body?',
                    options: ['Liver', 'Brain', 'Skin', 'Lungs'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'How many teeth does an adult human typically have?',
                    answer: 32
                }
            ]
        },
        {
            id: 'computer-science',
            name: 'Computer Science',
            difficulty: 'medium',
            description: 'Programming concepts, algorithms, and computer fundamentals',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What does CPU stand for?',
                    options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'How many bits are in a byte?',
                    answer: 8
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the binary representation of 5?',
                    options: ['100', '101', '110', '111'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is 2^10?',
                    answer: 1024
                },
                {
                    type: 'multiple-choice',
                    question: 'What does HTML stand for?',
                    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'What is the time complexity of binary search?',
                    answer: 0
                },
                {
                    type: 'multiple-choice',
                    question: 'What is a variable in programming?',
                    options: ['A fixed value', 'A storage location', 'A function', 'A loop'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'How many values can a boolean variable have?',
                    answer: 2
                },
                {
                    type: 'multiple-choice',
                    question: 'What does API stand for?',
                    options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Interface', 'Advanced Process Interface'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'What is the base of hexadecimal number system?',
                    answer: 16
                }
            ]
        },
        {
            id: 'environmental-science',
            name: 'Environmental Science',
            difficulty: 'easy',
            description: 'Ecosystems, climate, sustainability, and environmental concepts',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the main cause of global warming?',
                    options: ['Deforestation', 'Greenhouse gases', 'Ocean currents', 'Solar radiation'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What percentage of Earth\'s surface is covered by water?',
                    answer: 71
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the process by which plants release water vapor?',
                    options: ['Transpiration', 'Evaporation', 'Condensation', 'Precipitation'],
                    correct: 0
                },
                {
                    type: 'number',
                    question: 'How many layers does Earth\'s atmosphere have?',
                    answer: 5
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the largest rainforest in the world?',
                    options: ['Congo', 'Amazon', 'Borneo', 'Southeast Asia'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the normal pH range of rainwater?',
                    answer: 5.6
                },
                {
                    type: 'multiple-choice',
                    question: 'What gas makes up about 78% of Earth\'s atmosphere?',
                    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'How many years does it take for a plastic bottle to decompose?',
                    answer: 450
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the primary source of renewable energy?',
                    options: ['Coal', 'Oil', 'Solar', 'Natural gas'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the target temperature increase limit set by the Paris Agreement?',
                    answer: 2
                }
            ]
        },
        {
            id: 'engineering-basics',
            name: 'Engineering Basics',
            difficulty: 'hard',
            description: 'Engineering principles, design, materials, and problem-solving',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the study of forces and their effects on structures?',
                    options: ['Thermodynamics', 'Statics', 'Dynamics', 'Mechanics'],
                    correct: 3
                },
                {
                    type: 'number',
                    question: 'What is the efficiency of a machine that outputs 80J for 100J input?',
                    answer: 80
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the strongest shape for construction?',
                    options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the stress formula?',
                    answer: 0
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the purpose of a truss in construction?',
                    options: ['Aesthetics', 'Load distribution', 'Insulation', 'Ventilation'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the Young\'s modulus of steel? (GPa)',
                    answer: 200
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the first step in the engineering design process?',
                    options: ['Design', 'Testing', 'Problem identification', 'Implementation'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the safety factor for critical structures?',
                    answer: 3
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the study of heat and energy transfer?',
                    options: ['Mechanics', 'Thermodynamics', 'Statics', 'Dynamics'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the maximum stress a material can withstand?',
                    answer: 0
                }
            ]
        },
        {
            id: 'data-analysis',
            name: 'Data Analysis',
            difficulty: 'medium',
            description: 'Statistics, data interpretation, graphs, and analytical thinking',
            questions: [
                {
                    type: 'multiple-choice',
                    question: 'What is the average of 5, 10, 15, 20, 25?',
                    options: ['12', '15', '18', '20'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the median of 3, 7, 9, 12, 15?',
                    answer: 9
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the mode of 2, 3, 3, 4, 5, 3, 6?',
                    options: ['2', '3', '4', '5'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the range of 10, 15, 20, 25, 30?',
                    answer: 20
                },
                {
                    type: 'multiple-choice',
                    question: 'What type of graph shows parts of a whole?',
                    options: ['Bar graph', 'Line graph', 'Pie chart', 'Scatter plot'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the probability of rolling a 6 on a fair die?',
                    answer: 0.17
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the standard deviation a measure of?',
                    options: ['Average', 'Spread', 'Median', 'Mode'],
                    correct: 1
                },
                {
                    type: 'number',
                    question: 'What is the correlation coefficient range?',
                    answer: 0
                },
                {
                    type: 'multiple-choice',
                    question: 'What is the purpose of a histogram?',
                    options: ['Show trends', 'Compare categories', 'Show distribution', 'Show relationships'],
                    correct: 2
                },
                {
                    type: 'number',
                    question: 'What is the sample size for a 95% confidence interval?',
                    answer: 0
                }
            ]
        }
    ]
};

// Quiz System Class
class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.timer = null;
        this.completedTopics = new Set();
        this.userId = null;

        this.initialize();
    }

    async initialize() {
        this.userId = await this.generateUserId();
        await this.init();
    }

    async init() {
        await this.loadCompletedTopics();
        this.renderTopicGrid();
        this.setupEventListeners();
        this.loadAdminResults();
    }

    async generateUserId() {
        try {
            // Try to get the current user ID from the server
            const response = await fetch('/api/auth-status', { credentials: 'include' });
            const data = await response.json();

            if (data.authenticated && data.userId) {
                return data.userId;
            } else {
                // Fallback to generated ID if not authenticated
                return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
            }
        } catch (error) {
            console.error('Failed to get user ID from server:', error);
            // Fallback to generated ID
            return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        }
    }

    async loadCompletedTopics() {
        try {
            // Load completed topics from server based on team's quiz results
            const response = await fetch('/api/user-quiz-results');
            const data = await response.json();

            if (data.results && Array.isArray(data.results)) {
                // Filter results by current user ID
                const userResults = data.results.filter(result => result.userId === this.userId);
                const completedTopicIds = userResults.map(result => result.topicId);
                this.completedTopics = new Set(completedTopicIds);
                console.log('Loaded completed topics for user', this.userId, ':', completedTopicIds);
            } else {
                // Fallback to localStorage if server data not available
                const completed = localStorage.getItem('quiz_completed_topics');
                if (completed) {
                    this.completedTopics = new Set(JSON.parse(completed));
                }
            }
        } catch (error) {
            console.error('Failed to load completed topics from server:', error);
            // Fallback to localStorage
            const completed = localStorage.getItem('quiz_completed_topics');
            if (completed) {
                this.completedTopics = new Set(JSON.parse(completed));
            }
        }
    }

    saveCompletedTopics() {
        // Save completed topics to localStorage
        localStorage.setItem('quiz_completed_topics', JSON.stringify([...this.completedTopics]));
    }

    renderTopicGrid() {
        const topicGrid = document.getElementById('topicGrid');
        if (!topicGrid) return;

        console.log('Loading quiz topics:', QUIZ_CONFIG.topics.length);
        topicGrid.innerHTML = '';

        QUIZ_CONFIG.topics.forEach(topic => {
            const topicCard = document.createElement('div');
            const isCompleted = this.completedTopics.has(topic.id);
            topicCard.className = `topic-card ${isCompleted ? 'completed' : ''}`;
            topicCard.innerHTML = `
                <div class="topic-name">${topic.name}</div>
                <div class="difficulty-badge difficulty-${topic.difficulty}">${topic.difficulty.toUpperCase()}</div>
                <div class="topic-description">${topic.description}</div>
                ${isCompleted ? '<div class="completed-badge">✓ COMPLETED</div>' : ''}
            `;

            if (!isCompleted) {
                topicCard.addEventListener('click', () => {
                    console.log('Topic clicked:', topic.name);
                    this.startQuiz(topic);
                });
            } else {
                topicCard.style.cursor = 'not-allowed';
                topicCard.title = 'This topic has already been completed';
            }

            topicGrid.appendChild(topicCard);
        });

        console.log('Topic cards loaded:', topicGrid.children.length);
    }

    startQuiz(topic) {
        console.log('Starting quiz for topic:', topic.name);
        this.currentQuiz = topic;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = Date.now();

        // Show quiz modal
        const quizModalElement = document.getElementById('quizModal');
        console.log('Quiz modal element:', quizModalElement);

        if (!quizModalElement) {
            console.error('Quiz modal element not found!');
            return;
        }

        const quizModal = new bootstrap.Modal(quizModalElement);
        document.getElementById('quizTopicName').textContent = topic.name;
        quizModal.show();
        console.log('Quiz modal shown');

        // Start timer
        this.startTimer();

        // Render first question
        this.renderQuestion();
    }

    startTimer() {
        let timeLeft = 240; // 4 minutes in seconds

        this.timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const timerElement = document.getElementById('quizTimer');

            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            // Change timer color based on time left
            timerElement.className = 'quiz-timer';
            if (timeLeft <= 60) {
                timerElement.classList.add('danger');
            } else if (timeLeft <= 120) {
                timerElement.classList.add('warning');
            }

            if (timeLeft <= 0) {
                this.submitQuiz();
                return;
            }

            timeLeft--;
        }, 1000);
    }

    renderQuestion() {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');
        const questionCounter = document.getElementById('questionCounter');
        const progressBar = document.getElementById('quizProgress');

        // Update question counter
        questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of 10`;

        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / 10) * 100;
        progressBar.style.width = `${progress}%`;

        // Render question
        let questionHTML = `
            <div class="question-text">
                <span class="question-number">Q${this.currentQuestionIndex + 1}</span>
                ${question.question}
            </div>
        `;

        if (question.type === 'multiple-choice') {
            questionHTML += '<div class="answer-options">';
            question.options.forEach((option, index) => {
                const isSelected = this.userAnswers[this.currentQuestionIndex] === index;
                questionHTML += `
                    <div class="answer-option ${isSelected ? 'selected' : ''}" data-answer="${index}">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </div>
                `;
            });
            questionHTML += '</div>';
        } else if (question.type === 'number') {
            const currentAnswer = this.userAnswers[this.currentQuestionIndex] || '';
            questionHTML += `
                <div class="answer-options">
                    <input type="number" class="number-input" id="numberAnswer" 
                           placeholder="Enter your answer" value="${currentAnswer}">
                </div>
            `;
        }

        questionContainer.innerHTML = questionHTML;

        // Add event listeners
        this.setupQuestionEventListeners();

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    setupQuestionEventListeners() {
        // Multiple choice options
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));

                // Select current option
                option.classList.add('selected');

                // Store answer
                this.userAnswers[this.currentQuestionIndex] = parseInt(option.dataset.answer);
            });
        });

        // Number input
        const numberInput = document.getElementById('numberAnswer');
        if (numberInput) {
            numberInput.addEventListener('input', (e) => {
                this.userAnswers[this.currentQuestionIndex] = parseFloat(e.target.value) || '';
            });
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        const submitBtn = document.getElementById('submitQuizBtn');

        // Previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;

        // Next/Submit button
        if (this.currentQuestionIndex === 9) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < 9) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    }

    submitQuiz() {
        // Clear timer
        if (this.timer) {
            clearInterval(this.timer);
        }

        // Calculate score
        const score = this.calculateScore();
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);

        // Show results
        this.showResults(score, timeTaken);

        // Save results to Firebase
        this.saveResults(score, timeTaken);

        // Mark topic as completed
        this.completedTopics.add(this.currentQuiz.id);
        this.saveCompletedTopics();

        // Update topic grid
        this.renderTopicGrid();

        // Refresh user progress display
        if (typeof loadUserProgress === 'function') {
            loadUserProgress();
        }

        // Close quiz modal
        const quizModal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));
        quizModal.hide();
    }

    calculateScore() {
        let score = 0;

        this.currentQuiz.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];

            if (question.type === 'multiple-choice') {
                if (userAnswer === question.correct) {
                    score++;
                }
            } else if (question.type === 'number') {
                if (userAnswer === question.answer) {
                    score++;
                }
            }
        });

        return score;
    }

    showResults(score, timeTaken) {
        const resultsModal = new bootstrap.Modal(document.getElementById('quizResultsModal'));

        // Calculate tokens earned
        let tokensEarned = 0;
        if (score >= 8) {
            tokensEarned = 10;
        } else if (score >= 5) {
            tokensEarned = 5;
        } else if (score >= 1) {
            tokensEarned = 2;
        }

        document.getElementById('finalScore').textContent = `${score}/10`;

        let message = '';
        if (score >= 9) {
            message = 'Excellent! Outstanding performance!';
        } else if (score >= 7) {
            message = 'Great job! Well done!';
        } else if (score >= 5) {
            message = 'Good effort! Keep practicing!';
        } else {
            message = 'Keep trying! Practice makes perfect!';
        }

        // Add tokens information to the message
        if (tokensEarned > 0) {
            message += ` You earned ${tokensEarned} tokens!`;
        }

        document.getElementById('scoreMessage').textContent = message;
        resultsModal.show();
    }

    async saveResults(score, timeTaken) {
        try {
            // Save to server instead of direct Firebase
            const response = await fetch('/api/save-quiz-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    topic: this.currentQuiz.name,
                    topicId: this.currentQuiz.id,
                    score: score,
                    totalQuestions: 10,
                    timeTaken: timeTaken,
                    answers: this.userAnswers,
                    userId: this.userId
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Quiz results saved:', data);
            } else {
                console.error('Failed to save quiz results');
            }
        } catch (error) {
            console.error('Error saving quiz results:', error);
        }
    }

    async loadAdminResults() {
        try {
            const response = await fetch('/api/quiz-results', { credentials: 'include' });
            const data = await response.json();

            if (data.results) {
                this.renderAdminResults(data.results);
            }
        } catch (error) {
            console.error('Error loading admin results:', error);
        }
    }

    renderAdminResults(results) {
        const adminTable = document.getElementById('adminResultsTable');
        if (!adminTable) return;

        adminTable.innerHTML = '';

        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.userId}</td>
                <td>${result.topic}</td>
                <td>${result.score}/${result.totalQuestions}</td>
                <td>${Math.floor(result.timeTaken / 60)}:${(result.timeTaken % 60).toString().padStart(2, '0')}</td>
                <td>${new Date(result.timestamp.seconds * 1000).toLocaleDateString()}</td>
            `;
            adminTable.appendChild(row);
        });
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('nextQuestionBtn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prevQuestionBtn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('submitQuizBtn').addEventListener('click', () => this.submitQuiz());

        // Admin section toggle (for testing)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'a') {
                const adminSection = document.getElementById('adminSection');
                adminSection.style.display = adminSection.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}

// Initialize quiz system when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Debug: Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap is not loaded for quiz system!');
    } else {
        console.log('Bootstrap loaded successfully for quiz system');
    }

    // Debug: Check if modal elements exist
    const quizModal = document.getElementById('quizModal');
    const quizResultsModal = document.getElementById('quizResultsModal');
    console.log('Quiz modal element:', quizModal);
    console.log('Quiz results modal element:', quizResultsModal);

    new QuizSystem();
});
