package main.es.ServiceContractManagement.views.options;

import main.es.ServiceContractManagement.models.ServicesContract;
import main.es.ServiceContractManagement.views.ServicesContractView;
import main.es.utils.views.Console;

public class ListServicesContractOption extends ServicesContractOption {

    public ListServicesContractOption(ServicesContract servicesContract) {
        super("Listado Contratos de Servicios", servicesContract);
    }

    @Override
    public void interact() {
        Console.getInstance().writeln();
        new ServicesContractView(this.servicesContract).writeln();
    }
}
