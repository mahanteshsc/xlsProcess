const input1 = "The quick brown fox jumps over the lazy dog"
const function1 = (input) =>  input.split(" ").map((str, index) => str+(index+1) ).join(" ");
console.log(" Output 1 -> "+function1(input1));



const input2 = "bashful doc dopey grumpy happy sleepy sneezy"
const function2 = (input) =>  input.split(" ").reverse().join(" ");;
console.log(" Output 2 -> "+function2(input2));



const months = ["January" , "February" , "March" , "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const function3 = (input=1) =>  months[input-1];
console.log(" Output 31 -> "+function3(1));
console.log(" Output 32 -> "+function3(12));



const function4 = (input) => {
  let patt=/[1-9]+/i;
return patt.test(input) ? "Matches" : "Does not Match";
}
console.log(" Output 41 -> "+function4("a1c"));
console.log(" Output 42 -> "+function4("ac"));
console.log(" Output 43 -> "+function4("ac2"));




const compare = (arr1=[], arr2=[]) =>{
  if(arr1.length!= arr2.length) return false;
  for(let i =0; i<arr1.length; i++){
    if(arr1[i]!=arr2[i])
        return false;
  }
  return true;
}
console.log(" output51 -> "+compare([1,2],[1,3]));
console.log(" output52 -> "+compare([1,2],[1,2]));
console.log(" output53 -> "+compare([1,2,3],[1,2]));



const extractData = (response) =>{
let cartItem = response['cartItems'][0];
let item1= cartItem['itemInfo']['itemPageUrl'];
let minDelyDt = cartItem['itemInfo']['minDeliveryDate']

    let prod= item1.substring(item1.indexOf('prod2246'));
    let quantity =   ""+cartItem['qty'];
    let shipdays =   Math.ceil(Math.abs(new Date(minDelyDt)  -(new Date()))/(1000 * 60 * 60 * 24));
    let shipvalue =   cartItem['props']['shippingDiscountEligible']? "free-plus" : "";
    let subtotal =   "$"+cartItem['qty']*cartItem['priceInfo']['listPriceInCents']/100;
    let uprice =  "$"+cartItem['priceInfo']['listPriceInCents']/100;

    return {prod, quantity, shipdays, shipvalue, subtotal, uprice};
}

var responseData =
{
"cartItems": [{
		"id": "ci186012014536",
		"qty": 3,
		"itemInfo": {
            		"model": "UN55NU6950FXZA",
            		"itemNo": "980142010",
            		"minDeliveryDate": 1561938400000,
            		"name": "UN55NU6950FXZA - SAMSUNG 55\" Class 4K(2160p) Ultra HD Smart LED TV",
            		"skuId": "sku23018986",
            		"itemPageUrl": "/sams/samsung-55in-4k-2160p-uhdsmart-led-tv-6000-series/prod22464496.ip"
            		},
		"inventoryInfo": {
						"minQtyLimit": -1,
						"lowStockLevel": 5,
						"maxQtyLimit": -1,
						"itemLowInStockFlag": false,
						"stockLevel": "inStock"
						},
		"priceInfo": {
						"mapPriceInCents": 0,
						"listPriceInCents": 44900,
						"shippingAmountInCents": 0,
						"shippingAmount": 0,
						"originalPrice": 0,
						"itemTotalInCents": 44900,
						"totalMapPrice": 0,
						"originalPriceInCents": 0,
						"salesTax": 3500
						},
		"props": {
					"selectedChannel": "ONLINE",
					"shippingChargeIncluded": false,
					"shippingDiscountEligible": true,
					"freeShipEligible": false,
					"specialItem": false,
					"weightedItem": false,
					"onlineChannelMinLimitQty": -1,
					}
        }]
};
console.log(" output6 -> "+JSON.stringify(extractData(responseData)));
