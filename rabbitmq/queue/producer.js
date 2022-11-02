const amqplib = require('amqplib');

const sendQueue = async ({msg}) => {
    try {
        // Create Connection
        const conn = await amqplib.connect(process.env.AMQP_URL_DOCKER);

        // Create Channel
        const channel = await conn.createChannel();

        // Create name queue
        const nameQueue = 'q2';

        // Create queue
        await channel.assertQueue(nameQueue, {
            durable: true, // with true => when restart queue not delete message queue
        })

        // Send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg)
        , {
            persistent: true, // with persistent
            // expiration: '10000' // => TTL time to live
        }
        );

        // Close conn and channel

    } catch (err) {
        console.error(`Error::`, err.message);
    }
}

const msg = process.argv.splice(2).join(' ') || 'Hello world';

sendQueue({msg})