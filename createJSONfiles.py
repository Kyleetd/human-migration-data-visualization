import csv
import json


## {country : {inflow : {2000 : 100, 2001 : 150, 2002 : 400}}, {outflow : {2000 : 150, 2001 : 75}}, {stock : {year : 4}}}


# Define a Python dictionary to represent the JSON object
my_dict = {'Inflows of foreign population by nationality': 'John', 'Stock of foreign-born population by country of birth': 30, 'Outflows of foreign population by nationality': 0, 'Stock of foreign-born population by country of birth' : 0}

numCountries = {}
countries = []

## get all 35 countries in a list
with open('international-migration-database.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)

    # Skip the first row
    next(csvreader)

    # Iterate through each row
    for row in csvreader:
        country = row[7]

        if country not in numCountries:
            numCountries[country] = 1
            countries.append(country)
        else:
            numCountries[country] = numCountries[country] + 1

    country_dicts = []
    country_dicts = [{country: {}} for country in countries]

    for key in country_dicts:
        for row in csvreader:
            if key ==  row[7]:
                if row[3] not in locals()[f'{country}_dict'][country]:
                    locals()[f'{country}_dict'][country][row[3]] = {}
                continue
    
    print(country_dicts)


    # for country in countries:
    #     locals()[f'{country}_dict'] = {}
    #     country_dicts.append(f'{country}_dict')
    #     f'{country}_dict'[country] = {}
    #     for row in csvreader:
    #         #locals()[f'{country}_dict']['capital'] = 'Washington, D.C.' if country == 'USA' else 'Unknown'
    #         if country ==  row[7]:
    #             if row[3] not in locals()[f'{country}_dict'][country]:
    #                 locals()[f'{country}_dict'][country][row[3]] = {}
    #             continue

    #     print(len(f'{country}_dict'))



    


