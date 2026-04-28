sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ResponsivePopover",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/PlacementType"
], function (Controller, ResponsivePopover, List, StandardListItem, PlacementType) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.App", {

        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var sKey = oItem.getKey();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(sKey);
        },

        onLogout: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            var oRoleModel = this.getOwnerComponent().getModel("roleModel");

            if (oRoleModel) {
                // Clear role flags to hide UI elements
                oRoleModel.setProperty("/isHR", false);
                oRoleModel.setProperty("/isEmployee", false);
            }

            oRouter.navTo("RouteLogin");
        },

        onNotificationPress: function (oEvent) {
            var oButton = oEvent.getSource();

            if (!this._oPopover) {
                this._oPopover = new ResponsivePopover({
                    title: "Pending Notifications",
                    placement: PlacementType.Bottom,
                    contentWidth: "300px",
                    content: new List({
                        items: [
                            new StandardListItem({
                                title: "Leave Request",
                                description: "Sarah Jenkins: Sick Leave (3 days)",
                                icon: "sap-icon://appointment-2",
                                type: "Navigation"
                            }),
                            new StandardListItem({
                                title: "Document Uploaded",
                                description: "Alex Rivera uploaded Passport Copy",
                                icon: "sap-icon://doc-attachment",
                                type: "Navigation"
                            })
                        ]
                    })
                });
                this.getView().addDependent(this._oPopover);
            }
            this._oPopover.openBy(oButton);
        }
    });
});