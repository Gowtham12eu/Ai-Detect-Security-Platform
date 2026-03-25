import requests
import json

BASE_URL = "http://127.0.0.1:5000/analyze"

def test_hackathon_example():
    content = """2026-03-10 10:00:01 INFO User login   
email=admin@company.com   
password=admin123   
api_key=sk-prod-xyz   
ERROR stack trace: NullPointerException at service.java:45   
Phone: +1-555-0199
"""
    payload = {
        "input_type": "log",
        "content": content,
        "options": {
            "mask": True,
            "block_high_risk": True,
            "log_analysis": True
        }
    }

    print("Testing Hackathon Example Log...")
    try:
        response = requests.post(BASE_URL, json=payload, timeout=30)
        if response.status_code == 200:
            data = response.json()
            print("\n--- Response Summary ---")
            print(f"Summary: {data.get('summary')}")
            print(f"Risk Score: {data.get('risk_score')}")
            print(f"Risk Level: {data.get('risk_level')}")
            print(f"Action: {data.get('action')}")
            
            print("\n--- Findings ---")
            for f in data.get('findings', []):
                val = f.get('value', '[HIDDEN]')
                print(f"- {f['type']} at line {f['line']}: {val} (Risk: {f['risk']})")
                
                # Check Section 9 Requirement: High/Critical risks should not have 'value'
                if f['risk'] in ['high', 'critical']:
                    assert 'value' not in f, f"Sensitive value leaked for {f['type']}!"
                else:
                    assert 'value' in f, f"Value missing for low-risk {f['type']}!"
            
            print("\n--- AI Insights ---")
            for insight in data.get('insights', []):
                print(f"- {insight}")
                
            # Verify specific expectations
            found_types = [f['type'] for f in data.get('findings', [])]
            assert "email" in found_types
            assert "password" in found_types
            assert "api_key" in found_types
            assert "stack_trace" in found_types
            assert "phone" in found_types
            print("\n✅ Verification Successful: All expected patterns detected!")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

if __name__ == "__main__":
    test_hackathon_example()
