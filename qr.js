/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const chalk = require('chalk');
const { WAConnection, MessageOptions, MessageType, Mimetype } = require('@adiwajshing/baileys');
const { StringSession } = require('./whatsasena/');
const fs = require('fs');

async function whatsAsena() {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [3, 3234, 9];
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.italic('AsenaString Code Generator')}
${chalk.blue.italic('ℹ️  Connecting to WhatsApp... Please wait.')}`);
    });

    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('994') 
                ? 'Your WhatsAsena String Code: ' 
                : 'Your WhatsAsena String Code: '
            ), st
        );

        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `ASENA_SESSION="${st}"`);
        }

        console.log(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('994') 
            ? 'Do not share this code with anyone: ' + conn.user.name 
            : 'Do not share this code with anyone: ' + conn.user.name);

        process.exit(0);
    });

    await conn.connect();
}

whatsAsena();
