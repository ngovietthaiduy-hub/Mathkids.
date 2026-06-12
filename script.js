function generateRandomQuestion(grade) {
    let questionText = "";
    let correctAnswer = 0;
    let hintText = "";

    if (grade === "cap1") {
        const dangs = ["cong", "tru", "nhan", "chia"];
        const dangNgauNhien = dangs[Math.floor(Math.random() * dangs.length)];

        if (dangNgauNhien === "cong") {
            let num1 = Math.floor(Math.random() * 90) + 10; 
            let num2 = Math.floor(Math.random() * 90) + 10;
            questionText = `Bé hãy tính: ${num1} + ${num2} = ?`;
            correctAnswer = num1 + num2;
            hintText = `Hãy lấy hàng đơn vị: ${num1 % 10} cộng với ${num2 % 10} trước nhé.`;
        } else if (dangNgauNhien === "tru") {
            let num1 = Math.floor(Math.random() * 80) + 20; 
            let num2 = Math.floor(Math.random() * (num1 - 5)) + 5; 
            questionText = `Bé hãy tính: ${num1} - ${num2} = ?`;
            correctAnswer = num1 - num2;
            hintText = `Đặt tính rồi tính: bớt dần từ hàng đơn vị sang hàng chục.`;
        } else if (dangNgauNhien === "nhan") {
            let num1 = Math.floor(Math.random() * 8) + 2; 
            let num2 = Math.floor(Math.random() * 9) + 1; 
            questionText = `Bé hãy tính: ${num1} x ${num2} = ?`;
            correctAnswer = num1 * num2;
            hintText = `Hãy nhớ lại bảng cửu chương nhân ${num1}.`;
        } else if (dangNgauNhien === "chia") {
            let num2 = Math.floor(Math.random() * 8) + 2; 
            let thuong = Math.floor(Math.random() * 9) + 1; 
            let num1 = num2 * thuong; 
            questionText = `Bé hãy tính: ${num1} : ${num2} = ?`;
            correctAnswer = thuong;
            hintText = `Phép chia là ngược lại của phép nhân, tìm xem mấy nhân với ${num2} bằng ${num1}.`;
        }
    } else if (grade === "cap2") {
        const dangs = ["timx", "luythua", "canbac2"];
        const dangNgauNhien = dangs[Math.floor(Math.random() * dangs.length)];

        if (dangNgauNhien === "timx") {
            let x = Math.floor(Math.random() * 20) + 1;
            let a = Math.floor(Math.random() * 9) + 2;
            let b = Math.floor(Math.random() * 15) + 1;
            let ketqua = a * x + b;
            questionText = `Tìm x biết: ${a}x + ${b} = ${ketqua}`;
            correctAnswer = x;
            hintText = `Chuyển ${b} sang vế phải thành -${b}, sau đó chia cho ${a}.`;
        } else if (dangNgauNhien === "luythua") {
            let coSo = Math.floor(Math.random() * 4) + 2; 
            let mu = Math.floor(Math.random() * 3) + 2; 
            questionText = `Tính giá trị của biểu thức: ${coSo}^${mu}`;
            correctAnswer = Math.pow(coSo, mu);
            hintText = `Lũy thừa bậc ${mu} tức là nhân số ${coSo} liền nhau ${mu} lần.`;
        } else if (dangNgauNhien === "canbac2") {
            let x = Math.floor(Math.random() * 14) + 2; 
            let binhPhuong = x * x;
            questionText = `Tính căn bậc hai số học của: ${binhPhuong}`;
            correctAnswer = x;
            hintText = `Tìm xem số nào bình phương lên (nhân chính nó) bằng ${binhPhuong}.`;
        }
    } else if (grade === "cap3") {
        const dangs = ["daoham", "logarit", "capsocong"];
        const dangNgauNhien = dangs[Math.floor(Math.random() * dangs.length)];

        if (dangNgauNhien === "daoham") {
            let heSo = Math.floor(Math.random() * 5) + 2; 
            let soMu = Math.floor(Math.random() * 3) + 2; 
            questionText = `Tính đạo hàm của f(x) = ${heSo}x^${soMu} tại x = 1?`;
            correctAnswer = heSo * soMu;
            hintText = `Công thức đạo hàm: (ax^n)' = a * n * x^(n-1). Khi x = 1 thì kết quả là ${heSo} * ${soMu}.`;
        } else if (dangNgauNhien === "logarit") {
            let coSo = Math.floor(Math.random() * 3) + 2; 
            let mu = Math.floor(Math.random() * 3) + 2; 
            let b = Math.pow(coSo, mu);
            questionText = `Giải phương trình tìm x: log_${coSo}(x) = ${mu}`;
            correctAnswer = b;
            hintText = `Theo định nghĩa logarit: x = ${coSo}^${mu}.`;
        } else if (dangNgauNhien === "capsocong") {
            let u1 = Math.floor(Math.random() * 5) + 1; 
            let d = Math.floor(Math.random() * 4) + 2; 
            questionText = `Cho cấp số cộng có u1 = ${u1} và công sai d = ${d}. Tìm u3?`;
            correctAnswer = u1 + 2 * d;
            hintText = `Công thức số hạng tổng quát: u3 = u1 + 2d.`;
        }
    }

    return { q: questionText, a: correctAnswer, hint: hintText };
}

