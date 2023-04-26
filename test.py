import json
import requests
import time
url = "http://localhost:8080/data"

flow_meter = 10
water_press = 20
motor_working = False
system_warning = True

while 1:
    data = {"flow_meter": flow_meter, "water_press": water_press, "motor_working": motor_working, "system_warning": system_warning}

    # POST 요청 보내기
    flow_meter = flow_meter + 7
    water_press = water_press + 3

    
    if flow_meter % 2 == 1:
        if motor_working == False:
            motor_working = True
        elif motor_working == True:
            motor_working = False
        
    if water_press % 2 == 0:
        if system_warning == False:
            system_warning = True
        elif system_warning == True:
            system_warning = False
    

    time.sleep(5)
    print(data)
    response = requests.post(url, json=data)
