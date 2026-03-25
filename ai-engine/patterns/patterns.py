PATTERNS = {
    "email": {
        "regex": r"(?P<value>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})",
        "risk": "low",
        "score": 1
    },
    "phone": {
        "regex": r"(?P<value>(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})",
        "risk": "low",
        "score": 1
    },
    "password": {
        "regex": r"(?i)(password|pass|pwd|db_password|database_password|user_password)\s*[:=]\s*(?P<value>\S+)",
        "risk": "critical",
        "score": 4
    },
    "api_key": {
        "regex": r"(?i)(api_key|apikey|api-key|access_key)\s*[:=]\s*(?P<value>\S+)",
        "risk": "high",
        "score": 4
    },
    "token": {
        "regex": r"(?i)(token|auth_token|access_token|refresh_token|bearer_token)\s*[:=]\s*(?P<value>\S+)",
        "risk": "high",
        "score": 4
    }
}