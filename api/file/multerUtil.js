var multer = require('multer')
var path = require("path");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		var myPath = path.normalize(__dirname+'/../../public/files')
		cb(null, myPath)
	},
	 //给上传文件重命名，获取添加后缀名
	  filename: function (req, file, cb) {


	      var fileFormat = (file.originalname).split(".");
		  		  console.log('~~~~~~')
		  		  console.log(fileFormat[0])
	      cb(null, fileFormat[0] + '-' + file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	  }
});

var multerUtil = multer({
	storage: storage
})

module.exports = multerUtil;
