from flask import Flask, render_template
from flask_cors import CORS  # Import CORS from flask_cors

import json
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    # Sample data (replace with your data)

    url = "https://multichain-api.birdeye.so/solana/amm/new_pairs?source=all"

    payload = {}
    headers = {
        'authority': 'multichain-api.birdeye.so',
  'accept': 'application/json, text/plain, /',
  'accept-language': 'en-US,en;q=0.7',
  'agent-id': '83b777b7-d7a7-41c9-925a-d40f393270aa',
  'cf-be': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDI4MjU0MDAsImV4cCI6MTcwMjgyNTcwMH0._9qESEjp65zXk9TOTt53h6grdylBgZBvyQ8ZVmlZcMo',
  'if-none-match': 'W/"4b31f7-VChcigZ0W/mgv0DpIsNjHrO9Sck"',
  'origin': 'https://birdeye.so/',
  'referer': 'https://birdeye.so/',
  'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Brave";v="120"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'sec-gpc': '1',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

    }

    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code == 200:
        data = response.json()

        excluded_address = "So11111111111111111111111111111111111111112"
        execluded_symbol = "SOL"
        all_addresses = []
        all_symbols=[]
        # Store URLs in lists
        rugcheck_urls = []
        birdeye_urls = []

        rugcheck_url = "https://rugcheck.xyz/tokens/"
        birdeye_url = "https://birdeye.so/token/"

        for pair in data.get("data", []):
            tokens = pair.get("tokens", [])
            for token in tokens:
                address = token.get("address")
                if address != excluded_address:
                    all_addresses.append(address)

                symbol= token.get("symbol", [])
                if symbol != execluded_symbol:
                    all_symbols.append(symbol)

        for addon_address in all_addresses:
            rugcheck_urls.append(rugcheck_url + addon_address)
            birdeye_urls.append(birdeye_url + addon_address)

        #---------------------rugcheck part------------------------------------------------------------
        #for rugcheck_url in rugcheck_urls:
    # Make a request for each URL
            
        #rugcheck_payload = {}
        #rugcheck_headers = {}
        #for rugcheck_url in rugcheck_urls:
            #rugcheck_response = requests.request("GET",rugcheck_url,headers=rugcheck_headers,data=rugcheck_payload)

        # Pass the data to the HTML template
        return render_template('TokenTable.jsx', rugcheck_urls=rugcheck_urls, birdeye_urls=birdeye_urls,all_symbols=all_symbols)

    else:
        print("Request failed with status code:", response.status_code)
        # Return a response even in case of an error
        return "Failed to retrieve data. Status code: {}".format(response.status_code)

if __name__ == '__main__':
    app.run(debug=True)
