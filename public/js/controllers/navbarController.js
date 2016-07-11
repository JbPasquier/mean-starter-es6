class navbarController {

    constructor(sessionFactory, $rootScope, $window, $location) {
        this.isLogged = sessionFactory.isLogged;
        this.sessionFactory = sessionFactory;
        this.$rootScope = $rootScope;
        this.$location = $location;

        $rootScope.$on('loginStatusChanged', (event, isLogged) => {
            this.isLogged = isLogged;
            this.user = sessionFactory.user;
        })
    }

    logout() {
        this.sessionFactory.isLogged = false;
        this.sessionFactory.user = {};
        this.sessionFactory.token = null;
        this.$rootScope.$emit('loginStatusChanged', false);
        this.isLogged = false;
        this.$location.path('/login');
    }

}
