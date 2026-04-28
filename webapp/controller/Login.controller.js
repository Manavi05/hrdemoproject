sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Login", {
        
        onInit: function () {
        },

        onLogin: function () {
            var oView = this.getView();
            var sUsername = oView.byId("usernameInput").getValue();
            var sPassword = oView.byId("passwordInput").getValue();
            var sRole = oView.byId("roleSelector").getSelectedKey();

            if (!sUsername || !sPassword) {
                MessageToast.show("Please enter both username and password");
                return;
            }

            // Create a global model to store role information
            var oRoleModel = new JSONModel({
                isHR: (sRole === "HR"),
                isEmployee: (sRole === "EMP")
            });
            // Setting the model on the Component makes it accessible to App.view.xml
            this.getOwnerComponent().setModel(oRoleModel, "roleModel");

            var oRouter = this.getOwnerComponent().getRouter();

            if (sRole === "HR") {
                MessageToast.show("Welcome back, HR Admin");
                oRouter.navTo("RouteDashboard"); 
            } else {
                MessageToast.show("Welcome, " + sUsername);
                oRouter.navTo("RouteEmployeeDashboard");
            }
        },

        onForgotPassword: function() {
            MessageToast.show("Please contact HR support to reset your password.");
        }
    });
});