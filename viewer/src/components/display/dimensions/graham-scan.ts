//@ts-nocheck
const X = 0;
const Y = 1;
const REMOVED = -1;

export default class GrahamScan {

    constructor() {
        /** @type {[Number, Number][]} */
        this.points = [];
    }

    clear() {
        this.points = [];
    }

    getPoints() {
        return this.points;
    }

    setPoints(points) {
        this.points = points.slice();  // copy
    }

    addPoint(point) {
        this.points.push(point);
    }

    /**
     * Returns the smallest convex hull of a given set of points. Runs in O(n log n).
     *
     * @return {[Number, Number][]}
     */
    getHull() {
        const pivot = this.preparePivotPoint();

        let indexes = Array.from(this.points, (point, i) => i);
        const angles = Array.from(this.points, (point) => this.getAngle(pivot, point));
        const distances = Array.from(this.points, (point) => this.euclideanDistanceSquared(pivot, point));

        // sort by angle and distance
        indexes.sort((i, j) => {
            const angleA = angles[i];
            const angleB = angles[j];
            if (angleA === angleB) {
                const distanceA = distances[i];
                const distanceB = distances[j];
                return distanceA - distanceB;
            }
            return angleA - angleB;
        });

        // remove points with repeated angle (but never the pivot, so start from i=1)
        for (let i = 1; i < indexes.length - 1; i++) {
            if (angles[indexes[i]] === angles[indexes[i + 1]]) {  // next one has same angle and is farther
                indexes[i] = REMOVED;  // remove it logically to avoid O(n) operation to physically remove it
            }
        }

        const hull = [];
        for (let i = 0; i < indexes.length; i++) {
            const index = indexes[i];
            const point = this.points[index];

            if (index !== REMOVED) {
                if (hull.length < 3) {
                    hull.push(point);
                } else {
                    while (this.checkOrientation(hull[hull.length - 2], hull[hull.length - 1], point) > 0) {
                        hull.pop();
                    }
                    hull.push(point);
                }
            }
        }

        return hull.length < 3 ? [] : hull;
    }

    /**
     * Check the orientation of 3 points in the order given.
     *
     * It works by comparing the slope of P1->P2 vs P2->P3. If P1->P2 > P2->P3, orientation is clockwise; if
     * P1->P2 < P2->P3, counter-clockwise. If P1->P2 == P2->P3, points are co-linear.
     *
     * @param {[Number, Number]} p1
     * @param {[Number, Number]} p2
     * @param {[Number, Number]} p3
     * @return {Number} positive if orientation is clockwise, negative if counter-clockwise, 0 if co-linear
     */
    checkOrientation(p1, p2, p3) {
        return (p2[Y] - p1[Y]) * (p3[X] - p2[X]) - (p3[Y] - p2[Y]) * (p2[X] - p1[X]);
    }

    /**
     * @private
     * @param {[Number, Number]} a
     * @param {[Number, Number]} b
     * @return Number
     */
    getAngle(a, b) {
        return Math.atan2(b[Y] - a[Y], b[X] - a[X]);
    }

    /**
     * @private
     * @param {[Number, Number]} p1
     * @param {[Number, Number]} p2
     * @return {Number}
     */
    euclideanDistanceSquared(p1, p2) {
        const a = p2[X] - p1[X];
        const b = p2[Y] - p1[Y];
        return a * a + b * b;
    }

    /**
     * @private
     * @return {[Number, Number]}
     */
    preparePivotPoint() {
        let pivot = this.points[0];
        let pivotIndex = 0;
        for (let i = 1; i < this.points.length; i++) {
            const point = this.points[i];
            if (point[Y] < pivot[Y] || point[Y] === pivot[Y] && point[X] < pivot[X]) {
                pivot = point;
                pivotIndex = i;
            }
        }
        return pivot;
    }
}