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
            var oUsernameInput = oView.byId("usernameInput");

            // 1. Check if fields are empty
            if (!sUsername || !sPassword) {
                MessageToast.show("Please fill the fields");
                return;
            }

            // 2. Username Validation: Exactly 8 characters, must contain both letters and numbers
            // Regex explanation: ^(?=.*[a-zA-Z])(?=.*[0-9]).{8}$
            // ^...$ (Start and end), (?=.*[a-zA-Z]) (has letters), (?=.*[0-9]) (has numbers), .{8} (exactly 8 chars)
            var nameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8}$/;
            if (!nameRegex.test(sUsername)) {
                oUsernameInput.setValueState("Error");
                oUsernameInput.setValueStateText("Username must be 8 characters with letters and numbers");
                MessageToast.show("Invalid Username format");
                return;
            } else {
                oUsernameInput.setValueState("None");
            }

            var oRouter = this.getOwnerComponent().getRouter();

            // 3. Password-based Redirection Logic
            if (sPassword === "hr@admin") {
                // Set HR Role Model
                var oRoleModel = new JSONModel({
                    isHR: true,
                    isEmployee: false
                });
                this.getOwnerComponent().setModel(oRoleModel, "roleModel");

                MessageToast.show("Welcome back, HR Admin");
                oRouter.navTo("RouteDashboard"); 
            } else {
                // Set Employee Role Model
                var oRoleModel = new JSONModel({
                    isHR: false,
                    isEmployee: true
                });
                this.getOwnerComponent().setModel(oRoleModel, "roleModel");

                MessageToast.show("Welcome, " + sUsername);
                oRouter.navTo("RouteEmployeeDashboard");
            }
        },

        onForgotPassword: function() {
            MessageToast.show("Please contact HR support to reset your password.");
        }
    });
});