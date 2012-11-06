function IndexCtrl($scope,$http){
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
        });
}

function AddUserCtrl($scope,$http,$location){
    $scope.form={};
    $scope._submitUser=function(){
        $http.post('/api/user',$scope.form).
            success(function(data){
                $location.path('/');
            });
    };
}