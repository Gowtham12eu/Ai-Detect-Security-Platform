import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_with_ai(content, findings, input_type="text"):
    try:
        findings_text = ""
        for f in findings:
            findings_text += f"- Line {f['line']}: {f['type']} found → Risk: {f['risk']}\n"

        if not findings_text:
            findings_text = "No patterns detected."

        if input_type == "log":
            prompt = f"""
You are a security expert. Analyze these logs for security risks, secrets, and anomalies.

Content: {content[:1000]}

Findings from Regex Engine: {findings_text}

Analyze the context of these findings and the raw log content. 
Generate a comprehensive security summary and a list of specific, non-generic actionable insights.

The summary should follow this style: "Log contains [primary risks found, e.g., sensitive credentials, tokens, and system errors]"
The insights should be specific to the detected patterns, for example:
- "Sensitive credentials (password, API key, token) exposed in logs"
- "Repeated failed login attempts detected indicating possible brute-force attack"
- "Stack trace reveals internal system structure"
- "Error logs may expose backend implementation details"
- "Personally identifiable information (email, phone) found in logs"

Provide your output ONLY as a valid JSON block:
{{
  "summary": "Descriptive summary string",
  "insights": ["Specific insight 1", "Specific insight 2", ...]
}}
"""
            response = client.models.generate_content(
                model="gemini-flash-latest",
                contents=prompt
            )
            text = response.text.strip()
            # Handle potential markdown formatting from AI
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                # Fallback if AI output is not valid JSON
                return {
                    "summary": "Log analysis identify potential risks." if findings else "No immediate risks detected in logs.",
                    "insights": [f"Detected {len(findings)} patterns in logs", "Review sensitive findings in the table below"]
                }
        else:
            prompt = f"""
You are a security expert. Analyze this data:

Content: {content[:500]}

Findings: {findings_text}

Give short summary, warnings and recommendations.
"""
            response = client.models.generate_content(
                model="gemini-flash-latest",
                contents=prompt
            )
            return response.text

    except Exception as e:
        error_msg = str(e)
        print(f"⚠️ AI Analysis Error: {error_msg}")
        
        # Fallback logic for log analysis (especially for 429 Resource Exhausted)
        if input_type == "log":
            fallback = {
                "summary": "Log analysis performed using rule-based engine (AI quota exceeded)",
                "insights": [f"Detected {len(findings)} security matching patterns"]
            }
            if any(f['risk'] == 'critical' for f in findings):
                fallback["insights"].append("CRITICAL: Hardcoded credentials or secrets detected")
            if any(f['type'] == 'stack_trace' for f in findings):
                fallback["insights"].append("System error leaks found in logs")
            return fallback
            
        if "RESOURCE_EXHAUSTED" in error_msg:
            return "AI Analysis temporarily unavailable (Quota Exceeded). Please review the findings table for security risks."
            
        return f"AI analysis unavailable: {error_msg}"
