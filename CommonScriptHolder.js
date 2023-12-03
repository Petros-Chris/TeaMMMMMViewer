// This function adds/removes class dark from elements
window.toggleDarkMode = function () {
    var isDarkMode = document.body.classList.contains('dark');

    //allows the switch
    document.body.classList.toggle('dark', !isDarkMode);

    //This updates the checkbox depeing on if dark mode is on or off
    var checkbox = document.getElementById('darkCheckBox');
    checkbox.checked = !isDarkMode;
    checkbox.disabled = isDarkMode;

    //makes the toggle dark mode box dark
    var darkbutton = document.getElementById("darkModeButton")
    darkbutton.classList.toggle('dark', !isDarkMode);

    //makes the nav dark
    var darknav = document.getElementById("navBox");
    darknav.classList.toggle('dark', !isDarkMode);

    //Toggle dark mode class on elements with the homePageBoxes class
    var darkModeElements = document.querySelectorAll('.homePageBoxes');
    darkModeElements.forEach(function (element) {
        element.classList.toggle('dark', !isDarkMode);
    });

    //Toggle dark mode class on buttons
    var darkModeBtn = document.querySelectorAll('.darkBtn');
    darkModeBtn.forEach(function (element) {
        element.classList.toggle('dark', !isDarkMode);
    });

    //Toggle dark mode on text
    var darkModetext = document.querySelectorAll('.darkText');
    darkModetext.forEach(function (element) {
        element.classList.toggle('dark', !isDarkMode);
    });

    //makes the nav dark
    var darknav = document.getElementById("lifeBox");
    if (darknav) {
        darknav.classList.toggle('dark', !isDarkMode);
    }

    var darkTextBoxes = document.querySelectorAll('.darkTextBox');
    if (darkTextBoxes) {
        darkTextBoxes.forEach(function (element) {
            element.classList.toggle('dark', !isDarkMode);
        });
    }

    var checkoutBoxes = document.querySelectorAll('.CheckoutList');
    if (checkoutBoxes) {
        checkoutBoxes.forEach(function (element) {
            element.classList.toggle('dark', !isDarkMode);
        });
    }

    //Toggle dark mode class on elements with the teabox class
    var darkModeTea = document.querySelectorAll('.TeaBox');
    if (darkModeTea) {
        darkModeTea.forEach(function (element) {
            element.classList.toggle('dark', !isDarkMode);

        });
    }

    localStorage.setItem('darkMode', !isDarkMode);
}

//this makes the page dark if it was set to be dark on another page
document.addEventListener('DOMContentLoaded', function () {
    var storedDarkMode = localStorage.getItem('darkMode');

    if (storedDarkMode === 'true') {
        toggleDarkMode();
    }
});

var questionsAsked = [];
var counter = 0;
var difficulty;

// This function is used to display questions during the quiz
function displayRandomTeaQuestion() {
    for (let i = 0; i < teaQuestions.length; i++) {
        var index = Math.floor(Math.random() * teaQuestions.length);

        if (!questionsAsked.includes(index)) {
            break;
        }
    }
    questionsAsked.push(index);

    if (counter++ == 5) {
        winScreen(difficulty);
    }

    var currentQuestion = teaQuestions[index];

    document.getElementById("teaQuestionNumber").innerText = "Question " + counter + ": ";
    document.getElementById("teaQuestion").innerText = currentQuestion.question;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        document.getElementById("answer" + (i + 1)).innerText = currentQuestion.choices[i];
    }
}

