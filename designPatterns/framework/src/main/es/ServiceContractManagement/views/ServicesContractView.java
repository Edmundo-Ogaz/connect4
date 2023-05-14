package main.es.ServiceContractManagement.views;

import main.es.ServiceContractManagement.models.ServicesContract;
import main.es.utils.models.date.Date;
import main.es.utils.models.date.Month;
import main.es.utils.views.Console;

public class ServicesContractView {

	private ServicesContract servicesContract;

	public ServicesContractView(ServicesContract servicesContract) {
		this.servicesContract = servicesContract;
	}

	public void writeln() {
		Console console = new Console();
		console.writeln("Contrato de Servicios: " + this.servicesContract.getYear());
		Date date = new Date(1, Month.JANUARY, this.servicesContract.getYear());
		for (int i = 0; i < this.servicesContract.getTimetable().length; i++) {
			console.write("(" + (i + 1) + ") " + date.toString() + " - ");
			if (this.servicesContract.getTimetable()[i] == null) {
				console.writeln("Anulado");
			} else {
				console.writeln(this.servicesContract.getTimetable()[i].toString());
			}
			date = date.next();
		}
	}
}
