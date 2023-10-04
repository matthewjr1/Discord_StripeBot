"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Created by Matthew J. 2023
var discord_js_1 = require("discord.js");
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs"));
var console_1 = __importDefault(require("console"));
var _a = require('../config.json'), clientId = _a.clientId, guildId = _a.guildId, token = _a.token, StripeAPIKey = _a.StripeAPIKey;
var _b = require('discord.js'), Client = _b.Client, Collection = _b.Collection, Events = _b.Events, GatewayIntentBits = _b.GatewayIntentBits;
//DISCORD CLIENT//
var client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});
///
client.commands = new Collection(); //Discord Command Collection
//When discord client is ready
client.once(Events.ClientReady, function (c) {
    console_1.default.log("Ready! Logged in as ".concat(c.user.tag));
});
client.login(token); //Discord User loggin in
// Construct and prepare an instance of the REST module
var rest = new discord_js_1.REST().setToken(token);
var commands = [];
var commands_inter = new Array();
var commandsNames = new Array();
// Grab all the command files from the commands directory you created earlier
var foldersPath = path_1.default.join(__dirname, 'commands');
var commandFolders = fs.readdirSync(foldersPath);
for (var _i = 0, commandFolders_1 = commandFolders; _i < commandFolders_1.length; _i++) {
    var folder = commandFolders_1[_i];
    // Grab all the command files from the commands directory you created earlier
    var commandsPath = path_1.default.join(foldersPath, folder);
    var commandFiles = fs.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.js'); });
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (var _c = 0, commandFiles_1 = commandFiles; _c < commandFiles_1.length; _c++) {
        var file = commandFiles_1[_c];
        var filePath = path_1.default.join(commandsPath, file);
        var command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            commands_inter.push(command);
            commandsNames.push(command.name);
        }
        else {
            console_1.default.log("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
        }
    }
}
// @ts-ignore
client.on(Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var x, command, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand())
                    return [2 /*return*/];
                x = commandsNames.indexOf(interaction.commandName);
                command = commands_inter[x];
                if (!command) {
                    console_1.default.error("No command matching ".concat(interaction.commandName, " was found."));
                    console_1.default.error(String(interaction.client.commands));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 8]);
                return [4 /*yield*/, command.execute(interaction)];
            case 2:
                _a.sent();
                return [3 /*break*/, 8];
            case 3:
                error_1 = _a.sent();
                console_1.default.error(error_1);
                if (!(interaction.replied || interaction.deferred)) return [3 /*break*/, 5];
                return [4 /*yield*/, interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// and deploy your commands!
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console_1.default.log("Started refreshing ".concat(commands.length, " application (/) commands."));
                return [4 /*yield*/, rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands })];
            case 1:
                data = _a.sent();
                // @ts-ignore
                console_1.default.log("Successfully reloaded ".concat(data.length, " application (/) commands."));
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                // And of course, make sure you catch and log any errors!
                console_1.default.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
