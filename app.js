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
	.when('/add',{
		templateUrl:'views/add.html',
		controller : "addcontroller"
	})
	.when('/profile',{
		templateUrl:'views/profile.html',
		controller : "homecontroller"
	})
	.otherwise({
		redirectTo:'/'
	});



});


//routing





//controllers
app.controller('homecontroller',  ['$scope','$location','$window', function($scope, $location, $window) {
			
			// function escucha(){
			// 	db.collection('guides').onSnapshot(snapshot => {
			// 	 var datosfrescos = snapshot.docs;
			// 	    $scope.items.push(datosfrescos);
			// 	    console.log('aqui',datosfrescos);
			// 	})
			// }
			
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
							console.log(user.email);
							$scope.usuarioactivo = user.email;
						    //$scope.usu = user.email;
                            escucha();
						}else{
					      
				        
					       $window.location.href = '#!/';
						} 
				  })

			   // var ref = new Firebase('https://URL.firebaseio.com/users');

				$scope.items = [];

				db.collection('guides').get()
				 .then(function(querySnapshot) {
				    querySnapshot.forEach(function(doc) {
				        var datos = doc.data();
				        $scope.items.push(datos);
				        console.log(doc.id, " => ", doc.data());
				    });
				    $scope.$apply(); //let angular know to trigger $digest loop to update the DOM.
				});



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


app.controller('registercontroller', ['$scope','$location','$window', function($scope,$location,$window) {


			  $scope.register = function() { 
			     var correo = $scope.email;
			     var usuario = $scope.username;
			     var contras = $scope.password;
				  
			     //console.log(correo);

			     	auth.createUserWithEmailAndPassword(correo, contras).then(cred => {
			     		db.collection('users').doc(cred.user.uid).set({
			     				username: usuario
			     		})
			     		
			     		 $window.location.href = '#!/home';

			     			console.log(cred);
			     	}).catch(error =>{
                	   console.log(error.message);
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

			     }).catch(error =>{
                	console.log(error.message);
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


// app.controller('profilecontroller', ['$scope','$location','$window', function($scope,$location,$window) {




// }]);