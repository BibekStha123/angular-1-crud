var module = angular.module('firestore', ['ngRoute']);

module.config(function ($routeProvider) {
             
    $routeProvider.when('/menus', {
        templateUrl: 'menu.html',
        controller: 'menuController'
    }).when('/items', {
        templateUrl: 'item.html',
        controller: 'itemController'
    })
});

module.controller("menuController", menuCtrl);
module.controller("itemController", itemCtrl);

function menuCtrl($scope, $http)
{
    //get menus
    onLoad($scope, $http);

    $scope.saveMenu = function() {
        var req = {
            method: 'POST',
            url: 'http://localhost:8000/api/restaurant/menu',
            headers: {
              'Content-Type': 'application/json'
            },
            data: { name: $scope.menu.name, status : $scope.menu.status}
           };

        $http(req).then(function(response){
            if(response.status == 200) {
                alert(response.data.message);
                onLoad($scope, $http);
            } else {
                alert(response.data.message);
            }
        }).catch(function(){
            console.log("server error");
        });
    }
    
    $scope.editMenu = function(key) {
        $scope.edit = false;
        angular.forEach($scope.menus, function(value, k){
            if(key === k) {
                $scope.edit= !$scope.edit
            }
        });
    }

    $scope.updateMenu = function(menu) {
        // console.log($scope.menu.name);
        var req = {
            method: 'POST',
            url: 'http://localhost:8000/api/restaurant/menu/edit',
            headers: {
              'Content-Type': 'application/json'
            },
            data: { name: menu.name}
           };

        $http(req).then(function(response){
            if(response.status == 200) {
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        }).catch(function(){
            console.log("server error");
        });
    }

    $scope.deleteMenu = function(key) {
        angular.forEach($scope.menus, function(value, k){
            if(k === key) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:8000/api/restaurant/menu/delete',
                    data: {name: key}
                }).then(function(response){
                    if(response.status == 200) {
                        alert(response.data.message)
                        onLoad($scope, $http);
                    } else {
                        alert(response.data.message)
                    }
                }).catch(function(){
                    console.log("server error");
                });;
            }
        });
    }
}

function itemCtrl($scope, $http)
{
    //get menu
    $scope.menus = [];
    $http.get('http://localhost:8000/api/restaurant/menu').then(function(response){
        if(response.status == 200) {
            $scope.menus = response.data;
        }
    }).catch(function() {
        alert("server error");
    });

    //load menuItems
    loadItems($scope, $http);

    $scope.saveItem = function() {
        var req = {
            method: 'POST',
            url: 'http://localhost:8000/api/restaurant/items',
            headers: {
              'Content-Type': 'application/json'
            },
            data: { menu: $scope.menuName, name: $scope.item.name, status : $scope.item.status, price : $scope.item.price }
           };

        $http(req).then(function(response){
            if(response.status == 200) {
                alert(response.data.message);
                loadItems($scope, $http);
            } else {
                alert(response.data.message);
            }
        }).catch(function(){
            console.log("server error");
        });
    }
    
    $scope.editItem = function(key) {
        key = false;
        angular.forEach($scope.menus, function(value, k){
            if(key === k) {
                console.log(key);
                key= !key
            }
        });
    }

    $scope.updateItem = function(menu) {
        // console.log($scope.menu.name);
        var req = {
            method: 'POST',
            url: 'http://localhost:8000/api/restaurant/items/edit',
            headers: {
              'Content-Type': 'application/json'
            },
            data: { name: menu.name}
           };

        $http(req).then(function(response){
            if(response.status == 200) {
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        }).catch(function(){
            console.log("server error");
        });
    }

    $scope.deleteItem = function(key) {
        angular.forEach($scope.items, function(value, k){
            if(k === key) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:8000/api/restaurant/items/delete',
                    data: {name: key}
                }).then(function(response){
                    if(response.status == 200) {
                        alert(response.data.message)
                        loadItems($scope, $http);
                    } else {
                        alert(response.data.message)
                    }
                }).catch(function(){
                    console.log("server error");
                });;
            }
        });
    }
}

function loadItems($scope, $http)
{
    $scope.items = [];

    $http.get('http://localhost:8000/api/restaurant/items').then(function(response){
        if(response.status == 200) {            
            $scope.items = response.data;           
        }
    }).catch(function() {
        alert("server error");
    });
}

function onLoad($scope, $http)
{
    $scope.menus = [];

    $http.get('http://localhost:8000/api/restaurant/menu').then(function(response){
        if(response.status == 200) {       
            $scope.menus = response.data;
            // angular.forEach($scope.menus, function(value, key){
            //     angular.forEach(value.items, function (item, k){
            //         console.log(k);
            //     });
            // });
        }
    }).catch(function() {
        alert("Server Error");
    });
}