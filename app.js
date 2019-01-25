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
      const db = firebase.firestore(ap);
//firebase

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
	.when('/profile',{
		templateUrl:'views/profile.html',
		controller : "profilecontroller"
	})
	.otherwise({
		redirectTo:'/'
	});



});


//routing





//controllers
app.controller('homecontroller',  ['$scope','$location','$window', function($scope,$location,$window) {
			
				db.collection('guides').get()
				.then(function(querySnapshot) {
					//console.log(querySnapshot.docs);
				    querySnapshot.forEach(function(doc) {
				        // doc.data() is never undefined for query doc snapshots
				        console.log(doc.id, " => ", doc.data());
				    });
				})

				.catch(function(error){
					 console.log("Error getting documents ",error);
				});


			// db.collection('guides').get().then(snapshot => {
			// 	console.log(snapshot.docs);
			// });


			// var docRef = db.collection("guides").doc();

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


			  $scope.cerrarsesion = function() { 
			  		auth.signOut().then(() => {
							console.log("USUARIO TEFUE");
			  		})
			  		.catch((e)=>{
			  			console.log(e);
			  		})
			  }



			    auth.onAuthStateChanged(user => {
						//console.log(user);
						if (user){
					     //  console.log("USUARIO LOGUEADITO");
					     //    $scope.reset = function() {
						    //     $scope.email = '';
						    //     $scope.password = '';
						    //     // Todo: Reset field to pristine state, its initial state!
						    // };
					     //   $window.location.href = '#!/home';
					     // return true;
						}else{
					      console.log("USUARIO no LOGUEADITO");
					      // return false;
					        
					       $window.location.href = '#!/';
						} 
				  })



}]);


app.controller('registercontroller', ['$scope','$location','$window', function($scope,$location,$window) {


			  $scope.register = function() { 
			     var correo = $scope.email;
			     var usuario = $scope.username;
			     var contras = $scope.password;
				  
			     //console.log(correo);

			     	auth.createUserWithEmailAndPassword(correo, contras).then(cred => {
			     			console.log(cred);
			     	})

			  }



}]);


app.controller('logincontroller', ['$scope','$location','$window', function($scope,$location,$window) {


			  $scope.iniciarsesion = function() { 
			     var correo = $scope.email;
			     //var usuario = $scope.username;
			     var contras = $scope.password;

			     auth.signInWithEmailAndPassword(correo, contras).then(cred => {
			     	console.log("LOGUEO" + cred.user);
			     	// if (estadodeusuario()){
         //                  $location.path('/home');
         //                  console.log("pase por location");
			     	// }else{
         //                  $location.path('/');
			     	// }
			     	 
			     	 
			     })
				  


			  }


			  


				  auth.onAuthStateChanged(user => {
						//console.log(user);
						if (user){
					      console.log("USUARIO LOGUEADITO");
					        $scope.reset = function() {
						        $scope.email = '';
						        $scope.password = '';
						        // Todo: Reset field to pristine state, its initial state!
						    };
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


			  // $scope.register = function() { 
			  //    var correo = $scope.email;
			  //    var usuario = $scope.username;
			  //    var contras = $scope.password;
				  
			  //    //console.log(correo);

			  //    	auth.createUserWithEmailAndPassword(correo, contras).then(cred => {
			  //    			console.log(cred);
			  //    	})

			  // }

			   auth.onAuthStateChanged(user => {
						//console.log(user);
						if (user){
					      console.log("USUARIO LOGUEADITO");
					     //    $scope.reset = function() {
						    //     $scope.email = '';
						    //     $scope.password = '';
						    //     // Todo: Reset field to pristine state, its initial state!
						    // };
					     //   $window.location.href = '#!/home';
					     // return true;
						}else{
					      console.log("USUARIO DESLOGUEADITO");
					      // return false;
					        
					       $window.location.href = '#!/';
						} 
				  })



}]);

//controllers
// function estadodeusuario(){
// 	auth.onAuthStateChanged(user => {
// 	console.log(user);
// 	if (user){
//       console.log("Usuario logueado");
//       return true;
// 	}else{
//       console.log("Usuario no logueado");
//       return false;
// 	} 
//   })
// }
