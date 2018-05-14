function Controller($scope) {
  let self = this;
  angular.element(document).ready(function() {
    $('.flexslider').flexslider({
      animation: "slide",
      start: function(slider) {
        $('body').removeClass('loading');
      }
    });
  });
  $scope.title ="Healthy every day";
  $scope.menu = [{
      "name": "Healthy every day",
      "id": "1"
    },{
      "name": "Nutrition for baby",
      "id": 2
    }, {
      "name": "Nutrition for olders",
      "id": 3
    }, {
      "name": "Weight Gain",
      "id": 4
    }, {
      "name": "Weight Loss",
      "id": 5
    }, {
      "name": "You probably do not know",
      "id": 6
    }, {
      "name": "My Product",
      "id": 7
    }]
  $scope.clickB=function (i) {
    $scope.title = i;
    console.log($scope.title);
  }
}

  app.component('sideBar', {
    templateUrl: "app/shared/sidebar/sidebarView.html",
    controller: Controller,
    controllerAs: 'sidebarCtrl'
  })
