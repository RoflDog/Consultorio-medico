function IndexCtrl($scope,$http){
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
        });

    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

    $http.get('/api/session').
        success(function(data,status,headers,config){
            $scope.login=data.username;
        });
}

function IndexPaymentCrtl($scope,$http){

    $scope.avanzada = "false";
    $scope.simple = "true";

    $scope.avanzadaFncn=function(){
        $scope.avanzada = "true";
        $scope.simple = "false";
        $scope.query = "";

    };
    $scope.simpleFncn=function(){
        $scope.avanzada = "false";
        $scope.simple = "true";
        $scope.query = "";
    };


    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
            $scope.showFlag=false;
            for(var i=0;i<$scope.patients.length;i++){
                $scope.patients[i].show=true;
                if($scope.patients[i].balance<0){
                    $scope.patients[i].style ="success";
                    $scope.patients[i].balance *= -1;
                }else{
                    $scope.patients[i].style ="error";
                }
            }
        });

    $scope.show=function(){
        for(var i=0;i<$scope.patients.length;i++){
            if($scope.patients[i].style=="success"){
                $scope.patients[i].show=!$scope.showFlag;
            }

        }
    }
}

function AddDebtCrtl($scope,$http,$location){
    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

    $http.get('/api/session').
        success(function(data,status,headers,config){
            //$scope.userId=data._id;
            $scope.formDebt = {};
            $scope.formDebt.userId=data._id;
        });

    //$scope.dateNow = new Date();

    $scope.submitDebt=function(){
        if($scope.form.$valid){
            $scope.formDebt.itemId=$scope.formDebt.userId;
            if($scope.formDebt.total>0){
                $http.post('/api/charges',$scope.formDebt).
                    success(function(data){
                        $location.path('/indexPayment');
                    });
            }else{
                $scope.upZero = 'true';
            }
        }
    };
}

function AddPaymentCrtl($scope,$http,$location){
    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

    $scope.submitPayment=function(){
        if($scope.form.$valid){
            $scope.formPayment.userId=$scope.userId;
            if($scope.formPayment.amount>0){
                $http.post('/api/payments',$scope.formPayment).
                success(function(data){
                    $location.path('/indexPayment');
                });
            }else{
                $scope.upZero = 'true';
            }
        }
    };

    $http.get('/api/session').
        success(function(data,status,headers,config){
            $scope.userId=data._id;
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


    $scope.avanzada = "false";
    $scope.simple = "true";

    $scope.avanzadaFncn=function(){
        $scope.avanzada = "true";
        $scope.simple = "false";
        $scope.query = "";

    };

    $scope.simpleFncn=function(){
        $scope.avanzada = "false";
        $scope.simple = "true";
        $scope.query = "";
    };
}

function AddUserCtrl($scope,$http,$location){
    $scope.submitUser=function(){
        if($scope.form.$valid){
            if($scope.formUser.schedule.start<24 & $scope.formUser.schedule.start>=0){
                if($scope.formUser.schedule.end<24 & $scope.formUser.schedule.end>=0){
                    if($scope.formUser.schedule.end>$scope.formUser.schedule.start){
                        $http.post('/api/user',$scope.formUser).
                            success(function(data){
                                $location.path('/indexUser');
                            });
                    }else{
                        $scope.relStartEnd = 'true';
                    }
                }else{
                    $scope.end = 'true';
                }
            }else{
                    $scope.start = 'true';
                }
            }

        }

    $scope.tels = [];

    $scope.add=function(){
//        $scope.formUser.phone=$scope.tels;
        $scope.tels.push({format:""});
    };

    $scope.remove=function(tel){
        $scope.tels.pop(tel);
//        if(!$scope.$$phase) { //this is used to prevent an overlap of scope digestion
//            $scope.$apply(); //this will kickstart angular to recognize the change
//        }
    };
//    $scope.addContact = function() {
//        $scope.form.phone.push({num:''});
//    };

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

    $scope.avanzada = "false";
    $scope.simple = "true";

    $scope.avanzadaFncn=function(){
        $scope.avanzada = "true";
        $scope.simple = "false";
        $scope.query = "";

    };

    $scope.simpleFncn=function(){
        $scope.avanzada = "false";
        $scope.simple = "true";
        $scope.query = "";
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

    $http.get('/api/user/'+$routeParams._id).
        success(function(data){
            $scope.formUser=data.user;
        });

    $scope.modifyUser=function(data){
        if($scope.form.$valid){
            if($scope.formUser.schedule.start<24 & $scope.formUser.schedule.start>=0){
                if($scope.formUser.schedule.end<24 & $scope.formUser.schedule.end>=0){
                    if($scope.formUser.schedule.end>$scope.formUser.schedule.start){
                        $http.put('/api/user/'+$routeParams._id,$scope.formUser).
                            success(function(){
                                $location.path('/indexUser');
                            });
                    }else{
                        $scope.relStartEnd = 'true';
                    }
                }else{
                    $scope.end = 'true';
                }
            }else{
                $scope.start = 'true';
            }
        }
    };

    $scope.checkPass=function(){
        if($scope.formUser.password==$scope.confirmPassword)
            $scope.confirmPassword.addClass('form-horizontal','input.ng-valid.ng-dirty');
        else
            $scope.confirmPassword.addClass('form-horizontal','input.ng-invalid.ng-dirty');
    };
}

function DetailAccountCrtl($scope,$http,$location,$routeParams){

    $http.get('/api/payments/byUser/'+$routeParams._id).
        success(function(data){
            $scope.payments=data.payments;
            $http.get('/api/users/').
                success(function(data1){
                    $scope.userstmp=data1.users;
                    for(var i=0;i<$scope.payments.length;i++){
                        for(var j=0;j<$scope.userstmp.length;j++){
                            if($scope.payments[i].userId.localeCompare($scope.userstmp[j]._id)==0){
                                $scope.payments[i].username = $scope.userstmp[j].username;
                                break;
                            }
                        }
                    }
                });
        });


    $http.get('/api/charges/byUser/'+$routeParams._id).
        success(function(data){
            $scope.charges=data.charges;
            $http.get('/api/users/').
                success(function(data1){
                    $scope.userstmp=data1.users;
                    for(var i=0;i<$scope.charges.length;i++){
                        for(var j=0;j<$scope.userstmp.length;j++){
                            if($scope.charges[i].userId.localeCompare($scope.userstmp[j]._id)==0){
                                $scope.charges[i].username = $scope.userstmp[j].username;
                                break;
                            }
                        }
                    }
                });
        });

    $http.get('/api/patient/'+$routeParams._id).
        success(function(data){
            $scope.patient=data.patient;
        });

    $scope.date = new Date();

    $scope.getPayment = function(id){
//        $http.get('/api/payments/byUser/'+$routeParams._id).
//            success(function(data){
//                $scope.payments=data.payments;
//            });
        console.log("ID: "+id);
    }
}

//function DetailPaymentCrtl($scope,$http,$location,$routeParams){
//
//    $http.get('/api/payments/'+$routeParams._id).
//        success(function(data){
//            $scope.payments=data.payments;
//        });
//
//
//    $scope.date = new Date();
//}
/*function IndexAppointment($scope,$http){
    $http.get('cita.json').success(function(data){
        $scope.appointment=data;
    });
}*/

