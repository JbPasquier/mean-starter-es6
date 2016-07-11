class userService {

    constructor($http) {
        this.$http = $http;
    }

    connect(data) {
        return this.$http.post('/api/login', data)
    }

    create(user) {
        return this.$http.post('/api/users', user)
    }

    getAll() {
        return this.$http.get('/api/users')
    }

    getOne(id) {
        return this.$http.get('/api/users/' + id)
    }

    update(id, user) {
        return this.$http.put('/api/users/' + id, user)
    }

    delete(id) {
        return this.$http.put('/api/users/' + id)
    }

}
