var myApp = angular.module('hello', ['ui.router']);

myApp.config(function($stateProvider) {
  // An array of state definitions
  var states = [
    { name: 'hello', url: '/hello', component: 'hello' },
    { name: 'about', url: '/about', component: 'about' },
    
    { 
      name: 'people', 
      url: '/people', 
      component: 'people',
      resolve: {
        people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },
    
    { 
      name: 'people.person', 
      url: '/{personId}', 
      component: 'person',
      resolve: {
        /* person: function(people, $stateParams) {
          return people.find(function(person) { 
            return person.id === $stateParams.personId;
          });*/ //这里为从数据里去数据逻辑，现在因为数据保存至$rootScope,所以现在传pId

        pId: function(people, $stateParams) {
          return $stateParams.projectId;
        }
      }
    }
  ];
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});


myApp.run(function($http, $uiRouter) {
  window['ui-router-visualizer'].visualizer($uiRouter);
  $http.get('data/people.json', { cache: true });
});