sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.EmpAttendance", {
        onInit: function () {
            var oData = {
                Stats: {
                    Present: 18,
                    Absent: 2,
                    Late: 3,
                    HalfDay: 1
                },
                PersonalRecords: [
                    {
                        Date: "27-04-2026",
                        Status: "Present",
                        CheckIn: "09:00 AM",
                        CheckOut: "06:00 PM",
                        TotalHours: "9h 00m"
                    },
                    {
                        Date: "26-04-2026",
                        Status: "Late",
                        CheckIn: "10:15 AM",
                        CheckOut: "07:15 PM",
                        TotalHours: "9h 00m"
                    },
                    {
                        Date: "25-04-2026",
                        Status: "Present",
                        CheckIn: "08:50 AM",
                        CheckOut: "05:50 PM",
                        TotalHours: "9h 00m"
                    }
                ]
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        }
    });
});