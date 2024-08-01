import React, { useState, useEffect } from 'react';
import NAVbar2 from './user-nav.jsx';
import Ranks from './rank_ele.jsx';

const LeaderBoard = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        fetchFeedbackData();
    }, []);

    const fetchFeedbackData = async () => {
        try {
            const response = await fetch('http://localhost:8000/feedback');
            
            const data = await response.json();
            console.log(data);
            setFeedbackData(data);
            performSentimentAnalysis(data);
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    };

    const performSentimentAnalysis = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/sentiment-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback_data: data })
            });
            const sentimentScores = await response.json();
            console.log('Sentiment Analysis Result:', sentimentScores);

            // Prepare ranks array
            let ranksArray = [];
            for (const clubName in sentimentScores) {
                if (sentimentScores.hasOwnProperty(clubName)) {
                    ranksArray.push({ club_name: clubName, sentiment_score: sentimentScores[clubName] });
                }
            }

            // Sort the ranks by sentiment score from largest to smallest
            ranksArray.sort((a, b) => b.sentiment_score - a.sentiment_score);

            // Filter out duplicates by club name and keep only the highest sentiment score
            const filteredRanks = ranksArray.filter((item, index, array) => {
                return index === array.findIndex(obj => obj.club_name === item.club_name);
            });

            setRanks(filteredRanks);
            console.log('Updated Ranks:', filteredRanks); // Log updated ranks
        } catch (error) {
            console.error('Error performing sentiment analysis:', error);
        }
    };

    return (
        <div>
            <NAVbar2 />
            <Ranks data={ranks} />
        </div>
    );
};

export default LeaderBoard;
