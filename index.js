const express = require('express');
const app = express();
app.use(express.json());

/**
 * Function to calculate the flight path from a list of flights.
 * @param {Array} flightList - An array of flight pairs where each pair is an array of [start, end] airport codes.
 * @returns {Array} - The sorted flight path from start to end.
 */
const getFlightPath = (flightList) => {
    if (flightList.length === 1) {
        return flightList[0];
    }

    const startToEndMap = new Map();
    const endToStartMap = new Map();
    let origin = null;

    flightList.forEach(([start, end]) => {
        startToEndMap.set(start, end);
        endToStartMap.set(end, start);
    });

    // Identify the origin point (start of the path)
    for (let [start] of startToEndMap) {
        if (!endToStartMap.has(start)) {
            origin = start;
            break;
        }
    }

    const flightPath = [];

    while (origin && startToEndMap.has(origin)) {
        flightPath.push(origin);
        origin = startToEndMap.get(origin);
    }

    flightPath.push(origin);

    return flightPath;
};

/**
 * POST /calculate
 * Endpoint to calculate the flight path from a list of flights.
 * Expects a JSON body with a 'flights' key containing an array of flight pairs.
 * Example request body: { "flights": [["IND", "EWR"], ["SFO", "ATL"], ["GSO", "IND"], ["ATL", "GSO"]] }
 * Responds with a JSON object containing the sorted flight path.
 */
app.post('/calculate', (req, res) => {
    const flights = req.body.flights;
    if (!flights || !Array.isArray(flights)) {
        return res.status(400).send('Invalid input.');
    }

    const flightPath = getFlightPath(flights);
    res.json({ flightPath });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
