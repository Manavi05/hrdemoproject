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
            // Setup KPI model for tiles
            var oStatsModel = new JSONModel({
                total: 0,
                pending: 0,
                approved: 0
            });
            this.getView().setModel(oStatsModel, "stats");

            // Recalculate stats whenever data is loaded or changed in SAP
            var oModel = this.getOwnerComponent().getModel();
            oModel.attachRequestCompleted(function() {
                this._updateTileNumbers();
            }.bind(this));
        },

        _updateTileNumbers: function () {
            var oModel = this.getView().getModel();
            var oStatsModel = this.getView().getModel("stats");
            var oAllData = oModel.getProperty("/");
            var aItems = [];

            // Extract items belonging to your SEGW Entity Set
            Object.keys(oAllData).forEach(function(sKey) {
                if (sKey.startsWith("DocumentsSet")) {
                    aItems.push(oAllData[sKey]);
                }
            });

            if (aItems.length > 0) {
                oStatsModel.setProperty("/total", aItems.length);
                oStatsModel.setProperty("/pending", aItems.filter(i => i.STATUS === "Pending").length);
                oStatsModel.setProperty("/approved", aItems.filter(i => i.STATUS === "Approved").length);
            }
        },

        onUpload: function () {
            var oFileUploader = this.byId("fileUploader");
            var sFileName = oFileUploader.getValue();

            if (!sFileName) {
                MessageToast.show("Please select a file first");
                return;
            }

            var oModel = this.getView().getModel();
            
            // Prepare the payload for SEGW (Matching your SEGW Property names)
            var oNewEntry = {
                "DOC_NAME": sFileName,
                "CATEGORY": "General", 
                "UPLOAD_DATE": new Date().toISOString().split('T')[0].replace(/-/g, ""), // Formats as YYYYMMDD
                "STATUS": "Pending",
                "LINK": "https://your-sap-server.com/sap/opu/odata/sap/ZPROJECT/DocumentsSet('" + sFileName + "')/$value"
            };

            // Post the record to SAP
            oModel.create("/DocumentsSet", oNewEntry, {
                success: function() {
                    MessageToast.show("Document record created in SAP!");
                    oFileUploader.clear();
                    // The table refreshes automatically because it is bound to the OData model
                },
                error: function() {
                    MessageToast.show("Error: Could not save record to SAP.");
                }
            });
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query");
            var aFilters = [];
            if (sQuery) {
                aFilters.push(new Filter("DOC_NAME", FilterOperator.Contains, sQuery));
            }
            this.byId("docsTable").getBinding("items").filter(aFilters);
        },

        onDownload: function (oEvent) {
            var sLink = oEvent.getSource().getBindingContext().getProperty("LINK");
            if (sLink) {
                window.open(sLink, "_blank");
            }
        }
    });
});