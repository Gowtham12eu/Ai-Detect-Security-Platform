import requests
import json

url = "http://127.0.0.1:5000/analyze"
sample_input = """2026-03-10 10:00:01 INFO User login
email=admin@company.com
phone=9876543210
password=admin123

2026-03-10 10:01:22 DEBUG API request
api_key=sk-prod-xyz
token=ghp_abcdef123456

2026-03-10 10:02:10 WARN Multiple failed login attempts
user=admin
status=failed
status=failed
status=failed

2026-03-10 10:03:45 ERROR Exception occurred
Traceback (most recent call last):
  File "app.py", line 10
    process()
Exception: NullPointerException

2026-03-10 10:04:12 INFO Request received
IP=192.168.1.10
url=/login"""

payload = {
    "content": sample_input,
    "input_type": "log"
}

try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print("Error:", e)
