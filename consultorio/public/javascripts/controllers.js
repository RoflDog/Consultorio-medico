function IndexCtrl($scope,$http){
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
        });

    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

}

function LoginCtrl($scope,$http){

    $scope.user={};
    $scope.submitLogin=function(){
        http.post('/login',$scope.user);
    };
}

function IndexUserCtrl($scope,$http,$location){
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
        });
    $scope.deleteUser=function(id){
        $http.delete('/api/user/'+id).
            success(function(){
                $location.path('/indexUser');
                $http.get('/api/users').
                    success(function(data){
                        $scope.users=data.users;
                    });
                if(!$scope.$$phase) { //this is used to prevent an overlap of scope digestion
                    $scope.$apply(); //this will kickstart angular to recognize the change
                }
            });

    };
}

function AddUserCtrl($scope,$http,$location){
    $scope.form={};
    $scope.submitUser=function(){
        $scope.form.active=true;
        $http.post('/api/user',$scope.form).
            success(function(data){
                $location.path('/indexUser');
            });
    };
}

function IndexPatient($scope,$http,$location){
    $scope.patients={};
    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

    $scope.deletePatient=function(id){
        $http.delete('/api/patient/'+id).
            success(function(){
                $location.path('/indexPatient');
                $http.get('/api/patients').
                    success(function(data){
                        $scope.patients=data.patients;
                    });
                if(!$scope.$$phase) { //this is used to prevent an overlap of scope digestion
                    $scope.$apply(); //this will kickstart angular to recognize the change
                }
            });

    };
}

function AddPatientCtrl($scope,$http,$location){
    $scope.form={};

    $scope.submitPatient=function(){
        $http.post('/api/patient',$scope.form).
            success(function(data){
                $location.path('/indexPatient');
            });
    };
}

function ModifyPatientCtrl($scope,$http,$location,$routeParams){
    $scope.form={};

    $http.get('/api/patient/'+$routeParams._id).
        success(function(data){
            $scope.form=data.patient;
        });

    $scope.modifyPatient=function(data){
        $http.put('/api/patient/'+$routeParams._id,$scope.form).
            success(function(){
                $location.path('/indexPatient');
            });
    };
}

function ModifyUserCtrl($scope,$http,$location,$routeParams){
    $scope.form={};

    $http.get('/api/user/'+$routeParams._id).
        success(function(data){
            $scope.form=data.user;
        });

    $scope.modifyUser=function(data){
        $http.put('/api/user/'+$routeParams._id,$scope.form).
            success(function(){
                $location.path('/indexUser');
            });
    };
}

/*function IndexAppointment($scope,$http){
    $http.get('cita.json').success(function(data){
        $scope.appointment=data;
    });
}*/