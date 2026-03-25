import requests
import json

url = "http://127.0.0.1:5000/analyze"

payload = {
    "input_type": "log",
    "content": \"\"\"2026-03-10 10:00:01 INFO User login   
email=admin@company.com   
password=admin123   
api_key=sk-prod-xyz   
ERROR stack trace: NullPointerException at service.java:45\"\"\"
}

headers = {
    "Content-Type": "application/json"
}

print("Executing test...")
response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    res_data = response.json()
    print("✅ TEST SUCCESSFUL")
    print(json.dumps(res_data, indent=2))
else:
    print("❌ TEST FAILED:", response.status_code)
    print(response.text)
