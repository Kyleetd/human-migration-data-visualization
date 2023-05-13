import csv

numCountriesofBirth = {}
numCountries = {}
numVars = {}

with open('international-migration-database.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)

    # Skip the first row
    next(csvreader)

    # Iterate through each row
    for row in csvreader:
        birthCountry = row[1]
        country = row[7]
        var =  row[3]

        if birthCountry not in numCountriesofBirth:
            numCountriesofBirth[birthCountry] = 1
        else:
            numCountriesofBirth[birthCountry] = numCountriesofBirth[birthCountry] + 1

        if country not in numCountries:
            numCountries[country] = 1
        else:
            numCountries[country] = numCountries[country] + 1

        if var not in numVars:
            numVars[var] = 1
        else:
            numVars[var] = numVars[var] + 1


# for key in numCountriesofBirth:
#     # Print the key and value
#     print(key, numCountriesofBirth[key])

# for key in numCountries:
#     # Print the key and value
#     print(key, numCountries[key])

# for key in numVars:
#     # Print the key and value
#     print(key, numVars[key])

totNumBirthCountries = 0
totNumCountries = 0
totVars = 0

for key in numCountriesofBirth:
    totNumBirthCountries += 1

for key in numCountries:
    totNumCountries += 1

for key in numVars:
    totVars += 1

print("Total number of birth countries: " + str(totNumBirthCountries))
print("Total number of countries: " + str(totNumCountries))
print("Total number of variables: " + str(totVars))

for key in numCountries:
    # Print the key and value
    print(key)
