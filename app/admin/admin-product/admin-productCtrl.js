app.controller('Admin-prodctCtrl', function($scope, $http, shareData, apiService, AuthService, $cookieStore, DialogService) {
    let self = this;
    self.productModels = [];

    this.init = function() {
        var i = 1;
        apiService.getProduct()
            .then(function(product) {
                self.productModels = product.data;
                self.productModels.forEach(function (product) {
                    product.stt = i;
                    i = i +1;
                })
                console.log(self.productModels);

            })
            .catch(function(data) {
                console.log(data, "errr");
            })
    }
    this.deleteProduct = function(product) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deleteProduct(product._id)
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
    this.addProduct = function() {
        shareData.setData();
        DialogService.newProduct();
    }
    this.onEdit = function(product) {
        shareData.setData(product);
        DialogService.newProduct();
    }
    window.onloadListProduct = function() {
        self.init();
    }
    this.init()
});
