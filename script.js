let currentAnswer = 0;

// Hàm tạo câu hỏi tự động dựa theo cấp học
function generateQuestion() {
    const grade = document.getElementById("grade-select").value;
    const questionElement = document.getElementById("question");
    const feedbackElement = document.getElementById("feedback");
    
    feedbackElement.innerText = ""; // Xóa thông báo cũ
    document.getElementById("user-answer").value = ""; // Xóa câu trả lời cũ

    if (grade === "cap1") {
        // Toán lớp 1-5: Phép cộng đơn giản
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        questionElement.innerText = `Bé hãy tính: ${num1} + ${num2} = ?`;
        currentAnswer = num1 + num2;
    } else if (grade === "cap2") {
        // Toán lớp 6-9: Tìm x đơn giản
        let x = Math.floor(Math.random() * 20) + 1;
        let a = Math.floor(Math.random() * 10) + 1;
        let b = x + a;
        questionElement.innerText = `Tìm x biết: x + ${a} = ${b}`;
        currentAnswer = x;
    } else if (grade === "cap3") {
        // Toán lớp 10-12: Đạo hàm cơ bản
        let mu = Math.floor(Math.random() * 5) + 2; // Số mũ từ 2 đến 6
        questionElement.innerText = `Tính đạo hàm của f(x) = x^${mu} tại x = 1?`;
        currentAnswer = mu; // Đạo hàm của x^n tại x=1 luôn bằng n
    }
}

// Hàm kiểm tra câu trả lời của học sinh
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("user-answer").value);
    const feedbackElement = document.getElementById("feedback");

    if (userAnswer === currentAnswer) {
        feedbackElement.innerText = "🎉 Chính xác rồi! Giỏi quá!";
        feedbackElement.style.color = "green";
        // Tự động chuyển câu hỏi mới sau 2 giây
        setTimeout(generateQuestion, 2000);
    } else {
        feedbackElement.innerText = "❌ Chưa đúng rồi, thử lại nhé!";
        feedbackElement.style.color = "red";
    }
}

// Thay đổi cấp học thì đổi câu hỏi luôn
function changeGrade() {
    generateQuestion();
}

// Chạy câu hỏi đầu tiên khi vừa mở app
window.onload = generateQuestion;
// Ngân hàng câu hỏi nâng rộng cho 3 cấp học
const questionBank = {
    cap1: [
        { q: "Bé hãy tính: 15 + 7 = ?", a: 22 },
        { q: "Bé hãy tính: 9 x 4 = ?", a: 36 },
        { q: "Có 20 quả táo, chia đều cho 4 bạn. Mỗi bạn được mấy quả?", a: 5 },
        { q: "Bé hãy tính: 50 - 18 = ?", a: 32 },
        { q: "Số liền sau của số 99 là số mấy?", a: 100 }
    ],
    cap2: [
        { q: "Tìm x biết: 2x - 5 = 11", a: 8 },
        { q: "Tính giá trị của biểu thức: 3^3 - 10", a: 17 },
        { q: "Một hình chữ nhật có chiều dài 8cm, chiều rộng 5cm. Chu vi là bao nhiêu cm?", a: 26 },
        { q: "Tìm x biết: x/4 = 9/12", a: 3 },
        { q: "Tính căn bậc hai của 144?", a: 12 }
    ],
    cap3: [
        { q: "Tính đạo hàm của f(x) = 3x^2 tại x = 2? (Gợi ý: f'(x)=6x)", a: 12 },
        { q: "Giải phương trình: log2(x) = 5. Tìm x?", a: 32 },
        { q: "Tính giá trị của biểu thức: sin²(30°) + cos²(30°)", a: 1 },
        { q: "Tìm nguyên hàm của f(x) = 2x tại x = 3 (với C = 0)?", a: 9 },
        { q: "Cho cấp số cộng có u1 = 2, d = 3. Tìm u3?", a: 8 }
    ]
};

