from flask import Flask, request, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

sia = SentimentIntensityAnalyzer()
sentiment_scores = {}  # Dictionary to store scores for each club

@app.route('/sentiment-analysis', methods=['POST','GET'])
def sentiment_analysis():
    try:
        global sentiment_scores  # Ensure you're modifying the global variable

        feedback_data_response = requests.get('http://localhost:8000/feedback')
        feedback_data = feedback_data_response.json()
        print("Feedback Data:", feedback_data)
        
        for feedback in feedback_data:
            club_name = feedback.get('club_name', '')  # Get the club name
            text = feedback.get('feedback', '')  # Get the feedback
            if club_name and text:
                sentiment_score = sia.polarity_scores(text)['compound']
                # Check if the club already exists in the sentiment_scores dictionary
                if club_name in sentiment_scores:
                    # Add sentiment_score to the existing score for the club
                    sentiment_scores[club_name] += sentiment_score
                else:
                    # Initialize the sentiment score for the club
                    sentiment_scores[club_name] = sentiment_score
            else:
                print("Warning: 'club_name' or 'feedback' field not found in feedback data")

        return jsonify(sentiment_scores)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
