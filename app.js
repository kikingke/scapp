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
  
app.directive('mainMenu', function() {
  return {
    templateUrl: 'views/mainav.html'
  };
});

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
	.when('/myoff',{
		templateUrl:'views/myofferts.html',
		controller : "myoffertscontroller"
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

// app.factory('MService', function() {
//             var factory = {};
            
//             factory.multiply = function(a, b) {
//                return a * b
//             }
//             return factory;
//  });



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
					  fetching(user);
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

				


					function fetching(dato){
						db.collection('articles').onSnapshot(snapshot => {
							$scope.items = [];
							 snapshot.docs.forEach(doc => {
									$scope.items.push(doc.data());
								    console.log(doc.data());
						     })
							  $scope.$apply();
						})

							// db.collection('users').onSnapshot(function(doc1) {
							// $scope.items1 = [];
							//  snapshot.docs.forEach(doc1 => {
							// 		$scope.items1 = doc1;
							// 	//	console.log(doc);
						 //     })
//							  $scope.$apply();
					//	})


					//var ar = collection('articles').doc() === usuarioid
			//		var usersRef = db.collection('users').doc().userId;
					//var query =  usersRef.where(usersRef.doc().userId, "==", doc.data().usuarioid);
				//	console.log(dato.uid);

					}

}]);


app.controller('addcontroller', ['$scope','$location','$window', function($scope,$location,$window) {


			  $scope.additem = function() { 
			    // var title =;
			     var usernow = auth.currentUser.uid;
			     var titulo = $scope.title;
			     var contenido = $scope.content;
			     var estado = "en venta";
				  
			     //console.log(correo);
                db.collection('articles').add({
                	title: titulo ,
                	content: contenido,
                	status: estado
                }).then(() => {
                	$window.location.href = '#!/home';
                	console.log("Dato Agregado");
                }).catch(error =>{
                	console.log(error.message);
                })
			     	
			  }

			  $scope.test = function(){
			  	//Get the current userID
					 var usernow = auth.currentUser.uid;
				     var titulo = $scope.title;
				     var contenido = $scope.content;
				     var precio = $scope.price;
				     var estado = true;
				     var categoria = $scope.category.Name;
				     var tucasa = '';
				     tucasa = $scope.doorstep;
				     if (tucasa == null || tucasa == undefined) {
				     	 tucasa = 0
				     }else{
				     	 tucasa = $scope.doorstep;
				     }
				 //    console.log('Doorstep: '+tucasa);
					// //Get the user data
					// console.log('Usuario: '+usernow);
					// console.log('Categoria: '+categoria);

					
					 db.collection('articles').doc('data'+usernow).set({
						    title: titulo,
		                	content: contenido,
		                	status: estado,
		                	price: precio,
		                	doorstep: tucasa,
		                	category: categoria,
		                	usuarioid:usernow
					    //some more user data
					 }).then(() => {
                		$window.location.href = '#!/home';
                		console.log("Dato Agregado");
		                }).catch(error =>{
		                	console.log(error.message);
		                })
                     




					// return db.ref('/users/' + userId).once('value').then(function(snapshot) {
					//     //Do something with your user data located in snapshot
					// });
			  }


            $scope.Cat = [{
                Id: 1,
                Name: 'Alimentos'
            }, {
                Id: 2,
                Name: 'Auto Partes'
            }, {
                Id: 3,
                Name: 'Bebes'
            },{
                Id: 4,
                Name: 'Belleza'
            },{
                Id: 5,
                Name: 'Computadoras'
            },{
                Id: 6,
                Name: 'Coleccionables'
            },{
                Id: 7,
                Name: 'Electrodomesticos'
            },{
                Id: 8,
                Name: 'Herramientas'
            },{
                Id: 9,
                Name: 'Juegos'
            },{
                Id: 10,
                Name: 'Mascotas'
            },
            ];


                
}]);


app.controller('registercontroller', ['$scope','$location','$window','$http', 'mock',function($scope,$location,$window,$http, mock) {

			  $scope.register = function() { 
			     var correo = $scope.email;
			     var usuario = $scope.username;
			     var contras = $scope.password;
			     var depa = $scope.state;
			     var muni = $scope.city;
			          var urldefault = "gs://newone-714fb.appspot.com/avatars/512.png";
			     var img = urldefault;
                 //  console.log(correo +" "+ usuario +" "+ contras +" "+ depa.name +" "+ muni);
			     	auth.createUserWithEmailAndPassword(correo, contras).then(cred => {
			     		db.collection('users').doc(cred.user.uid).set({
			     				state: depa.name,
			     				city: muni,
			     				imageUrl: img
			     		})
			     		var user = firebase.auth().currentUser;
                   
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


app.controller('myoffertscontroller', ['$scope','$location','$window', function($scope,$location,$window) {


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
					  fetchingmyofferts(user);
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

				


					// function fetching(data){
					// 	var usuarioactivoid = data.uid;
					// 	console.log(usuarioactivoid);
					// 	db.collection('guides').onSnapshot(snapshot => {
					// 		$scope.items = [];
					// 		 snapshot.docs.forEach(doc => {
					// 				$scope.items.push(doc.data());
					// 				console.log(doc.data());
					// 	     })
					// 		  $scope.$apply();
					// 	})
					// }

					function fetchingmyofferts(data){
						var usuarioactivoid = data.uid;
					//	console.log(usuarioactivoid);
						
                         var docRef = db.collection('articles').doc('data'+usuarioactivoid);
						   docRef.onSnapshot(snapshot => {
							$scope.items = [];
							// snapshot.forEach(doc => {
									$scope.items.push(snapshot.data());
								//	console.log(snapshot.data());
						   //  })
							  $scope.$apply();
						})



							// docRef.get().then(function(doc) {
							//     if (doc.exists) {
							//         console.log("Document data:", doc.data());
							//     } else {
							//         // doc.data() will be undefined in this case
							//         console.log("No such document!");
							//     }
							// }).catch(function(error) {
							//     console.log("Error getting document:", error);
							// });

					}


}]);
