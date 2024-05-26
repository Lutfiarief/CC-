// controllers/predict.js
const getPrediction = async (request, h) => {
    try {
        const { id } = request.params;
        const { image } = request.payload;

        // Mock prediction logic
        const predictionResult = `Prediction result for image associated with user ID ${id}`;

        return h.response({
            message: `Prediction for user ID ${id}`,
            prediction: predictionResult,
            image: image
        }).code(200);
    } catch (error) {
        console.error('Error processing prediction:', error);
        return h.response({ error: 'Failed to process prediction' }).code(500);
    }
};

module.exports = { getPrediction };
