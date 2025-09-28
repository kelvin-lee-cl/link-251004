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

module.exports = { QUIZ_CONFIG };
