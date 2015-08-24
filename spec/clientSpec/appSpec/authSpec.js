describe("Auth Controller", function() {
  beforeEach(module("shareAustinAuth"));
  var controller, scope;
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope
    });
  }));

  it("should initialize $scope.active to be 'logIn'", function () {
    expect(scope.active).toEqual('logIn');  
  });

  it("should use $scope.change to set $scope.active to be true when status = 'logIn'", function() {
    scope.change('logIn')
    expect(scope.active).toEqual(true);
  })

  it("should use $scope.change to set $scope.active to be false when status = 'signUp'", function() {
    scope.change('signUp')
    expect(scope.active).toEqual(false);
  })
});