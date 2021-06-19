const fs = require('fs')
const db = require('../models')
const path = require('path')
const sharp = require('sharp')
const uuid = require('uuid')

const imageChecker = (filename) => {
	const imageExtList = ['jpeg', 'jpg', 'png', 'gif', 'svg', 'tiff', 'bmp']
	if (filename.length < 1 || !filename.includes('.')) {
		return false
	}

	const extSplit = filename.split('.')

	if (extSplit.length <= 1) {
		return false
	}

	const ext = extSplit[extSplit.length - 1]

	return imageExtList.includes(ext.toLowerCase())
}
const getBusboyData = (busboy) => {
	return new Promise((resolve, reject) => {
		const formData = new Map()

		busboy.on('field', (field, val) => {
			formData.set(field, val)
		})

		busboy.on('file', async (_, file, filename) => {
			resolve({
				file,
				filename,
				formData,
			})
		})
	})
}
const getFileSize = (path) => {
	return new Promise((resolve, reject) => {
		fs.stat(path, (error, stats) => {
			if (error) {
				resolve(0)
			}
			console.log(path, stats, typeof stats)
			resolve(stats.size)
		})
	})
}
const videoChecker = (filename) => {
	const videoExtList = [
		'3g2',
		'3gp',
		'aaf',
		'asf',
		'avchd',
		'avi',
		'drc',
		'flv',
		'm2v',
		'm4p',
		'm4v',
		'mkv',
		'mng',
		'mov',
		'mp2',
		'mp4',
		'mpe',
		'mpeg',
		'mpg',
		'mpv',
		'mxf',
		'nsv',
		'ogg',
		'ogv',
		'qt',
		'rm',
		'rmvb',
		'roq',
		'svi',
		'vob',
		'webm',
		'wmv',
		'yuv',
	]
	if (filename.length < 1 || !filename.includes('.')) {
		return false
	}

	const extSplit = filename.split('.')

	if (extSplit.length <= 1) {
		return false
	}

	const ext = extSplit[extSplit.length - 1]

	return videoExtList.includes(ext.toLowerCase())
}
const createThumbnailFS = (file, filename, user) => {
	return new Promise((resolve) => {
		// const thumbnailFilename = uuid.v4();
		const thumbnailFilename = uuid.v4()

		const readStream = fs.createReadStream(file.metadata.filePath)
		const writeStream = fs.createWriteStream(path.join('data/thumbnails', thumbnailFilename))
		// const decipher = crypto.createDecipheriv('aes256', CIPHER_KEY, file.metadata.IV);

		readStream.on('error', (e) => {
			console.log('File service upload thumbnail error', e)
			resolve(file)
		})

		writeStream.on('error', (e) => {
			console.log('File service upload write thumbnail error', e)
			resolve(file)
		})

		try {
			const imageResize = sharp()
				.resize(300)
				.on('error', (e) => {
					console.log('resize error', e)
					resolve(file)
				})

			readStream.pipe(imageResize).pipe(writeStream)

			writeStream.on('finish', async () => {
				const createdThumbnail = await db.Thumbnail.create({
					name: filename,
					user: user.id,
					path: path.join('data/thumbnails', thumbnailFilename),
				})

				const updatedFile = await db.File.findByIdAndUpdate(
					file._id,
					{$set: {'metadata.hasThumbnail': true, 'metadata.thumbnailID': createdThumbnail._id}},
					{new: true}
				)

				// let updatedFile = getUpdatedFile.value

				// updatedFile = {
				// 	...updatedFile,
				// 	metadata: {
				// 		...updatedFile.metadata,
				// 		hasThumbnail: true,
				// 		thumbnailID: 'thumbnailModel._id',
				// 	},
				// }

				// resolve(updatedFile)
				resolve(updatedFile)
			})
		} catch (e) {
			console.log('Thumbnail error', e)
			resolve(file)
		}
	})
}
const createThumbnailAny = async (currentFile, filename, user) => {
	// if (currentFile.metadata.personalFile || env.dbType === "s3") {

	//     return await createThumbnailS3(currentFile, filename, user);

	// } else if (env.dbType === "mongo") {

	//     return await createThumbnailMongo(currentFile, filename, user);

	// } else {

	//     return await createThumbnailFilesystem(currentFile, filename, user);
	// }
	return await createThumbnailFS(currentFile, filename, user)
}
module.exports = {
	imageChecker,
	getBusboyData,
	getFileSize,
	videoChecker,
	createThumbnailFS,
	createThumbnailAny,
}
