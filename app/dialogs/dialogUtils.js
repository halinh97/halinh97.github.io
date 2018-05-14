app.filter('sumPro', function() {
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }
            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i][key] == null || data[i][key] == '' || data[i][key] == 'undefined') {
                    data[i][key] = 0;
                }
                sum += parseInt(data[i][key]);
            }
            return sum;
        };
    })
    .service('DialogService', DialogUtils);

function DialogUtils(ModalService, $http, $timeout, apiService, shareData, $location, AuthService, shareData, $rootScope, $cookieStore, $routeParams, uploadService) {
    let myDialogs = new Object();
    myDialogs.newCart = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            self.productUsers = {
                "idUser": AuthService.isLoggedIn() ? $cookieStore.get('currentUser')._id : null,
                "product": [],
                "username": $cookieStore.get('currentUser').username
            }
            AuthService.getUserStatus();
            console.log(AuthService.isLoggedIn());;
            // if(apiService.listProducts.length){
            //     for (var i = 1; i < apiService.listProducts.length; i++) {
            //       for (var y = 0; y < i; y++) {
            //         if (apiService.listProducts[i]._id == apiService.listProducts[y]._id) {
            //             console.log(apiService.listProducts[i],"apiService.listProducts[i]");
            //           for (var k = i; k < apiService.listProducts.length; k++) {
            //             apiService.listProducts[k] = apiService.listProducts[k + 1]
            //             apiService.listProducts.length = apiService.listProducts.length - 1;
            //             i = i - 1;
            //           }
            //         }
            //       }
            //     }
                this.data = apiService.listProducts;
            // };
            self.data.forEach(function(data) {
                if (data.sum == 0 || !data.sum) {
                    data.sum = data.calo;
                }
            })
            this.delProduct = function(id) {
                for (i in self.data) {
                    if (self.data[i]._id == id) {
                        self.data.splice(i, 1);
                        self.init();
                    }
                }
            }
            this.myChange = function(da) {
                da.sum = da.amount * da.calo;
                self.init();
            }
            this.init = function() {
                AuthService.getUserStatus().then(function() {
                    self.getUserStatus = AuthService.isLoggedIn();
                });
                console.log(self.productUsers.idUser, "self.productUsers.idUser");
            }
            this.init();

            this.saveProducUser = function() {
                self.productUsers.product = self.data;
                if (AuthService.isLoggedIn()) {
                    apiService.addProductUser(self.productUsers)
                        .then(function(response) {
                            self.data = [];
                            $.notify({
                                icon: 'fa fa-check',
                                message: 'Save success !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                            $timeout(function() {
                                $location.path('/checkout');
                            }, 200);

                        })
                        .catch(function(data) {
                            $.notify({
                                icon: 'exclamation-triangle',
                                message: 'Save error !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                            console.log(data);
                        });
                } else {
                    myDialogs.login();
                }

            }

        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-cart/cartView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.login = function() {
        function ModalController(close) {
            var self = this;
            this.register = function() {
                myDialogs.register();
            }

            this.login = function() {
                self.error = false;
                self.disabled = true;
                AuthService.uerLogin = self.user;
                self.checkuser = function() {
                    self.error = false;
                }
                AuthService.login(self.user)
                    // handle success
                    .then(function(data) {
                        console.log(AuthService.checkUser(), "AuthService");
                        AuthService.getUserStatus();
                        self.disabled = false;
                        window.location.href = '/';
                    })
                    // handle error
                    .catch(function(data) {
                        console.log(data, "loginsai roi");
                        AuthService.getUserStatus();
                        self.error = true;
                        self.errorMessage = "Invalid username and/or password";
                        self.disabled = false;
                        self.user = {};
                    });

            };


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/authentication/login/loginView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                console.log(data, "dialog,data");
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.register = function() {
        function ModalController(close) {
            var self = this;
            self.errorMessage = "User Exists Error!";
            this.login = function() {
                myDialogs.login();
            }
            this.checkuser = function() {
                apiService.getUser()
                    .then(function(user) {
                        self.users = user.data;
                        var a = self.users;
                        for (var i = 0; i < a.length; i++) {
                            if (self.registerForm.username == a[i].username) {
                                self.error = true;
                            } else {
                                self.error = false;
                                for (var i = 0; i < a.length; i++) {
                                    if (self.registerForm.username == a[i].username) {
                                        self.error = true;
                                    }
                                }
                            }

                        }

                    })
            }
            self.modalClose = "modal";
            this.register = function() {
                self.error = false;
                self.disabled = true;
                AuthService.register(self.registerForm)
                    .then(function() {
                        self.disabled = false;
                        self.user = {};
                        // angular.element(document).ready(function() {
                        //     $("#modalCloses").click();
                        // })

                        AuthService.getUserStatus();
                        self.disabled = false;
                        window.location.href = '/';
                    })
                    // handle error
                    .catch(function() {
                        console.log(AuthService.errors);
                        self.error = true;
                        self.errorMessage = "Something went wrong!";
                        self.disabled = false;
                        self.user = {};
                    });

            };
        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/authentication/register/registerView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.newProduct = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            this.groupProduct = [{
                    "name": "Healthy every day",
                    "id": 1
                },
                {
                    "name": "Nutrition for baby",
                    "id": 2
                },
                {
                    "name": "Nutrition for olders",
                    "id": 3
                },
                {
                    "name": "Weight Gain",
                    "id": 4
                }, {
                    "name": "Weight Loss",
                    "id": 5
                }
            ]
            self.productModel = shareData.getData() ? shareData.getData() : {};
            this.addProduct = function() {
                if (self.image) {
                    console.log(self.image, "self.avatar");
                    var formData = new FormData();
                    formData.append('file', self.image);
                    uploadService.uploadImage(formData)
                        .then((rs) => {
                            self.productModel.img = rs.data.content;
                            console.log(self.productModel.img, "self.productModel.img")
                            var onSave = undefined;
                            if (self.productModel._id == undefined || self.productModel._id == 0)
                                onSave = apiService.addProduct;
                            else {
                                onSave = apiService.editProduct;
                            }
                            onSave(self.productModel).then(function(data) {
                                    self.productModel = {};
                                    $.notify({
                                        icon: 'fa fa-check',
                                        message: 'Update success !!!!'
                                    }, {
                                        delay: 2,
                                        timer: 200
                                    });
                                    onloadListProduct();
                                    $location.path('/admin/list-product');
                                })
                                .catch(function(data) {
                                    console.log(data, "addProduct")
                                })
                        }).catch((err) => {
                            console.log("upload avatar fail", err);
                        })
                } else {
                    apiService.editProduct(self.productModel).then(function(data) {
                            self.productModel = {};
                            $.notify({
                                icon: 'fa fa-check',
                                message: 'Update success !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                            onloadListProduct();
                            $location.path('/admin/list-product');
                        })
                        .catch(function(data) {
                            console.log(data, "addProduct")
                        })
                }
            }


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-addProduct/addProductView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    myDialogs.newPost = function() {
        function ModalController(close) {
            window.new = this;
            var self = this;
            this.groupProduct = [{
                    "name": "Healthy every day",
                    "id": 1
                },
                {
                    "name": "Nutrition for baby",
                    "id": 2
                },
                {
                    "name": "Nutrition for olders",
                    "id": 3
                },
                {
                    "name": "Weight Gain",
                    "id": 4
                }, {
                    "name": "Weight Loss",
                    "id": 5
                }
            ]
            self.productModel = shareData.getData() ? shareData.getData() : {};
            this.addProduct = function() {
                if (self.image) {
                    console.log(self.image, "self.avatar");
                    var formData = new FormData();
                    formData.append('file', self.image);
                    uploadService.uploadImage(formData)
                        .then((rs) => {
                            self.productModel.img = rs.data.content;
                            console.log(self.productModel.img, "self.productModel.img")
                            var onSave = undefined;
                            if (self.productModel._id == undefined || self.productModel._id == 0)
                                onSave = apiService.addpostProduct;
                            else {
                                onSave = apiService.editpostProduct;
                            }
                            console.log(self.productModel ,"self.productModel ");
                            onSave(self.productModel).then(function(data) {
                                    self.productModel = {};
                                    $.notify({
                                        icon: 'fa fa-check',
                                        message: 'Update success !!!!'
                                    }, {
                                        delay: 2,
                                        timer: 200
                                    });
                                    onloadListPost();
                                })
                                .catch(function(data) {
                                    console.log(data, "addProduct")
                                })
                        }).catch((err) => {
                            console.log("upload avatar fail", err);
                        })
                } else {
                    apiService.editpostProduct(self.productModel).then(function(data) {
                            self.productModel = {};
                            $.notify({
                                icon: 'fa fa-check',
                                message: 'Update success !!!!'
                            }, {
                                delay: 2,
                                timer: 200
                            });
                             onloadListPost();
                        })
                        .catch(function(data) {
                            console.log(data, "addProduct")
                        })
                }
            }


        }

        ModalService.showModal({
            templateUrl: 'app/dialogs/modal-addPost/addPostView.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    return myDialogs;
}