let currentQuestionIndex = 0;
let currentCorrectAnswer = 0;
let userScore = 0;

// Danh sách người chơi giả lập trên Bảng xếp hạng
let fakeLeaderboard = [
    { name: "Nguyễn Văn Anh", score: 120 },
    { name: "Trần Minh Lộc", score: 95 },
    { name: "Lê Hoa", score: 80 }
];

// Hàm khởi tạo và đổi giao diện, tiêu đề theo cấp học
function changeGrade() {
    const grade = document.getElementById("grade-select").value;
    const body = document.getElementById("app-body");
    const title = document.getElementById("app-title");

    // Đổi Class của Body để CSS tự động đổi màu nền và nút bấm
    body.className = `theme-${grade}`;

    if (grade === "cap1") {
        title.innerText = "👶 Mathkids Lớp 1-5 🧮";
    } else if (grade === "cap2") {
        title.innerText = "🧑‍💻 Mathkids Lớp 6-9 📐";
    } else if (grade === "cap3") {
        title.innerText = "🚀 Mathkids Lớp 10-12 📊";
    }

    currentQuestionIndex = 0; // Reset thứ tự câu hỏi khi đổi lớp
    generateQuestion();
}

// Hàm hiển thị câu hỏi ngẫu nhiên từ ngân hàng câu hỏi của cấp đó
function generateQuestion() {
    const grade = document.getElementById("grade-select").value;
    const questionElement = document.getElementById("question");
    const feedbackElement = document.getElementById("feedback");
    
    feedbackElement.innerText = ""; 
    document.getElementById("user-answer").value = ""; 

    // Lấy ngẫu nhiên 1 câu hỏi trong danh sách của cấp đã chọn
    const questions = questionBank[grade];
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuiz = questions[randomIndex];

    questionElement.innerText = selectedQuiz.q;
    currentCorrectAnswer = selectedQuiz.a;
}

// Hàm kiểm tra câu trả lời và cộng điểm
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("user-answer").value);
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    if (isNaN(userAnswer)) {
        feedbackElement.innerText = "⚠️ Bạn chưa nhập câu trả lời!";
        feedbackElement.style.color = "orange";
        return;
    }

    if (userAnswer === currentCorrectAnswer) {
        feedbackElement.innerText = "🎉 Xuất sắc! Bạn được +10 điểm!";
        feedbackElement.style.color = "green";
        userScore += 10;
        scoreElement.innerText = userScore;
        
        updateLeaderboard(); // Cập nhật lại bảng xếp hạng
        setTimeout(generateQuestion, 1800); // Chuyển câu hỏi sau 1.8 giây
    } else {
        feedbackElement.innerText = "❌ Đáp án chưa đúng, tính lại xem sao nhé!";
        feedbackElement.style.color = "red";
    }
}

// Hàm cập nhật và hiển thị bảng xếp hạng sống động
function updateLeaderboard() {
    const listElement = document.getElementById("leaderboard-list");
    listElement.innerHTML = ""; // Xóa danh sách cũ

    // Tạo mảng xếp hạng gồm nick giả lập và điểm hiện tại của Bạn
    let allPlayers = [...fakeLeaderboard, { name: "Bạn (Học viên)", score: userScore }];
    
    // Sắp xếp điểm số từ cao xuống thấp
    allPlayers.sort((a, b) => b.score - a.score);

    // Render danh sách ra giao diện HTML
    allPlayers.forEach((player, index) => {
        const li = document.createElement("li");
        // Nếu là dòng của người chơi "Bạn", làm nổi bật bằng chữ đậm
        if(player.name.includes("Bạn")) {
            li.innerHTML = `<strong>#${index + 1}. ${player.name}</strong> <strong>${player.score}đ</strong>`;
            li.style.backgroundColor = "#e8f5e9";
        } else {
            li.innerHTML = `<span>#${index + 1}. ${player.name}</span> <span>${player.score}đ</span>`;
        }
        listElement.appendChild(li);
    });
}

