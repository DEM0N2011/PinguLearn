// Base quiz questions
const quizzes = {
    mrs_gren: {
        name: 'MRS GREN',
        questions: [
            {
                question: 'What does M stand for in MRS GREN?',
                options: ['Movement', 'Metabolism', 'Mitosis', 'Membrane'],
                correctAnswer: 0
            },
            {
                question: 'Which process involves taking in and using energy?',
                options: ['Reproduction', 'Respiration', 'Growth', 'Nutrition'],
                correctAnswer: 1
            },
            {
                question: 'What does S stand for in MRS GREN?',
                options: ['Survival', 'Synthesis', 'Sensitivity', 'System'],
                correctAnswer: 2
            },
            {
                question: 'Which characteristic allows organisms to detect and respond to changes?',
                options: ['Growth', 'Reproduction', 'Sensitivity', 'Nutrition'],
                correctAnswer: 2
            },
            {
                question: 'What does N stand for in MRS GREN?',
                options: ['Nucleus', 'Nervous System', 'Neutralization', 'Nutrition'],
                correctAnswer: 3
            }
        ]
    },
    naming_keys: {
        name: 'Naming Keys',
        questions: [
            {
                question: 'What type of key uses a series of paired statements to identify organisms?',
                options: ['Dichotomous key', 'Classification key', 'Identification key', 'Taxonomic key'],
                correctAnswer: 0
            },
            {
                question: 'In a dichotomous key, how many choices are given at each step?',
                options: ['One', 'Two', 'Three', 'Four'],
                correctAnswer: 1
            },
            {
                question: 'What should statements in a key be based on?',
                options: ['Opinion', 'Observable features', 'Color only', 'Size only'],
                correctAnswer: 1
            },
            {
                question: 'Which is NOT a good characteristic for a key?',
                options: ['Number of legs', 'Favorite food', 'Body covering', 'Wing shape'],
                correctAnswer: 1
            },
            {
                question: 'What is the purpose of a biological key?',
                options: ['To unlock doors', 'To identify organisms', 'To classify by size', 'To measure growth'],
                correctAnswer: 1
            }
        ]
    },
    features: {
        name: 'Features of Living Things',
        questions: [
            {
                question: 'Which feature allows organisms to produce offspring?',
                options: ['Growth', 'Reproduction', 'Nutrition', 'Movement'],
                correctAnswer: 1
            },
            {
                question: 'What is the process of converting nutrients into energy?',
                options: ['Growth', 'Respiration', 'Excretion', 'Nutrition'],
                correctAnswer: 1
            },
            {
                question: 'Which process involves an increase in cell number and size?',
                options: ['Growth', 'Movement', 'Sensitivity', 'Excretion'],
                correctAnswer: 0
            },
            {
                question: 'What is the removal of waste products called?',
                options: ['Nutrition', 'Sensitivity', 'Excretion', 'Respiration'],
                correctAnswer: 2
            },
            {
                question: 'Which feature helps plants grow towards light?',
                options: ['Movement', 'Sensitivity', 'Growth', 'Nutrition'],
                correctAnswer: 1
            }
        ]
    },
    kingdoms: {
        name: '5 Kingdoms',
        questions: [
            {
                question: 'Which kingdom includes organisms that make their own food?',
                options: ['Animals', 'Plants', 'Fungi', 'Protista'],
                correctAnswer: 1
            },
            {
                question: 'Which kingdom includes multicellular organisms that cannot make their own food?',
                options: ['Plants', 'Animals', 'Bacteria', 'Protista'],
                correctAnswer: 1
            },
            {
                question: 'Which kingdom includes decomposers?',
                options: ['Plants', 'Animals', 'Fungi', 'Bacteria'],
                correctAnswer: 2
            },
            {
                question: 'Which kingdom contains only single-celled organisms?',
                options: ['Plants', 'Animals', 'Fungi', 'Monera'],
                correctAnswer: 3
            },
            {
                question: 'Which kingdom includes amoeba and paramecium?',
                options: ['Monera', 'Protista', 'Fungi', 'Plants'],
                correctAnswer: 1
            }
        ]
    },
    viruses: {
        name: 'Viruses',
        questions: [
            {
                question: 'Why are viruses not considered living organisms?',
                options: [
                    'They are too small',
                    'They cannot reproduce independently',
                    'They are invisible',
                    'They cause diseases'
                ],
                correctAnswer: 1
            },
            {
                question: 'What is the basic structure of a virus?',
                options: [
                    'Cell wall and membrane',
                    'Genetic material and protein coat',
                    'Nucleus and cytoplasm',
                    'Chloroplasts and mitochondria'
                ],
                correctAnswer: 1
            },
            {
                question: 'How do viruses reproduce?',
                options: [
                    'By mitosis',
                    'By using host cells',
                    'By binary fission',
                    'By budding'
                ],
                correctAnswer: 1
            },
            {
                question: 'Which characteristic of living things do viruses NOT show?',
                options: [
                    'Reproduction',
                    'Metabolism',
                    'Evolution',
                    'Protein synthesis'
                ],
                correctAnswer: 1
            },
            {
                question: 'What is the role of the protein coat in a virus?',
                options: [
                    'Energy production',
                    'Protection and host cell recognition',
                    'Reproduction',
                    'Movement'
                ],
                correctAnswer: 1
            }
        ]
    }
};

