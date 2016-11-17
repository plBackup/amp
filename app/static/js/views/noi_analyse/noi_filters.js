/**
 * Created by limeiting on 16/11/17.
 */
/* Filters */

angular.module('noi', []).filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});
