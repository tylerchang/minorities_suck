# pip install --upgrade firebase-admin

import firebase_admin
import csv
from firebase_admin import credentials
from firebase_admin import firestore

# Run this script to upload a batch of csv sample questions to the firestore collection
# Make sure the csv file and the serviceAccountKey.json file is in the same folder

csv_filename = "sampleQuestions.csv"
cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

with open(csv_filename, mode ='r') as file:
    csv_file = csv.reader(file)
    for line in csv_file:
            question_text = line[0]
            answer_one = line[1]
            answer_two = line[2]
            doc_ref = db.collection(u'sampleQuestions').document()
            doc_ref.set({
                u'answer_a': answer_one,
                u'answer_b': answer_two,
                u'question_text': question_text,
                u'votes_a': 0,
                u'votes_b': 0
            })


