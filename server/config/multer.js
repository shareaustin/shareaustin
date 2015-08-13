module.exports = function(multer){
	var storage = multer.diskStorage({
	  destination: function(req, file, func){
	    func(null, __dirname + '/../uploads/')
	  },

	  filename: function(req, file, func){
	    func(null, file.originalname)
	  }
	});
	return multer({storage:storage})
}