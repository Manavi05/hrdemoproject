sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, Fragment, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.Employees", {
        
        onInit: function () {
            var oDialogModel = new JSONModel({
                isEdit: false,
                title: ""
            });
            this.getView().setModel(oDialogModel, "dialogModel");
        },

        // 1. Open Dialog for NEW Employee
        onAddEmployeePress: function () {
            this.getView().getModel("dialogModel").setProperty("/isEdit", false);
            this.getView().getModel("dialogModel").setProperty("/title", "Add New Employee");
            this._openDialog().then(function() {
                this._clearForm();
            }.bind(this));
        },

        // 2. Open Dialog for EDITING Employee
        onEditEmployeePress: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext().getObject();
            this.getView().getModel("dialogModel").setProperty("/isEdit", true);
            this.getView().getModel("dialogModel").setProperty("/title", "Edit Employee: " + oItem.EMP_NAME);
            
            this._openDialog().then(function() {
                this.byId("newEmpId").setValue(oItem.EMP_ID);
                this.byId("newEmpName").setValue(oItem.EMP_NAME);
                this.byId("newEmail").setValue(oItem.EMAIL);
                this.byId("newRole").setValue(oItem.ROLE);
                this.byId("newDepartment").setSelectedKey(oItem.DEPARTMENT);
                this.byId("newStatus").setSelectedKey(oItem.STATUS);
            }.bind(this));
        },

        _openDialog: function() {
            var oView = this.getView();
            if (!this._oDialog) {
                return Fragment.load({
                    id: oView.getId(), // CRITICAL: This allows this.byId() to work
                    name: "com.hr.portal.view.fragments.AddEmployeeDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    oView.addDependent(this._oDialog);
                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
                return Promise.resolve();
            }
        },

        // 3. Save Logic (Create or Update)
        onSaveEmployee: function () {
            var oModel = this.getView().getModel();
            var bIsEdit = this.getView().getModel("dialogModel").getProperty("/isEdit");
            
            var oEntry = {
                "EMP_ID": this.byId("newEmpId").getValue(),
                "EMP_NAME": this.byId("newEmpName").getValue(),
                "EMAIL": this.byId("newEmail").getValue(),
                "ROLE": this.byId("newRole").getValue(),
                "DEPARTMENT": this.byId("newDepartment").getSelectedKey(),
                "STATUS": this.byId("newStatus").getSelectedKey()
            };

            if (!oEntry.EMP_ID || !oEntry.EMP_NAME) {
                MessageToast.show("Please fill required fields.");
                return;
            }

            sap.ui.core.BusyIndicator.show(0);
            var sPath = bIsEdit ? oModel.createKey("/EmployeesSet", { EMP_ID: oEntry.EMP_ID }) : "/EmployeesSet";
            var sMethod = bIsEdit ? "update" : "create";

            oModel[sMethod](sPath, oEntry, {
                success: function () {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show(bIsEdit ? "Updated!" : "Created!");
                    this.onCloseDialog();
                }.bind(this),
                error: function () {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error("Operation failed.");
                }
            });
        },

        // 4. Delete Logic
        onDeleteEmployee: function () {
            var oModel = this.getView().getModel();
            var sId = this.byId("newEmpId").getValue();
            var sPath = oModel.createKey("/EmployeesSet", { EMP_ID: sId });

            MessageBox.confirm("Confirm deletion of ID: " + sId, {
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        sap.ui.core.BusyIndicator.show(0);
                        oModel.remove(sPath, {
                            success: function () {
                                sap.ui.core.BusyIndicator.hide();
                                MessageToast.show("Employee deleted.");
                                this.onCloseDialog();
                            }.bind(this),
                            error: function () {
                                sap.ui.core.BusyIndicator.hide();
                                MessageBox.error("Delete failed.");
                            }
                        });
                    }
                }.bind(this)
            });
        },

        _clearForm: function() {
            this.byId("newEmpId").setValue("");
            this.byId("newEmpName").setValue("");
            this.byId("newEmail").setValue("");
            this.byId("newRole").setValue("");
        },

        onCloseDialog: function () {
            if (this._oDialog) { this._oDialog.close(); }
        }
    });
});