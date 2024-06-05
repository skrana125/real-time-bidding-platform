const { Bid, Item, Notification } = require('./models');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for bid events
    socket.on('bid', async ({ itemId, bidAmount, userId }) => {
      try {
        const item = await Item.findByPk(itemId);
        if (!item || new Date(item.end_time) < new Date() || bidAmount <= item.current_price) {
          socket.emit('error', 'Invalid bid');
          return;
        }

        const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount: bidAmount, created_at: new Date() });
        await item.update({ current_price: bidAmount });

        io.emit('update', { itemId, bidAmount, userId });
      } catch (error) {
        socket.emit('error', 'Error placing bid');
      }
    });

    // Listen for notifications
    socket.on('notify', async ({ userId, message }) => {
      try {
        const notification = await Notification.create({ user_id: userId, message, created_at: new Date() });
        socket.emit('notification', notification);
      } catch (error) {
        socket.emit('error', 'Error sending notification');
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};