"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDetails = void 0;
var EmbedBuilder = require('discord.js').EmbedBuilder;
function AccountDetails(data) {
    var PaymentAcctID = data[0].acctID;
    var PaymentAcctURL = data[0].acctID;
    var discID = data[0].ID;
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Payment Acct Details")
        .setURL('https://github.com/matthewjr1/')
        .setAuthor({ name: 'Matthew J.', iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'User: ', value: "<@" + String(discID) + ">", inline: false }, { name: 'Payment Acct ID: ', value: String(PaymentAcctID), inline: false }, { name: 'Payment Panel URL ', value: String(PaymentAcctURL), inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.AccountDetails = AccountDetails;
