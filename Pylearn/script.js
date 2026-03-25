
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }

    
    if (window.location.pathname.includes('quiz.html')) {
        initializeQuiz();
    }
    
    
    if (window.location.pathname.includes('lessons.html')) {
        initializeLessons();
    }
});


function initializeLessons() {
    const lessons = {
        'input': {
            title: 'Input in Python',
            content: `
                <h3>Getting User Input</h3>
                <p>In Python, we use the <code>input()</code> function to get user input.</p>
                <div class="code-block">
                    # Example: Getting user's name<br>
                    name = input("Enter your name: ")<br>
                    print("Hello, " + name)
                </div>
                <p>The input is always returned as a string. To convert to numbers, use <code>int()</code> or <code>float()</code>.</p>
            `
        },
        'operators': {
            title: 'Basic Numeric Operators',
            content: `
                <h3>Python Arithmetic Operators</h3>
                <ul>
                    <li><code>+</code> Addition</li>
                    <li><code>-</code> Subtraction</li>
                    <li><code>*</code> Multiplication</li>
                    <li><code>/</code> Division</li>
                    <li><code>%</code> Modulus (remainder)</li>
                    <li><code>**</code> Exponentiation</li>
                </ul>
                <div class="code-block">
                    # Examples:<br>
                    a = 10<br>
                    b = 3<br>
                    print(a + b)  # 13<br>
                    print(a * b)  # 30<br>
                    print(a ** b) # 1000
                </div>
            `
        },
        'conditions': {
            title: 'Conditional Statements',
            content: `
                <h3>If-Else Statements</h3>
                <p>Use <code>if</code>, <code>elif</code>, and <code>else</code> for decision making.</p>
                <div class="code-block">
                    age = 18<br>
                    <br>
                    if age >= 18:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print("You are an adult")<br>
                    elif age >= 13:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print("You are a teenager")<br>
                    else:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print("You are a child")
                </div>
            `
        },
        'loops': {
            title: 'Loops in Python',
            content: `
                <h3>For and While Loops</h3>
                <p><strong>For Loop:</strong> Iterates over a sequence</p>
                <div class="code-block">
                    # Print numbers 1 to 5<br>
                    for i in range(1, 6):<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print(i)
                </div>
                <p><strong>While Loop:</strong> Runs while condition is true</p>
                <div class="code-block">
                    count = 1<br>
                    while count <= 5:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print(count)<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;count += 1
                </div>
            `
        },
        'output': {
            title: 'Displaying Output',
            content: `
                <h3>The print() Function</h3>
                <p>Use <code>print()</code> to display output to the console.</p>
                <div class="code-block">
                    # Basic print<br>
                    print("Hello, World!")<br>
                    <br>
                    # Print variables<br>
                    name = "Alice"<br>
                    age = 25<br>
                    print("Name:", name, "Age:", age)<br>
                    <br>
                    # Formatted string (f-string)<br>
                    print(f"{name} is {age} years old")
                </div>
            `
        }
    };

    const lessonItems = document.querySelectorAll('.lesson-item');
    const lessonContent = document.getElementById('lessonContent');

    function showLesson(lessonId) {
        if (lessons[lessonId]) {
            lessonContent.innerHTML = `
                <h2>${lessons[lessonId].title}</h2>
                ${lessons[lessonId].content}
            `;
            
            
            lessonItems.forEach(item => item.classList.remove('active'));
            document.querySelector(`[data-lesson="${lessonId}"]`).classList.add('active');
        }
    }

    
    lessonItems.forEach(item => {
        item.addEventListener('click', function() {
            showLesson(this.dataset.lesson);
        });
    });

    
    if (lessonItems.length > 0) {
        showLesson(lessonItems[0].dataset.lesson);
    }
}


function initializeQuiz() {
    const quizData = [
        {
            question: "Which function is used to get user input in Python?",
            options: ["input()", "get()", "read()", "scan()"],
            correct: 0
        },
        {
            question: "What does the % operator do in Python?",
            options: ["Percentage", "Division", "Modulus (remainder)", "Multiplication"],
            correct: 2
        },
        {
            question: "Which keyword is used for 'else if' in Python?",
            options: ["elseif", "elif", "else if", "ifelse"],
            correct: 1
        },
        {
            question: "How many times will 'Hello' be printed in: for i in range(3): print('Hello')",
            options: ["2", "3", "4", "1"],
            correct: 1
        },
        {
            question: "What is the output of: print(2 + 3 * 2)?",
            options: ["10", "8", "7", "12"],
            correct: 1
        }
    ];

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('nextBtn');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    function loadQuestion() {
        const current = quizData[currentQuestion];
        questionElement.textContent = `${currentQuestion + 1}. ${current.question}`;
        
        optionsElement.innerHTML = '';
        selectedOption = null;
        
        current.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', function() {
                
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                
                this.classList.add('selected');
                selectedOption = parseInt(this.dataset.index);
            });
            
            optionsElement.appendChild(optionElement);
        });
    }

    function showResult() {
        resultElement.style.display = 'block';
        scoreElement.textContent = `You scored ${score} out of ${quizData.length}`;
    }

    nextButton.addEventListener('click', function() {
        if (selectedOption === null) {
            alert('Please select an answer!');
            return;
        }

       
        if (selectedOption === quizData[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    
    loadQuestion();
}