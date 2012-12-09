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

function IndexUserCtrl($scope,$http){
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
        });
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