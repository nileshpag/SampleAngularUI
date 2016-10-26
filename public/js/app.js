var myapp = angular.module('myApp', ['ngRoute', 'ngCookies']);
myapp.run(function($location) {
 $location.url('/home');
})
myapp.config(['$routeProvider',function($routeProvider) {
 $routeProvider.when('/home', {
 	templateUrl : 'home.html',
 	controller:'myCtrl'
 }).otherwise({
 	redirect: '/home'
 })
}]);
myapp.controller('myCtrl',function($scope,$http){
$scope.cnt = localStorage.clickcount || 0;
$scope.clickbuttton = function(){
	
	 if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
			$scope.cnt = localStorage.clickcount;
			
        } else {
            localStorage.clickcount = 1;
			$scope.cnt = localStorage.clickcount;
        }
        
    } else {
        
    }
}

$scope.countries="";
 $scope.countryForm = {
                    id : -1,
                    movieName : ""
                };
$http.get("http://localhost:8080/SpringMVC/rest/movies")
    .then(function(response) {
        $scope.countries = response.data;
    });
	
$scope.addCountry = function(){
	console.log("in add country")
	if ($scope.countryForm.id == -1) {		
	  $http.post("http://localhost:8080/SpringMVC/rest/movies",$scope.countryForm).then(_success,_error);	
					
	} else {
		$http.put("http://localhost:8080/SpringMVC/rest/movies",$scope.countryForm).then(_success,_error);
	   
	}
	
	
}

$scope.deleteCountry = function(id){
	$http({
                        method : "DELETE",
                        url : "http://localhost:8080/SpringMVC/rest/movies/"+id,
                        data : angular.toJson($scope.countryForm),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
	
}

function _success(){
	_clearFormData();
	$http.get("http://localhost:8080/SpringMVC/rest/movies")
    .then(function(response) {
        $scope.countries = response.data;
    });
}
function _error(){
	
	
}
$scope.editCountry = function(country){
	console.log(country);
	$scope.countryForm.movieName = country.movieName;
    $scope.countryForm.id = country.id;
	
}
function _clearFormData() {
                    $scope.countryForm.id = -1;
                    $scope.countryForm.movieName = "";
                
                };
	
});

