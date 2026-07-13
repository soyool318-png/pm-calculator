function calculate() {

    let humidity = parseFloat(document.getElementById("humidity").value);
    let pm = parseFloat(document.getElementById("pm").value);

    if (isNaN(humidity) || isNaN(pm)) {
        document.getElementById("result").innerHTML =
        "습도와 미세먼지 농도를 모두 입력해주세요.";
        return;
    }

    // 보정식
    // 실제 PM = 간이PM - (0.62 × 습도 - 28)
    let realPM = pm - (0.62 * humidity - 28);

    if(realPM < 0){
        realPM = 0;
    }

    realPM = realPM.toFixed(1);

    let level = "";

    if(realPM <= 15){
        level = "😊 좋음";
    }
    else if(realPM <= 35){
        level = "😐 보통";
    }
    else if(realPM <= 75){
        level = "😷 나쁨";
    }
    else{
        level = "☠️ 매우 나쁨";
    }

    document.getElementById("result").innerHTML =
    `
    <p>예상 실제 미세먼지</p>
    <h2>${realPM} ㎍/m³</h2>
    <p>${level}</p>
    `;
}
