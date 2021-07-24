const fs = require('fs')
const db = require('../models')
const path = require('path')
const sharp = require('sharp')
const uuid = require('uuid')
const fileService = require('../services/fileService')
const {
	getBusboyData,
	videoChecker,
	imageChecker,
	createThumbnailAny,
} = require('../utils/storageService')

const uploadFile = async (req, res, next) => {
	try {
		const baseDir = './data'
		busboy = req.busboy
		req.pipe(busboy)
		const {file, filename, formData} = await getBusboyData(busboy)
		if (!fs.existsSync(baseDir)) {
			fs.mkdirSync(baseDir)
		}
		const systemFileName = uuid.v4()
		const filePath = path.join(baseDir, systemFileName)
		const fileWriteStream = fs.createWriteStream(filePath)
		const totalStreamsToErrorCatch = [file, fileWriteStream]
		await file.pipe(fileWriteStream)

		const parent = formData.get('parent') || '/'
		const parentList = formData.get('parentList') || '/'
		const size = formData.get('size') || ''
		const personalFile = formData.get('personal-file') ? true : false
		let hasThumbnail = false
		let thumbnailID = ''
		const isVideo = videoChecker(filename)
		//svave file data to db
		const metadata = {
			parent,
			parentList,
			hasThumbnail,
			thumbnailID,
			isVideo,
			size,
			filePath,
			// IV: initVect,
		}
		// const filesize = getFileSize(filePath)
		const filesize = Number(size)
		const date = new Date()
		const currentFile = await db.File.create({
			filename,
			uploadDate: date.toISOString(),
			user: req.user.id,
			length: filesize,
			metadata,
		})
		// await awaitUploadStreamFS(
		// 	file.pipe(cipher),
		// 	fileWriteStream,
		// 	req,
		// 	metadata.filePath,
		// 	totalStreamsToErrorCatch
		// )
		const imageCheck = imageChecker(filename)
		console.log(currentFile.length, imageCheck)
		if (currentFile.length < 15728640 && imageCheck) {
			console.log('making thumb')
			const updatedFile = await createThumbnailAny(currentFile, filename, req.user)
			console.log('done', updatedFile)

			return res.json(updatedFile)
		} else {
			return res.json(currentFile)
		}

		// const file =
		res.send('done')
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const downloadFile = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.status(400).json({error: {message: 'you need to login to do that'}})
		}
		const user = req.user
		const fileID = req.params.id
		const currentFile = await db.File.findById(fileID)
		if (!currentFile) return res.status(404).json({error: {message: 'File not found'}})
		const filePath = currentFile.metadata.filePath
		const readStream = fs.createReadStream(filePath)
		res.set('Content-Type', 'binary/octet-stream')
		res.set('Content-Disposition', 'attachment; filename="' + currentFile.filename + '"')
		res.set('Content-Length', currentFile.metadata.size.toString())
		readStream.pipe(res)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getThumbnail = async (req, res, next) => {
	try {
		const thumbnail = await db.Thumbnail.findById(req.params.id)
		if (!thumbnail) res.status(400).json({error: {message: 'Thumbnail not found'}})
		const readStream = fs.createReadStream(thumbnail.path)
		readStream.pipe(res)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getList = async (req, res, next) => {
	try {
		const {searchQuery, parent, limit, sortBy} = req.query
		const fileList = await db.File.find({'metadata.parent': parent})
		if (!fileList) return res.status(404).json({error: {message: 'File List not found'}})
		console.log(fileList)
		return res.json(fileList)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const renameFile = async (req, res, next) => {
	try {
		const {id: fileID, title} = req.body
		const updatedFile = await db.File.findByIdAndUpdate(fileID, {$set: {filename: title}})
		if (!updatedFile) return res.status(404).json({error: {message: 'File not found'}})
		return res.json(updatedFile)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const deleteFile = async (req, res, next) => {
	try {
		console.log('⭐⭐', req.params)
		const file = await db.File.findById(req.params.fileId)
		if (!file) return res.status(404).json({error: {message: 'File not found'}})
		if (file.metadata.thumbnailID) {
			const thumbnail = await db.Thumbnail.findById(file.metadata.thumbnailID)
			const thumbnailPath = thumbnail.path
			await fileService.deleteFile(thumbnailPath)
			await db.Thumbnail.findByIdAndDelete(file.metadata.thumbnailID)
		}
		await fileService.deleteFile(file.metadata.filePath)
		await db.File.findByIdAndDelete(file._id)
		res.json({data: {success: true}})
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
module.exports = {uploadFile, downloadFile, getThumbnail, getList, renameFile, deleteFile}
