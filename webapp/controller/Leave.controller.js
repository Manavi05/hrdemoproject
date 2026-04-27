sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Leave", {
        onInit: function () {
            var oData = {
                LeaveRequests: [
                    {
                        Name: "Sarah Jenkins",
                        Type: "Sick Leave",
                        DateRange: "Apr 24 - Apr 26, 2026 (3 days)",
                        Reason: "Doctor's appointment and recovery",
                        State: "Error",
                        Photo: "https://randomuser.me/api/portraits/women/44.jpg"
                    },
                    {
                        Name: "David Kim",
                        Type: "Vacation",
                        DateRange: "May 1 - May 5, 2026 (5 days)",
                        Reason: "Family vacation",
                        State: "Information",
                        Photo: "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                ],
                Holidays: [
                    { HolidayName: "Good Friday", Date: "Apr 19" },
                    { HolidayName: "Earth Day", Date: "Apr 22" },
                    { HolidayName: "Labor Day", Date: "May 1" },
                    { HolidayName: "Diwali", Date: "Nov 12" },
                    { HolidayName: "Christmas", Date: "Dec 25" }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        }
    });
});