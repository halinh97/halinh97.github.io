app.controller('Admin-userCtrl', function($scope, $http, apiService, AuthService, $cookieStore) {
    let self = this;
    self.userModels = [];
    this.init = function() {
        var userModels = [];
        var i = 1;
        apiService.getUser()
            .then(function(reponse) {
                userModels = reponse.data;
                userModels.forEach(function(user) {
                    if (user.role == 'admin') {
                        user.level = true;
                    }
                    user.stt = i;
                    i = i+1;
                })
                self.userModels = userModels;
            })
            .catch(function(data) {
                console.log(data, "errr");
            })

    }
    this.deleteUser = function(user) {
        if (confirm('Chắc chắn xóa?'))
            apiService.deleteUser(user._id)
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