// Extended questions for each topic
const extendedQuestions = {
    mrs_gren: [
        {
            question: "Explain how plants demonstrate the MRS GREN characteristics of life. Include specific examples for each characteristic.",
            markingScheme: {
                movement: ["Growth towards light (phototropism)", "Root growth towards water/minerals (geotropism)"],
                respiration: ["Glucose + oxygen → energy + carbon dioxide + water", "Occurs in mitochondria"],
                sensitivity: ["Response to light", "Response to gravity", "Response to water"],
                growth: ["Increase in cell number", "Increase in cell size", "Primary and secondary growth"],
                reproduction: ["Sexual reproduction with flowers", "Asexual reproduction methods", "Production of seeds/spores"],
                excretion: ["Removal of oxygen in photosynthesis", "Loss of water through transpiration", "Release of carbon dioxide"],
                nutrition: ["Photosynthesis process", "Absorption of minerals", "Autotrophic nutrition"],
                pointsPerKeyword: 1,
                maxPoints: 14
            }
        },
        // Add 14 more questions here
    ],
    
    naming_keys: [
        {
            question: "Design a dichotomous key to classify 8 different organisms found in a garden. Explain the characteristics you chose and why they are effective for classification.",
            markingScheme: {
                structure: ["Clear paired statements", "Logical progression", "Numbered steps", "Leads to unique identification"],
                characteristics: ["Observable features", "Clear distinctions", "Non-subjective traits", "Consistent terminology"],
                examples: ["Valid organisms", "Correct classification", "Appropriate grouping"],
                explanation: ["Justified choices", "Scientific reasoning", "Practical application"],
                pointsPerKeyword: 1,
                maxPoints: 12
            }
        },
        // Add 14 more questions here
    ],
    
    features: [
        {
            question: "Compare and contrast the features of unicellular and multicellular organisms, explaining how they carry out basic life processes differently.",
            markingScheme: {
                structure: ["Single cell vs many cells", "Specialized cells", "Tissue organization", "Organ systems"],
                processes: ["Diffusion vs transport systems", "Simple vs complex reproduction", "Direct vs indirect absorption"],
                advantages: ["Surface area to volume ratio", "Specialization benefits", "Survival advantages"],
                disadvantages: ["Energy requirements", "Resource distribution", "Complexity issues"],
                pointsPerKeyword: 1,
                maxPoints: 15
            }
        },
        // Add 14 more questions here
    ],
    
    kingdoms: [
        {
            question: "Explain why viruses are not classified in any of the five kingdoms. Compare their characteristics with those of living organisms.",
            markingScheme: {
                structure: ["No cellular organization", "Protein coat", "Genetic material only", "Crystalline form"],
                lifecycle: ["Requires host cell", "No independent reproduction", "Hijacks cell machinery"],
                characteristics: ["No metabolism", "No respiration", "No growth", "No independent nutrition"],
                debate: ["Living vs non-living", "Evolutionary significance", "Biological impact"],
                pointsPerKeyword: 1,
                maxPoints: 15
            }
        },
        // Add 14 more questions here
    ],
    
    viruses: [
        {
            question: "Describe the structure of a virus and explain how it infects and replicates within a host cell. Include the lytic and lysogenic cycles in your answer.",
            markingScheme: {
                structure: ["Capsid", "Nucleic acid (DNA/RNA)", "Envelope (some viruses)", "Protein spikes"],
                infection: ["Attachment", "Entry mechanism", "Release of genetic material"],
                lyticCycle: ["Immediate replication", "Cell destruction", "Release of viruses"],
                lysogenicCycle: ["Integration into host DNA", "Dormant phase", "Later activation"],
                effects: ["Cell death", "Immune response", "Disease symptoms"],
                pointsPerKeyword: 1,
                maxPoints: 15
            }
        },
        // Add 14 more questions here
    ]
};

// Function to select random questions
function getRandomQuestions(topic, count = 5) {
    const questions = extendedQuestions[topic];
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to grade a long answer
function gradeLongAnswer(answer, markingScheme) {
    let points = 0;
    const foundKeywords = new Set();
    const lowercaseAnswer = answer.toLowerCase();
    
    // Check each category in the marking scheme
    Object.entries(markingScheme).forEach(([category, keywords]) => {
        if (Array.isArray(keywords)) {
            keywords.forEach(keyword => {
                const lowercaseKeyword = keyword.toLowerCase();
                if (lowercaseAnswer.includes(lowercaseKeyword) && !foundKeywords.has(lowercaseKeyword)) {
                    points += markingScheme.pointsPerKeyword;
                    foundKeywords.add(lowercaseKeyword);
                }
            });
        }
    });
    
    // Cap points at maximum
    points = Math.min(points, markingScheme.maxPoints);
    
    // Calculate percentage for gem rewards
    const percentage = (points / markingScheme.maxPoints) * 100;
    let gems = 0;
    
    if (percentage >= 75) {
        gems = 3;
    } else if (percentage >= 50) {
        gems = 2;
    } else if (percentage >= 25) {
        gems = 1;
    }
    
    return {
        points,
        maxPoints: markingScheme.maxPoints,
        percentage,
        gems,
        foundKeywords: Array.from(foundKeywords)
    };
}

// Function to highlight keywords in the answer
function highlightKeywords(answer, keywords) {
    let highlightedAnswer = answer;
    keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        highlightedAnswer = highlightedAnswer.replace(regex, `<span class="keyword-highlight">${keyword}</span>`);
    });
    return highlightedAnswer;
} 
