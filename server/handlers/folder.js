const db = require('../models')
const fileService = require('../services/fileService')
const uploadFolder = async (req, res, next) => {
	try {
		const {parent, parentList, name} = req.body
		const folder = await db.Folder.create({name, parent, parentList, user: req.user.id})
		if (!folder) return res.stats(404).json({error: {message: 'Folder upload error'}})
		return res.json(folder)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getFolderList = async (req, res, next) => {
	try {
		const user = req.user
		const query = req.query
		let searchQuery = query.search || ''
		const parent = query.parent || '/'
		let sortBy = query.sortby || 'DEFAULT'
		const type = query.type
		const folderSearch = query.folder_search || undefined
		const itemType = query.itemType || undefined
		const folderList = await db.Folder.find({parent})
		if (!folderList) {
			return res.status(404).json({error: {message: 'No folder found'}})
		}
		return res.json(folderList)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const renameFolder = async (req, res, next) => {
	try {
		const {id, title} = req.body
		const updatedFolder = await db.Folder.findByIdAndUpdate(id, {$set: {name: title}})
		if (!updatedFolder) return res.status(404).json({error: {message: 'Folder Not found'}})
		return res.json(updatedFolder)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const deleteFolder = async (req, res, next) => {
	try {
		const {id: folderID, parentList} = req.body
		console.log('😋😋 body', req.body)
		const parentListString = parentList.toString()
		// await Folder.deleteMany({"owner": userID, "parentList": { $all: parentList}})

		await db.Folder.findByIdAndDelete(folderID)
		await db.Folder.deleteMany({parentList: {$all: parentList}})
		const fileList = await db.File.find({
			'metadata.parentList': {$regex: `.*${parentListString}.*`},
		})
		if (!fileList) return res.status(404).json({error: {message: 'Delete file list not found'}})
		for (let i = 0; i < fileList.length; i++) {
			const currentFile = fileList[i]
			if (currentFile.metadata.thumbnailID) {
				const thumbnail = await db.Thumbnail.findById(currentFile.metadata.thumbnailID)
				const thumbnailPath = thumbnail.path
				await fileService.deleteFile(thumbnailPath)
				await db.Thumbnail.findByIdAndDelete(currentFile.metadata.thumbnailID)
			}
			await fileService.deleteFile(currentFile.metadata.filePath)
			await db.File.findByIdAndDelete(currentFile._id)
		}
		return res.send()
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

module.exports = {
	uploadFolder,
	getFolderList,
	renameFolder,
	deleteFolder,
}
