const amqplib = require('amqplib');

const receiveNoti = async () => {
    try {
         // Create Connection
         const conn = await amqplib.connect(process.env.AMQP_URL_CLOUD);

         // Create Channel
         const channel = await conn.createChannel();

         // Create exchange
         const nameExchange = 'video';

         await channel.assertExchange(nameExchange, 'fanout', {
            durable: false,
         });

         // create queue
         const {queue} = await channel.assertQueue('', {
            exclusive: true // Auto delete queue when user not register
         });

         console.log(`Name Queue::${queue}`);

         // Binding
         await channel.bindQueue(queue, nameExchange, '')

         await channel.consume(queue, msg => {
            console.log(`msg::`, msg.content.toString())
         }, {
            noAck: true
         })
        
    } catch (err) {
        console.error(`Error::`, err.message);
    }
}

receiveNoti()
