import HomeComponent from './Components/HomeComponent.js';

class App
{

    constructor()
    {

        this.module = angular.module("app", [ "ngCookies" ]);
        this.module.component("homeComponent", new HomeComponent());

    }

}

// Run app.
new App();