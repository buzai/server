
angular.module("app",["ui.bootstrap", "angularFileUpload",  'ngResource',  'ngCookies'])

  .value('redirectToUrlAfterLogin', { url: '/' })
    .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, redirectToUrlAfterLogin) {
        var currentUser = {};
        if($cookieStore.get('token')) {
          currentUser = User.get();
        }

        return {

          /**
           * Authenticate user and save token
           *
           * @param  {Object}   user     - login info
           * @param  {Function} callback - optional
           * @return {Promise}
           */

          setcurrentUser: function() {
            currentUser = User.get();
          },
          login: function(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/auth/local', {
              email: user.email,
              password: user.password
            }).
            success(function(data) {

              $cookieStore.put('token', data.token);
              currentUser = User.get();
              deferred.resolve(data);
              return cb();
            }).
            error(function(err) {
              this.logout();
              deferred.reject(err);
              return cb(err);
            }.bind(this));

            return deferred.promise;
          },

          /**
           * Delete access token and user info
           *
           * @param  {Function}
           */
          logout: function() {
            $cookieStore.remove('token');
            currentUser = {};
          },
          saveAttemptUrl: function() {
            if($location.path().toLowerCase() !== '/login' || $location.path().toLowerCase() !== '/signup') {
              redirectToUrlAfterLogin.url = $location.path();
            }
            else {
              redirectToUrlAfterLogin.url = '/';
            }
          },
          redirectToAttemptedUrl: function() {
            $location.path(redirectToUrlAfterLogin.url);
          },
          /**
           * Create a new user
           *
           * @param  {Object}   user     - user info
           * @param  {Function} callback - optional
           * @return {Promise}
           */
          createUser: function(user, callback) {
            var cb = callback || angular.noop;

            return User.save(user,
              function(data) {
                $cookieStore.put('token', data.token);
                currentUser = User.get();
                return cb(user);
              },
              function(err) {
                this.logout();
                return cb(err);
              }.bind(this)).$promise;
          },

          /**
           * Change password
           *
           * @param  {String}   oldPassword
           * @param  {String}   newPassword
           * @param  {Function} callback    - optional
           * @return {Promise}
           */
          changePassword: function(oldPassword, newPassword, callback) {
            var cb = callback || angular.noop;

            return User.changePassword({ id: currentUser._id }, {
              oldPassword: oldPassword,
              newPassword: newPassword
            }, function(user) {
              return cb(user);
            }, function(err) {
              return cb(err);
            }).$promise;
          },

          /**
           * Gets all available info on authenticated user
           *
           * @return {Object} user
           */
          getCurrentUser: function() {
            console.log('getCurrentUser')
            return currentUser;
          },

          /**
           * Check if a user is logged in
           *
           * @return {Boolean}
           */
          isLoggedIn: function() {
            return currentUser.hasOwnProperty('role');
          },

          /**
           * Waits for currentUser to resolve before checking if user is logged in
           */
          isLoggedInAsync: function(cb) {
            if(currentUser.hasOwnProperty('$promise')) {
              currentUser.$promise.then(function() {
                cb(true);
              }).catch(function() {
                cb(false);
              });
            } else if(currentUser.hasOwnProperty('role')) {
              cb(true);
            } else {
              cb(false);
            }
          },

          /**
           * Check if a user is an admin
           *
           * @return {Boolean}
           */
          isAdmin: function() {
            return currentUser.role === 'admin';
          },
          getRole: function () {
            return currentUser.role;
          },
          /**
           * Get auth token
           */
          getToken: function() {
            return $cookieStore.get('token');
          }
        };
      })


  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
      });
  })

    .controller("uploadController", function ($location,$scope, $upload, $filter, $timeout, Auth, $cookieStore) {

      //   $scope.fileList = [];

      //   $scope.$watch('files', function (f) {
      //       if(f&&f[0]) {
      //           $scope.upload(f);
      //           angular.forEach(f, function(file){
      //              $scope.fileList.push(file);
      //           })
      //       }
      //   });

      //   $scope.removeFile = function(fileName) {
      //       angular.forEach($scope.fileList, function(f, index){
      //           if(f.name == fileName){
      //               $scope.fileList.splice(index, 1);
      //               return;
      //           }
      //       });
      //   };

      //   $scope.upload = function (files) {
      //       if (files && files.length) {
      //           for (var i = 0; i < files.length; i++) {
      //               var file = files[i];
      //               file.dynamic = 0;
      //               $scope.uploadFile(file);
      //               $upload.upload({
      //                   url: '/upload',
      //                   file: file
      //               }).progress(function (evt) {
      //                   var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //                   file.dynamic = progressPercentage;
      //                   console.log('progress: ' + progressPercentage + '% ' +
      //                               evt.config.file.name);
      //               }).success(function (data, status, headers, config) {
      //                   console.log('file ' + config.file.name + 'uploaded. Response: ' +
      //                               JSON.stringify(data));
      //               });
      //           }
      //       }
      //   };

      //   var fileArray = [];
      //   $scope.uploadFile = function(file){

      //       file.upload = $upload.upload({
      //           url: '/file/uploading',
      //           file: file
      //       });

      //       file.upload.then(function(response) {
    		//    $timeout(function() {
    		//        file.result = response.data;
    		//        fileArray.push(response.data)
    		//    });
    		// }, function(response) {
    	 //       //if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
    		// });

    		// file.upload.progress(function(evt) {
    		//    // Math.min is to fix IE which reports 200% sometimes
    		//    file.dynamic = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    		// });

    		// file.upload.xhr(function(xhr) {
    		//    // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
    		// });
      //   };


        $scope.creatflag = true;
        $scope.loginflag = false;

        $scope.changeview = function () {
          $scope.creatflag = !$scope.creatflag;
          $scope.loginflag = !$scope.loginflag;
        }
        $scope.create = function () {
          var role = 'user';
          if($scope.select==='网发'){
            role = 'admin'
          } else if($scope.select==='代理商'){
            role = 'user'
          } else if($scope.select==='设计商'){
            role = 'desuser'
          }
          var user = {
            name:$scope.name,
            cellphone:$scope.cellphone,
            email: $scope.email,
            password:$scope.password,
            role: role
          }
        Auth.createUser(user)
        .then( function() {
          console.log('logined');
          $scope.changeview()
        })
        .catch( function(err) {
          console.log(err);
        });

        }
        $scope.login = function () {


            var user = {email: $scope.email, password:$scope.password}
                  console.log(user)

                  var token = null;
                  Auth.login(user)
                  .then( function(data) {
                    console.log(data)
                      token = data.token;
                      var role = data.role;
                      console.log(role)
                      if(role==='user'){
                        console.log('usersssss')
                        window.location.href='/agent?token='+token;
                      }
                      else if(role==='admin'){
                        console.log('admin')
                        console.log(token)
                        window.location.href='/admin?token='+token;
                      }
                      else if(role==='desuser'){
                        console.log('desuser')
                        console.log(token)
                        window.location.href='/desuser?token='+token;
                      }


                  })
                  .catch( function(err) {
                    console.log(err);

                  });


        }

    })

.config(function ($httpProvider) {


  // $locationProvider.html5Mode(true);?token=
  $httpProvider.interceptors.push('authInterceptor');
})



.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if(response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
})
