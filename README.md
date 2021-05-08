## User Routes
<table border="1">
<tr><td>Get user By id</td><td>/users/:id</td></tr>
<tr><td>Get user By auth id</td><td>/users/auth/:id</td></tr>
<tr><td>Get project By id</td><td>/projects/:id</td></tr>
<tr><td>Get all projects</td><td>/projects</td></tr>
<tr><td>Get projects By user id</td><td>/projects/users/:userId</td></tr>
<tr><td>Get invested projects By user id</td><td>/projects/users/fundings/:userId</td></tr>
<tr><td>Get images By project id</td><td>/images/projects/:projectId</td></tr>
<tr><td>Post user</td><td>/users</td></tr>
<tr><td>Post project</td><td>/projects</td></tr>
</table>
<br><br>

#### POST user body
```js
var axios = require('axios');
var data = JSON.stringify({
  "name": "Kapil",
  "authId": "13"
});

var config = {
  method: 'post',
  url: 'localhost:8080/users',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
<br>
#### POST project body
```js
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('image', fs.createReadStream('/Users/kapilgarg/lighthouse/Defi-backend/db/images/Husky.jpeg'));
data.append('name', '"Demo Project"');
data.append('description', '"Description of the demo project"');
data.append('target_amount', '10000');
data.append('target_date', 'Jun 10, 2021');
data.append('min_amount', '10');
data.append('round', '1');
data.append('contract', 'This is demo contract');
data.append('user_id', '1');
data.append('link', 'http://www.demo.com');

var config = {
  method: 'post',
  url: 'localhost:8080/projects',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};
```