app.service('apiService', ApiService);

function ApiService($http, $window) {
    var defaultImage = "../../assests/images/2.png";
    var getProduct = function() {
        return $http.get('/api/products', {});
    }
    var getProductByGroup = function(id) {
        return $http.get('/api/products/:'+ id);
    }
    var addProduct = function(product) {
        return $http.post('/api/products', product);
    }
    var editProduct = function(product) {
        var id = product._id;
        return $http.put('/api/products/:'+id, product);
    }
    var deleteProduct = function(id) {
        return $http.delete('/api/products/:'+ id);
    }

    var getpostProduct = function() {
        return $http.get('/api/postproduct', {});
    }
    var getpostProductByGroup = function(id) {
        return $http.get('/api/postproduct/:'+ id);
    }
    var addpostProduct = function(product) {
        return $http.post('/api/postproduct', product);
    }
    var editpostProduct = function(product) {
        var id = product._id;
        return $http.put('/api/postproduct/:'+id, product);
    }
    var deletepostProduct = function(id) {
        return $http.delete('/api/postproduct/:'+ id);
    }

    var getUser = function() {
        return $http.get('/api/user', {});
    }
    var deleteUser = function(id) {
        return $http.delete('/api/user/:'+ id);
    }
    var getproductUsers = function() {
        return $http.get('/api/productUsers', {});
    }
    var addProductUser = function(product) {
        return $http.post('/api/productUsers/',product);
    }
    var deleteProductUser = function(id) {
        return $http.delete('/api/productUsers/:'+ id);
    }
    var getProductUserById = function(idUser) {
        console.log(idUser,"idUser");
        return $http.get('/api/productUsers/:'+ idUser);

    }
    var getProductUserById = function(idUser) {
        console.log(idUser,"idUser");
        return $http.get('/api/productUsers/:'+ idUser);

    }
    var uploadAvatar = function(avatar) {
        console.log(avatar,"avatar");
        return $http.post('/upload', avatar,{
            headers: {
                'Accept': '*/*',
                'Content-Type': undefined,
                "Authorization": 'halinh'
            }
        });
    }

    var getPostDoYouKnow = function() {
        return $http.get('/api/do-you-know', {
        });
    }
    var addPostDoYouKnow = function(data) {
        return $http.post('/api/do-you-know',data);
    }
    var getNutrition = function() {
        return $http.get('/api/nutrition', {
        });
    }
    var getNutritionForElder = function() {
        return $http.get('/api/nutrition-for-elder', {
        });
    }
    var getNutritionForElderProduct = function() {
        return $http.get('/api/nutrition-for-older/product', {
        });
    }
    var getNutritionForOlder = function() {
        return $http.get('/api/nutrition-for-older', {
        });
    }
    var getNutritionForOlderProduct = function() {
        return $http.get('/api/nutrition-for-olderProduct', {
        });
    }
    var getWeightGain = function() {
        return $http.get('/api/weight-gain', {
        });
    }
    var getWeightGainProduct = function() {
        return $http.get('/api/weight-gain/product', {
        });
    }
    var getWeightLossProduct = function() {
        return $http.get('/api/weight-loss/product', {
        });
    }
    var getWeightLoss = function() {
        return $http.get('/api/weight-loss', {
        });
    }

    var listProducts = [];
    var product = {};

    return {
        uploadAvatar: uploadAvatar,
        getUser: getUser,
        listProducts: listProducts,
        product: product,
        addProduct:addProduct,
        defaultImage: defaultImage,
        getProduct: getProduct,
        getproductUsers:getproductUsers,
        addProductUser:addProductUser,
        deleteProduct:deleteProduct,
        editProduct: editProduct,
        deleteUser:deleteUser,
        deleteProductUser:deleteProductUser,
        getPostDoYouKnow:getPostDoYouKnow,
        getNutrition:getNutrition,
        getNutritionForElder:getNutritionForElder,
        getNutritionForOlder:getNutritionForOlder,
        getWeightGain:getWeightGain,
        getWeightLoss:getWeightLoss,
        addPostDoYouKnow:addPostDoYouKnow,
        getNutritionForOlderProduct:getNutritionForOlderProduct,
        getWeightLossProduct:getWeightLossProduct,
        getWeightGainProduct:getWeightGainProduct,
        getNutritionForElderProduct:getNutritionForElderProduct,
        getpostProduct:getpostProduct,
        addpostProduct:addpostProduct,
        deletepostProduct: deletepostProduct,
        editpostProduct: editpostProduct,
        getProductByGroup:getProductByGroup,
        getpostProductByGroup :getpostProductByGroup 

    }
}
