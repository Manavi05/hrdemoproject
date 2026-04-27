sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Attendance", {
        onInit: function () {
            var oData = {
                AttendanceData: [
                    { Name: "Alex Rivera", Dept: "Engineering", CheckIn: "09:02 AM", CheckOut: "06:15 PM", Hours: "9h 13m", Status: "On Time", State: "Success", StatusIcon: "sap-icon://accept" },
                    { Name: "Sarah Jenkins", Dept: "Product", CheckIn: "08:45 AM", CheckOut: "05:30 PM", Hours: "8h 45m", Status: "On Time", State: "Success", StatusIcon: "sap-icon://accept" },
                    { Name: "Michael Chen", Dept: "Design", CheckIn: "10:15 AM", CheckOut: "06:45 PM", Hours: "8h 30m", Status: "Late", State: "Warning", StatusIcon: "sap-icon://alert" },
                    { Name: "Emma Wilson", Dept: "HR", CheckIn: "09:05 AM", CheckOut: "05:00 PM", Hours: "7h 55m", Status: "On Time", State: "Success", StatusIcon: "sap-icon://accept" },
                    { Name: "James Martinez", Dept: "Sales", CheckIn: "09:30 AM", CheckOut: "07:00 PM", Hours: "9h 30m", Status: "Late", State: "Warning", StatusIcon: "sap-icon://alert" },
                    { Name: "Lisa Thompson", Dept: "Analytics", CheckIn: "-", CheckOut: "-", Hours: "-", Status: "Absent", State: "Error", StatusIcon: "sap-icon://decline" }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        }
    });
});