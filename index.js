const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const posts = [
    { id: 1, name: 'myung1' },
    { id: 2, name: 'myung2' },
    { id: 3, name: 'myung3' },
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(c => c.id === parseInt(req.params.id));
    if (!post) {
        //object no found 404
        return res.status(404).send('id가 발견되지 않았습니다.');
    } else {
        res.send(post);
    }
});

// ************ create 구간 Joi validation
app.post('/api/posts', (req, res) => {

    const { error } = validatePost(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const post = {
        id: posts.length + 1,
        name: req.body.name
    };
    posts.push(post); // posts데이터 안에 post새로운 데이터 넣기
    res.send(post);
})

// ************ update 구간
app.put('/api/posts/:id', (req, res) => {
    const post = posts.find(c => c.id === parseInt(req.params.id));
    if (!post) {
        //object no found 404
        return res.status(404).send('id가 발견되지 않았습니다.');
    }

    const { error } = validatePost(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    post.name = req.body.name;
    res.send(post);

})

//************ delete 구간
app.delete('/api/posts/:id', (req, res) => {
    const post = posts.find(c => c.id === parseInt(req.params.id));
    if (!post) {
        //object no found 404
        return res.status(404).send('id가 발견되지 않았습니다.');
    }

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.send(post);
})


function validatePost(post) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(post);
}




const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`PORT Number >>>> ${port}`));

// app.post()
// app.put()
// app.delete()
