import json

def get_result_data(result):
    data = result.json if hasattr(result, "json") else result
    if isinstance(data, str):
        data = json.loads(data)
    if "res" in data:
        data = data["res"]
    return data
