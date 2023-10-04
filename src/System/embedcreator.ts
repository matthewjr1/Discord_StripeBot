const { EmbedBuilder } = require('discord.js');

export function AccountDetails(data:any){
    let PaymentAcctID = data[0].acctID;
    let PaymentAcctURL = data[0].acctID;
    let discID = data[0].ID;
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Payment Acct Details")
        .setURL('https://github.com/matthewjr1/')
        .setAuthor({ name: 'Matthew J.', iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'User: ', value: "<@"+String(discID)+">", inline: false },
            { name: 'Payment Acct ID: ', value: String(PaymentAcctID), inline: false },
            { name: 'Payment Panel URL ', value: String(PaymentAcctURL), inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
