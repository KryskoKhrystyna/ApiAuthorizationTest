import formData from '../../fixtures/formData.json';

export function loginViaApi(user){
  let requestBody = {"user":{"email": "","password": ""}}

  requestBody.user.email = user.email;
  requestBody.user.password = user.password;

  cy.request({
    method: 'GET',
    url: '/index.php?rt=account/login',
  }).then(response => {
    const html = document.createElement('html')
    html.innerHTML = response.body

    const csrftoken = html.querySelector('input[name="csrftoken"]').value

    formData.password = user.password;
    formData.loginname = user.loginname;
    formData.csrftoken = csrftoken;

    return cy.request({
      method: 'POST',
      url: '/index.php?rt=account/account',
      form: true,
      body: formData,
    })
  })
}

