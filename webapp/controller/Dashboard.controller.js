sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, JSONModel, FlattenedDataset, FeedItem) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Dashboard", {
        onInit: function () {
            var oData = {
                Activities: [
                    { User: "Sarah Jenkins", Action: "requested sick leave", Time: "2m ago", Status: "pending", State: "Warning", Icon: "sap-icon://person-placeholder" },
                    { User: "Michael Chen", Action: "checked in late", Time: "15m ago", Status: "alert", State: "Error", Icon: "sap-icon://person-placeholder" },
                    { User: "Emma Wilson", Action: "completed onboarding", Time: "1h ago", Status: "success", State: "Success", Icon: "sap-icon://person-placeholder" },
                    { User: "James Martinez", Action: "submitted performance review", Time: "2h ago", Status: "success", State: "Success", Icon: "sap-icon://person-placeholder" }
                ],
                Approvals: [
                    { User: "Sarah Jenkins", Type: "Sick Leave", Days: "3 days", Icon: "sap-icon://person-placeholder" },
                    { User: "David Kim", Type: "Vacation", Days: "5 days", Icon: "sap-icon://person-placeholder" },
                    { User: "Anna Kowalski", Type: "Personal Leave", Days: "1 day", Icon: "sap-icon://person-placeholder" },
                    { User: "Robert Fox", Type: "Sick Leave", Days: "2 days", Icon: "sap-icon://person-placeholder" }
                ],
                DeptData: [ { Dept: "IT", Count: 85 }, { Dept: "Finance", Count: 30 }, { Dept: "Ops", Count: 90 }, { Dept: "HR", Count: 12 } ],
                LeaveTrend: [ { Month: "Jan", Total: 10 }, { Month: "Feb", Total: 15 }, { Month: "Mar", Total: 8 }, { Month: "Apr", Total: 22 } ]
            };
            this.getView().setModel(new JSONModel(oData));
            this._setupCharts();
        },

        _setupCharts: function() {
            var oPie = this.byId("idPieChart");
            var oLine = this.byId("idLineChart");

            oPie.setDataset(new FlattenedDataset({
                dimensions: [{ name: 'Dept', value: "{Dept}" }],
                measures: [{ name: 'Count', value: '{Count}' }],
                data: { path: "/DeptData" }
            }));
            oPie.addFeed(new FeedItem({ uid: "size", type: "Measure", values: ["Count"] }));
            oPie.addFeed(new FeedItem({ uid: "color", type: "Dimension", values: ["Dept"] }));

            oLine.setDataset(new FlattenedDataset({
                dimensions: [{ name: 'Month', value: "{Month}" }],
                measures: [{ name: 'Total', value: '{Total}' }],
                data: { path: "/LeaveTrend" }
            }));
            oLine.addFeed(new FeedItem({ uid: "valueAxis", type: "Measure", values: ["Total"] }));
            oLine.addFeed(new FeedItem({ uid: "categoryAxis", type: "Dimension", values: ["Month"] }));
        }
    });
});