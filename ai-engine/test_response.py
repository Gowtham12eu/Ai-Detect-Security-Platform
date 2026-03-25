import requests
import json

url = "http://127.0.0.1:5000/analyze"
payload = {
    "input_type": "text",
    "content": "email=user@company.com\npassword=$2b$10$abcXYZsecurehashvalue\napi_key=env(API_KEY)\ntoken=httpOnly_cookie"
}
try:
    r = requests.post(url, json=payload, timeout=10)
    data = r.json()
    print("=== FULL RESPONSE ===")
    print(json.dumps(data, indent=2))
    print()
    print("=== KEY FIELDS ===")
    print(f"action: {repr(data.get('action'))}")
    print(f"risk_level: {repr(data.get('risk_level'))}")
    print(f"risk_score: {repr(data.get('risk_score'))}")
except Exception as e:
    print(f"Error: {e}")
