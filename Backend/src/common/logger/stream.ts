import logger from "./logger";

const stream = {
    write: (message: string) => {
        if (message.includes("500")) {
            logger.error(message.trim());
        } else {
            logger.info(message.trim());
        }
    }
};

export default stream;