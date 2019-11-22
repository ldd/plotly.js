'use strict';

var epsilon = 0.01;
function perpendicularDistance(point, startingPoint, endPoint) {
    if(!point || !startingPoint || !endPoint) return -1;
    var x0 = point[0];
    var y0 = point[1];
    var x1 = startingPoint[0];
    var y1 = startingPoint[1];
    var x2 = endPoint[0];
    var y2 = endPoint[1];

    return (
    Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) /
    Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
    );
}

module.exports = function douglasPeucker(points) {
    // Find the point with the maximum distance
    var dmax = 0;
    var index = 0;
    var end = points.length - 1;
    for(var i = 0; i < end; i++) {
        var d = perpendicularDistance(points[i], points[0], points[end]);
        if(d > dmax) {
            index = i;
            dmax = d;
        }
    }

    var simplifiedPoints = [];

    // If max distance is greater than epsilon, recursively simplify
    if(dmax > epsilon) {
        // Recursive call
        var partial1 = douglasPeucker(points.slice(0, index), epsilon);
        var partial2 = douglasPeucker(points.slice(index, end + 1), epsilon);

        // Build the result list
        simplifiedPoints = partial1.slice(0, -1).concat(partial2);
    } else {
        simplifiedPoints = [points[0], points[end]];
    }
    // Return the result
    return simplifiedPoints;
};
