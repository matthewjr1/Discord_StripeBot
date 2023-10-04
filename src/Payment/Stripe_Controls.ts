import {Stripe} from "stripe";
const {StripeAPIKey} = require('../../config.json');
// @ts-ignore
const stripe_conn = new Stripe(StripeAPIKey);

export async function Get_AcctNumber(data: any) {
    let email = data[0].email;

    const customers = await stripe_conn.customers.search({
        query: 'email:\''+email+'\'',
    });

    let customer = customers.data[0];
    let CusID = customer.id;
    let CusBal = customer.balance;
    let CusCurrency = customer.currency;
    let CusDelinquent = customer.delinquent;
    let CusEmail = customer.email;
    let CusName = customer.name;
    let CusAddressObj = customer.address;
    let CusCity = CusAddressObj.city;
    let CusAddr = CusAddressObj.line1;
    let CusZip = CusAddressObj.postal_code;
    let CusState = CusAddressObj.state;
    // @ts-ignore

    return CusID;
}
export async function Get_CusName(data: any) {
    let email = data[0].email;

    const customers = await stripe_conn.customers.search({
        query: 'email:\''+email+'\'',
    });

    let customer = customers.data[0];
    let CusID = customer.id;
    let CusBal = customer.balance;
    let CusCurrency = customer.currency;
    let CusDelinquent = customer.delinquent;
    let CusEmail = customer.email;
    let CusName = customer.name;
    let CusAddressObj = customer.address;
    let CusCity = CusAddressObj.city;
    let CusAddr = CusAddressObj.line1;
    let CusZip = CusAddressObj.postal_code;
    let CusState = CusAddressObj.state;
    // @ts-ignore

    return CusName;
}
export async function Get_CustomerPortal(data: any) {


    const session = await stripe_conn.billingPortal.sessions.create({
        // @ts-ignore
        customer: data,
        return_url: 'https://example.com/account',
    });
    // @ts-ignore

    if(session === null){
        return false;
    }else{
        return session.url;
    }


}