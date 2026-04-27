sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Documents", {
        onInit: function () {
            var oData = {
                EmployeeDocs: [
                    {
                        EmployeeName: "Alex Rivera",
                        DocName: "Passport_Copy.pdf",
                        Category: "Identity Proof",
                        UploadDate: "Apr 15, 2026",
                        Status: "Verified",
                        State: "Success",
                        Photo: "https://randomuser.me/api/portraits/men/1.jpg"
                    },
                    {
                        EmployeeName: "Sarah Jenkins",
                        DocName: "MBA_Degree.pdf",
                        Category: "Education",
                        UploadDate: "Apr 20, 2026",
                        Status: "Pending",
                        State: "Warning",
                        Photo: "https://randomuser.me/api/portraits/women/44.jpg"
                    },
                    {
                        EmployeeName: "Michael Chen",
                        DocName: "AWS_Solutions_Architect.pdf",
                        Category: "Certifications",
                        UploadDate: "Mar 10, 2026",
                        Status: "Verified",
                        State: "Success",
                        Photo: "https://randomuser.me/api/portraits/men/10.jpg"
                    },
                    {
                        EmployeeName: "Emma Wilson",
                        DocName: "Experience_Letter.pdf",
                        Category: "Previous Employment",
                        UploadDate: "Apr 25, 2026",
                        Status: "New",
                        State: "Information",
                        Photo: "https://randomuser.me/api/portraits/women/65.jpg"
                    }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var aFilter = [];
            if (sQuery && sQuery.length > 0) {
                aFilter.push(new Filter("EmployeeName", FilterOperator.Contains, sQuery));
            }
            var oTable = this.byId("docsTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        }
    });
});