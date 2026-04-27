sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Dashboard", {
        onInit: function () {
            var oData = {
                DeptData: [
                    { Dept: "IT", Count: 85 },
                    { Dept: "Finance", Count: 30 },
                    { Dept: "Operations", Count: 90 },
                    { Dept: "HR", Count: 12 }
                ],
                LeaveTrend: [
                    { Month: "Jan", Total: 10 },
                    { Month: "Feb", Total: 15 },
                    { Month: "Mar", Total: 8 },
                    { Month: "Apr", Total: 22 }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        }
    });
});