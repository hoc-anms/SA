const amqplib = require('amqplib');

const postVideo = async ({msg}) => {
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

         // publish video
         await channel.publish(nameExchange, '', Buffer.from(msg) );

         console.log(`Send Ok::${msg}`);

         setTimeout(() => {
            conn.close();
            process.exit(0)
         }, 2000);

    } catch (err) {
        console.error(`Error::`, err.message);
    }
}

const msg = process.argv.slice(2).join(' ') || 'Hello Exchange';

postVideo({msg})
