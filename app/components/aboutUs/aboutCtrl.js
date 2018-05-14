app.controller('aboutCtrl', function($scope, $http, apiService) {
  window.apps = this;
  let self = this;
  this.dataAbout = [
      {
          name:"Hà Linh",
          task:"Front-end ,Back-end"
      },
      {
          name:"Huy Thái",
          task:"Front-end"
      },
      {
          name:"Công Sơn",
          task:"Back-end"
      },
      {
          name:"Ngọc Đức",
          task:"Back-end"
      }
  ]

});
