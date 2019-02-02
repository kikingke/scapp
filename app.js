var app = angular.module('myapp',['ngRoute']);

//firebase
 var config = {
        apiKey: "AIzaSyDn5788p1NCVjW_4nlyeMCt2P-XJDYIJUM",
        authDomain: "newone-714fb.firebaseapp.com",
        databaseURL: "https://newone-714fb.firebaseio.com",
        projectId: "newone-714fb",
        storageBucket: "newone-714fb.appspot.com",
        messagingSenderId: "1028309906302"
      };
     var ap = firebase.initializeApp(config);

      const auth = firebase.auth();
      const db = firebase.firestore();
      const storage = firebase.storage();

//firebase

	//var storageRef = storage.ref();
  


//routing

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/login.html',
		controller : "logincontroller"
	})
	.when('/register',{
		templateUrl:'views/register.html',
		controller : "registercontroller"
	})
	.when('/home',{
		templateUrl:'views/home.html',
		controller : "homecontroller"
	})
	.when('/add',{
		templateUrl:'views/add.html',
		controller : "addcontroller"
	})
	.when('/profile',{
		templateUrl:'views/profile.html',
		controller : "profilecontroller"
	})
	.when('/editprofile',{
		templateUrl:'views/editprofile.html',
		controller : "editprofilecontroller"
	})
	.otherwise({
		redirectTo:'/'
	});



});


//routing





//controllers
app.controller('homecontroller',  ['$scope','$location','$window', function($scope, $location, $window) {
			

                 auth.onAuthStateChanged(user => {
                 	if (user) {
					    $scope.usuarionav = user.displayName;
							var tangRef = storage.ref('avatars').child('512.png');
						    tangRef.getDownloadURL().then(function(url)  {
                            //  console.log(url);
                                $scope.imagenavatar = url;
                               $scope.$apply();
              //                  $scope.$apply(function () {
						        //        $scope.imagenavatar = url;
						        // });
							}).catch(function(error) {
								console.log(error.messsage);
							});
                         console.log("CHECKEANDO USUARIO "+user.email+" home");
                   //  $scope.$apply();
					  fetching();
					}else{
						 $window.location.href = '#!/';
					}

				  })

			
			  $scope.cerrarsesion = function() { 
			  		auth.signOut().then(() => {
							console.log("USUARIO TEFUE");
			  		})
			  		.catch((e)=>{
			  			console.log(e);
			  		})
			  }


				// db.collection('guides').get()
				//  .then(function(querySnapshot) {
				//     querySnapshot.forEach(function(doc) {
				//     	console.log(doc);
				//         var datos = doc.data();
				//      //   $scope.items.push(datos);
				//       //  console.log(doc.id, " => ", doc.data());
				//     });
				//     $scope.$apply(); //let angular know to trigger $digest loop to update the DOM.
				// });

				


					function fetching(){
						db.collection('guides').onSnapshot(snapshot => {
							$scope.items = [];
							 snapshot.docs.forEach(doc => {
									$scope.items.push(doc.data());
							//		console.log(doc.data());
						     })
							  $scope.$apply();
						})
					}

}]);


app.controller('addcontroller', ['$scope','$location','$window', function($scope,$location,$window) {


			  $scope.additem = function() { 
			    // var title =;
			     var titulo = $scope.title;
			     var contenido = $scope.content;
				  
			     //console.log(correo);
                db.collection('guides').add({
                	title: titulo ,
                	content: contenido
                }).then(() => {
                	$window.location.href = '#!/home';
                	console.log("Dato Agregado");
                }).catch(error =>{
                	console.log(error.message);
                })
			     	
			  }
                
}]);


app.controller('registercontroller', ['$scope','$location','$window','$http', 'mock',function($scope,$location,$window,$http, mock) {

			  $scope.register = function() { 
			     var correo = $scope.email;
			     var usuario = $scope.username;
			     var contras = $scope.password;
			     var depa = $scope.state;
			     var muni = $scope.city;
                 //  console.log(correo +" "+ usuario +" "+ contras +" "+ depa.name +" "+ muni);
			     	auth.createUserWithEmailAndPassword(correo, contras).then(cred => {
			     		db.collection('users').doc(cred.user.uid).set({
			     				state: depa.name,
			     				city: muni
			     		})
			     		var user = firebase.auth().currentUser;
                        var urldefault = "gs://newone-714fb.appspot.com/avatars/512.png";
                      //  var tel = '00000000';

						user.updateProfile({
						  displayName: usuario,
						  photoURL: urldefault,
						 // phoneNumber: tel
						}).then(function() {
						  console.log("usuario creado "+ user.displayName)
						}).catch(function(error) {
						  console.log(error.message);
						});

			     		 $window.location.href = '#!/home';
			     		 console.log(cred);
			     	}).catch(error =>{
                	   console.log(error.message);
                    })

			  }

    cargarDepartamentos();
     function cargarDepartamentos(){

				  $scope.states = mock.getStates;
				  $scope.cities = mock.getCities;
				  $scope.cityList = [];
				  
				  $scope.displayCity = function(city) {
				    console.log('Welcome to ' + city);
				  };

				  $scope.getCity = function(state) {
				    $scope.city = ""; //clear city view model
				    if (state) {
				      for (var i in $scope.cities) {

				        if (state.id === $scope.cities[i].id) {
				          $scope.cityList = $scope.cities[i].names;
				        }

				      }
				    } else {
				      $scope.cityList = []; //empty cityList array
				      
				    }
				    

				  };


     }


   
}]);


