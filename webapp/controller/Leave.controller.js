sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Leave", {
        onInit: function () {
            var oData = {
                Holidays: [
                    { Name: "Good Friday", Date: "Apr 19" },
                    { Name: "Earth Day", Date: "Apr 22" },
                    { Name: "Labor Day", Date: "May 1" }
                ]
            };
            var oModel = new JSONModel(oData);
            // Using a named model for holidays to avoid conflict with OData models
            this.getView().setModel(oModel, "holidayModel");
        },

        onApprove: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("leaveModel");
            if (oContext) {
                oContext.setProperty("Status", "Approved");
                MessageToast.show("Leave Approved");
            }
        },

        onReject: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("leaveModel");
            if (oContext) {
                oContext.setProperty("Status", "Rejected");
                MessageToast.show("Leave Rejected");
            }
        }
    });
});