const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

let ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    //파일을 올리면 uploads 폴더에 저장됨
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    //파일을 어떤 이름으로 저장할지 ex) 시간_파일이름
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    //파일 종류 제한
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.mp4') {
        return cb(res.status(400).end('only mp4 is allowed'), false);
      }
      cb(null, true);
    }
  });
  const upload = multer({ storage: storage }).single('file');
  

router.post('/uploadfiles', (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err})
        }

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
});


router.post('/uploadVideo', (req, res) => {

     const video = new Video(req.body)

     video.save((err, doc) => {
       if(err) return res.json({ success: false, err})
       res.status(200).json({ success: true })
     })
    
});

router.post('/thumbnail', (req, res) => {
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
});

module.exports = router;
