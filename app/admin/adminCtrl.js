app.controller('AdminCtrl', function($scope, $http, apiService, AuthService, $cookieStore) {
    let self = this;
    self.productUsers = [];
    self.idUser = AuthService.isLoggedIn() ? $cookieStore.get('currentUser')._id : null,
        this.init = function() {
            self.Admin = $cookieStore.get('currentUser');
            console.log($cookieStore.get('currentUser').username);
        }
    angular.element(document).ready(function() {
        $(document).ready(function() {
            $('#product').DataTable({
                retrieve: true,
                paging: true
            });
        });
    })
    this.init()
});
