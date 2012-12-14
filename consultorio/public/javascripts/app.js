var app=angular.module('Consultorio',['Consultorio.directives']).
    config(['$routeProvider','$locationProvider',function($routes,$location){
    //$location.hashPrefix('#');
    $routes.
        /*when('/',{
            templateUrl:'/login'
        }).*/
        when('/',{
            templateUrl:'/partials/index',
            controller: IndexCtrl
        }).
        when('/indexUser',{
            templateUrl:'/partials/indexUser',
            controller: IndexUserCtrl
        }).
        when('/addUser',{
            templateUrl:'/partials/addUser',
            controller: AddUserCtrl
        }).
        when('/indexPatient',{
            templateUrl:'/partials/indexPatient',
            controller: IndexPatient
        }).
        when('/addPatient',{
            templateUrl:'/partials/addPatient',
            controller:AddPatientCtrl
        }).
        when('/modifyPatient/:_id',{
            templateUrl:'/partials/modifyPatient',
            controller:ModifyPatientCtrl
        }).
        when('/modifyUser/:_id',{
            templateUrl:'/partials/modifyUser',
            controller:ModifyUserCtrl
        }).
        /*when('/pruebaCalendario',{
            templateUrl:'/partials/indexAppoint',
            controller:IndexAppointment
        }).*/
        otherwise({
            redirectTo:'/'
        });

    //$locationProvider.html5Mode(false).hashPrefix('#');
}])
.run(['$route',function($route){
    $route.reload();
}]);