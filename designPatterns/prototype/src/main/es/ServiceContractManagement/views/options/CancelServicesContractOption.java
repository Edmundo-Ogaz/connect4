package main.es.ServiceContractManagement.views.options;

import main.es.ServiceContractManagement.models.ServicesContract;

public class CancelServicesContractOption extends DateDialogOption {

    public CancelServicesContractOption(ServicesContract servicesContract) {
        super("Cancelar Horas de un día del Contrato de Servicios", servicesContract);
    }

    @Override
    public void interact_() {
        servicesContract.cancel(this.date);
    }
}
