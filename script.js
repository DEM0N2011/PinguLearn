// Add these functions at the top of the file
function openFolder(folderId) {
    // Hide the main subjects container (the one with the folder button)
    document.querySelector('.subjects:not(.folder-content .subjects)').style.display = 'none';
    
    // Show the folder content
    document.getElementById('folder-content').style.display = 'block';
    
    // Show the quizzes inside the folder
    document.querySelector('.folder-content .subjects').style.display = 'grid';
    
    // Hide custom quizzes while in folder
    document.getElementById('custom-quizzes').style.display = 'none';
}

function closeFolder() {
    // Hide the folder content
    document.getElementById('folder-content').style.display = 'none';
    
    // Show the main subjects container
    document.querySelector('.subjects:not(.folder-content .subjects)').style.display = 'grid';
    
    // Show custom quizzes
    document.getElementById('custom-quizzes').style.display = 'block';
}

// Game state
let currentXP = 0;
let currentLevel = 1;
let currentQuiz = null;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let gems = 0;
let skinPoints = 0;
let ownedSkins = ['student'];
let currentSkin = 'student';
let customQuizzes = [];
let streakCount = 0;
let lastQuizDate = null;
let questionStartTime = 0;
let questionTimes = [];
let incorrectAnswers = [];
let topicPerformance = {};
let isLongAnswerMode = false;
let currentLongQuestion = null;
let currentSubject = '';
let suggestedRevisionSlots = [];
let friends = [];
let friendRequests = [];
let onlineFriends = new Set();
let isFriendsVisible = false;
let currentTheme = 'default';
let currentButtonStyle = 'default';
let currentAnimationLevel = 'moderate';
let particlesEnabled = false;
let glowEffectsEnabled = false;
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;

// Skins data
const skins = {
    student: {
        emoji: '👨‍🎓',
        price: 50
    },
    scientist: {
        emoji: '👨‍🔬',
        price: 100
    },
    doctor: {
        emoji: '👨‍⚕️',
        price: 150
    },
    astronaut: {
        emoji: '👨‍🚀',
        price: 200
    },
    superhero: {
        emoji: '🦸‍♂️',
        price: 300
    },
    alien: {
        emoji: '👾',
        price: 500
    }
};

// Rewards configuration
const XP_PER_CORRECT_ANSWER = 20;
const HOURGLASSES_PER_QUIZ = 3;
const XP_NEEDED_FOR_LEVEL_UP = 100;
const SKIN_PER_HOURGLASS = 10;

// Quiz data
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

// Function to select a quiz and start it
function selectQuiz(quizName) {
    currentQuiz = quizzes[quizName];
    currentQuestionIndex = 0;
    correctAnswers = 0;
    currentSubject = 'Biology'; // Since all quizzes are biology for now
    
    // Get 5 random extended questions
    const extendedQs = getRandomQuestions(quizName);
    currentQuiz.questions = [...currentQuiz.questions, ...extendedQs];
    
    document.getElementById('subject-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-subject').textContent = currentQuiz.name;
    
    showQuestion();
    updateProgress();
}

// Function to display the current question
function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    if (question.markingScheme) {
        // Long answer question
        isLongAnswerMode = true;
        currentLongQuestion = question;
        
        const answerContainer = document.createElement('div');
        answerContainer.className = 'long-answer-container';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'long-answer-input';
        textarea.placeholder = 'Type your answer here...';
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'option-btn';
        submitBtn.textContent = 'Submit Answer';
        submitBtn.onclick = () => checkLongAnswer(textarea.value);
        
        answerContainer.appendChild(textarea);
        answerContainer.appendChild(submitBtn);
        optionsContainer.appendChild(answerContainer);
    } else {
        // Multiple choice question
        isLongAnswerMode = false;
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(button);
        });
    }
    
    document.getElementById('next-btn').style.display = 'none';
    startQuestionTimer();
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
    recordQuestionTime();
    const question = currentQuiz.questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach(option => option.disabled = true);
    
    if (selectedIndex === question.correctAnswer) {
        options[selectedIndex].classList.add('correct');
        correctAnswers++;
        addXP(XP_PER_CORRECT_ANSWER);
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correctAnswer].classList.add('correct');
        incorrectAnswers.push({
            question: question.question,
            selectedAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.correctAnswer]
        });
    }
    
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('next-btn').onclick = nextQuestion;
}

// Function to move to the next question or end the quiz
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.questions.length) {
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// Function to update the progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex) / currentQuiz.questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

// Function to show quiz results
function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    const totalQuestions = currentQuiz.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const earnedXP = correctAnswers * XP_PER_CORRECT_ANSWER;
    let earnedGems = 0;
    
    if (percentage >= 75) {
        earnedGems = 3;
    } else if (percentage >= 50) {
        earnedGems = 2;
    } else if (percentage >= 25) {
        earnedGems = 1;
    }
    
    document.getElementById('earned-xp').textContent = earnedXP;
    document.getElementById('earned-gems').textContent = earnedGems;
    document.getElementById('correct-answers').textContent = 
        correctAnswers + ' out of ' + totalQuestions;
    
    // Update last quiz date and check streak
    lastQuizDate = new Date();
    checkStreak();
    
    // Add gems for completing the quiz
    addGems(earnedGems);
    
    // Generate feedback
    generatePerformanceChart();
    updateTimeAnalysis();
    populateFeedbackLists();
    suggestRevisionTimes();
}

