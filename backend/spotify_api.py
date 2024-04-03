import requests
from decouple import config

def authentication():
    url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": config("CLIENT_ID"),
        "client_secret": config("CLIENT_SECRET")
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    print("Payload:", payload)

    response = requests.post(url, data=payload, headers=headers)

    if response.status_code == 200:
        access_token = response.json()["access_token"]
        print("Access Token:", access_token)
    else:
        print("Error:", response.text)


def get_track_features(track_id):
    url = f"https://api.spotify.com/v1/audio-features/{track_id}"
    headers = {"Authorization": "Bearer "+ config("ACCESS_TOKEN")}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.text)
        

def get_track(track_id):
    url = f"https://api.spotify.com/v1/tracks/{track_id}"
    headers = {"Authorization" : "Bearer " + config("ACCESS_TOKEN")}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.text)


def get_artist(artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}"
    headers = {"Authorization": f"Bearer {config('ACCESS_TOKEN')}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.text)
        