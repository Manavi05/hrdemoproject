sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/TextArea",
    "sap/m/Label",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Dialog, Button, Input, TextArea, Label, MessageToast) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.EmpAttendance", {
        onInit: function () {
            // Your existing data logic here...
        },

        onOpenLeaveDialog: function () {
            if (!this.pDialog) {
                this.pDialog = new Dialog({
                    title: "Submit Leave Request",
                    contentWidth: "400px",
                    content: [
                        new Label({ text: "Leave Type (e.g. Sick, Vacation)" }),
                        new Input("idLeaveType", { placeholder: "Enter type..." }),
                        new Label({ text: "Date Range" }),
                        new Input("idLeaveDate", { placeholder: "e.g. May 10 - May 12" }),
                        new Label({ text: "Reason" }),
                        new TextArea("idLeaveReason", { width: "100%", rows: 3 })
                    ],
                    beginButton: new Button({
                        text: "Submit",
                        type: "Emphasized",
                        press: function () {
                            this._submitLeave();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Cancel",
                        press: function () { this.pDialog.close(); }.bind(this)
                    })
                });
                this.getView().addDependent(this.pDialog);
            }
            this.pDialog.open();
        },

        _submitLeave: function () {
            var oModel = this.getOwnerComponent().getModel("HRModel");
            var aRequests = oModel.getProperty("/LeaveRequests") || [];

            // 1. Create the new request object
            var oNewRequest = {
                Name: "Current User", // In real app, get from login session
                Type: sap.ui.getCore().byId("idLeaveType").getValue(),
                DateRange: sap.ui.getCore().byId("idLeaveDate").getValue(),
                Reason: sap.ui.getCore().byId("idLeaveReason").getValue(),
                Status: "Pending",
                Photo: "sap-icon://person-placeholder"
            };

            // 2. Add to the Global Model (Updates HR page simultaneously)
            aRequests.push(oNewRequest);
            oModel.setProperty("/LeaveRequests", aRequests);

            // 3. Update Attendance table (Personal Records)
            var aPersonal = oModel.getProperty("/PersonalRecords") || [];
            aPersonal.unshift({
                Date: oNewRequest.DateRange,
                Status: "Leave Pending",
                CheckIn: "-",
                CheckOut: "-",
                TotalHours: "0h"
            });
            oModel.setProperty("/PersonalRecords", aPersonal);

            MessageToast.show("Request submitted successfully!");
            this.pDialog.close();
        }
    });
});