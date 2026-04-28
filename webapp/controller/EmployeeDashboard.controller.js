sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, JSONModel, FlattenedDataset, FeedItem) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.EmployeeDashboard", {
        onInit: function () {
            var oData = {
                LeaveData: [
                    { Type: "Sick Leave", Days: 5 },
                    { Type: "Vacation", Days: 12 },
                    { Type: "Personal", Days: 3 },
                    { Type: "Remaining", Days: 10 }
                ],
                HoursData: [
                    { Day: "Mon", Hours: 8.5 },
                    { Day: "Tue", Hours: 9.0 },
                    { Day: "Wed", Hours: 8.0 },
                    { Day: "Thu", Hours: 8.2 },
                    { Day: "Fri", Hours: 7.5 }
                ],
                RecentTasks: [
                    { TaskName: "Q2 Security Audit", Deadline: "Due in 2 days", Priority: "High", State: "Error" },
                    { TaskName: "AWS IAM Policy Review", Deadline: "Due tomorrow", Priority: "Medium", State: "Warning" },
                    { TaskName: "Update Documentation", Deadline: "Completed", Priority: "Low", State: "Success" }
                ]
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            this._initCharts();
        },

        _initCharts: function () {
            // Leave Balance Chart
            var oLeaveVizFrame = this.byId("leaveVizFrame");
            var oLeaveDataset = new FlattenedDataset({
                dimensions: [{ name: "Category", value: "{Type}" }],
                measures: [{ name: "Days", value: "{Days}" }],
                data: { path: "/LeaveData" }
            });
            oLeaveVizFrame.setDataset(oLeaveDataset);
            oLeaveVizFrame.addFeed(new FeedItem({ uid: "size", type: "Measure", values: ["Days"] }));
            oLeaveVizFrame.addFeed(new FeedItem({ uid: "color", type: "Dimension", values: ["Category"] }));

            // Working Hours Chart
            var oHoursVizFrame = this.byId("hoursVizFrame");
            var oHoursDataset = new FlattenedDataset({
                dimensions: [{ name: "Day", value: "{Day}" }],
                measures: [{ name: "Hours", value: "{Hours}" }],
                data: { path: "/HoursData" }
            });
            oHoursVizFrame.setDataset(oHoursDataset);
            oHoursVizFrame.addFeed(new FeedItem({ uid: "valueAxis", type: "Measure", values: ["Hours"] }));
            oHoursVizFrame.addFeed(new FeedItem({ uid: "categoryAxis", type: "Dimension", values: ["Day"] }));
        }
    });
});