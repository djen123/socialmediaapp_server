import User from '../models/user.model.js'
import Network from '../models/network.model.js'

export const fetchNetworkSuggestions = async (req, res) => {
    try {
      let users = await User.find().select('-password')
      const connections = await Network.find({
        $or: [
          { requester: req.user._id },
          { recipient: req.user._id }
        ],
        status: 'accepted'
      })
      .populate('recipient')
      .populate('requester')

      // Remove the current user from the list of users
      users = users.filter(user => user._id.toString() !== req.user._id.toString())

      // Remove the users that are already in the connections list
      users = users.filter(user => {
        return !connections.some(connection => 
          connection.recipient._id.toString() === user._id.toString() || 
          connection.requester._id.toString() === user._id.toString()
        )
      })

      res.json({ users })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
}

export const fetchConnections = async (req, res) => {
    try {
      const connections = await Network.find({
        $or: [
          { requester: req.user._id },
          { recipient: req.user._id }
        ],
        status: 'accepted'
      })
      .populate('recipient')
      .populate('requester')
    
      const receivedRequests = await Network.find({
        recipient: req.user._id,
        status: 'pending'
      })
      .populate('requester')

      const sentRequests = await Network.find({
        requester: req.user._id,
        status: 'pending'
      })
      .populate('recipient')

      const connectionsUsers = connections.map((connection) => {
        if (connection.requester.toString() === req.user._id.toString()) {
          return connection.recipient
        } else {
          return connection.requester
        }
      })
      const receivedRequestUsers = receivedRequests.map((request) => request.requester)
      const sentRequestUsers = sentRequests.map((request) => request.recipient)
      
      res.json({ 
        connections: connectionsUsers,
        receivedRequests: receivedRequestUsers,
        sentRequests: sentRequestUsers
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
}

export const createConnectionRequest = async (req, res) => {
    try {
      const { recipient } = req.body

      await Network.create({ 
        requester: req.user._id, 
        recipient: recipient 
      })

      res.status(201).json({
        message: 'Connection request created successfully'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
}

export const acceptConnectionRequest = async (req, res) => {
    try {
      const { requester } = req.body

      await Network.updateOne({ 
        recipient: req.user._id, 
        requester: requester 
      }, { status: 'accepted' })

      res.json({ message: 'Connection request accepted successfully' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
}