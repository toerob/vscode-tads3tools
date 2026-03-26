/* smallgame.t — minimal TADS3 game used as a test fixture */

startRoom: Room
    name = 'The Entrance Hall'
    north = library

    doSomething() {
        local count = 0;
        local msg = 'hello';
        count++;
        self.helper();
        computeValue(3);
    }

    helper() {
        return name;
    }

    /* withShadow: calls helper() directly, but delegates computeValue() to an
       inner lambda.  The lambda body is a scope boundary — computeValue should
       NOT appear in withShadow's own calls list. */
    withShadow() {
        self.helper();
        local fn = function() { computeValue(1); };
    }
;

library: Room
    name = 'The Library'
    south = startRoom
;

function computeValue(n) {
    local temp = n * 2;
    return temp;
}
