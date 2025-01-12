from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)


def preprocess_input(input_data, encoders):
    """
    Preprocesses the input data using the label encoders.
    """
    # Ensure input is a dictionary with 1D arrays
    for column in input_data.keys():
        if column in encoders:
            input_data[column] = encoders[column].transform([input_data[column]])[0]
    input_data = {key: [value] for key, value in input_data.items()}  # Flatten
    return pd.DataFrame(input_data)  # Return a 2D DataFrame


def get_eligible_schemes(input_data, dataset_path="government_scheme_eligibility_data.csv"):
    """
    Checks whether the given input data is eligible for schemes and
    returns the IDs of eligible schemes from the existing dataset.
    """
    # Load the trained model and encoders
    model = joblib.load("government_scheme_eligibility_model.pkl")
    encoders = joblib.load("label_encoders.pkl")
    
    # Preprocess the input data
    input_data = preprocess_input(input_data, encoders)
    
    # Drop unnecessary columns to match training data
    required_columns = [
        "Scheme ID", "Phone Number", "Age", "State", "District", "Region", "Scheme Category",
        "Employed", "Occupation", "Education", "Gender", "Senior Citizen Status", "Are you a Farmer?"
    ]
    input_data = input_data[required_columns]
    
    # Predict eligibility
    eligibility = model.predict(input_data.values)[0]
    
    # Load the dataset and filter based on eligibility
    if eligibility == 1:  # Eligible
        df = pd.read_csv(dataset_path)
        eligible_schemes = df[df["Eligible for schemes"] == 1]["Scheme ID"]
        return eligible_schemes.tolist()
    else:
        return []  # No eligible schemes

# Enable CORS for all routes
CORS(app)

# Load the model and label encoders from .pkl files
model_path = "government_scheme_eligibility_model.pkl"
encoder_path = "label_encoders.pkl"
try:
    model = joblib.load(model_path)
    label_encoders = joblib.load(encoder_path)
    print("Model and encoders loaded successfully!")
except FileNotFoundError as e:
    print(f"Error: {e}")
    model = None
    label_encoders = None
except Exception as e:
    print(f"Error loading the model or encoders: {e}")
    model = None
    label_encoders = None

@app.route('/predict-eligibility', methods=['POST'])
def predict_eligibility():
    if not model or not label_encoders:
        return jsonify({"error": "Model or encoders are not loaded."}), 500

    try:
        # Get input data
        data = request.get_json()
        print("Received data:", data)

        # Validate input fields
        required_fields = ['id', 'phoneNumber', 'age', 'state', 'district', 'Region', 
                           'Scheme_Category', 'employed', 'occupation', 'education', 
                           'gender', 'seniorCitizen', 'is_farmer']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Process and reshape input data
        features_df = pd.DataFrame([{
            'Scheme ID': data['id'],
            'Phone Number': data['phoneNumber'],
            'Age': int(data['age']),
            'State': data['state'],
            'District': data['district'],
            'Region': data['Region'],
            'Scheme Category': data['Scheme_Category'],
            'Employed': data['employed'],
            'Occupation': data['occupation'],
            'Education': data['education'],
            'Gender': data['gender'],
            'Senior Citizen Status': data['seniorCitizen'],
            'Are you a Farmer?': data['is_farmer']
        }])

        # Preprocess and predict
        eligible_schemes = get_eligible_schemes(features_df)
        print("Eligible schemes:", eligible_schemes)

        return jsonify({'eligibility': eligible_schemes})

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "Failed to process the request", "details": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
