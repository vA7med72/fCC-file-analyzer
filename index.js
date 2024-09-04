var express = require('express');
const multer = require('multer');
var app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let name = req.file.filename;
  let size = req.file.size;
  let type = req.file.mimetype;
  res.json({'name': name, 'type': type, 'size': size})
})

const port = 3000;

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});