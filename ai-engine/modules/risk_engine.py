def calculate_risk(findings):
    total_score = sum(f["score"] for f in findings)
    
    # User Requirement: Max risk score is 42
    max_score = 42
    if total_score > max_score:
        total_score = max_score

    # User Requirement: New thresholds (Implicitly 14 is high, so 15 is critical)
    if total_score >= 15:
        level = "critical"
    elif total_score >= 11:
        level = "high"
    elif total_score >= 5:
        level = "medium"
    else:
        level = "low"

    if level in ["critical", "high"]:
        action = "block"
    elif level == "medium":
        action = "masked" # sample says "masked"
    else:
        action = "allow"

    return {
        "risk_score": total_score,
        "risk_level": level,
        "action": action
    }


if __name__ == "__main__":
    test = [{"score": 5}, {"score": 4}]
    print(calculate_risk(test))