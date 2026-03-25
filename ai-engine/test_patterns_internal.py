import sys
import os

# Add the directory to sys.path to find the modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from modules.regex_detector import detect_patterns

def test_patterns():
    content = """2026-03-10 10:00:01 INFO User login   
email=admin@company.com   
password=admin123   
api_key=sk-prod-xyz   
ERROR stack trace: NullPointerException at service.java:45   
Phone: +1-555-0199
Alternative Phone: (123) 456-7890
Standard Phone: 9876543210
"""
    findings = detect_patterns(content)
    print(f"Total findings: {len(findings)}")
    
    found_types = {}
    for f in findings:
        t = f['type']
        v = f['value']
        found_types[t] = found_types.get(t, []) + [v]
        print(f"[{t}] Line {f['line']}: {v} (Risk: {f['risk']})")
    
    assert "email" in found_types
    assert "password" in found_types
    assert "api_key" in found_types
    assert "stack_trace" in found_types
    assert "phone" in found_types
    assert len(found_types["phone"]) >= 3
    
    print("\n✅ Internal pattern verification passed!")

if __name__ == "__main__":
    test_patterns()
