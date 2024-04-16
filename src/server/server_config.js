

import dotenv from 'dotenv';
dotenv.config();

const ServerConfig = {
    PORT: process.env.PORT,
    SESS_SECRET: process.env.SESS_SECRET
};

export default ServerConfig;
