#Importing required libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
from scipy.stats import mode
from sklearn.preprocessing import LabelEncoder




import pandas as pd

# Creating the dataset with placeholder data

data = {

    "Scheme ID": [11111, 22222, 3, 44444, 55555, 66666, 77777, 88888, 99999, 10101, 12121, 13131, 14141, 15151, 16161],

    "Full Name": ["Rahul Sharma", "Neha Singh", "Amit Verma", "Priya Gupta", "Ravi Kumar",
             "Sakshi Rao", "Vikram Yadav", "Ananya Mehta", "Deepak Soni", "Ayesha Khan",
             "Harish Patil", "Sunita Sharma", "Anil Kumar", "Priyanka Singh", "Rajesh Nair"],

    "Phone Number": ["9876543210", "9876543211", "9876543212", "9876543213", "9876543214",
                        "9876543215", "9876543216", "9876543217", "9876543218", "9876543219",
                        "9876543220", "9876543221", "9876543222", "9876543223", "9876543224"],

    "Age": [30, 40, 35, 50, 28, 32, 40, 26, 35, 45, 50, 60, 38, 30, 45],

    "Email": [
        "ravi@example.com", "priya@example.com", "amit@example.com", "neha@example.com", "rahul@example.com",
        "sneha@example.com", "vijay@example.com", "ayesha@example.com", "ravi2@example.com", "anjali@example.com",
        "suresh@example.com", "anita@example.com", "manoj@example.com", "sita@example.com", "amitabh@example.com"
    ],

    "State": ["Delhi", "Maharashtra", "Maharashtra", "Karnataka", "West Bengal", "Telangana",
              "Bihar", "Chandigarh", "Rajasthan", "Uttar Pradesh", "Gujarat", "Delhi",
              "Telangana", "Maharashtra", "Maharashtra"],

    "District": ["Delhi", "Pune", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Patna", "Chandigarh",
                 "Jaipur", "Lucknow", "Surat", "Delhi", "Hyderabad", "Pune", "Mumbai"],

    "Region": ["Urban", "Rural", "Sub-Urban", "Urban", "Rural", "Sub-Urban", "Urban", "Rural", "Urban", "Sub-Urban",
               "Rural", "Urban", "Sub-Urban", "Rural", "Urban"],

    "Scheme Category": [
        "Agriculture, Rural & Environment",
        "Banking, Financial Services and Insurance",
        "Business & Entrepreneurship",
        "Education & Learning",
        "Health & Wellness",
        "Housing & Shelter",
        "Public Safety, Law & Justice",
        "Science, IT & Communications",
        "Skills & Employment",
        "Social Welfare & Empowerment",
        "Sports & Culture",
        "Transport & Infrastructure",
        "Travel & Tourism",
        "Utility & Sanitation",
        "Women and Child"
    ],

    "Employed": [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],

    "Occupation": [
        "Farmer", "Bank Employee", "Entrepreneur", "Teacher", "Healthcare Worker",
        "Architect", "Police Officer", "Software Engineer", "Trainer", "Social Worker",
        "Athlete", "Driver", "Travel Agent", "Utility Worker", "Childcare Worker"
    ],

    "Education": ["Graduate", "Postgraduate", "High School", "Graduate", "Postgraduate", "Diploma", "High School",
                        "Graduate", "Diploma", "Postgraduate", "Graduate", "High School", "Postgraduate", "Graduate", "Diploma"],

    "Gender": ["Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female",
               "Male", "Female", "Male", "Female", "Male", "Female", "Male"],

    "DOB": ["1999-01-01", "1990-01-01", "1979-01-01", "1995-01-01", "1992-01-01", "2000-03-15", "1988-07-22",
            "1975-06-10", "1998-11-23", "1993-09-05", "1991-12-13", "1985-04-28", "1973-08-19", "1997-01-30", "2001-02-20"],


    "Senior Citizen Status": [False, False, False, True, False, False, False, False, False, True,
                          True, True, False, False, True],

    "Eligible for schemes": [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],

    "Are you a Farmer?": [True, False, False, False, False, False, False, False, False, False,
                  False, False, False, False, False]

}



#Converting the dataset to a DataFrame

df = pd.DataFrame(data)

df.to_csv("government_scheme_eligibility_data.csv", index=False)


#Preprocessing the data# Preprocessing the data

# Preprocessing the data
df["Age"] = df["Age"].fillna(df["Age"].mean())
df["Gender"] = df["Gender"].fillna(df["Gender"].mode()[0])
df["Region"] = df["Region"].fillna(df["Region"].mode()[0])
df["Employed"] = df["Employed"].fillna(df["Employed"].mode()[0])
df["Are you a Farmer?"] = df["Are you a Farmer?"].fillna(df["Are you a Farmer?"].mode()[0])
df["Senior Citizen Status"] = df["Senior Citizen Status"].fillna(df["Senior Citizen Status"].mode()[0])
df["Education"] = df["Education"].fillna(df["Education"].mode()[0])
df["Eligible for schemes"] = df["Eligible for schemes"].fillna(df["Eligible for schemes"].median())
df["DOB"] = df["DOB"].fillna(df["DOB"].mode()[0])
df["District"] = df["District"].fillna(df["District"].mode()[0])
df["State"] = df["State"].fillna(df["State"].mode()[0])
df["Occupation"] = df["Occupation"].fillna(df["Occupation"].mode()[0])
df["Scheme Category"] = df["Scheme Category"].fillna(df["Scheme Category"].mode()[0])

#dropping unnecessary columns
#dropping unnecessary columns
X = df.drop(columns=["Full Name", "Eligible for schemes","Email","DOB"])


y = df["Eligible for schemes"]

label_encoders = {}
categorical_columns = [
    "Gender", "Region", "Education", "Occupation", "State", "District",
    "Scheme Category"
]
for column in categorical_columns:
    le = LabelEncoder()
    X[column] = le.fit_transform(X[column])
    label_encoders[column] = le



#Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(X_train)

# Training a Random Forest Classifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

print(X_test)

#Evaluating the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
print("Accuracy:", accuracy)
print("Classification Report:\n", report)


print(y_pred)
#Saving the model for future use
import joblib
model_path = "government_scheme_eligibility_model.pkl"
joblib.dump(model, model_path)
print(f"Model saved to {model_path}")

# Save the label encoders
encoders_path = "label_encoders.pkl"
joblib.dump(label_encoders, encoders_path)
print(f"Encoders saved to {encoders_path}")

