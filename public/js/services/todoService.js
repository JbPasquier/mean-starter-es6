function todoService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/todos', {
            description: data
        })
    }

    this.getAll = () => {
        return this.$http.get('/api/todos')
    }

    this.getOne = (id) => {
        return this.$http.get('/api/todos/' + id)
    }

    this.update = (id, data) => {
        return this.$http.put('/api/todos/' + id, {
            description: data
        })
    }

    this.delete = (id) => {
        return this.$http.delete('/api/todos/' + id)
    }

}
