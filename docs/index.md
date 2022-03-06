# Style Box

The Style Box is a platform that integrates the idea of e-commerce and social network. It has three sections: ‘design for you’, ‘design for others’ and ‘favorite ootd sharing’. The Style Box lets the customer get customized clothing shopping experience, gives stylists opportunities to show their talents and maintains an active fashion community. Our platform provides one-stop service, including outfit fixing, shopping, and delivery. The customer can pick up a stylist on our website to help them select clothing items and design the outfits. The customer will get a style report and buy all the clothing items on our website. Eventually, a style box would be delivered to the customer containing all they need to become a fashion insider.

## User Manual

Users can visit our website here: https://stylebox5.herokuapp.com/.

You can login as a customer or a stylist. If you are a customer, you can login to finish the quiz about your body shape, preference and favorite styles, which can help stylists to make the most customized recommendation for you. You can also modify the information in the future. If you are a stylist, you can modify your profile including photos, certificates and introduction to attract more customers. Additionally, all users can modify their account setting.

## API Reference

### User

#### GET get account setting

GET /account

##### Response data

status code **200**

|Name|Type|Required|Restriction|Description|
|---|---|---|---|---|
|» email|string|true|none|none|
|» phone|string|true|none|none|
|» address|string|true|none|none|
|» payment|string|true|none|none|
|» facebook|string|true|none|none|
|» nickname|string|true|none|none|
|» username|string|true|none|none|

#### POST modify account setting

POST /account

##### Request Param

|Name|Position|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» email|body|string|true|none|
|» phone|body|string|true|none|
|» address|body|string|true|none|
|» payment|body|string|true|none|
|» facebook|body|string|true|none|
|» nickname|body|string|true|none|


##### Response

|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|

#### POST create customer profile

POST /customer/profile

##### Request Param

|Name|Position|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» gender|body|string|true|none|
|» ftSize|body|string|true|none|
|» inSize|body|string|true|none|
|» weight|body|string|true|none|
|» shirtSize|body|string|true|none|
|» bottomSize|body|string|true|none|
|» jeanSize|body|string|true|none|
|» shoeSize|body|string|true|none|
|» styleSet|body|[string]|true|none|

##### Response

|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

#### GET get customer profile

GET /customer/profile

##### Response

status code **200**

|Name|Type|Required|Restriction|Description|
|---|---|---|---|---|
|» gender|string|true|none|none|
|» ftSize|string|true|none|none|
|» inSize|string|true|none|none|
|» weight|string|true|none|none|
|» shirtSize|string|true|none|none|
|» bottomSize|string|true|none|none|
|» jeanSize|string|true|none|none|
|» shoeSize|string|true|none|none|
|» style|[string]|true|none|none|

#### POST register

POST /register/{role}

##### Request Param

|Name|Position|Type|Required|Description|
|---|---|---|---|---|
|role|path|string|true|if customer 0; else 1|
|body|body|object|false|none|
|» password|body|string|true|none|
|» email|body|string|true|none|
|» username|body|string|true|none|


##### Response

|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|


#### GET get stylist profile

GET /stylist/profile

##### Response

status code **200**

|Name|Type|Required|Restriction|Description|
|---|---|---|---|---|
|» nickname|string|true|none|none|
|» photo|string|true|none|none|
|» intro|string|true|none|none|
|» gender|string|true|none|none|
|» style|[string]|true|none|none|
|» age|integer|true|none|none|
|» userName|string|true|none|none|
|» email|string|true|none|none|
|» facebook|string|true|none|none|
|» rate|integer|true|none|none|
|» followerNum|integer|true|none|none|
|» likeNum|integer|true|none|none|
|» display|[object]|true|none|none|
|»» image|string|true|none|none|
|»» idea|string|true|none|none|

#### POST create stylist profile

POST /stylist/profile

##### Request Param

|Name|Position|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» photo|body|string|true|none|
|» intro|body|string|true|none|
|» gender|body|string|true|none|
|» style|body|[string]|true|none|
|» age|body|integer|true|none|

##### Response

|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|


#### POST login

POST /login

##### Request Param

|Name|Position|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» password|body|string|true|none|
|» username|body|string|true|or email|

##### Response

|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

#### GET logout

GET /user/logout

##### Response

|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

## About Us!

We're Black Box, a team consisting of five enthusiastic developers. We are looking forward to delivering the best user experience to our customers.
