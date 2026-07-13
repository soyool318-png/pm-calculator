function calculate() {

    let humidity = parseFloat(document.getElementById("humidity").value);
    let pm = parseFloat(document.getElementById("pm").value);

    if (isNaN(humidity) || isNaN(pm)) {
        document.getElementById("result").innerHTML =
        "습도와 미세먼지 농도를 모두 입력해주세요.";
        return;
    }


    // =====================================
    // 사용자 측정 데이터 기반 습도 보정식
    // 습도가 높을수록 간이 PM 센서가
    // 실제보다 높게 측정되는 현상을 보정
    //
    // 오차 = 0.75 × 습도 - 38.7
    // 실제 PM = 간이 PM - 오차
    // =====================================

    let correction = 0.75 * humidity - 38.7;

    let realPM = pm - correction;


    // 음수 방지
    if (realPM < 0) {
        realPM = 0;
    }


    let level = "";

    if (realPM <= 30) {
        level = "😊 좋음";
    }
    else if (realPM <= 80) {
        level = "😐 보통";
    }
    else if (realPM <= 150) {
        level = "😷 나쁨";
    }
    else {
        level = "☠️ 매우 나쁨";
    }


    let resultBox = document.getElementById("result");

    resultBox.classList.remove("hidden");

    resultBox.innerHTML =
    `
    <p>간이 측정값</p>
    <h3>${pm.toFixed(1)} ㎍/m³</h3>

    <p>습도로 인한 측정 오차</p>
    <h3>${correction.toFixed(1)} ㎍/m³</h3>

    <hr>

    <p>보정 후 예상 실제 미세먼지</p>
    <h2>${realPM.toFixed(1)} ㎍/m³</h2>

    <p>${level}</p>
    `;
}
