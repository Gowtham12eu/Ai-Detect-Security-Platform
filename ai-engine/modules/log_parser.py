def parse_log(content):
    lines = content.split("\n")
    parsed = []

    for line_num, line in enumerate(lines, start=1):
        if line.strip():
            parsed.append({
                "line_num": line_num,
                "content": line.strip()
            })

    return parsed


if __name__ == "__main__":
    test = "line1\npassword=123\napi_key=abc"
    result = parse_log(test)
    for r in result:
        print(r)