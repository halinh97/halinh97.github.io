app.controller('CheckoutCtrl', function($scope, $http, apiService, AuthService, $cookieStore) {
    let self = this;
    self.show = false;
    self.productUsers = [];
    self.feedBack = {};
    self.userFeedBack = $cookieStore.get('currentUser');
    self.idUser = AuthService.isLoggedIn() ? $cookieStore.get('currentUser')._id : null,
        this.init = function() {
            if (self.idUser) {
                var productUsers = [];
                $http.get('/api/productUsers/:' + self.idUser)
                    .then(function(response) {
                        productUsers = response.data;
                        productUsers.forEach(function(productUser) {
                            productUser.product.forEach(function(product) {
                                product.dateBuy = productUser.create_date
                                self.productUsers.push(product)
                            })
                        })
                        console.log(self.productUsers, "self.productUsers")
                    })
                    .catch(function(data) {
                        console.log(data, "loi getProductUserById");
                    })
            }
        }

        this.Cancel = function(){
             self.feedBack = {};
        }
        this.Send = function(){
            self.feedBack.idUser = self.idUser;
            self.feedBack.username = self.userFeedBack.username;

        }
        this.onAdd = function(){
            self.show = !self.show;
        }

    this.init()

});
