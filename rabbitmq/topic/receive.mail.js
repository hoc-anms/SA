const amqplib = require("amqplib");

const receiveEmail = async () => {
    try {
        // Create Connection
        const conn = await amqplib.connect(process.env.AMQP_URL_CLOUD);

        // Create Channel
        const channel = await conn.createChannel();

        // Create exchange
        const nameExchange = "send_email";

        await channel.assertExchange(nameExchange, "topic", {
            durable: false,
        });

        // Create Queue
        const { queue } = await channel.assertQueue("", {
            exclusive: false,
        });

        // binding
        const args = process.argv.slice(2);
        if (!args.length) process.exit(0);

        /**
         *   `*`: match with any character
         *   `#`: match with one or many character
         */

        console.log(`waiting queue: ${queue}---Topic::${args}---`);

        args.forEach(async key => {
            await channel.bindQueue(queue, nameExchange, key);
        })

        // publish email
        await channel.consume(queue, msg => {
            console.log(`Routing key: ${msg.fields.routingKey}::::msg::::${msg.content.toString()}`)
        })

    
    } catch (err) {
        console.error(`Error::`, err.message);
    }
};

receiveEmail();