// Function to return to quiz selection
function returnToQuizzes() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('subject-selection').style.display = 'block';
    closeFolder();
    resetQuizTracking();
}

// Function to add XP and handle level ups
function addXP(amount) {
    currentXP += amount;
    
    while (currentXP >= XP_NEEDED_FOR_LEVEL_UP) {
        currentXP -= XP_NEEDED_FOR_LEVEL_UP;
        currentLevel++;
        showLevelUpMessage();
    }
    
    document.getElementById('xp-count').textContent = currentXP;
    document.getElementById('level-count').textContent = currentLevel;
}

// Function to add gems
function addGems(amount) {
    // Apply streak bonus if active
    if (streakCount > 0) {
        amount = Math.floor(amount * 1.5); // 50% bonus
    }
    
    gems += amount;
    document.getElementById('gem-count').textContent = gems;
    saveGameData();
}

// Function to toggle shop visibility
function toggleShop() {
    const shopContainer = document.getElementById('shop-container');
    const isShopVisible = shopContainer.style.display === 'block';
    
    document.getElementById('subject-selection').style.display = isShopVisible ? 'block' : 'none';
    document.getElementById('timetable-section').style.display = 'none';
    shopContainer.style.display = isShopVisible ? 'none' : 'block';
    
    if (!isShopVisible) {
        updateShopDisplay();
    }
}

// Function to exchange gems for SKIN points
function exchangeGems() {
    const amount = parseInt(document.getElementById('exchange-amount').value);
    
    if (isNaN(amount) || amount < 1) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (amount > gems) {
        alert('You don\'t have enough gems');
        return;
    }
    
    gems -= amount;
    skinPoints += amount * SKIN_PER_HOURGLASS;
    
    document.getElementById('gem-count').textContent = gems;
    document.getElementById('skin-count').textContent = skinPoints;
    updateShopDisplay();
    saveGameData();
}

// Function to purchase and select a skin
function purchaseSkin(skinName) {
    if (ownedSkins.includes(skinName)) {
        selectSkin(skinName);
        return;
    }
    
    const skin = skins[skinName];
    if (skinPoints >= skin.price) {
        skinPoints -= skin.price;
        ownedSkins.push(skinName);
        document.getElementById('skin-count').textContent = skinPoints;
        selectSkin(skinName);
        updateShopDisplay();
    } else {
        alert('Not enough SKIN points!');
    }
}

// Function to select a skin
function selectSkin(skinName) {
    if (!ownedSkins.includes(skinName)) return;
    
    currentSkin = skinName;
    document.getElementById('current-skin').textContent = skins[skinName].emoji;
    updateShopDisplay();
}

// Function to update the shop display
function updateShopDisplay() {
    const skinItems = document.querySelectorAll('.skin-item');
    skinItems.forEach(item => {
        const skinName = item.getAttribute('onclick').match(/'(.*?)'/)[1];
        item.classList.remove('owned', 'selected');
        
        if (ownedSkins.includes(skinName)) {
            item.classList.add('owned');
            if (currentSkin === skinName) {
                item.classList.add('selected');
            }
        }
    });
}

// Function to show level up message
function showLevelUpMessage() {
    const message = document.createElement('div');
    message.className = 'level-up-message';
    message.textContent = '🎉 Level Up! You are now level ' + currentLevel;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2ecc71;
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        animation: fadeInOut 3s forwards;
        z-index: 1000;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// Add CSS for level up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -20px); }
        20% { opacity: 1; transform: translate(-50%, 0); }
        80% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -20px); }
    }
