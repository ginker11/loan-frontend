import React from 'react';
import projectResource from './projects/Projects';
import companyResource from './companies/Company';
import contactResource from './contacts/Contacts';
import financingSourceResource from './financing_sources/FinancingSources';
import lienPositionResource from './lien_positions/LienPosition';
import borrowerResource from './borrowers/Borrower';
import projectFinancingSourceResource from './project_financing_sources/ProjectFinancingSources';
import borrowerCompanyOwnershipResource from './borrower_company_ownership/BorrowerCompanyOwnership';
import projectOperatingCompanyOwnershipResource from './project_operating_company_ownership/ProjectOperatingCompanyOwnerships';
import guarantorResource from './guarantors/Guarantors';
import debtServiceRatioResource from './debtServiceRatio/DebtServiceRatio';
import usersResource from './users/User';
import inviteResource from './invite/index';
// import adminDashboard from './admin_dashboard/AdminDashboard'
// import staffUserResource from './staff_users/StaffUsers';
// eslint-disable-next-line import/no-anonymous-default-export
export default [
    projectResource,
    companyResource,
    contactResource,
    financingSourceResource,
    lienPositionResource,
    borrowerResource,
    projectFinancingSourceResource,
    borrowerCompanyOwnershipResource,
    projectOperatingCompanyOwnershipResource,
    guarantorResource,
    debtServiceRatioResource,
    usersResource,
    inviteResource,
    // adminDashboard,
    // staffUserResource
];