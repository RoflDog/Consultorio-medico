function IndexCtrl($scope,$http){
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
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
    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        })
}

function AddPatientCtrl($scope,$http,$location){
    $scope.form={};
    $scope.submitPatient=function(){
        $http.post('/api/patient',$scope.form).
            success(function(data){
                $location.path('/');
            });
    };
}