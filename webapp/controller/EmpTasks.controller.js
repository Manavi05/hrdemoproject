sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.EmpTasks", {
        onInit: function () {
            var oData = {
                Stats: {
                    ToDo: 2,
                    InProgress: 1,
                    Completed: 5
                },
                TaskList: [
                    {
                        Title: "Update Security Groups",
                        Description: "Review and prune unused AWS security groups",
                        Priority: "High",
                        Status: "In Progress",
                        DueDate: "2026-04-30"
                    },
                    {
                        Title: "Quarterly Audit",
                        Description: "Prepare documentation for IAM user audit",
                        Priority: "Medium",
                        Status: "To Do",
                        DueDate: "2026-05-05"
                    },
                    {
                        Title: "CloudFront Config",
                        Description: "Optimize cache behaviors for edge locations",
                        Priority: "Low",
                        Status: "Completed",
                        DueDate: "2026-04-20"
                    }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        },

        onFilterTasks: function (oEvent) {
            var sKey = oEvent.getParameter("selectedItem").getKey();
            var oTable = this.byId("tasksTable");
            var oBinding = oTable.getBinding("items");
            var aFilters = [];

            if (sKey !== "All") {
                aFilters.push(new Filter("Status", FilterOperator.EQ, sKey));
            }
            oBinding.filter(aFilters);
        }
    });
});