// Chạy ứng dụng lần đầu tiên khi tải trang
window.onload = function() {
    changeGrade();
    updateLeaderboard();
};
// Ngân hàng câu hỏi mở rộng kèm GỢI Ý
const questionBank = {
    cap1: [
        { q: "Bé hãy tính: 15 + 7 = ?", a: 22, hint: "Tách số: 15 + 5 + 2 xem sao nào!" },
        { q: "Bé hãy tính: 9 x 4 = ?", a: 36, hint: "Hãy nhẩm bảng cửu chương 9 hoặc cộng 4 lần số 9 nhé." },
        { q: "Có 20 quả táo, chia đều cho 4 bạn. Mỗi bạn được mấy quả?", a: 5, hint: "Phép tính chia: 20 chia cho 4." },
        { q: "Bé hãy tính: 50 - 18 = ?", a: 32, hint: "Lấy 50 trừ 10, rồi trừ tiếp đi 8." }
    ],
    cap2: [
        { q: "Tìm x biết: 2x - 5 = 11", a: 8, hint: "Chuyển vế -5 thành +5 rồi tính 2x = 16." },
        { q: "Tính giá trị của biểu thức: 3^3 - 10", a: 17, hint: "Tính lũy thừa trước: 3^3 = 3 * 3 * 3." },
        { q: "Một hình chữ nhật có chiều dài 8cm, chiều rộng 5cm. Chu vi là bao nhiêu?", a: 26, hint: "Công thức chu vi: (Chiều dài + Chiều rộng) nhân 2." }
    ],
    cap3: [
        { q: "Tính đạo hàm của f(x) = 3x^2 tại x = 2?", a: 12, hint: "Công thức đạo hàm: (x^n)' = n * x^(n-1). Nên f'(x) = 6x." },
        { q: "Giải phương trình: log2(x) = 5. Tìm x?", a: 32, hint: "Định nghĩa logarit: x = 2^5." },
        { q: "Tính giá trị: sin²(30°) + cos²(30°)", a: 1, hint: "Hãy nhớ đến công thức lượng giác cơ bản: sin²α + cos²α luôn bằng mấy?" }
    ]
};

let currentCorrectAnswer = 0;
let currentHint = "";
let userScore = 0;
let playerName = "Người học";

// Hệ thống tính giờ
let timeLeft = 30;
let timerInterval;
const MAX_TIME = 30;

let fakeLeaderboard = [
    { name: "Nguyễn Văn Anh", score: 60 },
    { name: "Trần Minh Lộc", score: 40 },
    { name: "Lê Hoa", score: 20 }
];

// 1. Hàm khởi tạo ứng dụng & Yêu cầu nhập tên khách hàng
function initApp() {
    let enteredName = prompt("Chào mừng đến với Mathkids! Hãy nhập tên hoặc biệt danh của bạn:", "");
    if (enteredName && enteredName.trim() !== "") {
        playerName = enteredName.trim();
    }
    document.getElementById("player-name-display").innerText = `👤: ${playerName}`;
    
    changeGrade();
    updateLeaderboard();
}

// 2. Hàm xử lý chuyển đổi cấp học
function changeGrade() {
    const grade = document.getElementById("grade-select").value;
    const body = document.getElementById("app-body");
    const title = document.getElementById("app-title");

    body.className = `theme-${grade}`;

    if (grade === "cap1") title.innerText = "👶 Mathkids Lớp 1-5 🧮";
    else if (grade === "cap2") title.innerText = "🧑‍💻 Mathkids Lớp 6-9 📐";
    else if (grade === "cap3") title.innerText = "🚀 Mathkids Lớp 10-12 📊";

    generateQuestion();
}

