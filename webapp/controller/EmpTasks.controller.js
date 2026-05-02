sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/m/Label",
    "sap/m/TextArea"
], function (Controller, JSONModel, Filter, FilterOperator, Dialog, Button, Input, Select, Item, Label, TextArea) {
    "use strict";

    return Controller.extend("com.hr.portal.controller.EmpTasks", {
        onInit: function () {
            var oData = {
                Stats: { ToDo: 0, InProgress: 0, Completed: 0 },
                TaskList: [
                    { Title: "Update Security Groups", Description: "Review and prune unused AWS security groups", Priority: "High", Status: "In Progress", DueDate: "2026-04-30" },
                    { Title: "Quarterly Audit", Description: "Prepare documentation for IAM user audit", Priority: "Medium", Status: "To Do", DueDate: "2026-05-05" },
                    { Title: "CloudFront Config", Description: "Optimize cache behaviors for edge locations", Priority: "Low", Status: "Completed", DueDate: "2026-04-20" }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
            this._updateStats();
        },

        _updateStats: function () {
            var oModel = this.getView().getModel();
            var aTasks = oModel.getProperty("/TaskList") || [];
            var oStats = { ToDo: 0, InProgress: 0, Completed: 0 };

            aTasks.forEach(function (oTask) {
                if (oTask.Status === "To Do") oStats.ToDo++;
                else if (oTask.Status === "In Progress") oStats.InProgress++;
                else if (oTask.Status === "Completed") oStats.Completed++;
            });
            oModel.setProperty("/Stats", oStats);
        },

        onOpenTaskDialog: function () {
            this._showTaskDialog();
        },

        onEditTask: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            this._showTaskDialog(oContext);
        },

        _showTaskDialog: function (oContext) {
            var bIsEdit = !!oContext;
            var oModel = this.getView().getModel();
            
            // Local variables for inputs to avoid getCore().byId issues
            var oTitleInput = new Input({ value: bIsEdit ? oContext.getProperty("Title") : "" });
            var oDescInput = new TextArea({ value: bIsEdit ? oContext.getProperty("Description") : "" });
            var oStatusSelect = new Select({
                selectedKey: bIsEdit ? oContext.getProperty("Status") : "To Do",
                items: [
                    new Item({ key: "To Do", text: "To Do" }),
                    new Item({ key: "In Progress", text: "In Progress" }),
                    new Item({ key: "Completed", text: "Completed" })
                ]
            });

            var oDialog = new Dialog({
                title: bIsEdit ? "Edit Task" : "Add New Task",
                type: "Message",
                content: [
                    new Label({ text: "Title" }), oTitleInput,
                    new Label({ text: "Description", class: "sapUiSmallMarginTop" }), oDescInput,
                    new Label({ text: "Status", class: "sapUiSmallMarginTop" }), oStatusSelect
                ],
                beginButton: new Button({
                    text: "Save",
                    type: "Emphasized",
                    press: function () {
                        var oTaskData = {
                            Title: oTitleInput.getValue(),
                            Description: oDescInput.getValue(),
                            Status: oStatusSelect.getSelectedKey(),
                            Priority: bIsEdit ? oContext.getProperty("Priority") : "Medium",
                            DueDate: bIsEdit ? oContext.getProperty("DueDate") : "2026-05-15"
                        };

                        if (bIsEdit) {
                            oModel.setProperty(oContext.getPath(), oTaskData);
                        } else {
                            var aTasks = oModel.getProperty("/TaskList");
                            aTasks.push(oTaskData);
                            oModel.setProperty("/TaskList", aTasks);
                        }

                        this._updateStats();
                        oDialog.close();
                    }.bind(this)
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () { oDialog.close(); }
                }),
                afterClose: function () { oDialog.destroy(); }
            });

            this.getView().addDependent(oDialog);
            oDialog.open();
        },

        onFilterTasks: function (oEvent) {
            var sKey = oEvent.getParameter("selectedItem").getKey();
            var oBinding = this.byId("tasksTable").getBinding("items");
            oBinding.filter(sKey !== "All" ? new Filter("Status", FilterOperator.EQ, sKey) : []);
        }
    });
});