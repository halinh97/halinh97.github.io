app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider

        .state('home', {
            url: '',
            views: {
                "": {
                    templateUrl: 'app/homeView.html'
                }
            }
        })
        .state('home.healthy-every-day', {
            url: "/",
            views: {
                "": {
                    templateUrl: 'app/components/healthy-every-day/healthy-every-dayView.html',
                    controller: 'HealthyEveryDayCtrl',
                }
            },
            access: true
        })
        .state('home.nutrition', {
            url: "/nutrition",
            views: {
                "": {
                    templateUrl: 'app/components/nutrition/nutritionView.html',
                    controller: 'NutritionCtrl',
                }
            },
            access: true

        })
        .state('home.nutrition-for-baby', {
            url: "/nutrition-for-baby",
            views: {
                "": {
                    templateUrl: 'app/components/nutrition-for-elder/nutrition-for-elderView.html',
                    controller: 'nutrition-for-elderCtrl'
                }
            }

        })
        .state('home.nutrition-for-older', {
            url: "/nutrition-for-older",
            views: {
                "": {
                    templateUrl: 'app/components/nutrition-for-older/nutrition-for-olderView.html',
                    controller: 'nutrition-for-olderCtrl'
                }
            }

        })
        .state('home.weight-gain', {
            url: "/weight-gain",
            views: {
                "": {
                    templateUrl: 'app/components/weight-gain/weight-gainView.html',
                    controller: 'weight-gainCtrl'
                }
            }

        })
        .state('home.weight-loss', {
            url: "/weight-loss",
            views: {
                "": {
                    templateUrl: 'app/components/weight-loss/weight-lossView.html',
                    controller: 'weight-lossCtrl'
                }
            }

        })
        .state('home.add-product', {
            url: "/add-product",
            views: {
                "": {
                    templateUrl: 'app/components/nutrition/add-productView.html',
                    controller: 'NutritionCtrl',

                }

            },
            access: false
        })
        .state('home.checkout', {
            url: "/checkout",
            views: {
                "": {
                    templateUrl: 'app/components/checkout/checkoutView.html',
                    controller: 'CheckoutCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false
        }).state('home.about', {
            url: "/about",
            views: {
                "": {
                    templateUrl: 'app/components/aboutUs/aboutView.html',
                    controller: 'aboutCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: true
        })
        .state('home.strong', {
            url: "/bb",
            views: {
                "": {
                    templateUrl: 'app/components/healthy-every-day/healthy-every-dayView.html',
                    controller: 'HealthyEveryDayCtrl'
                }
            },
            access: false

        })

        .state('admin', {
            url: '/admin',
            views: {
                "": {
                    templateUrl: 'app/admin/adminView.html',
                    controller: 'AdminCtrl',
                    controllerAs:'$ctrl'
                }
            },
            redirectTo: 'admin.product',
            access: true
        })
        .state('admin.product', {
            url: "/list-product",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-product/admin-productView.html',
                    controller: 'Admin-prodctCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.user', {
            url: "/list-user",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-user/admin-userView.html',
                    controller: 'Admin-userCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.userbyproduct', {
            url: "/product-by-user",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-productUser/admin-productUserView.html',
                    controller: 'Admin-productUserCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('admin.posts', {
            url: "/list-posts",
            views: {
                "": {
                    templateUrl: 'app/admin/admin-postProduct/admin-postProductView.html',
                    controller: 'Admin-postProductCtrl',
                    controllerAs:'$ctrl'
                }
            },
            access: false

        })
        .state('error', {
            url: "/error",
            templateUrl: 'assests/html/error.html'
        })


    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('');
})