`;
document.head.appendChild(style);

// Function to toggle create quiz interface
function toggleCreateQuiz() {
    const createContainer = document.getElementById('create-quiz-container');
    const isCreateVisible = createContainer.style.display === 'block';
    
    document.getElementById('subject-selection').style.display = isCreateVisible ? 'block' : 'none';
    document.getElementById('timetable-section').style.display = 'none';
    createContainer.style.display = isCreateVisible ? 'none' : 'block';
    
    if (!isCreateVisible) {
        setupPDFUpload();
    }
}

// Function to set up PDF upload functionality
function setupPDFUpload() {
    const uploadBox = document.getElementById('upload-box');
    const pdfUpload = document.getElementById('pdf-upload');
    
    // Drag and drop handlers
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('drag-over');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('drag-over');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handlePDFUpload(e.dataTransfer.files[0]);
        }
    });
    
    // File input handler
    pdfUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handlePDFUpload(e.target.files[0]);
        }
    });
}

// Function to extract key sentences and concepts from text
function extractKeyInformation(text) {
    // Split into sentences, keeping sentences that have actual content
    const sentences = text.split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && /[a-zA-Z]/.test(s)); // Keep sentences with at least 10 chars and containing letters
    
    // If we have very few sentences, try to split by other delimiters
    if (sentences.length < 5) {
        const additionalSentences = text.split(/[;\n]+/)
            .map(s => s.trim())
            .filter(s => s.length > 10 && /[a-zA-Z]/.test(s) && !sentences.includes(s));
        sentences.push(...additionalSentences);
    }
    
    // Remove duplicate sentences and very similar ones
    const uniqueSentences = [];
    sentences.forEach(sentence => {
        const isDuplicate = uniqueSentences.some(existing => 
            existing.toLowerCase().includes(sentence.toLowerCase()) ||
            sentence.toLowerCase().includes(existing.toLowerCase())
        );
        if (!isDuplicate) {
            uniqueSentences.push(sentence);
        }
    });
    
    // Simplify each sentence
    return uniqueSentences.map(sentence => simplifyText(sentence));
}

// Function to simplify and shorten text
function simplifyText(text) {
    // Remove unnecessary phrases and words
    const unnecessaryPhrases = [
        'it is important to note that',
        'it should be mentioned that',
        'it is worth noting that',
        'it is interesting to observe that',
        'as we can see',
        'as mentioned earlier',
        'in other words',
        'to put it simply',
        'in this context',
        'generally speaking',
        'for the most part',
        'in general',
        'basically',
        'essentially',
        'fundamentally',
        'in essence'
    ];
    
    let simplified = text;
    unnecessaryPhrases.forEach(phrase => {
        simplified = simplified.replace(new RegExp(phrase, 'gi'), '');
    });
    
    // Remove parenthetical expressions
    simplified = simplified.replace(/\([^)]*\)/g, '');
    
    // Remove extra spaces
    simplified = simplified.replace(/\s+/g, ' ').trim();
    
    // Shorten long numbers to their magnitude
    simplified = simplified.replace(/\d{7,}/g, match => {
        if (match.length >= 10) return Math.floor(match / 1000000000) + ' billion';
        if (match.length >= 7) return Math.floor(match / 1000000) + ' million';
        return match;
    });
    
    // Replace complex words with simpler alternatives
    const wordSimplifications = {
        'utilize': 'use',
        'implement': 'use',
        'facilitate': 'help',
        'demonstrate': 'show',
        'necessitate': 'need',
        'endeavor': 'try',
        'commence': 'start',
        'terminate': 'end',
        'subsequently': 'then',
        'additionally': 'also',
        'consequently': 'so',
        'nevertheless': 'but',
        'approximately': 'about',
        'sufficient': 'enough',
        'numerous': 'many',
        'obtain': 'get',
        'possess': 'have',
        'regarding': 'about',
        'concerning': 'about',
        'pertaining to': 'about',
        'in relation to': 'about',
        'with respect to': 'about',
        'in terms of': 'about'
    };
    
    Object.entries(wordSimplifications).forEach(([complex, simple]) => {
        simplified = simplified.replace(new RegExp(`\\b${complex}\\b`, 'gi'), simple);
    });
    
    // Shorten the text if it's too long (more than 15 words)
    const words = simplified.split(' ');
    if (words.length > 15) {
        // Try to find a natural break point (period, comma, or conjunction)
        const breakPoints = simplified.match(/[.,] |\band\b|\bbut\b|\bor\b/g) || [];
        if (breakPoints.length > 0) {
            // Find the break point closest to the middle
            const middle = simplified.length / 2;
            const breakPoint = breakPoints.reduce((best, current) => {
                const currentIndex = simplified.indexOf(current);
                const bestIndex = simplified.indexOf(best);
                return Math.abs(currentIndex - middle) < Math.abs(bestIndex - middle) ? current : best;
            });
            const breakIndex = simplified.indexOf(breakPoint);
            simplified = simplified.substring(0, breakIndex + 1);
        } else {
            // If no natural break points, just take the first 15 words
            simplified = words.slice(0, 15).join(' ');
        }
    }
    
    return simplified;
}

// Function to simplify a question object
function simplifyQuestion(question) {
    // Simplify the question text
    question.question = simplifyText(question.question);
    
    // Simplify each option
    question.options = question.options.map(option => simplifyText(option));
    
    return question;
}

// Update the generateQuestion function to include simplification
function generateQuestion(sentence) {
    // Remove common prefixes that might interfere with question formation
    sentence = sentence.replace(/^(the|a|an|in|on|at|for|to|of|with)\s+/i, '');
    
    // Simplify the sentence first
    sentence = simplifyText(sentence);
    
    // Different question patterns
    const patterns = [
        // Definition pattern
        {
            match: /(.*?)\s+(is|are|was|were)\s+(.*)/i,
            question: (matches) => `What ${matches[2]} ${matches[1]}?`,
            answer: (matches) => matches[3]
        },
        // Meaning pattern
        {
            match: /(.*?)\s+(means|refers to|defined as)\s+(.*)/i,
            question: (matches) => `What is ${matches[1]}?`,
            answer: (matches) => matches[3]
        },
        // Function pattern
        {
            match: /(.*?)\s+(function|purpose|role)\s+of\s+(.*?)\s+is\s+(.*)/i,
            question: (matches) => `What does ${matches[3]} do?`,
            answer: (matches) => matches[4]
        },
        // Cause and effect pattern
        {
            match: /(.*?)\s+(causes|leads to|results in|produces)\s+(.*)/i,
            question: (matches) => `What happens due to ${matches[1]}?`,
            answer: (matches) => matches[3]
        },
        // Process pattern
        {
            match: /(.*?)\s+(occurs|happens|takes place)\s+(when|during|if)\s+(.*)/i,
            question: (matches) => `When does ${matches[1]} happen?`,
            answer: (matches) => matches[4]
        },
        // Component pattern
        {
            match: /(.*?)\s+(contains|consists of|comprises|includes)\s+(.*)/i,
            question: (matches) => `What is in ${matches[1]}?`,
            answer: (matches) => matches[3]
        }
    ];
    
    // Try to match the sentence with a pattern
    for (const pattern of patterns) {
        const matches = sentence.match(pattern.match);
        if (matches) {
            const correctAnswer = pattern.answer(matches).trim();
            const wrongOptions = generateWrongOptions(correctAnswer);
            
            return simplifyQuestion({
                question: pattern.question(matches),
                options: shuffleArray([correctAnswer, ...wrongOptions]),
                correctAnswer: 0  // Will be updated after shuffling
            });
        }
    }
    
    // If no pattern matches, create a simple comprehension question
    const questionTypes = [
        "What is",
        "Describe",
        "Explain",
        "Tell me about"
    ];
    
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const subject = sentence.split(' ').slice(0, 3).join(' ');
    
    return simplifyQuestion({
        question: `${randomType} ${subject}?`,
        options: shuffleArray([
            sentence,
            ...generateWrongOptions(sentence)
        ]),
        correctAnswer: 0  // Will be updated after shuffling
    });
}

// Function to generate wrong options
function generateWrongOptions(correctAnswer) {
    // Split the correct answer into key terms
    const terms = correctAnswer.split(/\s+/);
    const wrongOptions = [];
    
    // Generate wrong options by modifying the correct answer
    if (terms.length > 2) {
        // Option 1: Swap some terms
        wrongOptions.push(
            terms.slice(Math.floor(terms.length/2)).concat(terms.slice(0, Math.floor(terms.length/2))).join(' ')
        );
        
        // Option 2: Remove key terms
        wrongOptions.push(
            terms.filter((_, i) => i % 2 === 0).join(' ')
        );
    }
    
    // Option 3: Add a contradictory statement
    wrongOptions.push(`Not ${correctAnswer.toLowerCase()}`);
    
    // Option 4: Create an opposite meaning
    const opposites = {
        'increase': 'decrease',
        'high': 'low',
        'large': 'small',
        'more': 'less',
        'above': 'below',
        'over': 'under',
        'positive': 'negative',
        'true': 'false',
        'correct': 'incorrect',
        'right': 'wrong',
        'good': 'bad',
        'better': 'worse',
        'best': 'worst',
        'always': 'never',
        'all': 'none',
        'many': 'few',
        'most': 'least'
    };
    
    let oppositeAnswer = correctAnswer.toLowerCase();
    Object.entries(opposites).forEach(([word, opposite]) => {
        oppositeAnswer = oppositeAnswer.replace(new RegExp(`\\b${word}\\b`, 'gi'), opposite);
    });
    wrongOptions.push(oppositeAnswer);
    
    // Ensure we have at least 3 wrong options
    while (wrongOptions.length < 3) {
        wrongOptions.push(`Alternative explanation to: ${correctAnswer}`);
    }
    
    return wrongOptions.slice(0, 3).map(opt => 
        opt.charAt(0).toUpperCase() + opt.slice(1)
    );
}

// Function to shuffle an array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Update the handlePDFUpload function to automatically generate a quiz
async function handlePDFUpload(file) {
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
    }
    
    try {
        const uploadBox = document.getElementById('upload-box');
        uploadBox.innerHTML = `
            <div class="upload-progress">
                <p>Processing PDF...</p>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        
        // Extract text from all pages
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
            
            // Update progress bar
            const progress = (i / pdf.numPages) * 50; // First 50% for PDF reading
            uploadBox.querySelector('.progress').style.width = `${progress}%`;
        }
        
        // Extract key information and generate questions
        const keyInfo = extractKeyInformation(fullText);
        const questions = [];
        const totalSentences = keyInfo.length;
        
        // Generate questions from key information
        for (let i = 0; i < keyInfo.length; i++) {
            const question = generateQuestion(keyInfo[i]);
            if (question) {
                // Find the correct answer's index after shuffling
                const correctIndex = question.options.indexOf(question.options[question.correctAnswer]);
                question.correctAnswer = correctIndex;
                questions.push(question);
            }
            
            // Update progress bar (last 50% for question generation)
            const progress = 50 + ((i + 1) / totalSentences) * 50;
            uploadBox.querySelector('.progress').style.width = `${progress}%`;
        }
        
        // Create a new quiz from the generated questions
        const quizTitle = file.name.replace('.pdf', '');
        const newQuiz = {
            name: quizTitle,
            questions: questions
        };
        
        // Add to custom quizzes
        customQuizzes.push(newQuiz);
        updateCustomQuizList();
        
        // Show success message with detailed stats
        uploadBox.innerHTML = `
            <div class="upload-success">
                <div class="success-icon">✓</div>
                <h3>Quiz Generated Successfully!</h3>
                <div class="quiz-stats">
                    <p>Created ${questions.length} questions from your PDF</p>
                    <p>Source sentences processed: ${totalSentences}</p>
                    <p>Question types:</p>
                    <ul>
                        <li>Multiple choice: ${questions.filter(q => q.options.length === 4).length}</li>
                        <li>True/False: ${questions.filter(q => q.options.length === 2).length}</li>
                    </ul>
                </div>
                <div class="quiz-actions">
                    <button onclick="selectCustomQuiz(${customQuizzes.length - 1})" class="start-btn">Start Quiz Now</button>
                    <button onclick="toggleCreateQuiz()" class="return-btn">Return to Quizzes</button>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error reading PDF:', error);
        uploadBox.innerHTML = `
            <div class="upload-error">
                <div class="error-icon">❌</div>
                <h3>Error Processing PDF</h3>
                <p>${error.message}</p>
                <button onclick="setupPDFUpload()" class="retry-btn">Try Again</button>
            </div>
        `;
    }
}

// Function to add a new question form
function addQuestion() {
    const questionsContainer = document.getElementById('questions-container');
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    
    questionBlock.innerHTML = `
        <button class="remove-question-btn" onclick="this.parentElement.remove()">Remove Question</button>
        <textarea placeholder="Enter your question" class="question-input"></textarea>
        <div class="options-block">
            ${Array(4).fill(0).map((_, i) => `
                <div class="option-input">
                    <input type="radio" name="correct_${Date.now()}" value="${i}">
                    <input type="text" placeholder="Option ${i + 1}">
                </div>
            `).join('')}
        </div>
    `;
    
    questionsContainer.appendChild(questionBlock);
}

// Function to save the created quiz
function saveQuiz() {
    const title = document.getElementById('quiz-title').value.trim();
    if (!title) {
        alert('Please enter a quiz title');
        return;
    }
    
    const questions = [];
    const questionBlocks = document.querySelectorAll('.question-block');
    
    for (const block of questionBlocks) {
        const questionText = block.querySelector('textarea').value.trim();
        const options = Array.from(block.querySelectorAll('.option-input input[type="text"]'))
            .map(input => input.value.trim());
        const correctAnswer = Array.from(block.querySelectorAll('input[type="radio"]'))
            .findIndex(radio => radio.checked);
        
        if (!questionText || options.some(opt => !opt) || correctAnswer === -1) {
            alert('Please fill in all fields for each question and select a correct answer');
            return;
        }
        
        questions.push({
            question: questionText,
            options: options,
            correctAnswer: correctAnswer
        });
    }
    
    if (questions.length === 0) {
        alert('Please add at least one question');
        return;
    }
    
    const newQuiz = {
        name: title,
        questions: questions
    };
    
    customQuizzes.push(newQuiz);
    updateCustomQuizList();
    toggleCreateQuiz();
    
    // Reset form
    document.getElementById('quiz-title').value = '';
    document.getElementById('questions-container').innerHTML = '';
    document.getElementById('pdf-preview').style.display = 'none';
    document.getElementById('quiz-creation-form').style.display = 'none';
    document.getElementById('pdf-text').textContent = '';
}

// Function to update custom quiz list
function updateCustomQuizList() {
    const customQuizList = document.getElementById('custom-quiz-list');
    customQuizList.innerHTML = '';
    
    customQuizzes.forEach((quiz, index) => {
        const button = document.createElement('button');
        button.className = 'subject-btn';
        button.textContent = quiz.name;
        button.onclick = () => selectCustomQuiz(index);
        customQuizList.appendChild(button);
    });
}

// Function to select a custom quiz
function selectCustomQuiz(index) {
    currentQuiz = customQuizzes[index];
    currentQuestionIndex = 0;
    correctAnswers = 0;
    
    document.getElementById('subject-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-subject').textContent = currentQuiz.name;
    
    showQuestion();
    updateProgress();
}

// Load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
        const data = JSON.parse(savedData);
        currentXP = data.xp || 0;
        currentLevel = data.level || 1;
        gems = data.gems || 0;
        skinPoints = data.skinPoints || 0;
        ownedSkins = data.ownedSkins || ['student'];
        currentSkin = data.currentSkin || 'student';
        streakCount = data.streakCount || 0;
        lastQuizDate = data.lastQuizDate ? new Date(data.lastQuizDate) : null;
        
        updateDisplay();
        checkStreak();
    }
}

// Save game data
function saveGameData() {
    const gameData = {
        xp: currentXP,
        level: currentLevel,
        gems: gems,
        skinPoints: skinPoints,
        ownedSkins: ownedSkins,
        currentSkin: currentSkin,
        streakCount: streakCount,
        lastQuizDate: lastQuizDate
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Check and update streak
function checkStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (lastQuizDate) {
        const lastDate = new Date(lastQuizDate);
        lastDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            // Streak continues
            streakCount++;
        } else if (diffDays > 1) {
            // Streak broken
            streakCount = 0;
        }
    }
    
    document.getElementById('streak-count').textContent = streakCount;
    document.getElementById('streak-bonus').style.display = streakCount > 0 ? 'block' : 'none';
    saveGameData();
}

// Update display
function updateDisplay() {
    document.getElementById('xp-count').textContent = currentXP;
    document.getElementById('level-count').textContent = currentLevel;
    document.getElementById('gem-count').textContent = gems;
    document.getElementById('skin-count').textContent = skinPoints;
    document.getElementById('streak-count').textContent = streakCount;
    document.getElementById('current-skin').textContent = skins[currentSkin].emoji;
}

// Add after the selectQuiz function
function startQuestionTimer() {
    questionStartTime = Date.now();
}

function recordQuestionTime() {
    if (questionStartTime > 0) {
        const timeSpent = (Date.now() - questionStartTime) / 1000; // Convert to seconds
        questionTimes.push(timeSpent);
    }
}

function resetQuizTracking() {
    questionTimes = [];
    incorrectAnswers = [];
    questionStartTime = 0;
}

// Add these new functions for feedback analysis
function generatePerformanceChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    const totalQuestions = currentQuiz.questions.length;
    const correctPercent = (correctAnswers / totalQuestions) * 100;
    
    // Clear existing chart if any
    if (window.quizChart) {
        window.quizChart.destroy();
    }
    
    window.quizChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [correctAnswers, totalQuestions - correctAnswers],
                backgroundColor: ['#d1ff00', '#ff4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

function analyzeStrengths() {
    const strengths = [];
    const totalQuestions = currentQuiz.questions.length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    
    if (accuracy >= 80) {
        strengths.push('Excellent overall understanding of the topic');
    }
    
    const avgTime = questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length;
    if (avgTime < 30) {
        strengths.push('Quick decision-making skills');
    }
    
    if (correctAnswers > 0) {
        strengths.push(`Strong performance in ${correctAnswers} question${correctAnswers > 1 ? 's' : ''}`);
    }
    
    return strengths;
}

function analyzeImprovements() {
    const improvements = [];
    const totalQuestions = currentQuiz.questions.length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    
    if (accuracy < 80) {
        improvements.push('Review the topic material to improve overall understanding');
    }
    
    const avgTime = questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length;
    if (avgTime > 45) {
        improvements.push('Work on reducing answer time while maintaining accuracy');
    }
    
    if (incorrectAnswers.length > 0) {
        improvements.push(`Focus on areas where mistakes were made (${incorrectAnswers.length} questions)`);
    }
    
    return improvements;
}

function generateStudyTips() {
    const tips = [
        'Create flashcards for key concepts',
        'Practice with timed questions to improve speed',
        'Review incorrect answers to understand mistakes'
    ];
    
    if (incorrectAnswers.length > 0) {
        tips.push('Focus on understanding the correct answers for missed questions');
    }
    
    const avgTime = questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length;
    if (avgTime > 45) {
        tips.push('Set a timer while studying to improve time management');
    }
    
    return tips;
}

function updateTimeAnalysis() {
    const avgTime = questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length;
    document.getElementById('avg-time').textContent = avgTime.toFixed(1);
    
    // Update time bar (assuming 45 seconds is the maximum recommended time)
    const timePercentage = Math.min((avgTime / 45) * 100, 100);
    document.getElementById('time-bar-fill').style.width = `${timePercentage}%`;
}

function populateFeedbackLists() {
    const strengthsList = document.getElementById('strengths-list');
    const improvementsList = document.getElementById('improvements-list');
    const tipsList = document.getElementById('tips-list');
    
    // Clear existing items
    strengthsList.innerHTML = '';
    improvementsList.innerHTML = '';
    tipsList.innerHTML = '';
    
    // Add new items
    analyzeStrengths().forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });
    
    analyzeImprovements().forEach(improvement => {
        const li = document.createElement('li');
        li.textContent = improvement;
        improvementsList.appendChild(li);
    });
    
    generateStudyTips().forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
}

// Add new function to check long answers
function checkLongAnswer(answer) {
    recordQuestionTime();
    const result = gradeLongAnswer(answer, currentLongQuestion.markingScheme);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'marking-scheme';
    
    resultDiv.innerHTML = `
        <h4>Marking Scheme Results</h4>
        <p class="points-earned">Points: ${result.points}/${result.maxPoints} (${result.percentage.toFixed(1)}%)</p>
        <p>Keywords found:</p>
        <div class="keywords-found">
            ${highlightKeywords(answer, result.foundKeywords)}
        </div>
    `;
    
    optionsContainer.appendChild(resultDiv);
    
    // Add points and gems based on performance
    if (result.percentage >= 50) {
        correctAnswers++;
    }
    addXP(Math.floor(result.percentage / 5)); // 1 XP for every 5% scored
    addGems(result.gems);
    
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('next-btn').onclick = nextQuestion;
}

// Add new function to toggle timetable
function toggleTimetable() {
    const timetableSection = document.getElementById('timetable-section');
    const subjectSelection = document.getElementById('subject-selection');
    const isVisible = timetableSection.style.display === 'block';
    
    timetableSection.style.display = isVisible ? 'none' : 'block';
    subjectSelection.style.display = isVisible ? 'block' : 'none';
}

// Add after the showResults function
function suggestRevisionTimes() {
    const performance = (correctAnswers / currentQuiz.questions.length) * 100;
    const today = new Date();
    suggestedRevisionSlots = [];

    // Suggest more revision slots if performance is lower
    const numberOfSlots = performance < 50 ? 3 : (performance < 75 ? 2 : 1);
    
    // Find free slots in the next few days
    for (let i = 0; i < numberOfSlots; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i + 1);
        // Get the day name in lowercase (monday, tuesday, etc.)
        const dayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        // Look for a free slot (preferably in the afternoon/evening)
        for (let hour = 14; hour < 20; hour++) {
            if (!timetableData[dayName][hour]) {
                suggestedRevisionSlots.push({
                    day: dayName,
                    hour: hour
                });
                break;
            }
        }
    }
    
    // Display the suggestions
    const slotsContainer = document.getElementById('revision-slots');
    slotsContainer.innerHTML = '';
    
    if (suggestedRevisionSlots.length === 0) {
        slotsContainer.innerHTML = '<p>No free slots found in the next few days. Please check your timetable manually.</p>';
        return;
    }
    
    suggestedRevisionSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = 'revision-slot';
        const dayFormatted = slot.day.charAt(0).toUpperCase() + slot.day.slice(1);
        slotElement.innerHTML = `
            <span>${dayFormatted} at ${slot.hour}:00</span>
            <span class="revision-slot-time">1 hour</span>
        `;
        slotsContainer.appendChild(slotElement);
    });
}

function applyRevisionToTimetable() {
    suggestedRevisionSlots.forEach(slot => {
        timetableData[slot.day][slot.hour] = 'Biology';
    });
    
    // Save the updated timetable
    saveTimetable();
    
    // Refresh the timetable display
    createTimetable();
    
    // Show confirmation
    const button = document.getElementById('apply-revision-btn');
    button.textContent = 'Applied! ✓';
    button.disabled = true;
    
    // Update the button after a delay
    setTimeout(() => {
        button.textContent = 'Apply to Timetable';
        button.disabled = false;
    }, 2000);
}

// Add these functions for friend management
function showAddFriendModal() {
    document.getElementById('add-friend-modal').style.display = 'block';
}

function closeAddFriendModal() {
    document.getElementById('add-friend-modal').style.display = 'none';
    document.getElementById('friend-search').value = '';
    document.getElementById('friend-search-results').innerHTML = '';
}

function searchFriend() {
    const searchTerm = document.getElementById('friend-search').value.trim();
    if (!searchTerm) return;
    
    // Simulate search results (replace with actual API call in production)
    const mockResults = [
        { id: 'user1', name: 'Alice', status: 'online', avatar: '👩‍🎓' },
        { id: 'user2', name: 'Bob', status: 'studying', avatar: '👨‍🔬' },
        { id: 'user3', name: 'Charlie', status: 'offline', avatar: '👨‍⚕️' }
    ].filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    displaySearchResults(mockResults);
}

function displaySearchResults(results) {
    const container = document.getElementById('friend-search-results');
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">No users found</p>';
        return;
    }
    
    results.forEach(user => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <div class="search-result-avatar">${user.avatar}</div>
            <div class="search-result-info">
                <div class="search-result-name">${user.name}</div>
                <div class="search-result-status">${user.status}</div>
            </div>
        `;
        item.onclick = () => sendFriendRequest(user);
        container.appendChild(item);
    });
}

