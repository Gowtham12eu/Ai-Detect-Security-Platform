import re

PHONE_REGEX = r"(?P<value>(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})"

test_cases = [
    "+1-555-0199", # 10 digits total after +1
    "(123) 456-7890",
    "9876543210",
    "+91 98765 43210",
    "123-456-7890"
]

for case in test_cases:
    match = re.search(PHONE_REGEX, case)
    if match:
        print(f"MATCH: '{case}' -> '{match.group('value')}'")
    else:
        print(f"NO MATCH: '{case}'")
