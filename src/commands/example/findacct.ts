import {SlashCommandBuilder} from "discord.js";
import {Get_AcctNumber, Get_CustomerPortal} from "../../Payment/Stripe_Controls";


module.exports = {
    name: "findacct",
    data: new SlashCommandBuilder()
        .setName('findacct')
        .setDescription('findacct')
        .addStringOption(option =>
            option.setName('email')
                .setRequired(true)
                .setMaxLength(60)
                .setMinLength(6)
                .setDescription('Your Email')),


    async execute(interaction: any) {
        console.log(interaction.options);
            run(interaction);
    },

}

async function run(interation: any) {
    const interactionUser = await interation.guild.members.fetch(interation.user.id);
    let channelID = interation.channelId;
    const userId = interactionUser.id;
    var Obj = [{
        email: interation.options.get("email").value
    }]
    let ID = Get_AcctNumber(Obj);
    let result = await Get_CustomerPortal(ID);
    interation.reply(result);





}

