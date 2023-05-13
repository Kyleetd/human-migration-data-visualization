import pandas as pd
import json 
import numpy as np
from pprint import pprint

df = pd.read_csv("./international-migration-database.csv")

dict = {}
for _, row in df.iterrows():
    country = row["Country"].lower().replace(" ", "_")
    country_of_birth = row["Country of birth/nationality"].lower().replace(" ", "_")
    year = row["Year"]
    variable = row["Variable"].lower().replace(" ", "_")
    value = row["Value"]

    if country not in dict:
        dict[country] = {}
    if variable not in dict[country]:
        dict[country][variable] = {}
    if year not in dict[country][variable]:
        dict[country][variable][year] = {}
        
    if not np.isnan(value) and int(value) != 0:
        dict[country][variable][year][country_of_birth] = int(value)

for country in dict:
    with open(f"./process_data/{country}.json", "w") as json_file:
        json.dump(dict[country], json_file)

pprint(dict["chile"]["inflows_of_foreign_population_by_nationality"])



