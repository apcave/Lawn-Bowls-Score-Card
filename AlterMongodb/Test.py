import requests
from bs4 import BeautifulSoup

url = "https://results.bowlslink.com.au/competition/fbfa446f-8986-479d-a196-543ec8849c97#matches"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

competition_name = soup.find("h1", {"class": "competition-name"}).text
division = soup.find("div", {"class": "division-name"}).text
sections = [section.text for section in soup.find_all("div", {"class": "section-name"})]

print(f"Competition Name: {competition_name}")
print(f"Division: {division}")
print(f"Sections: {sections}")

