var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope){
  $scope.firstName =  "John";
  $scope.lastName = "Adams";
  $scope.names = [
    {first: "tom", last: "adams"},
    {first: "jan", last: "bow"}
  ];
});

app.directive("helloWorld", function(){
  return {
    template: "<h1>Hello world lol</h1>"
  };
});
