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
    // 오차 = 0.55 × 습도 - 24.5
    // 실제 PM = 간이 PM - 오차
    // =====================================

    let correction = 0.55 * humidity - 24.5;

    let realPM = pm - correction;


    // 음수 방지
    if (realPM < 0) {
        realPM = 0;
    }


    let level = "";

    if (realPM <= 15) {
        level = "😊 좋음";
    }
    else if (realPM <= 35) {
        level = "😐 보통";
    }
    else if (realPM <= 75) {
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

<p>습도 영향 보정량</p>
<h3>${correction.toFixed(1)} ㎍/m³</h3>

<hr>

<p>보정 후 예상 실제 미세먼지</p>
<h2>${realPM.toFixed(1)} ㎍/m³</h2>

<p>${level}</p>
`;
}
