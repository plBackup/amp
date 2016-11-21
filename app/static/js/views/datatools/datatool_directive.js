/**
 * Created by limeiting on 16/11/18.
 */
/**
 * Created by limeiting on 16/11/17.
 */
console.log("------d dr")
angular.module('dataTool').directive('simChart', ["chartOptService",
    function(chartOptService) {
        return {
            restrict: 'A',
            scope: {
                chartData: '=',
                chartLabels: '='
            },
            link: function($scope, $element) {
                console.log("-------ddd")
                console.log($element);
                //var lineChart;
                var dataSimChart = echarts.init($element[0]);

                var labels = $scope.chartData[0];
                var data=$scope.chartData.slice(1);
                var opt=chartOptService.setChartOption(data,labels);
                dataSimChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=chartOptService.setChartOption(data,labels);
                        dataSimChart.setOption(opt);
                    }
                });
            }
        };
    }]);