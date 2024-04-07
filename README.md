# 스마트팜 관수시설 오동작 탐지

# 제목: 스마트팜 관수시설 오동작 탐지

# 필요성

스마트팜은 농업의 생산성을 향상시키고 비용을 절감하는 등의 장점을 제공하는 첨단 기술을 활용한 농업 시스템입니다. 스마트팜에서 관수시설은 작물에게 필요한 적절한 수분을 제공하기 위한 중요한 요소입니다. 스마트팜 관수시설 센서 값 모니터링과 오동작 탐시 서비스는 다음과 같은 이유로 필요성이 있습니다.

- 작물 건강 관리: 관수시설의 센서를 통해 작물의 수분 상태를 모니터링할 수 있습니다. 수분스트레스를 조기에 감지하여 작물의 건강 상태를 유지하고, 필요한 경우에는 적절한 관수 조치를 취할 수 있습니다. 이는 생산량을 유지하고 품질을 향상시키는 데 도움이 될 수 있습니다.
- 오동작 탐지와 예방: 관수시설의 센서값을 모니터링하면 시스템의 오동작을 조기에 감지할 수 있습니다. 센서값의 이상 패턴이나 잘못된 측정값을 식별하여 문제를 신속하게 해결하고, 작물에 영향을 미치는 잠재적인 위험을 방지할 수 있습니다. 이는 스마트팜 운영의 안정성과 신뢰성을 향상시키는 데 도움이 될 수 있습니다.
- 데이터 기반 의사 결정: 관수시설의 센서값 모니터링은 많은 양의 데이터를 생성합니다. 이 데이터는 빅데이터 분석과 결합하여 작물의 생장 패턴, 수분 요구량, 토양 조건 등을 파악할 수 있습니다. 이는 농작물의 생산량을 최적화하고, 자원 사용을 효율화하여 비용을 절감하는 데 도움이 될 수 있습니다.

# 수행 내용 및 수행 결과

- 사용 기술 스택

![사용기술스택](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/7f9c0559-80f2-4dfb-972b-1b316c2037f0)

사용한 기술 스택으로 프론트엔드는 기본적인 HTML, CSS, JAVASCRIPT를 이용하여 사용자 인터페이스를 구현하였고, 웹서버로 NodeJs 사용했습니다.

백엔드는 Node.js와 Express 프레임워크를 활용하여 백엔드 로직을 구현하였고,

센서 데이터 값을 저장하고 관리하기 위한 데이터베이스로는 MySQL을 사용하였습니다.

- 전체 구조

![전체구조](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/4e14d6da-a6cc-41e7-b7ed-f29dc9ed48c2)

동작 과정 같은 경우 관수시설에서 센서로부터 값을 측정하고 JSON 형식으로 서버에 전송합니다. 서버는 이 값을 받아서 데이터베이스에 저장하고, 동시에 웹 화면에는 WebSocket을 통해 센서 값을 전달합니다. 이를 통해 웹 화면은 실시간으로 업데이트되며, 사용자는 실시간으로 관수시설의 상태를 확인할 수 있습니다. 이러한 구조를 통해 센서 데이터의 수집과 저장, 그리고 웹 화면을 통한 실시간 모니터링이 이루어집니다.

- WebSocket 사용 이유

![WebSocket 사용 이유](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/50b8c2a2-4633-404c-8164-f51ec24ea386)

현재 프로젝트의 구조는 관수시설에서 센서 데이터 값을 JSON을 통해 서버로 보내면 해당 데이터 값을 웹 화면에 업데이트를 시켜줘야 됩니다.

![HTTP 실시간성 보장 기법](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/392d453f-613f-4043-ac50-23dec967a2dc)

이를 위해서는 HTTP에서 실시간성을 보장하는 기법인 Polling, Long Polling, Streaming을 사용하거나 WebSocket을 사용해야합니다.

![HTTP Websocket 연결 과정 비용](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/21219575-3a2f-4cc9-9376-3785061e4986)

HTTP는 비 연결성으로 매번 연결을 맺고 끊는 과정의 비용이 듭니다. 하지만 WebSocket을 연결 지향으로 한번 연결을 맺으면 데이터를 양방향으로 계속 보낼 수 있습니다.

![HTTP Websocket 비교](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/6e89ba8b-43b8-42bb-a3a7-aad3c73602f0)

