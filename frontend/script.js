// script.js 파일
// 유량계 값, 수압계 값, 모터 작동 상태, 시스템 오작동 여부를 모니터링하는 JavaScript 코드
// 이 코드는 서버로부터 데이터를 받아와서 웹 페이지에 업데이트합니다.

// 유량계 그래프를 위한 차트 설정
var flowChart = new Chart(document.getElementById('flow-chart'), {
    type: 'line',
    data: {
        labels: [], // x축 레이블
        datasets: [{
            label: '유량계 값', // 데이터셋 레이블
            data: [], // y축 데이터
            fill: false, // 영역 채우기 여부
            borderColor: 'rgb(75, 192, 192)', // 선의 색상
            tension: 0.1 // 선의 강도
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: '시간' // x축 타이틀
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: '유량계 값' // y축 타이틀
                }
            }
        }
    }
});

// 수압계 그래프를 위한 차트 설정
var waterPressChart = new Chart(document.getElementById('water-press-chart'), {
    type: 'line',
    data: {
        labels: [], // x축 레이블
        datasets: [{
            label: '수압계 값', // 데이터셋 레이블
            data: [], // y축 데이터
            fill: false, // 영역 채우기 여부
            borderColor: 'rgb(255, 99, 132)', // 선의 색상
            tension: 0.1 // 선의 강도
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: '시간' // x축 타이틀
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: '수압계 값' // y축 타이틀
                }
            }
        }
    }
});

// 센서 데이터를 그래프에 업데이트하는 함수
function updateChartData(flowData, waterPressData) {
    // 현재 시간을 x축 레이블에 추가
    var currentTime = new Date().toLocaleTimeString();
    flowChart.data.labels.push(currentTime);
    waterPressChart.data.labels.push(currentTime);

    // 유량계 값과 수압계 값에 대한 데이터를 추가
    flowChart.data.datasets[0].data.push(flowData);
    waterPressChart.data.datasets[0].data.push(waterPressData);

    // 최대 10개의 데이터만 유지하도록 설정
    var maxDataLength = 10;
    if (flowChart.data.labels.length > maxDataLength) {
        flowChart.data.labels.shift();
        flowChart.data.datasets[0].data.shift();
    }
    if (waterPressChart.data.labels.length > maxDataLength) {
        waterPressChart.data.labels.shift();
        waterPressChart.data.datasets[0].data.shift();
    }

    // 차트 업데이트
    flowChart.update();
    waterPressChart.update();
}

// 모터 작동 유무와 시스템 오작동을 표시하는 함수
function updateMotorAndSystemStatus(motorStatus, systemStatus) {
    // 모터 작동 유무 표시
    var motorStatusElement = document.getElementById('motor-status');
    motorStatusElement.textContent = motorStatus ? '작동 중' : '정지';

    // 시스템 오작동 표시
    var systemStatusElement = document.getElementById('system-status');
    systemStatusElement.textContent = systemStatus ? '오작동' : '정상';
}

// 센서 데이터 및 모터 작동 유무, 시스템 오작동 여부를 업데이트하는 함수
function updateSensorData(flowData, waterPressData, motorStatus, systemStatus) {
    updateChartData(flowData, waterPressData);
    updateMotorAndSystemStatus(motorStatus, systemStatus);
}

// 예시 데이터로 초기화
var initialFlowData = 0;
var initialWaterPressData = 0;
var initialMotorStatus = false;
var initialSystemStatus = false;
updateSensorData(initialFlowData, initialWaterPressData, initialMotorStatus, initialSystemStatus);