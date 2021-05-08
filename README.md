## User Routes
<table border="1">
<tr><td>Get user By id</td><td>/users/:id</td></tr>
<tr><td>Get user By auth id</td><td>/users/auth/:id</td></tr>
<tr><td>Get all projects</td><td>/projects</td></tr>
<tr><td>Get project By id</td><td>/projects/:id</td></tr>
<tr><td>Get projects By user id</td><td>/projects/users/:userId</td></tr>
<tr><td>Get invested projects By user id</td><td>/projects/users/fundings/:userId</td></tr>
<tr><td>Get images By project id</td><td>/images/projects/:projectId</td></tr>
<tr><td>Get fundings By project id</td><td>/fundings/projects/:project_id</td></tr>
<tr><td>Get fundings By user id</td><td>/fundings/users/:user_id</td></tr>
<tr><td>Get Comments By project id</td><td>/comments/projects/:project_id</td></tr>
<tr><td>Post user</td><td>/users</td></tr>
<tr><td>Post project</td><td>/projects</td></tr>
<tr><td>Post funding</td><td>/fundings</td></tr>
<tr><td>Post Comment</td><td>/comments</td></tr>
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
var data = JSON.stringify({
  "image": "https://unsplash.com/photos/kiNWOQgIOvU",
  "name": "Demo",
  "description": "Description of the demo project",
  "target_amount": 10000,
  "target_date": "Jun 10, 2021",
  "min_amount": 10,
  "round": 1,
  "contract": "This is demo contract",
  "user_id": 1,
  "link": "http://www.demo.com'"
});

var config = {
  method: 'post',
  url: 'http://localhost:8080/projects',
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