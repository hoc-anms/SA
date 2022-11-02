const amqplib = require('amqplib');

const receiveQueue = async () => {
    try {
        // Create Connection
        const conn = await amqplib.connect(process.env.AMQP_URL_DOCKER);

        // Create Channel
        const channel = await conn.createChannel();

        // Create name queue
        const nameQueue = 'q2';

        // Create queue
        await channel.assertQueue(nameQueue, {
            durable: true,
        })

        // Receive to queue
        await channel.consume(nameQueue, msg => {
            console.log(msg)
            console.log(`Msg::`, msg.content.toString())
        }, {
            noAck: true
        });

        // Close conn and channel

    } catch (err) {
        console.error(`Error::`, err.message);
    }
}

receiveQueue()