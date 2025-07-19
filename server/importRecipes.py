# import pandas as pd
# from pymongo import MongoClient

# print("🔄 Reading CSV...")
# df = pd.read_csv("full_dataset.csv")
# print("✅ CSV loaded!")

# # Optional: preview a few rows
# print(df.head())

# print("🔗 Connecting to MongoDB...")
# client = MongoClient("mongodb://localhost:27017/")
# db = client["chefGPT"]
# collection = db["recipes"]

# print("🧹 Preparing records...")
# records = df.to_dict(orient="records")

# print("📤 Inserting records into MongoDB...")
# collection.insert_many(records)
# print("✅ All recipes inserted into MongoDB!")
