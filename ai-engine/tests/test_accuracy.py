import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from modules.regex_detector import detect_patterns

def test_accuracy():
    test_input = """
email=user@company.com
password=$2b$10$abcXYZsecurehashvalue
api_key=env(API_KEY)
token=httpOnly_cookie
real_api_key=sk-1234567890abcdef1234567890
real_password=MySecretPassword123!
"""

    findings = detect_patterns(test_input)

    print("--- Detection Results ---")
    detected_types = []
    for f in findings:
        print(f"Line {f['line']} | Type: {f['type']} | Value: {f['value']} | Risk: {f['risk']}")
        detected_types.append((f['type'], f['value']))
    
    # Assertions (informal for this script)
    print("\n--- Validation ---")
    
    # env(API_KEY) should now be detected
    if any("env(API_KEY)" in str(v) for t, v in detected_types):
        print("[PASS] env(API_KEY) was detected")
    else:
        print("[FAIL] env(API_KEY) was NOT detected")

    # httpOnly_cookie should now be detected
    if any("httpOnly_cookie" in str(v) for t, v in detected_types):
        print("[PASS] httpOnly_cookie was detected")
    else:
        print("[FAIL] httpOnly_cookie was NOT detected")

    # Real secrets should be detected
    if any("sk-1234567890abcdef1234567890" in str(v) for t, v in detected_types):
        print("[PASS] Real API Key detected")
    else:
        print("[FAIL] Real API Key NOT detected")

    if any("MySecretPassword123!" in str(v) for t, v in detected_types):
        print("[PASS] Real Password detected")
    else:
        print("[FAIL] Real Password NOT detected")

if __name__ == "__main__":
    test_accuracy()
