package main.es.ServiceContractManagement.views.options;

import main.es.ServiceContractManagement.models.ServicesContract;

public class EnlargeServicesContractOption extends DateDialogAndDoubleOption {

    public EnlargeServicesContractOption(ServicesContract servicesContract) {
        super("Escalar Intervalo de Horas de un día del Contrato de Servicios", servicesContract);
    }

    @Override
    public void interact_() {
        this.servicesContract.enlarge(date, factor);

    }

}
