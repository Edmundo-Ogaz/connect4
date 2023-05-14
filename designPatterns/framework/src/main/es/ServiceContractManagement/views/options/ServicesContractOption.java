package main.es.ServiceContractManagement.views.options;

import main.es.ServiceContractManagement.models.ServicesContract;
import main.es.utils.views.menu.Option;

abstract class ServicesContractOption extends Option {

    protected ServicesContract servicesContract;

    public ServicesContractOption(String string, ServicesContract servicesContract) {
        super(string);
        this.servicesContract = servicesContract;
    }

}