let currentCorrectAnswer = 0;
let currentHint = "";
let userScore = 0;
let playerName = "Người học";
let countCorrect = 0;
let countWrong = 0;

let timeLeft = 30;
let timerInterval;
const MAX_TIME = 30;

let fakeLeaderboard = [
    { name: "Nguyễn Văn Anh", score: 60 },
    { name: "Trần Minh Lộc", score: 40 },
    { name: "Lê Hoa", score: 20 }
];

function initApp() {
    let enteredName = prompt("Chào mừng đến với Mathkids! Hãy nhập tên hoặc biệt danh của bạn:", "");
    if (enteredName && enteredName.trim() !== "") {
        playerName = enteredName.trim();
    }
    const nameDisplay = document.getElementById("player-name-display");
    if(nameDisplay) nameDisplay.innerText = `👤: ${playerName}`;
    
    changeGrade();
    updateLeaderboard();
}

function changeGrade() {
    const gradeSelect = document.getElementById("grade-select");
    if(!gradeSelect) return;
    const grade = gradeSelect.value;
    const body = document.getElementById("app-body");
    const title = document.getElementById("app-title");

    if(body) body.className = `theme-${grade}`;

    if(title) {
        if (grade === "cap1") title.innerText = "👶 Mathkids Lớp 1-5 🧮";
        else if (grade === "cap2") title.innerText = "🧑‍💻 Mathkids Lớp 6-9 📐";
        else if (grade === "cap3") title.innerText = "🚀 Mathkids Lớp 10-12 📊";
    }

    generateQuestion();
}

function generateQuestion() {
    const gradeSelect = document.getElementById("grade-select");
    if(!gradeSelect) return;
    const grade = gradeSelect.value;
    
    const hintText = document.getElementById("hint-text");
    if(hintText) hintText.className = "hidden-hint";
    
    const feedback = document.getElementById("feedback");
    if(feedback) feedback.innerText = ""; 
    
    const answerInput = document.getElementById("user-answer");
    if(answerInput) answerInput.value = ""; 

    const selectedQuiz = generateRandomQuestion(grade);

    const questionElement = document.getElementById("question");
    if(questionElement) questionElement.innerText = selectedQuiz.q;
    
    currentCorrectAnswer = selectedQuiz.a;
    currentHint = selectedQuiz.hint;

    resetTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = MAX_TIME;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            countWrong++;
            const wrongCountElem = document.getElementById("wrong-count");
            if(wrongCountElem) wrongCountElem.innerText = countWrong;

            const feedback = document.getElementById("feedback");
            if(feedback) {
                feedback.innerText = "⏰ Hết giờ rồi! Hãy thử câu hỏi tiếp theo nhé.";
                feedback.style.color = "red";
            }
            setTimeout(generateQuestion, 2000);
        }
    }, 1000);
}

function updateTimerUI() {
    const timerElem = document.getElementById("timer");
    if(timerElem) timerElem.innerText = timeLeft;
    
    const fillPercent = (timeLeft / MAX_TIME) * 100;
    const barFill = document.getElementById("timer-bar-fill");
    if(barFill) barFill.style.width = `${fillPercent}%`;
}

function showHint() {
    const hintText = document.getElementById("hint-text");
    if(hintText) {
        hintText.innerText = currentHint;
        hintText.className = "show-hint";
    }
}

function checkAnswer() {
    const answerInput = document.getElementById("user-answer");
    if(!answerInput) return;
    const userAnswer = parseFloat(answerInput.value);
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    if (isNaN(userAnswer)) {
        if(feedbackElement) {
            feedbackElement.innerText = "⚠️ Bạn hãy điền con số kết quả nhé!";
            feedbackElement.style.color = "orange";
        }
        return;
    }

    if (userAnswer === currentCorrectAnswer) {
        clearInterval(timerInterval);
        
        countCorrect++;
        const correctCountElem = document.getElementById("correct-count");
        if(correctCountElem) correctCountElem.innerText = countCorrect;

        if(feedbackElement) {
            feedbackElement.innerText = "🎉 Tuyệt vời! Bạn nhận được +10 điểm!";
            feedbackElement.style.color = "green";
        }
        userScore += 10;
        if(scoreElement) scoreElement.innerText = userScore;
        
        updateLeaderboard();
        setTimeout(generateQuestion, 1800);
    } else {
        countWrong++;
        const wrongCountElem = document.getElementById("wrong-count");
        if(wrongCountElem) wrongCountElem.innerText = countWrong;

        if(feedbackElement) {
            feedbackElement.innerText = "❌ Chưa chính xác, xem gợi ý để thử lại nha!";
            feedbackElement.style.color = "red";
        }
    }
}

function showSummaryReport() {
    const totalQuestions = countCorrect + countWrong;
    let accuracyRate = totalQuestions > 0 ? Math.round((countCorrect / totalQuestions) * 100) : 0;
    
    let evaluation = "Cố gắng lên nhé! Luyện tập nhiều sẽ giỏi hơn.";
    if (accuracyRate >= 80) evaluation = "🏆 Xuất sắc! Bạn là một thiên tài toán học!";
    else if (accuracyRate >= 50) evaluation = "👍 Khá tốt! Hãy duy trì phong độ này nhé.";

    alert(
        `📊 BÁO CÁO HỌC TẬP CỦA: ${playerName.toUpperCase()}\n` +
        `----------------------------------------\n` +
    