function sendFriendRequest(user) {
    // Simulate sending friend request (replace with actual API call in production)
    alert(`Friend request sent to ${user.name}!`);
    closeAddFriendModal();
}

function updateFriendsList() {
    const container = document.getElementById('friends-list');
    container.innerHTML = '';
    
    if (friends.length === 0) {
        container.innerHTML = '<p class="no-friends">No friends added yet</p>';
        return;
    }
    
    friends.forEach(friend => {
        const item = document.createElement('div');
        item.className = 'friend-item';
        const isOnline = onlineFriends.has(friend.id);
        item.innerHTML = `
            <div class="friend-avatar">${friend.avatar}</div>
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="friend-status ${isOnline ? 'online' : ''}">${isOnline ? 'Online' : 'Offline'}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function updateFriendRequests() {
    const container = document.getElementById('request-list');
    container.innerHTML = '';
    
    if (friendRequests.length === 0) {
        container.innerHTML = '<p class="no-requests">No pending requests</p>';
        return;
    }
    
    friendRequests.forEach(request => {
        const item = document.createElement('div');
        item.className = 'request-item';
        item.innerHTML = `
            <div class="request-info">
                <div class="friend-name">${request.name}</div>
                <div class="friend-status">${request.status}</div>
            </div>
            <div class="request-actions">
                <button class="accept-btn" onclick="acceptFriendRequest('${request.id}')">Accept</button>
                <button class="decline-btn" onclick="declineFriendRequest('${request.id}')">Decline</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function acceptFriendRequest(userId) {
    const request = friendRequests.find(req => req.id === userId);
    if (request) {
        friends.push(request);
        friendRequests = friendRequests.filter(req => req.id !== userId);
        updateFriendsList();
        updateFriendRequests();
        saveFriendsData();
    }
}

function declineFriendRequest(userId) {
    friendRequests = friendRequests.filter(req => req.id !== userId);
    updateFriendRequests();
    saveFriendsData();
}

function saveFriendsData() {
    const friendsData = {
        friends: friends,
        requests: friendRequests
    };
    localStorage.setItem('friendsData', JSON.stringify(friendsData));
}

function loadFriendsData() {
    const savedData = localStorage.getItem('friendsData');
    if (savedData) {
        const data = JSON.parse(savedData);
        friends = data.friends || [];
        friendRequests = data.requests || [];
        updateFriendsList();
        updateFriendRequests();
    }
}

// Simulate online status updates
function simulateOnlineStatus() {
    setInterval(() => {
        friends.forEach(friend => {
            if (Math.random() > 0.5) {
                onlineFriends.add(friend.id);
            } else {
                onlineFriends.delete(friend.id);
            }
        });
        updateFriendsList();
    }, 30000); // Update every 30 seconds
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    selectSkin('student');
    setupPDFUpload();
    loadFriendsData();
    simulateOnlineStatus();
    loadSettings();
    
    // Load Chart.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(script);
});

function toggleFriends() {
    isFriendsVisible = !isFriendsVisible;
    
    // Hide all other sections
    document.getElementById('subject-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('shop-container').style.display = 'none';
    document.getElementById('create-quiz-container').style.display = 'none';
    
    // Show timetable section with friends
    const timetableSection = document.getElementById('timetable-section');
    timetableSection.style.display = 'block';
    
    // Ensure the friends sidebar is visible
    const friendsSidebar = document.querySelector('.friends-sidebar');
    if (friendsSidebar) {
        friendsSidebar.style.display = 'block';
    }
    
    // Update friends list and requests
    updateFriendsList();
    updateFriendRequests();
    
    // Create timetable if needed
    if (!document.querySelector('.time-header')) {
        createTimetable();
    }
    
    // Update button appearance
    const friendsBtn = document.getElementById('friends-btn');
    if (friendsBtn) {
        friendsBtn.style.background = isFriendsVisible ? '#b8e600' : '#d1ff00';
    }
    
    // Add some mock friends data for testing
    if (friends.length === 0) {
        friends = [
            { id: 'user1', name: 'Alice', status: 'online', avatar: '👩‍🎓' },
            { id: 'user2', name: 'Bob', status: 'studying', avatar: '👨‍🔬' },
            { id: 'user3', name: 'Charlie', status: 'offline', avatar: '👨‍⚕️' }
        ];
    }
    
    // Add some mock friend requests for testing
    if (friendRequests.length === 0) {
        friendRequests = [
            { id: 'user4', name: 'David', status: 'online', avatar: '👨‍🚀' }
        ];
    }
}

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    const isVisible = modal.style.display === 'block';
    modal.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        // Update active states
        updateActiveStates();
    }
}

function updateActiveStates() {
    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });
    
    // Update button style buttons
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === currentButtonStyle);
    });
    
    // Update animation buttons
    document.querySelectorAll('.anim-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.anim === currentAnimationLevel);
    });
    
    // Update toggles
    document.getElementById('particles-toggle').checked = particlesEnabled;
    document.getElementById('glow-toggle').checked = glowEffectsEnabled;
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = `theme-${theme}`;
    updateActiveStates();
    
    // Update CSS variables
    const root = document.documentElement;
    switch (theme) {
        case 'ocean':
            root.style.setProperty('--primary-color', '#00ffff');
            root.style.setProperty('--background-color', '#001f3f');
            break;
        case 'sunset':
            root.style.setProperty('--primary-color', '#ff851b');
            root.style.setProperty('--background-color', '#3d0000');
            break;
        case 'forest':
            root.style.setProperty('--primary-color', '#2ecc40');
            root.style.setProperty('--background-color', '#002600');
            break;
        default:
            root.style.setProperty('--primary-color', '#d1ff00');
            root.style.setProperty('--background-color', '#000000');
    }
}

