package main.es.ServiceContractManagement.views.options;

import main.es.ServiceContractManagement.models.ServicesContract;
import main.es.utils.views.Console;

public class CostServicesContractOption extends ServicesContractOption {

    public CostServicesContractOption(ServicesContract servicesContract) {
        super("Ver coste de Contrato de Servicios", servicesContract);
    }

    @Override
    public void interact() {
        Console.getInstance().writeln("Coste anual del contrato: " + servicesContract.getCost() + " Euros");

    }

}
