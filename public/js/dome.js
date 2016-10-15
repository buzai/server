var mydome=angular.module("myapp",[]);
/*服务一*/
mydome.provider('greeting',function(){
	var name='provider';
	this.setName=function(name){
		name=name;
	}
	this.$get=function(){
		return 'Hello,'+name;
	}
});
/*对服务进行配置*/
// mydome.config(function(greetingProvider){
// 	greetingProvider.setName("wolf");
// });
/*服务二*/
mydome.service("greetingtwo",function(){
	this.sayHello=function(name){
		return 'Hello,'+name;
	}
})

/*服务三*/
mydome.factory('greetingthree',function(){
	return 'Hello,factory';
})
mydome.controller('myctrl',function($scope,greeting){
	$scope.message=greeting;
}).controller('myctrl2',function($scope,greetingtwo){
	$scope.message=greetingtwo.sayHello('service');
}).controller('myctrl3',function($scope,greetingthree){
	$scope.message=greetingthree;
})