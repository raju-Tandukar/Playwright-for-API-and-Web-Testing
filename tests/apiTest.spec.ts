import { test, expect } from '@playwright/test';
import createUserData from '../test_data/userInfo.json'
import apiTestData from '../test_data/invalidUserInfo.json'

const baseUrl = 'https://automationexercise.com/api'

test.describe.configure({ mode: 'serial' });

test.afterAll('Data cleanup', async ({ request }) => {

    let response = await request.delete(baseUrl + '/deleteAccount', {
        form: {
            email: createUserData.email,
            password: createUserData.password
        }
    });
    const respBody = JSON.parse(await response.text())
    console.log((respBody));
    
    console.log('Verify response code is 200')
    expect((respBody.responseCode).toString()).toEqual('200')
    console.log('Verify User exists! message');
    expect((respBody.message)).toContain('Account deleted!')
    });

test('API Test1: POST To Create/Register User Account', async ({ request }) => {
    const response = await request.post(baseUrl +'/createAccount', {
        form: createUserData
    });
    const respBody = JSON.parse(await response.text())
    console.log((respBody));
    console.log('Verify response code is 200')
    expect((respBody.responseCode).toString()).toEqual('201')
    console.log('Verify User exists! message');
    expect((respBody.message)).toContain('User created!')
  });

test('API Test2: POST To Verify Login with valid details', async ({ request }) => {
        let response = await request.post(baseUrl + '/verifyLogin', {
            form: {
                email: createUserData.email,
                password: createUserData.password
            }
        });
        const respBody = JSON.parse(await response.text())
        console.log((respBody));
        
        console.log('Verify response code is 200')
        expect((respBody.responseCode).toString()).toEqual('200')
        console.log('Verify User exists! message');
        expect((respBody.message)).toContain('User exists!')
        
      });

test('API Test3: POST To Verify Login with invalid details', async ({ request }) => {
    let response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: apiTestData.invalidEmail,
            password: apiTestData.invalidPassword
        }
    });
    const respBody = JSON.parse(await response.text())
    console.log('Verify response code is 404')
    expect((respBody.responseCode).toString()).toEqual('404')
    console.log('Verify User not found! error message');
    expect((respBody.message)).toContain('User not found!')
    
  });
  
test('API Test4: POST To Search Product', async ({ request }) => {
    let response = await request.post(baseUrl + '/searchProduct', {
        form: {
            search_product: apiTestData.productName
        }
    });
    const respBody = JSON.parse(await response.text())
    console.log('Verify response code is 200')
    expect((respBody.responseCode).toString()).toEqual('200')
    console.log('Assert whether ' + apiTestData.productName + ' search term returns the expected products in response Json using Json path');
    respBody.products.forEach((item) => {
        expect((item.name).toLowerCase()).toContain(apiTestData.productName)
    })
  });