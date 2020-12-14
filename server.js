const express = require('express');
const path = require('path');
const app = express();
const Axios = require('axios')
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.post('/linkedin/accessToken', async (req, res) => {
  const REDIRECT_URL = req.body.redirect;

  try {
    console.log('Get linkedin token:', req.body.code);
    const response = await Axios.post(`https://www.linkedin.com/oauth/v2/accessToken?${new URLSearchParams({
      grant_type: 'authorization_code',
      code: req.body.code,
      redirect_uri: REDIRECT_URL,
      client_id: node.process.CLIENT_ID,
      client_secret: node.process.CLIENT_SECRET,
    }).toString()}`);
    console.log(response.data);
    res.json(response.data);
  } catch(err) {
    console.log(err);
    res.status(500).send('Erro ao recuprerar o token');
  }
})

app.get('/linkedin/user', async (req, res) => {
  try {
    const response = await Axios.get('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
      headers: {
        'Authorization': 'Bearer ' + req.cookies.token
      }
    })
    console.log(response.data);
    res.json(response.data);
  } catch(err) {
    console.log(err);
    res.status(500).send('Erro ao recuprerar o usuário');
  }
})

app.get('/teste', function (req, res) {
  res.send('Teste')
});

app.listen(process.env.PORT || 9000, () => {
  console.log('Listen');
});