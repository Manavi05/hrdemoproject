sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Dashboard", {
        onInit: function () {
            var oDashModel = new JSONModel({
                TotalEmployees: 0,
                PendingLeaves: 0,
                AttendanceAlertsCount: 0,
                DeptDistribution: [],
                MonthlyLeaveTrend: [],
                AlertList: []
            });
            this.getView().setModel(oDashModel, "dashLocal");

            // Fetch data after metadata is loaded to ensure OData services are ready
            this.getOwnerComponent().getModel().metadataLoaded().then(this._fetchDashboardData.bind(this));
        },

        _fetchDashboardData: function () {
            var oMainModel = this.getOwnerComponent().getModel(); // Maps to Employees/Attendance
            var oLeaveModel = this.getOwnerComponent().getModel("leaveModel"); // Specific model name for Leave
            var oLocal = this.getView().getModel("dashLocal");

            // 1. Fetch Employees (Working in your screenshot)
            oMainModel.read("/EmployeesSet", {
                success: function (oData) {
                    var aEmp = oData.results;
                    oLocal.setProperty("/TotalEmployees", aEmp.length);
                    
                    var mDepts = {};
                    aEmp.forEach(emp => {
                        var sDept = emp.DEPARTMENT || "Other";
                        mDepts[sDept] = (mDepts[sDept] || 0) + 1;
                    });
                    oLocal.setProperty("/DeptDistribution", Object.keys(mDepts).map(k => ({ Dept: k, Count: mDepts[k] })));
                }
            });

            // 2. Fetch Attendance Alerts (Missing in your screenshot)
            oMainModel.read("/Attendance", {
                success: function (oData) {
                    var aAtt = oData.results;
                    // Filter specifically for Late and Absent records
                    var aAlerts = aAtt.filter(item => item.Status === "Late" || item.Status === "Absent");
                    oLocal.setProperty("/AttendanceAlertsCount", aAlerts.length);
                    oLocal.setProperty("/AlertList", aAlerts);
                }
            });

            // 3. Fetch Leave Requests using the 'leaveModel'
            oLeaveModel.read("/LeaveRequests", {
                success: function (oData) {
                    var aLeaves = oData.results;
                    
                    // Filter for 'Pending' status as required
                    var iPending = aLeaves.filter(l => l.Status === "Pending").length;
                    oLocal.setProperty("/PendingLeaves", iPending);

                    // Group by Month for the Bar Chart
                    var mMonths = {};
                    aLeaves.forEach(leave => {
                        var sDate = leave.FromDate || ""; // Key from your Leave model
                        var sMonth = sDate.substring(0, 7); 
                        if(sMonth) mMonths[sMonth] = (mMonths[sMonth] || 0) + 1;
                    });
                    oLocal.setProperty("/MonthlyLeaveTrend", Object.keys(mMonths).sort().map(m => ({ Month: m, Count: mMonths[m] })));
                },
                error: function() {
                    console.error("Failed to read from leaveModel. Check your manifest.json datasource.");
                }
            });
        }
    });
});