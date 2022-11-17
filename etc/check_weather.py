#!/usr/bin/python3

import requests, json, time
from os.path import exists, getmtime


base_url = "https://api.open-meteo.com/v1/forecast"

geocoord_latitude = 46.908714
geocoord_longitude = 19.694847

forecast_filename = "/var/www/html/reports/weather_forecast.json"
forecast_expiration = 3600

weather_filename = "/var/www/html/reports/current_weather.json"
weather_expiration = 300


def get_weather_report( params ):
    try:
        response = requests.get( base_url, params = params )
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print( "HTTP error:", e )
    except requests.exceptions.RequestException as e:
        print( "Request error:", e )
    else:
        return response


def save_report_to_file( filename, json_data ):
    try:
        json_dump = json.dumps( json_data )
        json_file = open( filename, "w" )
    except IOError as e:
        print( "File IO error:", e )
    else:
        json_file.write( json_dump )
        json_file.close()


def is_report_expired( filename, expiration ):
    if exists( filename ):
        since_last_update = time.time() - getmtime( filename )
        if expiration >= since_last_update:
            return False
    return True


def download_forecast():
    if is_report_expired( forecast_filename, forecast_expiration ):
        print( "Fetching weather forecast...")
        response = get_weather_report({ 
            "latitude": str( geocoord_latitude ), 
            "longitude": str( geocoord_longitude ),
            "hourly": [ "temperature_2m", "windspeed_10m", "winddirection_10m", "weathercode" ],
        })
        if response:
            print( "Saving weather forecast...")
            save_report_to_file( forecast_filename, response.json() )


def download_weather():
    if is_report_expired( weather_filename, weather_expiration ):
        print( "Fetching current weather...")
        response = get_weather_report({ 
            "latitude": str( geocoord_latitude ), 
            "longitude": str( geocoord_longitude ),
            "current_weather": True,
        })
        if response:
            print( "Saving current weather...")
            save_report_to_file( weather_filename, response.json() )


download_forecast()
download_weather()

