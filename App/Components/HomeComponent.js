export default class HomeComponent {

    template = /*html*/`

        <!-- Logged Out -->
        <div ng-hide="$ctrl.User.IsLoggedIn">
            <h3>Forside</h3>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="icon-user"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Epost <user@domain.xx>" ng-model="$ctrl.User.Email">
            </div>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="icon-lock"></i></span>
                </div>
                <input type="password" class="form-control" placeholder="123" ng-model="$ctrl.User.Password">
            </div>
            <button class="btn btn-block btn-primary" ng-click="$ctrl.Login()">Logg inn</button>
        </div>

        <!-- Logged In -->
        <div ng-show="$ctrl.User.IsLoggedIn">
        
            <h3>Epost</h3>
            <div class="d-flex justify-content-between mb-2">
                <div class="btn-group">
                    <button class="btn" ng-class="$ctrl.Tab == 0 ? 'btn-secondary' : 'btn-outline-secondary'" style="min-width: 105px;" ng-click="$ctrl.Tab = 0">Ny</button>
                    <button class="btn" ng-class="$ctrl.Tab == 1 ? 'btn-secondary' : 'btn-outline-secondary'" style="min-width: 105px;" ng-click="$ctrl.Tab = 1">Innboks</button>
                </div>
                <div>
                    <button class="btn btn-primary ico" ng-if="$ctrl.Tab == 1" style="min-width: 25px;" ng-click="$ctrl.GetEmails()"><i class="icon-refresh"></i></button>
                    <button class="btn btn-danger ico" style="min-width: 25px;" ng-click="$ctrl.Logout()"><i class="icon-logout"></i></button>
                </div>
            </div>

            <!-- Tab 0: New Email -->
            <div ng-show="$ctrl.Tab == 0">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="width:60px;">Fra</span>
                    </div>
                    <input type="text" class="form-control" placeholder="..." ng-model="$ctrl.Email.From">
                </div>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="width:60px;">Til</span>
                    </div>
                    <input type="text" class="form-control" placeholder="..." ng-model="$ctrl.Email.To">
                </div>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="width:60px;">Tittel</span>
                    </div>
                    <input type="text" class="form-control" placeholder="..." ng-model="$ctrl.Email.Title">
                </div>
                <div class="input-group mb-2">
                    <textarea class="form-control" placeholder="Content..." ng-model="$ctrl.Email.Content"></textarea>
                </div>
                <div class="d-flex justify-content-end mb-2">
                    <button class="btn btn-primary" style="min-width: 115px;" ng-click="$ctrl.SendEmail()">Send</button>
                </div>
            </div>
            
            <!-- Tab 1: Email Inbox -->
            <div ng-show="$ctrl.Tab == 1">
                <ul class="list-group">
                    <li class="list-group-item" ng-repeat="email in $ctrl.Emails">
                        <<span ng-bind="email.Sender"></span>>
                        <span ng-bind="email.Title"></span>
                    </li>
                </ul>
            </div>

        </div>

    `;

    controller = class {

        User = {
            Email: "",
            Password: "",
            IsLoggedIn: false
        }

        Email = {
            From: "",
            To: "",
            Title: "",
            Content: ""
        }

        Emails = [
            { Sender: "a@b.c", Title: "Test1..." }
        ];

        Tab = 1;

        constructor($scope, $http, $cookies) {
            this.$scope = $scope;
            this.$http = $http;
            this.$cookies = $cookies;
            this.User.IsLoggedIn = (this.$cookies.get("IsLoggedIn") == 'true');
            this.GetLoginData();
            this.GetEmails();
        }

        Login() {
            this.$http.post("/api.php?action=Login", this.User).then((response) => {
                this.User.IsLoggedIn = (this.$cookies.get("IsLoggedIn") == 'true');
            }).catch((response) => { console.error(response); });
        }

        Logout() {
            this.$cookies.remove("IsLoggedIn", false);
            this.User.IsLoggedIn = false;
        }

        SendEmail() {
            this.$http.post("/api.php?action=Email", this.Email).then((response) => { 
                console.log(response);
            }).catch((response) => { console.error(response); });
        }

        GetLoginData() {
            this.$http.get("/api.php?action=Login").then((response) => {
                this.User.Email = response.data.Email;
                this.User.Password = response.data.Password;
                this.Email.From = this.User.Email;
            }).catch((response) => { console.error(response); });
        }

        GetEmails() {
            this.$http.get("/api.php?action=Email").then((response) => {
                this.Emails = response.data;
            }).catch((response) => { console.error(response); });
        }

    }

}

//HomeComponent.$inject = ["$scope", "$http", "$cookies"];