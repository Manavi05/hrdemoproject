sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("com.hr.portal.controller.Employees", {
        onInit: function () {
            var oData = {
                Employees: [
                    { ID: "SAP-001", Name: "Alex Rivera", Role: "Senior Developer", Dept: "Engineering", Status: "Active", State: "Success", Icon: "sap-icon://person-placeholder" },
                    { ID: "SAP-002", Name: "Sarah Jenkins", Role: "Product Manager", Dept: "Product", Status: "Active", State: "Success", Icon: "sap-icon://person-placeholder" },
                    { ID: "SAP-003", Name: "Michael Chen", Role: "UX Designer", Dept: "Design", Status: "Active", State: "Success", Icon: "sap-icon://person-placeholder" },
                    { ID: "SAP-004", Name: "Emma Wilson", Role: "HR Specialist", Dept: "HR", Status: "Active", State: "Success", Icon: "sap-icon://person-placeholder" },
                    { ID: "SAP-005", Name: "James Martinez", Role: "Sales Manager", Dept: "Sales", Status: "Active", State: "Success", Icon: "sap-icon://person-placeholder" },
                    { ID: "SAP-006", Name: "Lisa Thompson", Role: "Data Analyst", Dept: "Analytics", Status: "On Leave", State: "Warning", Icon: "sap-icon://person-placeholder" }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        }
    });
});