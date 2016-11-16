function mainController(todoService) {

    this.todoService = todoService;
    this.load();

    this.load = () => {
        this.todoService.getAll().then((res) => {
            this.todos = res.data;
        })
    }

    this.create = () => {
        this.todoService.create(this.todo).then(() => {
            this.todo = '';
            this.load()
        })
    }

    this.update = (todo) => {
        this.todoService.update(todo._id, todo.description).then(() => {
            this.load()
        })
    }

    this.delete = (todo) => {
        this.todoService.delete(todo._id).then(() => {
            this.load()
        })
    }

}
