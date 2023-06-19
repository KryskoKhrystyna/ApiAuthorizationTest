import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage'
import user from '../fixtures/user.json';
import {loginViaApi} from '../support/helpers/helpers'; 
import { beforeEach } from 'mocha';


beforeEach('Login', () => {
  loginViaApi(user); 
  homePage.visit();
  homePage.getLoginOrRegisterButton().click();

})

it('search a product', () => {
  cy.request({
    method: 'GET',
    url: '/index.php?rt=product/search&keyword=shirt',
  }).then((response) => {
    expect(response.status).to.eq(200);
  })
})

it('should log out the user', () => {
  cy.request({
    method: 'GET',
    url: '/index.php?rt=account/logout',
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});