// 3. Hàm tạo câu hỏi và Khởi động lại đồng hồ đếm ngược
function generateQuestion() {
    const grade = document.getElementById("grade-select").value;
    const questionElement = document.getElementById("question");
    
    // Đóng khung gợi ý cũ
    const hintText = document.getElementById("hint-text");
    hintText.className = "hidden-hint";
    document.getElementById("feedback").innerText = ""; 
    document.getElementById("user-answer").value = ""; 

    // Lấy ngẫu nhiên câu hỏi
    const questions = questionBank[grade];
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuiz = questions[randomIndex];

    questionElement.innerText = selectedQuiz.q;
    currentCorrectAnswer = selectedQuiz.a;
    currentHint = selectedQuiz.hint;

    // Reset và bắt đầu đếm ngược thời gian câu mới
    resetTimer();
}

// 4. Quản lý Đồng hồ Đếm Ngược
function resetTimer() {
    clearInterval(timerInterval); // Xóa bộ đếm cũ
    timeLeft = MAX_TIME;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("feedback").innerText = "⏰ Hết giờ rồi! Hãy thử câu hỏi tiếp theo nhé.";
            document.getElementById("feedback").style.color = "red";
            setTimeout(generateQuestion, 2000);
        }
    }, 1000);
}

function updateTimerUI() {
    document.getElementById("timer").innerText = timeLeft;
    const fillPercent = (timeLeft / MAX_TIME) * 100;
    document.getElementById("timer-bar-fill").style.width = `${fillPercent}%`;
}

// 5. Hiển thị gợi ý khi bấm nút
function showHint() {
    const hintText = document.getElementById("hint-text");
    hintText.innerText = currentHint;
    hintText.className = "show-hint";
}

// 6. Kiểm tra đáp án
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("user-answer").value);
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    if (isNaN(userAnswer)) {
        feedbackElement.innerText = "⚠️ Bạn hãy điền con số kết quả nhé!";
        feedbackElement.style.color = "orange";
        return;
    }

    if (userAnswer === currentCorrectAnswer) {
        clearInterval(timerInterval); // Dừng đồng hồ khi làm đúng
        feedbackElement.innerText = "🎉 Tuyệt vời! Bạn nhận được +10 điểm!";
        feedbackElement.style.color = "green";
        userScore += 10;
        scoreElement.innerText = userScore;
        
        updateLeaderboard();
        setTimeout(generateQuestion, 1800);
    } else {
        feedbackElement.innerText = "❌ Chưa chính xác, xem gợi ý để thử lại nha!";
        feedbackElement.style.color = "red";
    }
}

// 7. Nhấn Enter tự gửi bài thay vì bấm chuột
function handleKeyPress(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
}

// 8. Cập nhật bảng xếp hạng
function updateLeaderboard() {
    const listElement = document.getElementById("leaderboard-list");
    listElement.innerHTML = "";

    let allPlayers = [...fakeLeaderboard, { name: `${playerName} (Bạn)`, score: userScore }];
    allPlayers.sort((a, b) => b.score - a.score);

    allPlayers.forEach((player, index) => {
        const li = document.createElement("li");
        if(player.name.includes("(Bạn)")) {
            li.innerHTML = `<strong>#${index + 1}. ${player.name}</strong> <strong>${player.score}đ</strong>`;
            li.style.backgroundColor = "#fff9c4";
        } else {
            li.innerHTML = `<span>#${index + 1}. ${player.name}</span> <span>${player.score}đ</span>`;
        }
        listElement.appendChild(li);
    });
}

