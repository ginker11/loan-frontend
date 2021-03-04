import React from 'react';
import companyResource from './companies/Company';
import contactResource from './contacts/Contacts';
import financingSourceResource from './financing_sources/FinancingSources';
import lienPositionResource from './lien_positions/LienPosition';
import projectResource from './projects/Projects';
import borrowerResource from './borrowers/Borrower';
import projectFinancingSourceResource from './project_financing_sources/ProjectFinancingSources';
import borrowerCompanyOwnershipResource from './borrower_company_ownership/BorrowerCompanyOwnership';
import projectOperatingCompanyOwnershipResource from './project_operating_company_ownership/ProjectOperatingCompanyOwnerships';
import guarantorResource from './guarantors/Guarantors';
import debtServiceRatioResource from './debtServiceRatio/DebtServiceRatio';
export default [
    companyResource,
    contactResource,
    financingSourceResource,
    lienPositionResource,
    projectResource,
    borrowerResource,
    projectFinancingSourceResource,
    borrowerCompanyOwnershipResource,
    projectOperatingCompanyOwnershipResource,
    guarantorResource,
    debtServiceRatioResource
];