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
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-btn').style.display = 'none';
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
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
    
    const earnedXP = correctAnswers * XP_PER_CORRECT_ANSWER;
    const earnedGems = HOURGLASSES_PER_QUIZ;
    
    document.getElementById('earned-xp').textContent = earnedXP;
    document.getElementById('earned-gems').textContent = earnedGems;
    document.getElementById('correct-answers').textContent = 
        correctAnswers + ' out of ' + currentQuiz.questions.length;
    
    // Update last quiz date and check streak
    lastQuizDate = new Date();
    checkStreak();
    
    // Add gems for completing the quiz
    addGems(earnedGems);
}

// Function to return to quiz selection
function returnToQuizzes() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('subject-selection').style.display = 'block';
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

// Function to handle PDF upload and extraction
async function handlePDFUpload(file) {
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
    }
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }
        
        document.getElementById('pdf-text').textContent = fullText;
        document.getElementById('pdf-preview').style.display = 'block';
        document.getElementById('quiz-creation-form').style.display = 'block';
        
    } catch (error) {
        console.error('Error reading PDF:', error);
        alert('Error reading PDF file');
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

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    selectSkin('student');
    setupPDFUpload();
}); 