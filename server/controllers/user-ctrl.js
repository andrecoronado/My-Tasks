const User = require('../models/user-model')
const multer = require('multer')
const sharp = require('sharp')
const jwt = require('jsonwebtoken')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

createUser = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token, "success": true })
    } catch (e) {
        res.status(400).send({e, "data": { "success": false, "token":"" }})
    }
}

getUserByEmail = async (req, res) => {
    const email = req.params.email
    try {
        
        const user = await User.findOne({ email })
        if (!user) {
            return res.send({user: {name: ""}, "success": false})
        }

        res.send({user, "success": true})
    } catch (e) {
        res.status(500).send()
    }
}

getUser = async (req, res) => {
    res.send(req.user)
}

updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

deleteUser = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token, "success": true })
    } catch (e) {
        res.send({ e,  "data": { "success": false } })
    }
}

logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.clearCookie('access_token')
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

uploadAvatar = [
         upload.single('avatar'),
         async (req, res) => {
            const buffer = await sharp(req.file.buffer).resize({ width: 100, height: 100 }).png().toBuffer()
            req.user.avatar = buffer
            await req.user.save()
            res.send()
            },
         (error, req, res, next) => {
    res.status(400).send({ error: error.message })}
]

deleteAvatar = async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}

getAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    logoutAll,
    getUserByEmail,
    getUser,
    updateUser,
    deleteUser,
    uploadAvatar,
    deleteAvatar,
    getAvatar
}