const db = require('../models')

const uploadFolder = async (req, res, next) => {
	try {
		const {parent, parentList, name} = req.body
		const folder = await db.Folder.create({name, parent, parentList})
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

module.exports = {
	uploadFolder,
	getFolderList,
}