// Chạy khi tải trang
window.onload = initApp;
// Ngân hàng câu hỏi
const questionBank = {
    cap1: [
        { q: "Bé hãy tính: 15 + 7 = ?", a: 22, hint: "Tách số: 15 + 5 + 2 xem sao nào!" },
        { q: "Bé hãy tính: 9 x 4 = ?", a: 36, hint: "Hãy nhẩm bảng cửu chương 9 hoặc cộng 4 lần số 9 nhé." },
        { q: "Có 20 quả táo, chia đều cho 4 bạn. Mỗi bạn được mấy quả?", a: 5, hint: "Phép tính chia: 20 chia cho 4." },
        { q: "Bé hãy tính: 50 - 18 = ?", a: 32, hint: "Lấy 50 trừ 10, rồi trừ tiếp đi 8." }
    ],
    cap2: [
        { q: "Tìm x biết: 2x - 5 = 11", a: 8, hint: "Chuyển vế -5 thành +5 rồi tính 2x = 16." },
        { q: "Tính giá trị của biểu thức: 3^3 - 10", a: 17, hint: "Tính lũy thừa trước: 3^3 = 3 * 3 * 3." },
        { q: "Một hình chữ nhật có chiều dài 8cm, chiều rộng 5cm. Chu vi là bao nhiêu?", a: 26, hint: "Công thức chu vi: (Chiều dài + Chiều rộng) nhân 2." }
    ],
    cap3: [
        { q: "Tính đạo hàm của f(x) = 3x^2 tại x = 2?", a: 12, hint: "Công thức đạo hàm: (x^n)' = n * x^(n-1). Nên f'(x) = 6x." },
        { q: "Giải phương trình: log2(x) = 5. Tìm x?", a: 32, hint: "Định nghĩa logarit: x = 2^5." },
        { q: "Tính giá trị: sin²(30°) + cos²(30°)", a: 1, hint: "Hãy nhớ đến công thức lượng giác cơ bản: sin²α + cos²α luôn bằng mấy?" }
    ]
};

let currentCorrectAnswer = 0;
let currentHint = "";
let userScore = 0;
let playerName = "Người học";

// Biến theo dõi thống kê học tập
let countCorrect = 0;
let countWrong = 0;

// Hệ thống tính giờ
let timeLeft = 30;
let timerInterval;
const MAX_TIME = 30;

let fakeLeaderboard = [
    { name: "Nguyễn Văn Anh", score: 60 },
    { name: "Trần Minh Lộc", score: 40 },
    { name: "Lê Hoa", score: 20 }
];

// 1. Hàm khởi tạo ứng dụng
function initApp() {
    let enteredName = prompt("Chào mừng đến với Mathkids! Hãy nhập tên hoặc biệt danh của bạn:", "");
    if (enteredName && enteredName.trim() !== "") {
        playerName = enteredName.trim();
    }
    document.getElementById("player-name-display").innerText = `👤: ${playerName}`;
    
    changeGrade();
    updateLeaderboard();
}

// 2. Hàm xử lý chuyển đổi cấp học
function changeGrade() {
    const grade = document.getElementById("grade-select").value;
    const body = document.getElementById("app-body");
    const title = document.getElementById("app-title");

    body.className = `theme-${grade}`;

    if (grade === "cap1") title.innerText = "👶 Mathkids Lớp 1-5 🧮";
    else if (grade === "cap2") title.innerText = "🧑‍💻 Mathkids Lớp 6-9 📐";
    else if (grade === "cap3") title.innerText = "🚀 Mathkids Lớp 10-12 📊";

    generateQuestion();
}

// 3. Hàm tạo câu hỏi và Khởi động lại đồng hồ
function generateQuestion() {
    const grade = document.getElementById("grade-select").value;
    const questionElement = document.getElementById("question");
    
    const hintText = document.getElementById("hint-text");
    hintText.className = "hidden-hint";
    document.getElementById("feedback").innerText = ""; 
    document.getElementById("user-answer").value = ""; 

    const questions = questionBank[grade];
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuiz = questions[randomIndex];

    questionElement.innerText = selectedQuiz.q;
    currentCorrectAnswer = selectedQuiz.a;
    currentHint = selectedQuiz.hint;

    resetTimer();
}

// 4. Quản lý Đồng hồ Đếm Ngược
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = MAX_TIME;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            // Âm thanh báo hết giờ
            document.getElementById("sound-timeout").play().catch(()=>{});
            
            countWrong++;
            document.getElementById("wrong-count").innerText = countWrong;

            document.getElementById("feedback").innerText = "⏰ Hết giờ rồi! Hãy thử câu hỏi tiếp theo nhé.";
            document.getElementById("feedback").style.color = "red";
            setTimeout(generateQuestion, 2000);
        }
    }, 1000);
}

