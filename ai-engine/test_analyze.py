import requests
import json

def test_analyze():
    url = "http://127.0.0.1:5000/analyze"
    payload = {
        "input_type": "text",
        "content": "SELECT * FROM users WHERE password = '123' AND api_key = 'sk-1234567890'"
    }
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_analyze()
