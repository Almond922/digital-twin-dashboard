import requests

requests.post(
    "http://localhost:5000/update",
    json={
        "prediction": "STTC",
        "norm": 10.5,
        "mi": 20.4,
        "sttc": 69.1
    }
)

print("Data sent!")