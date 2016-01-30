## Website built on NodeJS/Express

### How to install

1. > >  Clone repo
```bash
$ git clone https://github.com/xDinomode/dino-website.git
```

2. > > ```bash
$ cd dino-website
```

3. > > ```bash
$ npm install --save
```

4. > > Inside of `/config`, create a file named  `database.js` and place the following inside
```javascript
module.exports = {
  "url" : "mongodb://localhost/YourDatabase",
  "secret" : "ReplaceThisWithRandomString"
};
```

5. > > Start up [MongoDB](https://mongodb.org)
```bash
$ mongod
```

6. > > Start the app and go to localhost:3000
```bash
$ node .
```



##### I'm running it here currently
[dinosaurscode.xyz](http://dinosaurscode.xyz)

![alt tag](http://i.imgur.com/B2fjKuJ.png)
