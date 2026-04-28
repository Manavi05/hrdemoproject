sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.EmpDocuments", {
        onInit: function () {
            var oData = {
                Documents: [
                    {
                        fileName: "Passport_Copy.pdf",
                        category: "Identification",
                        uploadDate: "2026-03-15",
                        size: "1.2 MB",
                        icon: "sap-icon://pdf-attachment"
                    },
                    {
                        fileName: "Employment_Contract.pdf",
                        category: "Legal",
                        uploadDate: "2026-01-10",
                        size: "2.5 MB",
                        icon: "sap-icon://pdf-attachment"
                    },
                    {
                        fileName: "AWS_Certified_Architect.jpg",
                        category: "Certifications",
                        uploadDate: "2026-04-20",
                        size: "850 KB",
                        icon: "sap-icon://attachment-photo"
                    }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.byId("docsTable");
            var oBinding = oTable.getBinding("items");
            var aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter("fileName", FilterOperator.Contains, sQuery));
            }
            oBinding.filter(aFilters);
        },

        onUpload: function () {
            var oFileUploader = this.byId("fileUploader");
            if (!oFileUploader.getValue()) {
                MessageToast.show("Please select a file first");
                return;
            }
            MessageToast.show("Uploading " + oFileUploader.getValue() + "...");
            // Logic to refresh model would go here
        },

        onView: function (oEvent) {
            var sFileName = oEvent.getSource().getBindingContext().getProperty("fileName");
            MessageToast.show("Opening viewer for: " + sFileName);
        },

        onDownload: function (oEvent) {
            var sFileName = oEvent.getSource().getBindingContext().getProperty("fileName");
            MessageToast.show("Downloading: " + sFileName);
        }
    });
});