또한 HTTP는 매 요청을 보낼 때마다 많은 정보들을 보내야 되지만 WebSocket을 은 HTTP로 연결이 수립되고 나면 간단한 메시지로 통신이 가능합니다.

![WebSocket 적용](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/052e1c3e-9f52-49ab-9d8f-5c476daa17bb)

이런 HTTP와 WebSocket을 특성을 고려했을 때 WebSocket을 적용시키게 되었습니다.

- 프론트엔드 구현

![프론트엔드 Figma](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/c1926f39-4954-4a12-b635-f255426c5930)

프론트엔드 같은 경우 Figma를 사용하여 사용자 인터페이스(UI)를 디자인하고, 이를 기반으로 HTML로 마크업하였습니다. 그리고 CSS를 이용하여 디자인 요소를 스타일링하였습니다.

![Javascript Websocket 이용](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/f089b0b6-dd6a-4d51-b88f-5f39d5467fe2)

그 다음, JavaScript를 사용하여 WebSocket을 이용해 서버와 연결하고, 서버로부터 오는 메시지를 받으면 데이터 값을 업데이트하고 UI에 반영하는 코드를 작성하였습니다.

- 백엔드 구현

![백엔드구현](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/c1d6a537-406e-4dde-959f-79e3a1889954)

클라이언트는 POST 요청을 /data API에 전송하며, 요청에는 JSON 형식으로 센서 데이터 값을 포함합니다. 백엔드는 이를 받아서 JSON을 파싱하고 센서 데이터 값을 추출합니다. 추출된 센서 데이터는 데이터베이스에 저장됩니다. 동시에 WebSocket을 통해 프론트엔드로 해당 센서 데이터를 실시간으로 전송합니다.

이를 통해 백엔드는 클라이언트로부터 전송된 센서 데이터를 받아서 저장하고, WebSocket을 통해 실시간으로 프론트엔드에 데이터를 제공하는 역할을 수행합니다.

- 사용센서 및 모듈 선정

![사용센서 및 모듈 선정](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/87c72dcd-7056-4bca-82a8-750d5ce70158)

관수시설의 유량계 값과 수압계값을 측정하기 위해 YF-S401 유량센서와

SKU_SEN0257 수압센서를 사용하였으며, 각 센서 값을 아날로그 신호로 측정한 후 ADS1115 모듈을 통해 디지털 데이터로 변환하여 마이크로컨트롤러에 전달할 수 있도록 하였습니다.

- 관수시스템 환경 구축

![관수시스템 환경 구축](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/8897d6b7-395c-44d7-934d-9854274dc466)

구축한 관수시스템 환경 같은 경우 급수 모터를 작동시켜 물을 관수 라인에 공급합니다. 유량센서는 물이 얼마나 흐르는지를 측정하고, 수압센서는 관수 라인의 수압을 측정합니다. 이를 통해 각 수조에 도달하는 물의 양과 수압을 파악할 수 있습니다. 각 수조에 설치된 분무장치를 통해 물을 분무할 수 있으며, 밸브를 조절하여 분무의 세기와 양을 조절할 수 있습니다. 이를 통해 정확한 관수와 분무를 제공하여 작물의 적절한 수분 공급과 관리를 할 수 있습니다.

- 모니터링 화면

![모니터링 화면](https://github.com/Sanizzang/Smartfarm_watering_facility_malfunction_detection_project/assets/44565811/659cbe49-2f3e-43e7-a99f-d70fac6cc16c)

위의 관수시설을 통해 관수시템의 상태를 전달받아 모터 작동 상태와 시스템 상태를 확인할 수 있고, 그래프 값을 통해 시간 별 유량계 값과 수압계 값을 확인할 수 있습니다.

# 향후 계획

원래의 계획은 관수시스템에서 센서 값을 수집하여 정상 작동 및 오동작 상황에서의 데이터를 확인하고 전송하는 것이었습니다. 그러나 프로젝트 기간이 단축되어 오동작 상황에 대한 실험을 진행하지 못했습니다. 따라서 이를 완성하기 위해서는 오동작 감지에 대한 실험이 필요합니다.

또한, 현재는 센서값을 데이터베이스에 저장하고 있지만, 해당 데이터의 활용은 이루어지지 않고 있습니다. 이러한 데이터를 빅데이터 분석과 결합하여 작물의 생장 패턴, 수분 요구량, 토양 조건 등을 파악하고 활용할 수 있도록 개선해야 합니다.
