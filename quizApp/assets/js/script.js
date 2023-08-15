$(document).ready(function() {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    const options = ["A", "B", "C", "D"];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timer;
    let timeLeft = 30;
    let questions;
    var number = 1;
    var isAnswered = false;
    var unansweredQuestions = [];

    $(".result-container").hide();
    $(".next-btn").hide();
    $(".timer").hide();
    $('.warningMessageDiv').hide()
    $(".start-btn").click(function() {
        $(".start-btn").hide();
        $(".next-btn").show();
        $(".timer").show();

        startQuiz();
    });

    function fetchQuestions(callback) {
        $.get(apiUrl, function(data) {
            const slicedData = data.slice(0, 10);
            questions = slicedData.map((item, index) => {
                return {
                    question: item.title,
                    opt: item.body.split('\n'),
                    answer: "",
                    number: index + 1
                };
            });
            callback(questions);
        });
    }

    function displayQuestion(question) {
        $(".question-number").text(`Soru ${question.number}:`);
        $(".question").text(question.question);
        $(".options").empty();
        isAnswered = false;

        options.forEach((option, index) => {
            $(".options").append(`<div class="option" data-option="${option}">${option}: ${question.opt[index]}</div>`);
        });
        $(".option").off("click");
        optionClickProp(question.number);
        startTimer();
    }

    function buttonActiveTime() {
        setTimeout(function() {
            $('.next-btn').css({"pointer-events": "unset", "filter": "unset"})
        }, 10000);
    }

    function optionClickProp(questionNumber) {
        $(".option").on("click", function() {
            const selectedOption = $(this).data("option");
            const selectedNumber = number++;
            $(".option").removeClass("selected");
            $(this).addClass("selected");
            isAnswered = true;
            userAnswers[questionNumber - 1] = { optSel: selectedOption, optNum: questionNumber };
        });
    }

    function startTimer() {
        buttonActiveTime()
        timer = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            $(".next-btn").show();
            $('.next-btn').css({"pointer-events": "none", "filter": "grayscale(1)"})
            if (!isAnswered) {
                unansweredQuestions.push(questions[currentQuestionIndex]);
                nextQuestion();
                $('.warningMessageDiv').hide()
            } else {
                nextQuestion();
            }
        } else {
            timeLeft--;
            $(".time").text(timeLeft); 
        }
    }

    function nextQuestion() {
        clearInterval(timer);
        timeLeft = 30;

        if (currentQuestionIndex < 9) {
            currentQuestionIndex++;
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            showResults();
            $(".timer").text("Sınav tamamlandı");
            $(".next-btn").text("Sorular tamamlandı");
            $(".option").css("pointer-events", "none");
        }
    }

    function showResults() {
        $(".result-container").show();
        const resultTable = $(".result-table tbody");
        for (let i = 0; i < userAnswers.length; i++) {
            const answer = userAnswers[i];
            if (answer) {
                resultTable.append(`<tr><td>${answer.optNum}</td><td>${answer.optSel}</td></tr>`);
            } else {
                resultTable.append(`<tr><td>${i + 1}</td><td>İşaretlenmedi</td></tr>`);
            }
        }
    }

    function startQuiz() {
        fetchQuestions(function(loadedQuestions) {
            displayQuestion(loadedQuestions[currentQuestionIndex]);

            $(".next-btn").click(function() {
                if (!isAnswered) {
                    $('.warningMessageDiv').show().effect( "shake", {times:2}, 400 );
                    
                    return;
                }
                nextQuestion();
                $('.next-btn').css({"pointer-events": "none", "filter": "grayscale(1)"});
                $('.warningMessageDiv').hide()
            });
        });
    }

    $('.tittleProp').click(function() {
        location.reload();
    });
});
