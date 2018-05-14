app.controller('Admin-productUserCtrl', function($scope, $http, shareData, apiService, AuthService, $cookieStore, DialogService) {
    let self = this;
    self.productUsers = [];
    angular.element(document).ready(function() {
        $(document).ready(function() {
            $('#productUserCtrl').DataTable({
                  "serverSide": false
            });
        });
    })
    self.idUser = $cookieStore.get('currentUser')._id;
    this.init = function() {
            apiService.getproductUsers()
                .then(function(response) {
                    self.productUsers = response.data;
                    console.log(self.productUsers, "self.productUsers")
                })
                .catch(function(data) {
                    console.log(data, "loi getProductUserById");
                })
    }
    this.deleteproductUsers = function(product) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deleteProductUser(product._id)
            .then(function(data) {
                $.notify({
                    icon: 'fa fa-check',
                    message: 'Delete success !!!!'
                }, {
                    delay: 2,
                    timer: 200
                });
                self.init();
            })
    }

    this.init()
});
