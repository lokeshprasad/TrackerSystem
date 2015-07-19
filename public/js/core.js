var app = angular.module('tracker', ['ngRoute','ngCookies'])

	.controller('LoginController', function($scope, $http,$location, $rootScope, $cookieStore) {
		if($location.path() == '/dashboard'){
			var data = $cookieStore.get('data');
			if(!data){
				$location.path('#/');
			}
			$rootScope.username = data.username;
			$http.get("/get_journey")
				.success(function (response) {
					console.log(response);
					$scope.journey = response.data;
				});

		}
		$rootScope.login = function() {
			if (!$scope.user) {
				$scope.error = 'Empty Form';
				return;
			}
			if (!$scope.user.username) {
				$scope.error = 'Username missing';
				return;
			}
			if (!$scope.user.password) {
				$scope.error = 'Passsword missing';
				return;
			}
			$http.post("/login", {data: $scope.user})
				.success(function (response) {
					console.log(response.data.verified);
					if(response.data.verified){
						console.log(response.data.username);
						$cookieStore.put('data',response.data);
						$rootScope.username = response.data.username;
						$location.path('/dashboard');
					}
					else{
						$scope.error = 'Invalid Username/Password';
					}

				});

		}
	})
	.controller('LogoutController', function($scope,$cookieStore,$location,$rootScope) {
		$cookieStore.remove('data');
		$rootScope.username = '';
		$location.path('#/');
	})
	.controller('CandidateController', function($scope, $http,$location,$rootScope,$routeParams) {
		$rootScope.data = null;
		$scope.param = $routeParams.id;

		$scope.saveStep1 = function() {
			if (!$scope.user) {
				$scope.error = 'Empty Form';
				return;
			}
			if (!$scope.user.name) {
				$scope.error = 'Name missing';
				return;
			}
			if (!$scope.user.mail) {
				$scope.error = 'Email missing';
				return;
			}
			if (!$scope.user.phone) {
				$scope.error = 'Phone missing';
				return;
			}
			if(!angular.isNumber($scope.user.phone)){
				$scope.error = 'Phone is not valid';
				return;
			}
			$http.post("/candidate/step1", {data: $scope.user})
				.success(function (response) {
					$rootScope.data = response;
					console.log(response.data.name);
					$location.path('/candidate/step2');
				});
		}
	})
	.controller('CandidateController1', function($scope, $http,$location,$rootScope) {
		if($rootScope.data == null){
			$location.path('/candidate/step1');
		}
		$scope.saveStep2 = function(){
			if(!$scope.user){
				$scope.error = 'Empty Form';
				return;
			}
			if(!$scope.user.name){
				$scope.error = 'Name missing';
				return;
			}
			if(!$scope.user.mail){
				$scope.error = 'Email missing';
				return;
			}
			if(!$scope.user.phone){
				$scope.error = 'Phone missing';
				return;
			}

			if(!$scope.user.to){
				$scope.error = 'To missing';
				return;
			}
			if(!$scope.user.from){
				$scope.error = 'From missing';
				return;
			}
			if(!angular.isNumber($scope.user.phone)){
				$scope.error = 'Phone is not valid';
				return;
			}

			$http.post("/candidate/step2", {data : {d1 : $scope.user, d2 : $rootScope.data}})
				.success(function(response) {
					console.log('response',response);
					$location.path('/candidate/step3/'+response.data.journey._id);
					$rootScope.data = null;
				});
		}
	})


	.controller('TrackerController', function($scope) {
		$scope.view = 'Tracker';
	})



	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/login.html',
				controller: 'LoginController'
			})
			.when('/candidate/step1', {
				templateUrl: 'partials/candidate-step1.html',
				controller: 'CandidateController'
			})
			.when('/candidate/step2', {
				templateUrl: 'partials/candidate-step2.html',
				controller: 'CandidateController1'
			})
			.when('/candidate/step3/:id', {
				templateUrl: 'partials/candidate-step3.html',
				controller: 'CandidateController'
			})
			.when('/candidate/tracker', {
				templateUrl: 'partials/tracker.html',
				controller: 'CandidateController'
			})
			.when('/dashboard', {
				templateUrl: 'partials/dashboard.html',
				controller: 'LoginController'
			})
			.when('/logout', {
				templateUrl: 'partials/login.html',
				controller: 'LogoutController'
			})

			.otherwise({
				redirectTo: '/'
			});

		;

	})