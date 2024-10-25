// Section 1
const express = require('express');
const axios = require('axios');
const path = require('path');

// Section 2
const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

// Section 3
app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.get('/users', (req, res) => {
    axios.get('https://randomuser.me/api/?page=1&results=10')
        .then(response => {
            res.send(response.data);
        });
});

app.post('/api/user/insert', (req, res) => {
    const post_data = {
        records: [pre_post_data]
    };

    axios.post(
        updateCallTaskUrl,
        post_data
    )
        .then((response) => {
            if (response.data.results != null) {

                responseData = response.data.results[0];

                if (responseData.isSuccess) {
                    console.log("Success : " + responseData.isSuccess);
                }
                else {
                    console.log("Fail");
                }
            }
            else {
                console.log("");
            }
            console.log("--- ---------- END ------------ --- ");

        }, (error) => {
            console.log(error);
        });
});

// Section 4
app.listen(8082, () => {
    console.log('server started on port 8082');
});