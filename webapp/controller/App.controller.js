sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Log, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("opensap.movies.controller.App", {
		
		formatter: formatter,
		
		onInit: function () {
			Log.info("Controller has been initialized.");
		},
		onBeforeRendering: function () {
			Log.info("The view will shortly be rendered.");
		},
		onAfterRendering: function () {
			Log.info("The view has been rendered.");
		},

		onExit: function () {
			Log.info("Controller will shortly been destroyed.");
		},

		onPress: function (sValue) {
			sap.ui.require(["sap/m/MessageToast"], function (oMessage) {
				var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				oMessage.show(oResourceBundle.getText("search") + sValue);
			}.bind(this));
			
			var sCity = this.byId("city").getValue(),
				sGenre = this.byId("genre").getSelectedItem().getKey(),
				oCalendar = this.byId("calendar"),
				oRowBinding = oCalendar.getBinding("rows"),
				oFilterGenre,
				oFilterCity;
			
			// Создаем фильтры для жанра и города согласно данным, введенным пользователем
			oFilterGenre = sGenre ? new Filter("genre", FilterOperator.EQ, sGenre) : null;
			oFilterCity = sCity ? new Filter("info", FilterOperator.Contains, sCity) : null;
			
			// Применяем фильтр "Жанр" к строкам календаря
			oRowBinding.filter(oFilterGenre);
			
			// Применяем фильтр "Город" к местам строки календаря
			var aRows = oCalendar.getAggregation("rows");
			aRows.forEach(function (oItem) {
				var oAppointmentsBinding = oItem.getBinding("appointments");
				oAppointmentsBinding.filter(oFilterCity);
			});
		}
	});
});