import re
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from patterns.patterns import PATTERNS

PLACEHOLDERS = [
    r"^process\.env\..*$",
    r"^os\.environ\[.*\]$",
    r"^<.*>$",
    r"^YOUR_.*$",
    r"^MY_.*$",
    r"^PLACEHOLDER$",
    r"^REPLACE_ME$",
    r"^EXAMPLE$",
    r"^DUMMY$",
    r"\[YOUR_.*?\]"
]

# Values that should be considered low risk even if they match a pattern
LOW_RISK_VALUE_PATTERNS = [
    r"^env\(.*\)$",
    r"^httpOnly_cookie$",
    r"^YOUR_.*$",
    r"^MY_.*$",
    r"^PLACEHOLDER$",
    r"^REPLACE_ME$",
    r"^EXAMPLE$",
    r"^DUMMY$",
]

def is_placeholder(value):
    for p in PLACEHOLDERS:
        if re.match(p, value, re.IGNORECASE):
            return True
    return False

def is_low_risk_value(type_name, value):
    """Return True if the value should be downgraded to low risk."""
    # If it's a password and contains symbols ($*&^%!@)
    if type_name == "password":
        symbols = "$*&^%!@"
        if any(s in value for s in symbols):
            return True
    
    # Check general low risk patterns (env vars, placeholders)
    for p in LOW_RISK_VALUE_PATTERNS:
        if re.match(p, value, re.IGNORECASE):
            return True
            
    return False

def detect_patterns(content):
    findings = []
    lines = content.split("\n")

    for line_num, line in enumerate(lines, start=1):
        for pattern_name, pattern_data in PATTERNS.items():
            match = re.search(pattern_data["regex"], line, re.IGNORECASE)
            if match:
                # Use named group 'value' if it exists, otherwise use the whole match
                try:
                    value = match.group("value")
                except IndexError:
                    value = match.group()

                if is_placeholder(value):
                    continue

                risk = pattern_data["risk"]
                score = pattern_data["score"]

                # Check if this specific value should be low risk
                if is_low_risk_value(pattern_name, value):
                    risk = "low"
                    score = 1

                finding = {
                    "type": pattern_name,
                    "risk": risk,
                    "score": score,
                    "line": line_num
                }

                # Section 9 Requirement: Only show value for low/medium risk items in the API
                # High and Critical risk values should be omitted or masked.
                if risk in ["low", "medium"]:
                    finding["value"] = value

                findings.append(finding)

    return findings