app.controller('logincontroller', ['$scope','$location','$window', function($scope,$location,$window) {


			  $scope.iniciarsesion = function() { 
			     var correo = $scope.email;
			     //var usuario = $scope.username;
			     var contras = $scope.password;

			     auth.signInWithEmailAndPassword(correo, contras).then(cred => {
			     	console.log("LOGUEO" + cred.user);
			     		 $window.location.href = '#!/home';
			     }).catch(error =>{
			     	$window.location.href = '#!/';
                	//console.log(error.message);
                 })
				  


			  }


				  auth.onAuthStateChanged(user => {
						//console.log(user);
						if (user){
					      console.log("USUARIO LOGUEADITO "+user.email+" login");
					     //    $scope.reset = function() {
						    //     $scope.email = '';
						    //     $scope.password = '';
						    //     // Todo: Reset field to pristine state, its initial state!
						    // };
					       $window.location.href = '#!/home';
					     // return true;
						}else{
					      console.log("USUARIO DESLOGUEADITO");
					      // return false;
					        
					       $window.location.href = '#!/';
						} 
				  })

}]);


app.controller('profilecontroller', ['$scope','$location','$window', function($scope,$location,$window) {


                     auth.onAuthStateChanged(user => {
						//console.log(user);
						
						if (user != null){
							 console.log("USUARIO LOGUEADITO "+user.email+" profile");
							$scope.usuarioactivo = user.email;
					        $scope.nombredeusuario = user.displayName;
					    //    $scope.telefon = user.phoneNumber;
					     	db.collection('users').doc(user.uid).onSnapshot(snapshot => {
								$scope.municipio = snapshot.data().city;
								$scope.departamento = snapshot.data().state;
							  $scope.$apply();
						    })


						   var tangRef = storage.ref('avatars').child('512.png');
						   tangRef.getDownloadURL().then(function(url)  {
						    $scope.imagenperfil = url;
						      // console.log(url);
						     //  return url;
						      $scope.$apply(function () {
						              $scope.imagenperfil = url;
						        });
						      
						    });

					    }else{
					         $window.location.href = '#!/';
						  } 
				  })







}]);

app.controller('editprofilecontroller', ['$scope','$location','$window','mock', function($scope,$location,$window,mock) {


                   auth.onAuthStateChanged(user => {
						//console.log(user);
						
						if (user != null){
						//	 console.log("USUARIO LOGUEADITO "+user.email+" profile");
							//$scope.usuarioactivo = user.email;
					        $scope.editusername = user.displayName;
					        $scope.correo = user.email;
					        $scope.usuario = user.displayName;
					       // $scope.telefono = user.phoneNumber;
					        db.collection('users').doc(user.uid).onSnapshot(snapshot => {
								$scope.municipio = snapshot.data().city;
								$scope.departamento = snapshot.data().state;
							  $scope.$apply();
						    })
					       // $scope.telusuario = user.phoneNumber;
						   var tangRef = storage.ref('avatars').child('512.png');
						   tangRef.getDownloadURL().then(function(url)  {
						    $scope.imagenperfil = url;
						      // console.log(url);
						     //  return url;
						      $scope.$apply(function () {
						              $scope.editimagenperfil = url;
						        });
						      
						    });
//$scope.$apply();
					    }else{
					        // $window.location.href = '#!/';
						  } 
				  })

  cargarDepartamentos();
     function cargarDepartamentos(){

				  $scope.states = mock.getStates;
				  $scope.cities = mock.getCities;
				  $scope.cityList = [];
				  
				  $scope.displayCity = function(city) {
				    console.log('Welcome to ' + city);
				  };

				  $scope.getCity = function(state) {
				    $scope.city = ""; //clear city view model
				    if (state) {
				      for (var i in $scope.cities) {

				        if (state.id === $scope.cities[i].id) {
				          $scope.cityList = $scope.cities[i].names;
				        }

				      }
				    } else {
				      $scope.cityList = []; //empty cityList array
				      
				    }
				    

				  };


     }
                   


                   $scope.actualizarDatos = function(){

                   }



}]);