function updateTimerUI() {
    document.getElementById("timer").innerText = timeLeft;
    const fillPercent = (timeLeft / MAX_TIME) * 100;
    document.getElementById("timer-bar-fill").style.width = `${fillPercent}%`;
}

// 5. Hiển thị gợi ý
function showHint() {
    const hintText = document.getElementById("hint-text");
    hintText.innerText = currentHint;
    hintText.className = "show-hint";
}

// 6. Kiểm tra đáp án & Phát âm thanh
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("user-answer").value);
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    if (isNaN(userAnswer)) {
        feedbackElement.innerText = "⚠️ Bạn hãy điền con số kết quả nhé!";
        feedbackElement.style.color = "orange";
        return;
    }

    if (userAnswer === currentCorrectAnswer) {
        clearInterval(timerInterval);
        
        // Phát âm thanh đúng 🎉
        document.getElementById("sound-correct").play().catch(()=>{});
        
        countCorrect++;
        document.getElementById("correct-count").innerText = countCorrect;

        feedbackElement.innerText = "🎉 Tuyệt vời! Bạn nhận được +10 điểm!";
        feedbackElement.style.color = "green";
        userScore += 10;
        scoreElement.innerText = userScore;
        
        updateLeaderboard();
        setTimeout(generateQuestion, 1800);
    } else {
        // Phát âm thanh sai ❌
        document.getElementById("sound-wrong").play().catch(()=>{});
        
        countWrong++;
        document.getElementById("wrong-count").innerText = countWrong;

        feedbackElement.innerText = "❌ Chưa chính xác, xem gợi ý để thử lại nha!";
        feedbackElement.style.color = "red";
    }
}

// 7. Xem Báo Cáo Học Tập (Thống kê tổng kết)
function showSummaryReport() {
    const totalQuestions = countCorrect + countWrong;
    let accuracyRate = totalQuestions > 0 ? Math.round((countCorrect / totalQuestions) * 100) : 0;
    
    let evaluation = "Cố gắng lên nhé! Luyện tập nhiều sẽ giỏi hơn.";
    if (accuracyRate >= 80) evaluation = "🏆 Xuất sắc! Bạn là một thiên tài toán học!";
    else if (accuracyRate >= 50) evaluation = "👍 Khá tốt! Hãy duy trì phong độ này nhé.";

    alert(
        `📊 BÁO CÁO HỌC TẬP CỦA: ${playerName.toUpperCase()}\n` +
        `----------------------------------------\n` +
        `• Tổng số câu đã giải: ${totalQuestions}\n` +
        `• Số câu trả lời ĐÚNG: ${countCorrect}\n` +
        `• Số câu trả lời SAI/QUÁ GIỜ: ${countWrong}\n` +
        `• Tỷ lệ chính xác: ${accuracyRate}%\n` +
        `----------------------------------------\n` +
        `👉 Đánh giá: ${evaluation}`
    );
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
}

// 8. Cập nhật bảng xếp hạng
function updateLeaderboard() {
    const listElement = document.getElementById("leaderboard-list");
    listElement.innerHTML = "";

    let allPlayers = [...fakeLeaderboard, { name: `${playerName} (Bạn)`, score: userScore }];
    allPlayers.sort((a, b) => b.score - a.score);

    allPlayers.forEach((player, index) => {
        const li = document.createElement("li");
        if(player.name.includes("(Bạn)")) {
            li.innerHTML = `<strong>#${index + 1}. ${player.name}</strong> <strong>${player.score}đ</strong>`;
            li.style.backgroundColor = "#fff9c4";
        } else {
            li.innerHTML = `<span>#${index + 1}. ${player.name}</span> <span>${player.score}đ</span>`;
        }
        listElement.appendChild(li);
    });
}

window.onload = initApp;
