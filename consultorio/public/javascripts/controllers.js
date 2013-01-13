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
                if($scope.patients[i].balance<=0){
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

    $http.get('/api/appointments').
        success(function(data){
            $scope.appointments=data.appointments;

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
            $http.get('/api/appointments').
                success(function(data1){
                    $scope.appointmentstmp=data1.appointments;
                    for(var i=0;i<$scope.charges.length;i++){
                        for(var j=0;j<$scope.appointmentstmp.length;j++){
                            if($scope.charges[i].itemId.localeCompare($scope.appointmentstmp[j]._id)==0){
                                $scope.charges[i].itemService = $scope.appointmentstmp[j].service;
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

function IndexAppointmentCtrl($scope,$http,$filter){

    $scope.avanzada = "false";
    $scope.simple = "true";

    $scope.avanzadaFncn=function(){
        $scope.avanzada = "true";
        $scope.simple = "false";
        $scope.query.patient="";
        $scope.query.doctor="";
        $scope.query.service="";

    };

    $scope.simpleFncn=function(){
        $scope.avanzada = "false";
        $scope.simple = "true";
        $scope.query.patient="";
        $scope.query.doctor="";
        $scope.query.service="";
    };

    /*$scope.isDoctor="false"

     $http.get('/api/session').
     success(function(data,status,headers,config){
     $scope.type=data.role.toString();
     if($scope.type.localeCompare("doctor")==0){
     $scope.isDoctor="false" //por ahora no incluiremos tratamientos (isDoctor=false)
     }
     });*/

    //$scope.appointments="";
    $scope.doctors={};

    $http.get('/api/appointments').
        success(function(data){
            //var filtroFecha=$filter('filter');
            //var dateNow=new Date().toISOString();
            $scope.appointments = $.map(data.appointments , function (item){
            	item.date = new Date(item.date);
                item.date.setUTCDate(item.date.getUTCDate()+1);
            	return item;
            });
            //$scope.appointments=filtroFecha($scope.appointments,dateNow);
            $http.get('/api/users').
                success(function(data1){
                    $scope.users=data1.users;
                    $http.get('/api/patients').
                        success(function(data){
                            $scope.patients=data.patients;
                            for(var j=0;j<$scope.appointments.length;j++){
                                for(var i=0;i<$scope.users.length;i++){
                                    if($scope.appointments[j].DoctorId.localeCompare($scope.users[i]._id)==0){
                                        /*$scope.appointments[j].firstnameDoc=$scope.users[i].firstname;
                                         $scope.appointments[j].lastnameDoc=$scope.users[i].lastname;*/
                                        $scope.appointments[j].nameDoc=$scope.users[i].firstname+" "+$scope.users[i].lastname;
                                        break;
                                    }
                                }
                            }

                            for(var j=0;j<$scope.appointments.length;j++){
                                for(var i=0;i<$scope.patients.length;i++){
                                    if($scope.appointments[j].PatientId.localeCompare($scope.patients[i]._id)==0){
                                        /*$scope.appointments[j].firstnamePat=$scope.patients[i].firstname;
                                         $scope.appointments[j].lastnamePat=$scope.patients[i].lastname;*/
                                        $scope.appointments[j].namePat=$scope.patients[i].firstname+" "+$scope.patients[i].lastname;
                                        break;
                                    }
                                }

                            }

                        });

                });
        });

    $scope.deleteAppoint=function(id){
        $http.delete('/api/appointment/'+id).
            success(function(){
                $location.path('/indexAppointment');
            });
        $http.get('/api/appointments').
            success(function(data){
                //var filtroFecha=$filter('filter');
                //var dateNow=new Date().toISOString();
                $scope.appointments=data.appointments;
                //$scope.appointments=filtroFecha($scope.appointments,dateNow);
                $http.get('/api/users').
                    success(function(data1){
                        $scope.users=data1.users;
                        $http.get('/api/patients').
                            success(function(data){
                                $scope.patients=data.patients;
                                for(var j=0;j<$scope.appointments.length;j++){
                                    for(var i=0;i<$scope.users.length;i++){
                                        if($scope.appointments[j].DoctorId.localeCompare($scope.users[i]._id)==0){
                                            /*$scope.appointments[j].firstnameDoc=$scope.users[i].firstname;
                                             $scope.appointments[j].lastnameDoc=$scope.users[i].lastname;*/
                                            $scope.appointments[j].nameDoc=$scope.users[i].firstname+" "+$scope.users[i].lastname;
                                            break;
                                        }
                                    }
                                }

                                for(var j=0;j<$scope.appointments.length;j++){
                                    for(var i=0;i<$scope.patients.length;i++){
                                        if($scope.appointments[j].PatientId.localeCompare($scope.patients[i]._id)==0){
                                            /*$scope.appointments[j].firstnamePat=$scope.patients[i].firstname;
                                             $scope.appointments[j].lastnamePat=$scope.patients[i].lastname;*/
                                            $scope.appointments[j].namePat=$scope.patients[i].firstname+" "+$scope.patients[i].lastname;
                                            break;
                                        }
                                    }

                                }

                            });

                    });
            });
        if(!$scope.$$phase) { //this is used to prevent an overlap of scope digestion
            $scope.$apply(); //this will kickstart angular to recognize the change
        }

    };
}

function AddAppointmentCtrl($scope,$http,$location,$filter){
    var filtroDoctor = $filter('filter');
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
            /*for(var i=0;i<$scope.users.length;i++){
             if($scope.users[i].roles)
             }*/
            $scope.doctors=filtroDoctor($scope.users,'Doctor');
        });

    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

    $scope.form={};
    //$scope.horaM="";

    /*    var id=$scope.form.DoctorId || 0;
     var dateUsed=new Date($scope.form.date).toISOString() || "";*/


    $scope.obtainFree=function(id,date){
        var dateUsed=new Date(date).toISOString();
        $http.get('/api/appointment/searchFree/'+id+'/'+escape(dateUsed)).
            success(function(data,status,headers,config){
                $scope.horas =  _.map(data , function(item){
                    return new Date(item);
                });
            })
    }

    ///api/appointment/searchFree/508de731934421e819000001/2013-01-06T06%3A00%3A00.000Z

    $scope.submitAppoint=function(){
    	console.log($scope.form);
        $scope.form.date=new Date($scope.form.horaM);//"2013-01-09 15:30:00")
        //$scope.form.date.setUTCDate($scope.form.date.getUTCDate()+1);
        //$scope.form.service=$scope.hora+$scope.minute;
        $http.post('/api/appointment',$scope.form).
            success(function(){
                $location.path('/indexAppointment');
            });
    };

}

function ModifyAppointmentCtrl($scope,$http,$location,$routeParams,$filter){

    var filtroDoctor = $filter('filter');
    $http.get('/api/users').
        success(function(data,status,headers,config){
            $scope.users=data.users;
            /*for(var i=0;i<$scope.users.length;i++){
             if($scope.users[i].roles)
             }*/
            $scope.doctors=filtroDoctor($scope.users,'Doctor');
        });

    $http.get('/api/patients').
        success(function(data){
            $scope.patients=data.patients;
        });

    $scope.form={};
    $scope.form2={};

    $http.get('/api/appointment/'+$routeParams._id).
        success(function(data){
            $scope.form=data.appointment;
            $scope.form.date=new Date($scope.form.date);
            $scope.form.date.setUTCDate($scope.form.date.getUTCDate()+1);
            /*$scope.form = $.map(data.appointment , function (item){
                item.date = new Date(item.date);
                item.date.setUTCDate(item.date.getUTCDate()+1);
                return item;
            });*/
            $http.get('/api/user/'+$scope.form.DoctorId).
                success(function(data){
                    $scope.user=data.user;
                    $http.get('/api/patient/'+$scope.form.PatientId).
                        success(function(data){
                            $scope.patient=data.patient;
                            $scope.form.nameDoc=$scope.user.firstname+" "+$scope.user.lastname;
                            $scope.form.namePat=$scope.patient.firstname+" "+$scope.patient.lastname;
                            //$scope.form.date.setUTCDate($scope.form.date.getUTCDate()+1);

                        })
                })
        });

    $scope.modifyAppoint=function(data){
        //$scope.form2.date=$scope.form2.date.toISOString();
        $http.put('/api/appointment/'+$routeParams._id,$scope.form2).
            success(function(){
                $location.path('/indexAppointment');
            });
    };
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