function setButtonStyle(style) {
    currentButtonStyle = style;
    updateActiveStates();
    
    // Remove all button style classes
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.classList.remove('btn-style-neon', 'btn-style-gradient', 'btn-style-minimal');
        if (style !== 'default') {
            btn.classList.add(`btn-style-${style}`);
        }
    });
}

function setAnimationLevel(level) {
    currentAnimationLevel = level;
    updateActiveStates();
    
    // Remove all animation classes
    document.body.classList.remove('anim-level-minimal', 'anim-level-moderate', 'anim-level-high');
    if (level !== 'none') {
        document.body.classList.add(`anim-level-${level}`);
    }
}

function toggleParticles() {
    particlesEnabled = !particlesEnabled;
    if (particlesEnabled) {
        initParticles();
    } else {
        destroyParticles();
    }
}

function toggleGlowEffects() {
    glowEffectsEnabled = !glowEffectsEnabled;
    document.body.classList.toggle('glow-effects', glowEffectsEnabled);
}

function initParticles() {
    // Create canvas for particles
    if (!document.getElementById('particles-canvas')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        document.body.appendChild(canvas);
        
        // Simple particle animation
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: currentTheme === 'default' ? '#d1ff00' : getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
            };
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            });
            
            if (particlesEnabled) {
                requestAnimationFrame(drawParticles);
            }
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
        
        drawParticles();
    }
}

function destroyParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        canvas.remove();
    }
}

function saveSettings() {
    const settings = {
        theme: currentTheme,
        buttonStyle: currentButtonStyle,
        animationLevel: currentAnimationLevel,
        particles: particlesEnabled,
        glowEffects: glowEffectsEnabled
    };
    
    localStorage.setItem('visualSettings', JSON.stringify(settings));
    toggleSettings();
}

function loadSettings() {
    const savedSettings = localStorage.getItem('visualSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        setTheme(settings.theme);
        setButtonStyle(settings.buttonStyle);
        setAnimationLevel(settings.animationLevel);
        
        particlesEnabled = settings.particles;
        glowEffectsEnabled = settings.glowEffects;
        
        if (particlesEnabled) initParticles();
        if (glowEffectsEnabled) document.body.classList.add('glow-effects');
        
        updateActiveStates();
    }
} 
