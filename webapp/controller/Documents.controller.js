sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Documents", {
        onInit: function () {
            // 1. Initialize the stats model
            var oStatsModel = new JSONModel({
                total: 0,
                pending: 0,
                approved: 0
            });
            this.getView().setModel(oStatsModel, "stats");

            // 2. Get the OData model (Default model from manifest)
            var oModel = this.getOwnerComponent().getModel();
            
            // 3. Attach to requestCompleted to catch the data once it arrives from SAP
            oModel.attachRequestCompleted(function() {
                this._calculateNumbers();
            }.bind(this));
        },

        _calculateNumbers: function () {
            var oModel = this.getView().getModel();
            var oStatsModel = this.getView().getModel("stats");
            
            // Get all data from the OData model cache
            var oAllData = oModel.getProperty("/");
            var aItems = [];

            // Extract only the objects that belong to your EntitySet
            // We use Object.keys to find entries like "DOCUMENTSSet('ID')"
            Object.keys(oAllData).forEach(function(sKey) {
                if (sKey.startsWith("DocumentsSet")) {
                    aItems.push(oAllData[sKey]);
                }
            });

            if (aItems.length > 0) {
                var iTotal = aItems.length;
                // Note: Ensure 'STATUS' matches the property name in your SEGW screenshot
                var iPending = aItems.filter(function(item) { return item.STATUS === "Pending"; }).length;
                var iApproved = aItems.filter(function(item) { return item.STATUS === "Approved"; }).length;

                oStatsModel.setProperty("/total", iTotal);
                oStatsModel.setProperty("/pending", iPending);
                oStatsModel.setProperty("/approved", iApproved);
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var aFilter = [];
            if (sQuery) {
                // Property name must match your SEGW EMP_NAME exactly
                aFilter.push(new Filter("EMP_NAME", FilterOperator.Contains, sQuery));
            }
            var oTable = this.byId("docsTable");
            var oBinding = oTable.getBinding("items");
            
            // Apply filter to table
            oBinding.filter(aFilter);

            // After filtering, the visible items change, so update numbers
            oBinding.attachEventOnce("dataReceived", function() {
                this._calculateNumbers();
            }.bind(this));
        },

        onDownloadDoc: function (oEvent) {
            var sLink = oEvent.getSource().getBindingContext().getProperty("LINK");
            if (sLink) {
                window.open(sLink, "_blank");
            }
        }
    });
});