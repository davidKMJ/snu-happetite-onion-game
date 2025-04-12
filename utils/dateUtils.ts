import { getStringData, storeStringData } from "./asyncUtils";

export const storeStartingDate = async () => {
    const currentDate = new Date().toISOString();
    await storeStringData("start", currentDate);
}

export const calculateDaysPassed = async () => {
    const startDate = await getStringData("start") as string;
    const start = new Date(startDate);
    const now = new Date()
    const diff = now.getTime() - start.getTime();
    console.log("start", startDate, "now", now.toISOString(), "diff", diff);
    const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
    return daysPassed;
}