/** @param {NS} ns **/
export function autocomplete(data) {
    return [...data.servers]; // This script autocompletes the list of servers.
}

export async function main(ns) {

    //export function autocomplete(data, args) {
    //    return [...data.servers]; // This script autocompletes the list of servers.
    //}

    // Defines the "target server", which is the server
    // that we're going to hack.
    var target = ns.args[0];

    // Defines how much money a server should have before we hack it
    // In this case, it is set to 75% of the server's max money
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)) {
        await ns.sleep(20000);
    }

    try {
        ns.brutessh(target);
    } catch {}
    try {
        ns.ftpcrack(target);
    } catch {}
    try {
        ns.relaysmtp(target);
    } catch {}
    try {
        ns.httpworm(target);
    } catch {}
    try {
        ns.sqlinject(target);
    } catch {}

    // Get root access to target server
    ns.nuke(target);
    try {
        ns.installBackdoor(target);
    } catch (err) {
        ns.print("ERROR: No Backdoor Source Code, Cannot create Backdoor")
    }

    await ns.scp("hack-master.ns", target);

    try {
        ns.exec("hack-master.ns", target, 1, "n00dles");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "foodnstuff");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "sigma-cosmetics");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "joesguns");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "nectar-net");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "hong-fang-tea");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "max-hardware");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "zer0");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "CSEC");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "harakiri-sushi");
    } catch {}

    try {
        ns.exec("hack-master.ns", target, 1, "iron-gym");
    } catch {}

    // Infinite loop that continously hacks/grows/weakens the target server
    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }

    }

}