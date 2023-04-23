import pymongo
import csv
import zipfile

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]

# Open the zip file containing the CSV file
with zipfile.ZipFile("collection1.zip", "r") as zip_ref:
    # Extract the CSV file
    zip_ref.extractall()

# Open the CSV file
with open("collection1.csv", "r") as csvfile:
    # Read the CSV file
    reader = csv.DictReader(csvfile)

    # Insert each row as a document in the collection
    for row in reader:
        db.collection1.insert_one(row)
