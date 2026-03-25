import sys
import os

sys.path.append(r"c:\Users\ELCOT\Desktop\Project\ai-engine")

from modules.risk_engine import calculate_risk

def test_fast():
    findings = [
        {"type": "email", "score": 1},
        {"type": "phone", "score": 1},
        {"type": "password", "score": 4},
        {"type": "api_key", "score": 4},
        {"type": "token", "score": 4}
    ]
    result = calculate_risk(findings)
    print(f"Total Score: {result['risk_score']}")
    print(f"Risk Level: {result['risk_level']}")
    
    assert result['risk_score'] == 14
    assert result['risk_level'] == 'high'
    print("✅ Fast verification passed! Score is 14 and Level is High.")

if __name__ == "__main__":
    test_fast()
