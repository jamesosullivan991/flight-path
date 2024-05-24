# Flight Path Calculator
The endpoint /calculate returns the path from source to destination in the correct order.  
Expects a JSON body with a 'flights' key containing an array of flight pairs.  
Example request body: { "flights": [["IND", "EWR"], ["SFO", "ATL"], ["GSO", "IND"], ["ATL", "GSO"]] }  
Responds with a JSON object containing the sorted flight path.

To run:

`npm run dev`

To run tests:

`npm run test`

Any questions, contact:

james.osullivan991@gmail.com

Thank you!


