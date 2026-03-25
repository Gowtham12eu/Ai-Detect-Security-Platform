import json
from app import app

client = app.test_client()

payload = {
    "input_type": "log",
    "content": "2026-03-10 10:00:01 INFO User login\nemail=admin@company.com\npassword=admin123\napi_key=sk-prod-xyz\nERROR stack trace: NullPointerException at service.java:45"
}

response = client.post('/analyze', json=payload)
print("STATUS:", response.status_code)
print(json.dumps(response.get_json(), indent=2))
