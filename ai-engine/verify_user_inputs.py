from modules.regex_detector import detect_patterns
import json

inputs = [
    {
        "name": "REAL SECRETS",
        "content": "email=admin@company.com\npassword=admin123\napi_key=sk-prod-xyz789\ntoken=eyJhbGciOiJIUzI1NiJ9"
    },
    {
        "name": "PLACEHOLDERS/REFS",
        "content": "email=user@company.com\npassword=$2b$10$abcXYZsecurehashvalue\napi_key=env(API_KEY)\ntoken=httpOnly_cookie"
    }
]

for inp in inputs:
    print(f"=== TESTING: {inp['name']} ===")
    findings = detect_patterns(inp["content"])
    for f in findings:
        print(f"Line {f['line']}: {f['type']} | Value: {f['value']} | Risk: {f['risk']}")
    print("-" * 30)
