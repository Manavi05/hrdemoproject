sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Attendance", {
        onInit: function () {
            // Dummy Data: 6 Records
            var aAttendanceData = [
                { ID: "SAP-810", Name: "Tony Stark", Dept: "Engineering", CheckIn: "09:00:00", CheckOut: "18:00:00", WorkHours: "9.0", Status: "On Time" },
                { ID: "SAP-811", Name: "Steve Rogers", Dept: "Security", CheckIn: "08:45:00", CheckOut: "17:45:00", WorkHours: "9.0", Status: "On Time" },
                { ID: "SAP-812", Name: "Natasha Romanoff", Dept: "Legal", CheckIn: "10:30:00", CheckOut: "19:30:00", WorkHours: "9.0", Status: "Late" },
                { ID: "SAP-813", Name: "Bruce Banner", Dept: "Research", CheckIn: "11:15:00", CheckOut: "20:15:00", WorkHours: "9.0", Status: "Late" },
                { ID: "SAP-814", Name: "Wanda Maximoff", Dept: "HR", CheckIn: "-", CheckOut: "-", WorkHours: "0.0", Status: "Absent" },
                { ID: "SAP-815", Name: "Thor Odinson", Dept: "Operations", CheckIn: "09:10:00", CheckOut: "18:10:00", WorkHours: "9.0", Status: "On Time" }
            ];

            var oModel = new JSONModel({
                Attendance: aAttendanceData,
                Stats: this._calculateStats(aAttendanceData)
            });
            this.getView().setModel(oModel);
        },

        _calculateStats: function (aData) {
            return {
                Total: aData.length,
                OnTime: aData.filter(i => i.Status === "On Time").length,
                Late: aData.filter(i => i.Status === "Late").length,
                Absent: aData.filter(i => i.Status === "Absent").length
            };
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var aFilters = [];
            if (sQuery) {
                aFilters.push(new Filter("Name", FilterOperator.Contains, sQuery));
            }
            this.byId("attendanceTable").getBinding("items").filter(aFilters);
        },

        onGenerateReport: function () {
            var aData = this.getView().getModel().getProperty("/Attendance");
            var sReport = "ATTENDANCE REPORT - " + new Date().toLocaleDateString() + "\n\n";
            sReport += "ID | Name | Status | Work Hours\n";
            sReport += "-----------------------------------\n";
            
            aData.forEach(function(item) {
                sReport += item.ID + " | " + item.Name + " | " + item.Status + " | " + item.WorkHours + " hrs\n";
            });

            // Logic to trigger a download of the text report
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sReport));
            element.setAttribute('download', 'Attendance_Report.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);

            MessageToast.show("Report Generated Successfully");
        }
    });
});