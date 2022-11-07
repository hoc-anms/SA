const amqplib = require("amqplib");

/***
 * Type Topic can send to one, many of department/roles/.. comsummer registed 
 */

const sendEmail = async () => {
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

        const args = process.argv.slice(2);
        const msg = args[1] || "Fixed!";
        const topic = args[0];

        console.log(`msg::${msg}---Topic::${topic}---`);

        // publish email
        await channel.publish(nameExchange, topic, Buffer.from(msg));

        console.log(`Send Ok::${msg}`);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 2000);
    } catch (err) {
        console.error(`Error::`, err.message);
    }
};

sendEmail();
