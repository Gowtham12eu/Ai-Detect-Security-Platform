import requests
import jwt
import datetime
import os
from dotenv import load_dotenv

# Load .env from backend
load_dotenv('c:/Users/ELCOT/Desktop/Project/backEnd/.env')
JWT_SECRET = os.getenv('JWT_SECRET')
BASE_URL = 'http://localhost:4000/api/analyze'

def test_no_token():
    print("Testing with NO token...")
    res = requests.post(f"{BASE_URL}/text", json={"content": "test"})
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 401
    assert "No token provided" in res.json()['error']

def test_null_token():
    print("\nTesting with 'null' token...")
    res = requests.post(f"{BASE_URL}/text", headers={"Authorization": "Bearer null"}, json={"content": "test"})
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 401
    assert "No token provided or token is invalid" in res.json()['error']

def test_invalid_token():
    print("\nTesting with INVALID token...")
    res = requests.post(f"{BASE_URL}/text", headers={"Authorization": "Bearer not_a_real_token"}, json={"content": "test"})
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 401
    assert "Invalid token" in res.json()['error']

def test_expired_token():
    print("\nTesting with EXPIRED token...")
    # Generate an expired token
    payload = {
        "userId": "123",
        "exp": datetime.datetime.utcnow() - datetime.timedelta(seconds=1)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    res = requests.post(f"{BASE_URL}/text", headers={"Authorization": f"Bearer {token}"}, json={"content": "test"})
    print(f"Status: {res.status_code}, Response: {res.json()}")
    assert res.status_code == 401
    assert "Token expired" in res.json()['error']

if __name__ == "__main__":
    try:
        test_no_token()
        test_null_token()
        test_invalid_token()
        test_expired_token()
        print("\n✅ All backend auth tests passed!")
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
