function userService($http) {

    this.$http = $http;

    this.connect = (data) => {
        return this.$http.post('/api/login', data)
    }

    this.create = (user) => {
        return this.$http.post('/api/users', user)
    }

    this.getAll = () => {
        return this.$http.get('/api/users')
    }

    this.getOne = (id) => {
        return this.$http.get('/api/users/' + id)
    }

    this.update = (id, user) => {
        return this.$http.put('/api/users/' + id, user)
    }

    this.delete = (id) => {
        return this.$http.put('/api/users/' + id)
    }

}