// This function is used to check if the answer selected is correct during the quiz
function checkAnswer(choiceIndex) {
    var currentQuestion = teaQuestions.find(question => question.question == document.getElementById("teaQuestion").innerText);
    var selectedAnswer = currentQuestion.choices[choiceIndex];

    if (selectedAnswer == currentQuestion.choices[currentQuestion.correctAnswer]) {
        document.getElementById("answer" + (choiceIndex + 1)).style.backgroundColor = "green";
        duration = 10;

        var buttons = document.querySelectorAll('.answerBtn');
        buttons.forEach(function (button) {
            button.disabled = true;
        });

        setTimeout(function () {
            displayRandomTeaQuestion();

            for (let i = 1; i <= 4; i++) {
                document.getElementById("answer" + (i)).style.backgroundColor = "";
                document.getElementById("answer" + (i)).disabled = false;
            }
        }, 1000);
    }
    else {
        document.getElementById("answer" + (choiceIndex + 1)).style.backgroundColor = "red";
        document.getElementById("answer" + (choiceIndex + 1)).disabled = true;

        deleteImage();
    }
}

// This function checks if there is any lifes left
function checkIfLivesExists() {
    var lifeImage = document.getElementsByClassName("lifeImage");

    if (lifeImage.length == 0) {

        var buttons = document.querySelectorAll('.answerBtn');
        buttons.forEach(function (button) {
            button.disabled = true;
            button.classList.add('clicked');
        });

        setTimeout(function () {
            loseScreen();
        }, 1000);
    }
}

// This function deletes an image
function deleteImage() {
    var lifeImageClass = document.getElementsByClassName("lifeImage");

    var imageContainer = document.getElementById('lifeText');
    for (let i = lifeImageClass.length; i > 0; i--) {
        var lifeImages = document.getElementById('lifeImage' + i);

        imageContainer.removeChild(lifeImages);
        checkIfLivesExists();
        break;
    }
}

// This creates the lose screen when user runs out of lives
function loseScreen() {
    var questionBox = document.getElementById("quizDefBox");
    questionBox.parentNode.removeChild(questionBox);

    var box = document.createElement("div");
    box.classList.add("screenBox");
    box.classList.add("homePageBoxes");
    box.innerHTML = `
    <h1 class = "darkText">You Lost!</h1>
    <img src = "GeneralImages/loseImage.webp" alt = image to show user they lost> <!--https://www.dreamstime.com/stock-photo-spilled-cup-tea-table-quarrel-next-to-mug-beautiful-bouquet-flowers-red-gerbera-also-next-to-image54971757 --!>
    <br> 
    <button class="defaultButton darkBtn" onclick = "goHome()">Try again later</button>`;

    var storedDarkMode = localStorage.getItem('darkMode');

    document.getElementById("loseOrWin").appendChild(box);

    if (storedDarkMode === 'true') {
        toggleDarkMode();
        toggleDarkMode();
    }

    if (typeof updateTheTimer == "function") {
        clearInterval(timerInterval);
    }
}

// This creates the win screen when the user wins
function winScreen(difficulty) {
    var discount = 0;
    var questionBox = document.getElementById("quizDefBox");
    questionBox.parentNode.removeChild(questionBox);

    var box = document.createElement("div");
    box.classList.add("screenBox");
    box.classList.add("homePageBoxes");
    box.innerHTML = `
    <h1 class = "darkText">You Won!</h1>
    <img src = "GeneralImages/winImage.jpg" alt = image to show user they won> <!--https://www.pinterest.com/pin/199565827208989906/--!>
    <br> 
    <button class="defaultButton darkBtn" onclick = "goCatalog()">Choose the tea to buy</button>`;

    document.body.appendChild(box);
    var storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
        toggleDarkMode();
        toggleDarkMode();
    }

    if (typeof method == "clearInterval(timerInterval)") {
        clearInterval(timerInterval);
    }

    if (difficulty === "easy") {
        discount = 5;
    }
    else if (difficulty === "hard") {
        discount = 15;
    }
    sessionStorage.setItem("discountAmount", discount);
}

// This allows the user to go back to the home page
function goHome() {
    window.location.href = "HomePage.html";
}

// This allows the user to go back to the catalog
function goCatalog() {
    window.location.href = "Catalog.html";
}
